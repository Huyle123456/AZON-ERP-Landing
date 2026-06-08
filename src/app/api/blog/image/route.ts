import { NextResponse } from "next/server";

const UPSTREAM_BASE = process.env.BLOG_API_URL ?? "https://fterp.test";

/**
 * Image proxy for blog content. Fetches the binary from the upstream CMS
 * (or any URL whose origin matches BLOG_API_URL) and streams it back through
 * our own origin — solves three problems at once:
 *   - bypass self-signed certs in dev (proxy is server-side, dev script sets
 *     NODE_TLS_REJECT_UNAUTHORIZED=0)
 *   - hides the upstream host from clients
 *   - lets us cache aggressively at the edge
 */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const target = url.searchParams.get("url");
  if (!target) {
    return new NextResponse("Missing url param", { status: 400 });
  }

  // Whitelist: only allow same-origin (relative) or BLOG_API_URL origin to
  // prevent SSRF/turn-this-into-an-open-proxy.
  let absolute: string;
  try {
    if (target.startsWith("/")) {
      absolute = `${UPSTREAM_BASE.replace(/\/+$/, "")}${target}`;
    } else {
      const t = new URL(target);
      const allowed = new URL(UPSTREAM_BASE);
      if (t.host !== allowed.host) {
        return new NextResponse("Origin not allowed", { status: 403 });
      }
      absolute = t.toString();
    }
  } catch {
    return new NextResponse("Invalid URL", { status: 400 });
  }

  try {
    // Forward Range so <video> can seek/scrub.
    const range = req.headers.get("range");
    const res = await fetch(absolute, {
      headers: {
        Accept: "image/*,video/*,*/*;q=0.8",
        ...(range ? { Range: range } : {}),
      },
      // Don't let Next.js Data Cache hold a multi-MB video in memory. Range
      // requests get fresh bytes from upstream; the browser does its own
      // HTTP caching via the headers below.
      cache: "no-store",
    });
    if (!res.ok && res.status !== 206) {
      return new NextResponse("Upstream asset failed", { status: res.status });
    }

    // Stream the upstream body straight to the client without buffering —
    // critical for <video> seeking so each Range request returns chunks
    // immediately.
    const passthrough = new Headers();
    passthrough.set(
      "Content-Type",
      res.headers.get("content-type") ?? "application/octet-stream",
    );
    // B2 presigned URLs expire after 60 min. Cap browser cache below that
    // so we don't keep handing out asset URLs whose signature is dead.
    passthrough.set(
      "Cache-Control",
      "public, max-age=1800, s-maxage=1800",
    );
    for (const h of [
      "accept-ranges",
      "content-range",
      "content-length",
      "etag",
      "last-modified",
    ]) {
      const v = res.headers.get(h);
      if (v) passthrough.set(h, v);
    }
    return new NextResponse(res.body, {
      status: res.status,
      headers: passthrough,
    });
  } catch (e) {
    if (process.env.NODE_ENV !== "production") {
      console.error("[blog/image proxy] error:", e);
    }
    return new NextResponse("Upstream unreachable", { status: 502 });
  }
}
