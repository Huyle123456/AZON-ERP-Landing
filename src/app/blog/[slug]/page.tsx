import { apiLang, fetchPost, fetchPosts } from "@/lib/blog-api";
import { safeJsonLd, SITE_NAME, SITE_URL } from "@/lib/seo";
import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import BlogDetailClient from "./BlogDetailClient";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  const envelope = await fetchPost(slug, locale).catch(() => null);
  const post = envelope?.data;
  if (!post) return {};

  const title = post.meta_title ?? post.title;
  const description = post.meta_description ?? post.excerpt ?? "";
  const url = `${SITE_URL}/blog/${post.slug}`;
  const rawImage = post.featured_image_url ?? "";
  const image = rawImage.startsWith("http") ? rawImage : `${SITE_URL}${rawImage}`;

  // hreflang alternates — one entry per available translation. Maps the
  // backend's "vi" → "vi" and "en" → "en" tags (Google understands either).
  const languages: Record<string, string> = {};
  for (const tr of post.available_translations ?? []) {
    languages[tr.locale] = `${SITE_URL}/${tr.locale === "vi" ? "vie" : "en"}/blog/${tr.slug}`;
  }

  const ogLocale =
    (post.locale ?? apiLang(locale)) === "vi" ? "vi_VN" : "en_US";

  return {
    title,
    description,
    keywords: Array.isArray(post.meta_keywords)
      ? post.meta_keywords
      : typeof post.meta_keywords === "string"
        ? post.meta_keywords
        : undefined,
    alternates: {
      canonical: url,
      ...(Object.keys(languages).length > 0 ? { languages } : {}),
    },
    openGraph: {
      type: "article",
      url,
      title,
      description,
      locale: ogLocale,
      ...(post.published_at
        ? { publishedTime: new Date(post.published_at).toISOString() }
        : {}),
      images: rawImage
        ? [{ url: image, width: 1200, height: 630, alt: title }]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(rawImage ? { images: [image] } : {}),
    },
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const locale = await getLocale();
  const envelope = await fetchPost(slug, locale).catch(() => null);
  const post = envelope?.data;
  if (!post) notFound();

  // Pull a small related list — same category when available, falls back to
  // the latest posts otherwise.
  const primaryCategorySlug = post.categories?.[0]?.slug;
  const relatedEnvelope = await fetchPosts(
    {
      per_page: 4,
      ...(primaryCategorySlug ? { category: primaryCategorySlug } : {}),
    },
    locale,
  ).catch(() => ({ data: [] as Awaited<ReturnType<typeof fetchPosts>>["data"] }));
  const related = (relatedEnvelope.data ?? [])
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  const title = post.meta_title ?? post.title;
  const description = post.meta_description ?? post.excerpt ?? "";
  const rawImage = post.featured_image_url ?? "";
  const image = rawImage.startsWith("http") ? rawImage : `${SITE_URL}${rawImage}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image,
    datePublished: post.published_at
      ? new Date(post.published_at).toISOString()
      : undefined,
    dateModified: post.published_at
      ? new Date(post.published_at).toISOString()
      : undefined,
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo/logo2.svg` },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(articleJsonLd) }}
      />
      <BlogDetailClient post={post} related={related} />
    </>
  );
}
