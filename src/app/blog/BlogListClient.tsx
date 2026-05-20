"use client";

import { BLOG_POSTS } from "@/lib/blog";
import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { useFormatter, useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export default function BlogListPage() {
  const t = useTranslations("blog");
  const format = useFormatter();
  const locale = useLocale();

  return (
    <>
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

          {/* Posts grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {BLOG_POSTS.map((post, i) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 1, delay: i * 0.08 }}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={post.cover}
                      alt={t(`posts.${post.key}.title`)}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                      <Calendar className="w-3.5 h-3.5" />
                      {format.dateTime(new Date(post.date), {
                        dateStyle: "long",
                      })}
                    </div>
                    <h2 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors">
                      {t(`posts.${post.key}.title`)}
                    </h2>
                    <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-1">
                      {t(`posts.${post.key}.excerpt`)}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 group-hover:gap-2.5 transition-all">
                      {t("readMore")}
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </main>
  
      <span hidden data-locale={locale} />
    </>
  );
}
