import { NextResponse } from "next/server";

const UPSTREAM_BASE =
  process.env.TENANT_API_URL ?? "https://fterp.test/api/tenant-requests";
const UPSTREAM = `${UPSTREAM_BASE.replace(/\/+$/, "")}/check-domain`;

export async function GET(req: Request) {
  const url = new URL(req.url);
  const domain = url.searchParams.get("domain") ?? "";

  // Whitelist: only forward syntactically plausible domains. Blocks SSRF-ish
  // misuse of the proxy parameter and oversized values.
  if (domain.length > 255 || !/^[a-z0-9][a-z0-9.\-]{0,253}[a-z0-9]$/.test(domain)) {
    return NextResponse.json(
      {
        success: false,
        error_code: "VALIDATION_ERROR",
        message: "Domain không hợp lệ",
        data: { errors: { domain: ["Định dạng domain không hợp lệ"] } },
      },
      { status: 422 },
    );
  }

  try {
    const upstream = await fetch(
      `${UPSTREAM}?domain=${encodeURIComponent(domain)}`,
      {
        method: "GET",
        headers: { Accept: "application/json" },
      },
    );
    const text = await upstream.text();
    return new NextResponse(text, {
      status: upstream.status,
      headers: {
        "Content-Type":
          upstream.headers.get("content-type") ?? "application/json",
      },
    });
  } catch (e) {
    if (process.env.NODE_ENV !== "production") {
      console.error("[check-domain proxy] upstream error:", e);
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
