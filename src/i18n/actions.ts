"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { LOCALE_COOKIE, SUPPORTED_LOCALES, type Locale } from "./request";

/**
 * Persist the user's locale preference. Kept for legacy callers — the
 * preferred way to switch language is to navigate to /<locale>/<path>,
 * which the middleware handles (and also writes this cookie).
 */
export async function setLocale(locale: Locale) {
  if (!(SUPPORTED_LOCALES as readonly string[]).includes(locale)) return;
  const cookieStore = await cookies();
  cookieStore.set(LOCALE_COOKIE, locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    httpOnly: false,
  });
  revalidatePath("/", "layout");
}
