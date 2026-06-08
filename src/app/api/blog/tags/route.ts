import { NextResponse } from "next/server";

const UPSTREAM_BASE = process.env.BLOG_API_URL ?? "https://fterp.test";

export async function GET(req: Request) {
  const upstream = `${UPSTREAM_BASE.replace(/\/+$/, "")}/api/posts/tags`;
  try {
    const res = await fetch(upstream, {
      method: "GET",
      headers: {
        Accept: "application/json",
        ...(req.headers.get("accept-language")
          ? { "Accept-Language": req.headers.get("accept-language")! }
          : {}),
      },
      next: { revalidate: 300 },
    });
    const text = await res.text();
    return new NextResponse(text, {
      status: res.status,
      headers: {
        "Content-Type": res.headers.get("content-type") ?? "application/json",
      },
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error_code: "UPSTREAM_UNREACHABLE",
        message: "Không kết nối được tới máy chủ. Vui lòng thử lại sau.",
        data: [],
      },
      { status: 502 },
    );
  }
}
