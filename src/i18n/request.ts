import { getRequestConfig } from "next-intl/server";
import { cookies, headers } from "next/headers";

export const SUPPORTED_LOCALES = ["en", "vie"] as const;
export const DEFAULT_LOCALE: Locale = "en";
export const LOCALE_COOKIE = "NEXT_LOCALE";

export type Locale = (typeof SUPPORTED_LOCALES)[number];

export function normalizeLocale(raw: string | undefined | null): Locale {
  if (raw === "vi" || raw === "vie") return "vie";
  if (raw === "en") return "en";
  return DEFAULT_LOCALE;
}

export default getRequestConfig(async () => {
  // Middleware sets `x-locale` based on URL prefix (e.g. /vie/...). Fall back
  // to cookie, then to the default. Always normalize legacy `vi` → `vie`.
  const h = await headers();
  const headerLocale = h.get("x-locale");
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get(LOCALE_COOKIE)?.value;
  const locale = normalizeLocale(headerLocale ?? cookieLocale);

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
