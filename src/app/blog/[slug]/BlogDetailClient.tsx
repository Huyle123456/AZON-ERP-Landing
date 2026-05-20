"use client";

import FloatingContact from "@/components/layout/FloatingContact";
import Footer from "@/components/layout/Footer";
import FooterBackdrop from "@/components/layout/FooterBackdrop";
import Header from "@/components/layout/Header";
import { BLOG_POSTS, getPost, getRelated } from "@/lib/blog";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Calendar } from "lucide-react";
import { useFormatter, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function BlogDetailClient({ slug }: { slug: string }) {
  const post = getPost(slug);
  const t = useTranslations("blog");
  const format = useFormatter();

  if (!post) {
    notFound();
  }

  const related = getRelated(post.slug, 3);

  return (
    <>
      <Header />
      <main className="bg-gray-50 min-h-screen pt-24 pb-16 md:pt-32 md:pb-24">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("backToList")}
          </Link>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mb-6"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
              {t(`posts.${post.key}.title`)}
            </h1>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Calendar className="w-4 h-4" />
              <span>
                {t("publishedOn")}{" "}
                {format.dateTime(new Date(post.date), { dateStyle: "long" })}
              </span>
            </div>
          </motion.div>

          {/* Cover image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.1 }}
            className="relative aspect-video rounded-2xl overflow-hidden mb-10 shadow-lg"
          >
            <Image
              src={post.cover}
              alt={t(`posts.${post.key}.title`)}
              fill
              sizes="(min-width: 1024px) 896px, 100vw"
              className="object-cover"
              priority
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="prose-article bg-white rounded-2xl p-6 md:p-10 border border-gray-100"
            dangerouslySetInnerHTML={{ __html: t.raw(`posts.${post.key}.content`) as string }}
          />
        </article>

        {/* Related posts */}
        {related.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 md:mt-24">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
              {t("relatedTitle")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((rel, i) => (
                <motion.div
                  key={rel.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 1, delay: i * 0.08 }}
                >
                  <Link
                    href={`/blog/${rel.slug}`}
                    className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 flex flex-col h-full"
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={rel.cover}
                        alt={t(`posts.${rel.key}.title`)}
                        fill
                        sizes="(min-width: 768px) 33vw, 100vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="text-base font-semibold text-gray-900 line-clamp-2 mb-3 group-hover:text-primary-600 transition-colors">
                        {t(`posts.${rel.key}.title`)}
                      </h3>
                      <span className="mt-auto inline-flex items-center gap-1 text-sm text-primary-600 group-hover:gap-2 transition-all">
                        {t("readMore")}
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>
        )}
      </main>
      <FooterBackdrop>
        <Footer />
      </FooterBackdrop>
      <FloatingContact />
      {/* Bind BLOG_POSTS to prevent tree-shaking issues with dynamic routes */}
      <span hidden data-count={BLOG_POSTS.length} />
    </>
  );
}
