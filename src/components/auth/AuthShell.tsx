"use client";

import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function AuthShell({
  children,
  title,
  subtitle,
}: {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}) {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("auth");
  // Prefix locale so soft client-side nav works (no middleware redirect →
  // no hard reload → background stays).
  const homeHref = `/${locale}`;

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center px-4 py-4 md:py-5">
      {/* Back to home — absolute on desktop */}
      <Link
        href={homeHref}
        className="hidden md:inline-flex absolute top-6 left-6 items-center gap-1.5 text-sm font-medium text-white hover:text-primary-200 transition-colors"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        {t("back")}
      </Link>

      {/* Card */}
      <div className="w-full max-w-xl md:max-w-2xl lg:max-w-3xl">
        {/* Mobile-only inline back link */}
        <Link
          href={homeHref}
          className="md:hidden mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-white hover:text-primary-200 transition-colors"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Quay về Trang chủ
        </Link>

        <div className="mb-3 md:mb-4 flex justify-center">
          <Link href={homeHref} className="inline-flex">
            <Image
              src="/logo/logo2.svg"
              alt="AZON ERP"
              width={120}
              height={40}
              className="brightness-0 invert drop-shadow-md"
              priority
            />
          </Link>
        </div>

        <motion.div
          key={pathname}
          initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
          animate={{ clipPath: "inset(0 0 0% 0)", opacity: 1 }}
          transition={{
            clipPath: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
            opacity: { duration: 0.2, ease: "easeOut" },
          }}
          className="rounded-2xl bg-white/95 backdrop-blur-xl text-slate-900 shadow-2xl shadow-primary-900/10 border border-white/60 p-5 sm:p-6 md:p-7"
        >
          <div className="mb-4 text-center">
            <h1 className="text-xl md:text-2xl font-bold text-primary-900">{title}</h1>
            {subtitle && (
              <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
            )}
          </div>
          {children}
        </motion.div>
      </div>
    </div>
  );
}
