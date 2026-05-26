"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

export default function AuthTabs() {
  const path = usePathname() ?? "";
  const locale = useLocale();
  const t = useTranslations("auth.tabs");
  const isLogin = path.endsWith("/login");

  const loginHref = `/${locale}/login`;
  const registerHref = `/${locale}/register`;

  const base =
    "flex-1 text-center py-2.5 text-sm font-semibold rounded-lg transition-all";
  const active = "bg-white text-primary-700 shadow";
  const inactive = "text-slate-500 hover:text-primary-700";

  return (
    <div className="mb-6 flex gap-1 rounded-xl bg-slate-100 p-1">
      <Link
        href={loginHref}
        className={`${base} ${isLogin ? active : inactive}`}
      >
        {t("login")}
      </Link>
      <Link
        href={registerHref}
        className={`${base} ${!isLogin ? active : inactive}`}
      >
        {t("register")}
      </Link>
    </div>
  );
}
