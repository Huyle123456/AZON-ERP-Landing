import LegalPage from "@/components/sections/LegalPage";
import { getPrivacy } from "@/lib/legal";
import type { Metadata } from "next";
import { getLocale } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const doc = getPrivacy(locale);
  return {
    title: `${doc.title} – AZON`,
    description: doc.intro,
  };
}

export default async function PrivacyPolicyPage() {
  const locale = await getLocale();
  const doc = getPrivacy(locale);
  return <LegalPage doc={doc} />;
}
