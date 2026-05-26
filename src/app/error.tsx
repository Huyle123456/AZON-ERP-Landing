"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("errorPage");

  useEffect(() => {
    // Send to telemetry here if needed. Don't surface raw error to the user.
    console.error(error);
  }, [error]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center px-4 py-10">
      <div className="absolute inset-0 -z-10 bg-linear-to-br from-rose-50 via-white to-amber-50" />
      <div className="absolute -top-40 -right-40 h-[520px] w-[520px] rounded-full bg-rose-300/30 blur-3xl -z-10" />
      <div className="absolute -bottom-48 -left-32 h-[560px] w-[560px] rounded-full bg-amber-300/30 blur-3xl -z-10" />

      <div className="text-center max-w-xl">
        <div className="mx-auto h-20 w-20 rounded-full bg-rose-100 flex items-center justify-center">
          <svg className="h-10 w-10 text-rose-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          </svg>
        </div>
        <h1 className="mt-5 text-2xl sm:text-3xl font-bold text-slate-900">
          {t("title")}
        </h1>
        <p className="mt-3 text-slate-600">{t("description")}</p>
        {error.digest && (
          <p className="mt-2 text-xs text-slate-400">
            {t("digestLabel")} <code className="font-mono">{error.digest}</code>
          </p>
        )}

        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-full bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary-500/30 hover:bg-primary-600 transition-colors cursor-pointer"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v6h6M20 20v-6h-6M5 10a8 8 0 0114-3M19 14a8 8 0 01-14 3" />
            </svg>
            {t("retry")}
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:border-slate-400 hover:bg-slate-50 transition-colors"
          >
            {t("home")}
          </Link>
        </div>
      </div>
    </div>
  );
}
