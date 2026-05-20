"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";

const COLUMN_KEYS = ["azon", "product", "support", "legal"] as const;

type FooterLink = string | { label: string; href: string };

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="text-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {COLUMN_KEYS.map((key) => {
            const links = t.raw(`columns.${key}.links`) as FooterLink[];
            return (
              <div key={key}>
                <h3 className="text-white font-semibold mb-4">
                  {t(`columns.${key}.title`)}
                </h3>
                <ul className="space-y-2">
                  {links.map((link, idx) => {
                    if (typeof link === "string") {
                      return (
                        <li key={idx}>
                          <a
                            href="#"
                            className="text-sm hover:text-white transition-colors"
                          >
                            {link}
                          </a>
                        </li>
                      );
                    }
                    return (
                      <li key={idx}>
                        <Link
                          href={link.href}
                          className="text-sm hover:text-white transition-colors"
                        >
                          {link.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
          <div>
            <h3 className="text-white font-semibold mb-4">{t("contactTitle")}</h3>
            <ul className="space-y-2 text-sm">
              <li>{t("email")}</li>
              <li>{t("hotline")}</li>
              <li>{t("address")}</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-sm text-gray-300 text-center">{t("copyright")}</p>
        </div>
      </div>
    </footer>
  );
}
