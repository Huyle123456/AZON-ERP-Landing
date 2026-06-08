"use client";

import type { PaginationMeta, PostListItem } from "@/lib/blog-api";
import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { useFormatter, useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

interface Props {
  posts: PostListItem[];
  meta: PaginationMeta | null;
  query: { q: string; category: string; tag: string };
}

const FALLBACK_COVER = "/images/news/notice.svg";

export default function BlogListClient({ posts, meta, query }: Props) {
  const t = useTranslations("blog");
  const format = useFormatter();
  const locale = useLocale();

  return (
    <main className="bg-gray-50 min-h-screen pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t("pageTitle")}
          </h1>
          <p className="text-lg text-gray-600">{t("pageSubtitle")}</p>
        </motion.div>

        {posts.length === 0 ? (
          <p className="text-center text-gray-500 py-16">{t("empty")}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {posts.map((post, i) => (
              <motion.article
                key={post.id ?? post.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 1, delay: i * 0.08 }}
              >
                <Link
                  href={`/${locale}/blog/${post.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
                >
                  <div className="relative aspect-video overflow-hidden bg-gray-100">
                    <Image
                      src={post.featured_image_url ?? FALLBACK_COVER}
                      alt={post.featured_image_alt ?? post.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {post.is_pinned && (
                      <span className="absolute top-3 left-3 inline-flex items-center rounded-full bg-primary-500 text-white text-[10px] font-semibold uppercase tracking-wider px-2 py-1">
                        {t("pinned")}
                      </span>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    {post.published_at && (
                      <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                        <Calendar className="w-3.5 h-3.5" />
                        {format.dateTime(new Date(post.published_at), {
                          dateStyle: "long",
                        })}
                      </div>
                    )}
                    <h2 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-1">
                        {post.excerpt}
                      </p>
                    )}
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 group-hover:gap-2.5 transition-all">
                      {t("readMore")}
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        )}

        {/* Pagination */}
        {meta && meta.last_page > 1 && (
          <Pagination meta={meta} locale={locale} query={query} />
        )}
      </div>
    </main>
  );
}

function Pagination({
  meta,
  locale,
  query,
}: {
  meta: PaginationMeta;
  locale: string;
  query: { q: string; category: string; tag: string };
}) {
  const t = useTranslations("blog");
  const buildHref = (page: number) => {
    const params = new URLSearchParams();
    if (page > 1) params.set("page", String(page));
    if (query.q) params.set("q", query.q);
    if (query.category) params.set("category", query.category);
    if (query.tag) params.set("tag", query.tag);
    const qs = params.toString();
    return `/${locale}/blog${qs ? `?${qs}` : ""}`;
  };
  const pages = Array.from({ length: meta.last_page }, (_, i) => i + 1);
  return (
    <nav className="mt-12 flex justify-center items-center gap-2">
      <Link
        href={buildHref(Math.max(1, meta.current_page - 1))}
        aria-disabled={meta.current_page === 1}
        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
          meta.current_page === 1
            ? "pointer-events-none text-gray-300"
            : "text-gray-700 hover:bg-white"
        }`}
      >
        {t("prev")}
      </Link>
      {pages.map((p) => (
        <Link
          key={p}
          href={buildHref(p)}
          className={`min-w-[2.25rem] text-center px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
            p === meta.current_page
              ? "bg-primary-500 text-white"
              : "text-gray-700 hover:bg-white"
          }`}
        >
          {p}
        </Link>
      ))}
      <Link
        href={buildHref(Math.min(meta.last_page, meta.current_page + 1))}
        aria-disabled={meta.current_page === meta.last_page}
        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
          meta.current_page === meta.last_page
            ? "pointer-events-none text-gray-300"
            : "text-gray-700 hover:bg-white"
        }`}
      >
        {t("next")}
      </Link>
    </nav>
  );
}
