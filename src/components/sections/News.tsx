"use client";

import SectionHeading from "@/components/ui/SectionHeading";
import type { PostListItem } from "@/lib/blog-api";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const FALLBACK_IMAGE = "/images/news/notice.svg";

export default function News() {
  const t = useTranslations("news");
  const locale = useLocale();
  const [posts, setPosts] = useState<PostListItem[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/blog/posts?per_page=6", {
      headers: { "Accept-Language": locale },
    })
      .then((r) => r.json())
      .then((body) => {
        if (!cancelled && Array.isArray(body?.data)) setPosts(body.data);
      })
      .catch(() => {
        if (!cancelled) setPosts([]);
      });
    return () => {
      cancelled = true;
    };
  }, [locale]);

  if (posts === null) return <NewsSkeleton />;
  if (posts.length === 0) return null;

  const featured = posts.slice(0, 2);
  const compact = posts.slice(2, 6);

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title={t("title")} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Featured */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {featured.map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 1, delay: i * 0.1 }}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                <Link
                  href={`/${locale}/blog/${post.slug}`}
                  className="relative aspect-video overflow-hidden block bg-gray-100"
                >
                  <Image
                    src={post.featured_image_url ?? FALLBACK_IMAGE}
                    alt={post.featured_image_alt ?? post.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>
                <div className="p-6 flex flex-col flex-1">
                  <Link
                    href={`/${locale}/blog/${post.slug}`}
                    className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 hover:text-primary-600 transition-colors"
                  >
                    {post.title}
                  </Link>
                  {post.excerpt && (
                    <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-1">
                      {post.excerpt}
                    </p>
                  )}
                  {post.published_at && (
                    <p className="text-xs text-gray-400 mb-4">
                      {new Date(post.published_at).toLocaleDateString(
                        locale === "vie" ? "vi-VN" : "en-US",
                      )}
                    </p>
                  )}
                  <Link
                    href={`/${locale}/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 self-start bg-primary-50 text-primary-600 hover:bg-primary-100 rounded-full px-4 py-2 text-sm font-medium transition-colors"
                  >
                    {t("readMore")}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Compact list */}
          <div className="flex flex-col gap-4">
            {compact.map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 1, delay: i * 0.08 }}
              >
                <Link
                  href={`/${locale}/blog/${post.slug}`}
                  className="group flex gap-4 items-start bg-white rounded-2xl p-3 border border-gray-100 hover:shadow-md transition-all duration-300"
                >
                  <div className="relative w-24 h-20 shrink-0 rounded-xl overflow-hidden bg-gray-100">
                    <Image
                      src={post.featured_image_url ?? FALLBACK_IMAGE}
                      alt={post.featured_image_alt ?? post.title}
                      fill
                      sizes="96px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <p className="text-sm font-semibold text-gray-800 group-hover:text-primary-600 transition-colors line-clamp-3 leading-snug pt-1">
                    {post.title}
                  </p>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>

        {/* View-all button */}
        <div className="mt-10 md:mt-12 flex justify-center">
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-white hover:border-primary-400 hover:bg-primary-50 px-6 py-3 text-sm font-semibold text-primary-700 transition-colors"
          >
            {t("viewAll")}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function NewsSkeleton() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.from({ length: 2 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100"
              >
                <div className="aspect-video bg-gray-200 animate-pulse" />
                <div className="p-6 space-y-3">
                  <div className="h-5 bg-gray-200 rounded animate-pulse w-3/4" />
                  <div className="h-3 bg-gray-200 rounded animate-pulse" />
                  <div className="h-3 bg-gray-200 rounded animate-pulse w-5/6" />
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-3 border border-gray-100 flex gap-4"
              >
                <div className="w-24 h-20 bg-gray-200 rounded-xl animate-pulse shrink-0" />
                <div className="flex-1 space-y-2 pt-1">
                  <div className="h-3 bg-gray-200 rounded animate-pulse" />
                  <div className="h-3 bg-gray-200 rounded animate-pulse w-4/5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
