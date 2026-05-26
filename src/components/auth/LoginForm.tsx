"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Field from "./Field";

export default function LoginForm() {
  const locale = useLocale();
  const t = useTranslations("auth.login");
  const [domain, setDomain] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!domain.trim()) return;
    window.location.href = `https://${domain}.ftech.ltd`;
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <Field
        label={t("domainLabel")}
        name="domain"
        placeholder={t("domainPlaceholder")}
        value={domain}
        onChange={(e) =>
          setDomain(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))
        }
        suffix=".ftech.ltd"
        hint={t("domainHint")}
        autoFocus
        required
      />

      <Button
        type="submit"
        className={`w-full ${!domain.trim() ? "opacity-50 cursor-not-allowed" : ""}`}
        {...(!domain.trim() && { disabled: true })}
      >
        {t("submit")}
      </Button>

      <p className="text-center text-sm text-slate-500">
        {t("noAccount")}{" "}
        <Link
          href={`/${locale}/register`}
          className="text-primary-600 font-semibold hover:underline"
        >
          {t("registerFree")}
        </Link>
      </p>
    </form>
  );
}
