import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import AuthShell from "@/components/auth/AuthShell";
import AuthTabs from "@/components/auth/AuthTabs";
import RegisterFlow from "@/components/auth/RegisterFlow";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("auth.register");
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function RegisterPage() {
  const t = await getTranslations("auth.register");
  return (
    <AuthShell title={t("title")} subtitle={t("subtitle")}>
      <AuthTabs />
      <RegisterFlow />
    </AuthShell>
  );
}
