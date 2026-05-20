import FloatingContact from "@/components/layout/FloatingContact";
import Footer from "@/components/layout/Footer";
import FooterBackdrop from "@/components/layout/FooterBackdrop";
import Header from "@/components/layout/Header";
import CTASection from "@/components/sections/CTASection";
import {
  ORG_JSON_LD,
  safeJsonLd,
  SITE_DESCRIPTION_EN,
  SITE_DESCRIPTION_VI,
  SITE_KEYWORDS_EN,
  SITE_KEYWORDS_VI,
  SITE_NAME,
  SITE_URL,
  SOFTWARE_JSON_LD,
  WEBSITE_JSON_LD,
} from "@/lib/seo";
import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isVi = locale === "vi";
  const description = isVi ? SITE_DESCRIPTION_VI : SITE_DESCRIPTION_EN;
  const keywords = isVi ? SITE_KEYWORDS_VI : SITE_KEYWORDS_EN;
  const title = isVi
    ? "AZON – Nền tảng quản lý nhân sự toàn diện"
    : "AZON – All-in-one HR Management Platform";

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: `%s | ${SITE_NAME}`,
    },
    description,
    keywords,
    applicationName: SITE_NAME,
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    alternates: {
      canonical: "/",
      languages: {
        "vi-VN": "/",
        "en-US": "/",
        "x-default": "/",
      },
    },
    openGraph: {
      type: "website",
      locale: isVi ? "vi_VN" : "en_US",
      alternateLocale: isVi ? ["en_US"] : ["vi_VN"],
      url: SITE_URL,
      siteName: SITE_NAME,
      title,
      description,
      images: [
        {
          url: "/logo/logo3.png",
          width: 1200,
          height: 630,
          alt: SITE_NAME,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/logo/logo3.png"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    icons: {
      icon: "/favicon.ico",
      apple: "/logo/logo1.svg",
    },
    manifest: "/manifest.webmanifest",
    category: "business",
  };
}

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${inter.variable} h-full antialiased`}
      suppressHydrationWarning
      style={{
        background:
          "linear-gradient(to bottom right, #f8fafc, rgba(238,243,249,0.5), rgba(237,233,254,0.4))",
      }}
    >
      <body className="min-h-full flex flex-col font-sans bg-white">
        <NextIntlClientProvider messages={messages} locale={locale}>
          <Header />
          {children}
          <FooterBackdrop>
            <CTASection />
            <Footer />
          </FooterBackdrop>
          <FloatingContact />
        </NextIntlClientProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLd(ORG_JSON_LD) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLd(WEBSITE_JSON_LD) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLd(SOFTWARE_JSON_LD) }}
        />
      </body>
    </html>
  );
}
