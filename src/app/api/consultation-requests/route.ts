import { NextResponse } from "next/server";

const API_BASE = process.env.API_URL ?? "https://fterp.test/api/";
const UPSTREAM = `${API_BASE.replace(/\/+$/, "")}/consultation-requests`;

const MAX_BODY = 8 * 1024;

export async function POST(req: Request) {
  const len = Number(req.headers.get("content-length") ?? "0");
  if (len > MAX_BODY) {
    return NextResponse.json({ error: "Payload too large" }, { status: 413 });
  }
  const body = await req.text();
  if (body.length > MAX_BODY) {
    return NextResponse.json({ error: "Payload too large" }, { status: 413 });
  }

  const started = Date.now();
  console.log("[consultation-requests proxy] → POST", UPSTREAM, body);

  try {
    const upstream = await fetch(UPSTREAM, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body,
      cache: "no-store",
    });

    const text = await upstream.text();
    const ms = Date.now() - started;
    if (upstream.ok) {
      console.log(
        `[consultation-requests proxy] ✓ ${upstream.status} (${ms}ms)`,
        text.slice(0, 500),
      );
    } else {
      console.error(
        `[consultation-requests proxy] ✗ ${upstream.status} (${ms}ms)`,
        text.slice(0, 500),
      );
    }
    return new NextResponse(text, {
      status: upstream.status,
      headers: {
        "Content-Type":
          upstream.headers.get("content-type") ?? "application/json",
      },
    });
  } catch (e) {
    console.error(
      `[consultation-requests proxy] ✗ network/error (${Date.now() - started}ms)`,
      e,
    );
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
