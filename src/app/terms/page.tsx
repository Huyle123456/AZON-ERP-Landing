import LegalPage from "@/components/sections/LegalPage";
import { getTerms } from "@/lib/legal";
import type { Metadata } from "next";
import { getLocale } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const doc = getTerms(locale);
  return {
    title: `${doc.title} – AZON`,
    description: doc.intro,
  };
}

export default async function TermsPage() {
  const locale = await getLocale();
  const doc = getTerms(locale);
  return <LegalPage doc={doc} />;
}
