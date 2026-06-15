import { NextResponse } from "next/server";

// Endpoint path is hardcoded; only the API base host comes from env so the
// same proxy works against staging / prod by swapping API_URL.
const API_BASE = process.env.API_URL ?? "https://fterp.test/api/";
const UPSTREAM = `${API_BASE.replace(/\/+$/, "")}/tenant-requests`;

const MAX_BODY = 16 * 1024; // 16 KB

export async function POST(req: Request) {
  const len = Number(req.headers.get("content-length") ?? "0");
  if (len > MAX_BODY) {
    return NextResponse.json({ error: "Payload too large" }, { status: 413 });
  }
  const body = await req.text();
  if (body.length > MAX_BODY) {
    return NextResponse.json({ error: "Payload too large" }, { status: 413 });
  }

  try {
    const upstream = await fetch(UPSTREAM, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body,
      // Note: fterp.test uses a self-signed cert (Laravel Valet). Node fetch
      // rejects invalid certs by default. The dev script sets
      // NODE_TLS_REJECT_UNAUTHORIZED=0 to bypass — production uses real certs.
    });

    const text = await upstream.text();
    return new NextResponse(text, {
      status: upstream.status,
      headers: {
        "Content-Type":
          upstream.headers.get("content-type") ?? "application/json",
      },
    });
  } catch (e) {
    // Don't leak upstream URL or raw error to clients in production.
    if (process.env.NODE_ENV !== "production") {
      console.error("[tenant-requests proxy] upstream error:", e);
    }
    return NextResponse.json(
      {
        success: false,
        error_code: "UPSTREAM_UNREACHABLE",
        message: "Không kết nối được tới máy chủ. Vui lòng thử lại sau.",
      },
      { status: 502 },
    );
  }
}
