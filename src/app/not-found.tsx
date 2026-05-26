import Link from "next/link";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("notFound");
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    robots: { index: false, follow: false },
  };
}

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center px-4 py-10">
      <div className="absolute inset-0 -z-10 bg-linear-to-br from-primary-50 via-white to-indigo-50" />
      <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-primary-300/30 blur-3xl -z-10" />
      <div className="absolute -bottom-48 -right-32 h-[560px] w-[560px] rounded-full bg-indigo-300/30 blur-3xl -z-10" />

      <div className="text-center max-w-xl">
        <p className="text-[120px] sm:text-[160px] font-black leading-none bg-linear-to-br from-primary-500 to-indigo-500 bg-clip-text text-transparent select-none">
          404
        </p>
        <h1 className="mt-2 text-2xl sm:text-3xl font-bold text-primary-900">
          {t("title")}
        </h1>
        <p className="mt-3 text-slate-600">{t("description")}</p>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary-500/30 hover:bg-primary-600 transition-colors"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3v-6h6v6h3a1 1 0 001-1V10" />
            </svg>
            {t("home")}
          </Link>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-white px-5 py-2.5 text-sm font-semibold text-primary-700 hover:border-primary-400 hover:bg-primary-50 transition-colors"
          >
            {t("register")}
          </Link>
        </div>
      </div>
    </div>
  );
}
