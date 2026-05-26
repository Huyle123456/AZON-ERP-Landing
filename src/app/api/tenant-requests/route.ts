import { NextResponse } from "next/server";

const UPSTREAM =
  process.env.TENANT_API_URL ?? "https://fterp.test/api/tenant-requests";

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
