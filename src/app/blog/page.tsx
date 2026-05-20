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

export default async function BlogIndexPage() {
  await getLocale();
  return <BlogListClient />;
}
