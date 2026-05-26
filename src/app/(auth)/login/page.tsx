import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import AuthShell from "@/components/auth/AuthShell";
import AuthTabs from "@/components/auth/AuthTabs";
import LoginForm from "@/components/auth/LoginForm";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("auth.login");
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function LoginPage() {
  const t = await getTranslations("auth.login");
  return (
    <AuthShell title={t("title")} subtitle={t("subtitle")}>
      <AuthTabs />
      <LoginForm />
    </AuthShell>
  );
}
