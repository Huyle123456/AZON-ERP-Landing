import { fetchPosts } from "@/lib/blog-api";
import { SITE_URL } from "@/lib/seo";
import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import BlogListClient from "./BlogListClient";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("blog");
  const title = t("pageTitle");
  const description = t("pageSubtitle");
  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/blog` },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/blog`,
      type: "website",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

interface SearchParams {
  page?: string;
  q?: string;
  category?: string;
  tag?: string;
}

export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const locale = await getLocale();
  const sp = await searchParams;
  const page = Number(sp.page) > 0 ? Number(sp.page) : 1;

  const envelope = await fetchPosts(
    {
      page,
      per_page: 12,
      q: sp.q,
      category: sp.category,
      tag: sp.tag,
    },
    locale,
  ).catch(() => ({
    success: false,
    data: [] as Awaited<ReturnType<typeof fetchPosts>>["data"],
    meta: null,
  }));

  return (
    <BlogListClient
      posts={envelope.data ?? []}
      meta={envelope.meta ?? null}
      query={{ q: sp.q ?? "", category: sp.category ?? "", tag: sp.tag ?? "" }}
    />
  );
}
