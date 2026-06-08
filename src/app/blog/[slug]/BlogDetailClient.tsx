"use client";

import type { PostDetail, PostListItem } from "@/lib/blog-api";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Globe,
  Link2,
  List,
  Mail,
} from "lucide-react";

// Inline brand glyphs (lucide-react in this project doesn't export them).
function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M18.244 2H21.5l-7.51 8.59L22.5 22h-6.9l-5.4-7.06L4.4 22H1.14l8.04-9.2L1.5 2h7.05l4.88 6.46L18.24 2zm-1.21 18h1.91L7.04 4h-2L17.04 20z" />
    </svg>
  );
}
function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8h4.55v14H.22V8zm7.5 0h4.36v1.92h.06c.61-1.15 2.1-2.36 4.32-2.36 4.62 0 5.47 3.04 5.47 6.99V22h-4.55v-6.16c0-1.47-.03-3.36-2.05-3.36-2.05 0-2.36 1.6-2.36 3.25V22H7.72V8z" />
    </svg>
  );
}
import { useFormatter, useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

/** Diacritic-aware slug for heading IDs. */
function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // strip combining marks
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

interface Heading {
  id: string;
  text: string;
  level: 2 | 3;
}

/**
 * Rewrite an <img> URL so it loads through our same-origin image proxy.
 * Skips http(s) URLs we don't recognize (third-party CDN that's already
 * public) and skips data: / blob: URLs.
 */
function rewriteImageSrc(src: string): string {
  if (!src) return src;
  if (src.startsWith("data:") || src.startsWith("blob:")) return src;
  // Relative path → proxy will resolve against BLOG_API_URL
  if (src.startsWith("/")) {
    return `/api/blog/image?url=${encodeURIComponent(src)}`;
  }
  // Absolute URL — only route through proxy if it points at the CMS host,
  // otherwise leave untouched (Unsplash, S3, etc.).
  try {
    const u = new URL(src);
    if (u.hostname === "fterp.test" || u.hostname.endsWith(".ftech.ltd")) {
      return `/api/blog/image?url=${encodeURIComponent(src)}`;
    }
  } catch {
    // not a URL, ignore
  }
  return src;
}

/**
 * Walk the raw HTML once: collect <h2>/<h3> headings, inject id="…" for
 * anchor links from the TOC, and rewrite <img src> through the image proxy.
 */
function processArticleHtml(raw: string): { html: string; headings: Heading[] } {
  const headings: Heading[] = [];
  const seen = new Set<string>();

  let html = raw.replace(
    /<(h2|h3)([^>]*)>([\s\S]*?)<\/\1>/gi,
    (_match, tag: string, attrs: string, inner: string) => {
      const level = tag.toLowerCase() === "h2" ? 2 : 3;
      const text = inner.replace(/<[^>]+>/g, "").trim();
      if (!text) return _match;
      let id = slugify(text);
      if (!id) return _match;
      let n = 1;
      while (seen.has(id)) id = `${slugify(text)}-${++n}`;
      seen.add(id);
      headings.push({ id, text, level: level as 2 | 3 });
      const cleanAttrs = attrs.replace(/\s*id="[^"]*"/i, "");
      return `<${tag}${cleanAttrs} id="${id}">${inner}</${tag}>`;
    },
  );

  // Rewrite <img src="..."> → /api/blog/image?url=…
  html = html.replace(
    /<img\b([^>]*?)\bsrc=("|')([^"']+)\2([^>]*)>/gi,
    (_match, before: string, q: string, src: string, after: string) => {
      const rewritten = rewriteImageSrc(src);
      return `<img${before}src=${q}${rewritten}${q}${after}>`;
    },
  );

  // Rewrite <video src="..."> + poster + nested <source src="..."> the same
  // way so videos hosted on the CMS/S3 stream through our proxy.
  html = html.replace(
    /<(video|source)\b([^>]*?)\b(src|poster)=("|')([^"']+)\4([^>]*)>/gi,
    (
      _m,
      tag: string,
      before: string,
      attr: string,
      q: string,
      src: string,
      after: string,
    ) => {
      const rewritten = rewriteImageSrc(src);
      return `<${tag}${before}${attr}=${q}${rewritten}${q}${after}>`;
    },
  );

  return { html, headings };
}

export default function BlogDetailClient({
  post,
  related,
}: {
  post: PostDetail;
  related: PostListItem[];
}) {
  const t = useTranslations("blog");
  const format = useFormatter();
  const locale = useLocale();

  if (!post) {
    notFound();
  }

  const rawContent = post.content_html ?? "";
  const { html: contentHtml, headings } = useMemo(
    () => processArticleHtml(rawContent ?? ""),
    [rawContent],
  );

  // Track which heading is currently in view to highlight the TOC item.
  const articleRef = useRef<HTMLDivElement | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  // Scroll-spy: pick the heading whose top has scrolled just past the offset
  // line (sticky header + a bit of breathing room). This is more reliable
  // than IntersectionObserver for the "scrolled past" semantics — IO only
  // fires on enter/exit and doesn't tell us which heading is current when
  // *no* heading is in the band.
  useEffect(() => {
    if (headings.length === 0) return;
    const HEADER_OFFSET = 120;

    let raf = 0;
    const update = () => {
      raf = 0;
      const els = headings
        .map((h) => document.getElementById(h.id))
        .filter((el): el is HTMLElement => !!el);
      if (els.length === 0) return;

      let current: string = els[0].id;
      for (const el of els) {
        if (el.getBoundingClientRect().top - HEADER_OFFSET <= 0) {
          current = el.id;
        } else {
          break;
        }
      }
      setActiveId((prev) => (prev === current ? prev : current));
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    update(); // initial highlight before any scroll
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [headings]);

  const handleTocClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    // Offset for the sticky header (~80px) so the heading isn't hidden under it.
    const y = el.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo({ top: y, behavior: "smooth" });
    history.replaceState(null, "", `#${id}`);
    setActiveId(id);
  };

  const articleUrl =
    typeof window !== "undefined" ? window.location.href : "";
  const articleTitle = post.title;
  const cover = post.featured_image_url ?? "/images/news/notice.svg";
  const primaryCategory = post.categories?.[0] ?? null;
  const publishedAt = post.published_at ? new Date(post.published_at) : null;

  // Language-switch link. Backend tells us which other-locale slug to point
  // at; if the post only exists in one locale we just hide the button.
  const apiLocale = locale === "en" ? "en" : "vi";
  const otherApiLocale = apiLocale === "vi" ? "en" : "vi";
  const otherSiteLocale = otherApiLocale === "en" ? "en" : "vie";
  const otherTranslation = post.available_translations?.find(
    (tr) => tr.locale === otherApiLocale,
  );
  const otherLanguageLabel =
    otherApiLocale === "en" ? "Read in English" : "Đọc bản tiếng Việt";
  const shareLinks = [
    {
      label: "X / Twitter",
      Icon: XIcon,
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(articleTitle)}&url=${encodeURIComponent(articleUrl)}`,
    },
    {
      label: "LinkedIn",
      Icon: LinkedInIcon,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`,
    },
    {
      label: "Email",
      Icon: Mail,
      href: `mailto:?subject=${encodeURIComponent(articleTitle)}&body=${encodeURIComponent(articleUrl)}`,
    },
  ];

  const copyLink = async () => {
    if (typeof window === "undefined") return;
    try {
      await navigator.clipboard.writeText(window.location.href);
    } catch {
      // noop
    }
  };

  return (
    <>
      <main className="bg-white min-h-screen mt-16 pb-16 md:pb-24">
        {/* ── Full-bleed cover image at the top of the page ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative w-full aspect-[16/7] md:aspect-[21/8] overflow-hidden"
        >
          <Image
            src={cover}
            alt={articleTitle}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </motion.div>

        {/* ── Header block: breadcrumb + title + meta ── */}
        <header className="border-b border-gray-200 mt-10 md:mt-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 md:pb-14">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary-600 hover:text-primary-700 transition-colors mb-6"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              {t("backToList")}
            </Link>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-[1.1]"
            >
              {articleTitle}
            </motion.h1>

            {publishedAt && (
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-500">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {format.dateTime(publishedAt, { dateStyle: "long" })}
                </span>
                {primaryCategory && (
                  <span className="inline-flex items-center rounded-full bg-primary-50 border border-primary-100 px-2.5 py-0.5 text-xs font-semibold text-primary-700">
                    {primaryCategory.name}
                  </span>
                )}
                {otherTranslation && (
                  <Link
                    href={`/${otherSiteLocale}/blog/${otherTranslation.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-semibold text-gray-700 hover:border-primary-300 hover:text-primary-700 transition-colors"
                  >
                    <Globe className="w-3.5 h-3.5" />
                    {otherLanguageLabel}
                  </Link>
                )}
              </div>
            )}
          </div>
        </header>

        {/* ── Body: 2-column layout (sticky aside + prose) ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 md:mt-16">
          <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10 lg:gap-16 items-start">
            {/* Sticky left aside */}
            <aside className="order-2 lg:order-1 lg:self-start lg:sticky lg:top-24 z-10">
              <div className="space-y-8 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto pr-1">
                {/* Table of contents */}
                {headings.length > 0 && (
                  <nav aria-label={t("tocTitle")}>
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
                      <List className="w-3.5 h-3.5" />
                      {t("tocTitle")}
                    </div>
                    <ul>
                      {headings.map((h) => (
                        <li key={h.id} className={h.level === 3 ? "pl-4" : ""}>
                          <a
                            href={`#${h.id}`}
                            onClick={(e) => handleTocClick(e, h.id)}
                            className={`block text-sm leading-snug py-2 border-l-2 pl-3 transition-colors ${
                              activeId === h.id
                                ? "border-primary-500 text-primary-700 font-semibold"
                                : "border-gray-200 text-gray-600 hover:text-primary-600 hover:border-primary-300"
                            }`}
                          >
                            {h.text}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                )}

                {/* Share */}
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
                    {t("shareTitle")}
                  </div>
                  <div className="flex items-center gap-2">
                    {shareLinks.map(({ label, Icon, href }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-600 hover:border-primary-300 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                      >
                        <Icon className="w-4 h-4" />
                      </a>
                    ))}
                    <button
                      type="button"
                      onClick={copyLink}
                      aria-label={t("copyLink")}
                      title={t("copyLink")}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-600 hover:border-primary-300 hover:text-primary-600 hover:bg-primary-50 transition-colors cursor-pointer"
                    >
                      <Link2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </aside>

            {/* Article prose — plain div (no motion wrapper) so the parent
                doesn't keep a `transform` set after animation; transforms on
                the ancestor force the video into a composite layer and made
                scrolling jittery / triggered reloads on some browsers. */}
            <div
              ref={articleRef}
              className="prose-article order-1 lg:order-2"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
          </div>
        </div>

        {/* Related posts */}
        {/* ── Contact CTA — default end-of-article promo ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 md:mt-24">
          <section className="relative overflow-hidden isolate rounded-3xl">
            <Image
              src="/images/bgs/bg2.jpg"
              alt=""
              fill
              sizes="(min-width: 1280px) 1152px, 100vw"
              className="object-cover"
              aria-hidden
            />
            <div className="absolute inset-0 bg-linear-to-r from-primary-900/90 via-primary-800/80 to-primary-700/70" />

            <div className="relative px-6 sm:px-10 lg:px-14 py-14 md:py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl text-white"
            >
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/20 px-3 py-1 text-xs font-semibold backdrop-blur-sm mb-5">
                <span className="h-1.5 w-1.5 rounded-full bg-yellow-300 animate-pulse" />
                AZOERP
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
                {t("ctaTitle")}
              </h2>
              <p className="mt-4 text-base md:text-lg text-white/85 leading-relaxed">
                {t("ctaSubtitle")}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={`/${locale}/register?plan=standard`}
                  className="inline-flex items-center gap-2 rounded-full bg-yellow-400 hover:bg-yellow-300 text-primary-900 px-6 py-3 text-sm font-bold shadow-lg shadow-yellow-500/20 transition-all hover:-translate-y-0.5"
                >
                  {t("ctaButton")}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href={`/${locale}/register?plan=free`}
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 hover:bg-white/15 backdrop-blur-sm px-6 py-3 text-sm font-semibold text-white transition-colors"
                >
                  {t("ctaSecondary")}
                </Link>
              </div>
            </motion.div>
            </div>
          </section>
        </div>

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
                    href={`/${locale}/blog/${rel.slug}`}
                    className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 flex flex-col h-full"
                  >
                    <div className="relative aspect-video overflow-hidden bg-gray-100">
                      <Image
                        src={rel.featured_image_url ?? "/images/news/notice.svg"}
                        alt={rel.title}
                        fill
                        sizes="(min-width: 768px) 33vw, 100vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="text-base font-semibold text-gray-900 line-clamp-2 mb-3 group-hover:text-primary-600 transition-colors">
                        {rel.title}
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
    </>
  );
}
