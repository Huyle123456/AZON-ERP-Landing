"use client";

import SectionHeading from "@/components/ui/SectionHeading";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

type NewsItem = {
  key: string;
  image: string;
  href: string;
  date?: string;
};

// Configure news items here. Images live in /public/images/news/ (put your assets there).
// Text (title, excerpt) comes from messages/{locale}.json under "news.items.<key>".
const FEATURED: NewsItem[] = [
  {
    key: "notice",
    image: "/images/news/notice.svg",
    href: "/blog/mien-phi-hoa-don-dien-tu",
    date: "14/05/2026",
  },
  {
    key: "award",
    image: "/images/news/award.svg",
    href: "/blog/top-10-san-pham-tin-dung-2025",
    date: "28/12/2025",
  },
];

const COMPACT: NewsItem[] = [
  { key: "partnerBank1", image: "/images/news/partner-bank-1.svg", href: "/blog/vietinbank-thong-bao-thanh-toan" },
  { key: "partnerBank2", image: "/images/news/partner-bank-2.svg", href: "/blog/vietcombank-bien-dong-tai-khoan" },
  { key: "promo", image: "/images/news/promo.svg", href: "/blog/combo-3-nam-azon-giam-5370k" },
  { key: "partnerMb", image: "/images/news/partner-mb.svg", href: "/blog/azon-hop-tac-mbbank-1000-ty" },
];

export default function News() {
  const t = useTranslations("news");

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title={t("title")} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Featured — 2 large cards spanning 2 cols */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {FEATURED.map((item, i) => (
              <motion.article
                key={item.key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 1, delay: i * 0.1 }}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={item.image}
                    alt={t(`items.${item.key}.title`)}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">
                    {t(`items.${item.key}.title`)}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-1">
                    {t(`items.${item.key}.excerpt`)}
                  </p>
                  {item.date && (
                    <p className="text-xs text-gray-400 mb-4">{item.date}</p>
                  )}
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-2 self-start bg-primary-50 text-primary-600 hover:bg-primary-100 rounded-full px-4 py-2 text-sm font-medium transition-colors"
                  >
                    {t("readMore")}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Compact list — 4 small cards stacked */}
          <div className="flex flex-col gap-4">
            {COMPACT.map((item, i) => (
              <motion.article
                key={item.key}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 1, delay: i * 0.08 }}
              >
                <Link
                  href={item.href}
                  className="group flex gap-4 items-start bg-white rounded-2xl p-3 border border-gray-100 hover:shadow-md transition-all duration-300"
                >
                  <div className="relative w-24 h-20 shrink-0 rounded-xl overflow-hidden">
                    <Image
                      src={item.image}
                      alt={t(`items.${item.key}.title`)}
                      fill
                      sizes="96px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <p className="text-sm font-semibold text-gray-800 group-hover:text-primary-600 transition-colors line-clamp-3 leading-snug pt-1">
                    {t(`items.${item.key}.title`)}
                  </p>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
