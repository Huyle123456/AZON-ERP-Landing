import { NextRequest, NextResponse } from "next/server";
import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE,
  SUPPORTED_LOCALES,
  type Locale,
} from "@/i18n/request";

const ONE_YEAR = 60 * 60 * 24 * 365;

function isSupported(seg: string): seg is Locale {
  return (SUPPORTED_LOCALES as readonly string[]).includes(seg);
}

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  const firstSeg = pathname.split("/")[1] ?? "";

  // 1) URL already has a known locale prefix → rewrite internally so that
  //    the existing app/ directory (which has no [locale] segment) keeps
  //    serving the right routes. Also propagate the locale via header +
  //    cookie so server components pick it up.
  if (isSupported(firstSeg)) {
    const stripped = pathname.slice(`/${firstSeg}`.length) || "/";
    const url = req.nextUrl.clone();
    url.pathname = stripped;

    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-locale", firstSeg);

    const res = NextResponse.rewrite(url, {
      request: { headers: requestHeaders },
    });
    res.cookies.set(LOCALE_COOKIE, firstSeg, {
      path: "/",
      maxAge: ONE_YEAR,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
    return res;
  }

  // 2) Legacy `vi` URL prefix → redirect to `vie`.
  if (firstSeg === "vi") {
    const rest = pathname.slice("/vi".length) || "/";
    const url = req.nextUrl.clone();
    url.pathname = `/vie${rest === "/" ? "" : rest}`;
    return NextResponse.redirect(url);
  }

  // 3) No prefix → always redirect to the default locale (English). We
  //    intentionally ignore the cookie here so the canonical entry point of
  //    the site is consistent and SEO-friendly. Users who want Vietnamese
  //    can switch via the language toggle, which navigates straight to /vie/*.
  const url = req.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${pathname === "/" ? "" : pathname}`;
  url.search = search;
  return NextResponse.redirect(url);
}

export const config = {
  // Run on every path except: Next internals, API routes, and files with an
  // extension (favicon, images, sitemap.xml, robots.txt, manifest.webmanifest,
  // etc.).
  matcher: ["/((?!api|_next/static|_next/image|.*\\..*).*)"],
};
