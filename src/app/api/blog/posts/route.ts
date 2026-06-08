import { NextResponse } from "next/server";

const UPSTREAM_BASE =
  process.env.BLOG_API_URL ?? "https://fterp.test";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const upstream = `${UPSTREAM_BASE.replace(/\/+$/, "")}/api/posts${url.search}`;

  try {
    const res = await fetch(upstream, {
      method: "GET",
      headers: {
        Accept: "application/json",
        // Forward locale preference if present.
        ...(req.headers.get("accept-language")
          ? { "Accept-Language": req.headers.get("accept-language")! }
          : {}),
      },
      // Edge cache for 60s.
      next: { revalidate: 60 },
    });
    const text = await res.text();
    return new NextResponse(text, {
      status: res.status,
      headers: {
        "Content-Type":
          res.headers.get("content-type") ?? "application/json",
      },
    });
  } catch (e) {
    if (process.env.NODE_ENV !== "production") {
      console.error("[blog/posts proxy] upstream error:", e);
    }
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
