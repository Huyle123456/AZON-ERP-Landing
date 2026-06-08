import { NextResponse } from "next/server";

const UPSTREAM_BASE = process.env.BLOG_API_URL ?? "https://fterp.test";

export async function GET(
  req: Request,
  ctx: { params: Promise<{ slug: string }> },
) {
  const { slug } = await ctx.params;
  // Sanity-check the slug to prevent path traversal in the upstream URL.
  if (!/^[a-z0-9-]{1,160}$/i.test(slug)) {
    return NextResponse.json(
      {
        success: false,
        error_code: "VALIDATION_ERROR",
        message: "Slug không hợp lệ",
        data: null,
      },
      { status: 422 },
    );
  }

  const upstream = `${UPSTREAM_BASE.replace(/\/+$/, "")}/api/posts/${encodeURIComponent(slug)}`;

  try {
    const res = await fetch(upstream, {
      method: "GET",
      headers: {
        Accept: "application/json",
        ...(req.headers.get("accept-language")
          ? { "Accept-Language": req.headers.get("accept-language")! }
          : {}),
      },
      next: { revalidate: 60 },
    });
    const text = await res.text();
    return new NextResponse(text, {
      status: res.status,
      headers: {
        "Content-Type": res.headers.get("content-type") ?? "application/json",
      },
    });
  } catch (e) {
    if (process.env.NODE_ENV !== "production") {
      console.error("[blog/posts/:slug proxy] upstream error:", e);
    }
    return NextResponse.json(
      {
        success: false,
        error_code: "UPSTREAM_UNREACHABLE",
        message: "Không kết nối được tới máy chủ. Vui lòng thử lại sau.",
        data: null,
      },
      { status: 502 },
    );
  }
}
