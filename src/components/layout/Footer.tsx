"use client";

import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

const COLUMN_KEYS = ["product", "company", "legal"] as const;

interface FooterLink {
  label: string;
  href: string;
}

/**
 * Prefix non-external, non-anchor paths with the active locale so that
 * client-side nav stays soft (no middleware redirect = no flash).
 *  - "/blog"        → "/en/blog"
 *  - "/#pricing"    → "/en#pricing"
 *  - "mailto:..."   → unchanged
 *  - "https://..."  → unchanged
 */
function localizeHref(href: string, locale: string): string {
  if (!href.startsWith("/")) return href;
  if (href === "/") return `/${locale}`;
  if (href.startsWith("/#")) return `/${locale}${href.slice(1)}`;
  return `/${locale}${href}`;
}

export default function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();

  return (
    <footer className="text-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          {/* Brand + tagline */}
          <div className="md:col-span-4">
            <Link
              href={`/${locale}`}
              className="inline-flex items-center gap-2"
            >
              <Image
                src="/logo/logo2.svg"
                alt="AZON ERP"
                width={120}
                height={40}
                className="brightness-0 invert"
              />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-gray-300 max-w-sm">
              {t("tagline")}
            </p>
          </div>

          {/* Link columns */}
          <div className="md:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-6">
            {COLUMN_KEYS.map((key) => {
              const links = t.raw(`columns.${key}.links`) as FooterLink[];
              return (
                <div key={key}>
                  <h3 className="text-white text-sm font-semibold mb-4 tracking-wide uppercase">
                    {t(`columns.${key}.title`)}
                  </h3>
                  <ul className="space-y-2.5">
                    {links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={localizeHref(link.href, locale)}
                          className="text-sm text-gray-300 hover:text-white transition-colors"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <h3 className="text-white text-sm font-semibold mb-4 tracking-wide uppercase">
              {t("contactTitle")}
            </h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-start gap-2.5">
                <Mail className="h-4 w-4 mt-0.5 shrink-0 text-gray-400" />
                <a
                  href={`mailto:${t("email")}`}
                  className="hover:text-white transition-colors break-all"
                >
                  {t("email")}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="h-4 w-4 mt-0.5 shrink-0 text-gray-400" />
                <a
                  href={`tel:${t("hotline").replace(/\s/g, "")}`}
                  className="hover:text-white transition-colors"
                >
                  {t("hotline")}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-gray-400" />
                <span>{t("address")}</span>
              </li>
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
