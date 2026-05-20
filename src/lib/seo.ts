export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://azonsolution.com";

// Escape '</' so JSON-LD embedded via dangerouslySetInnerHTML cannot break out
// of the <script> tag if content ever contains a literal `</script>`.
export function safeJsonLd(obj: unknown): string {
  return JSON.stringify(obj).replace(/</g, "\\u003c");
}

export const SITE_NAME = "AZON";

export const SITE_DESCRIPTION_VI =
  "AZON là nền tảng quản lý nhân sự toàn diện: chấm công GPS/WiFi/khuôn mặt, nghỉ phép đa cấp, tính lương tự động, hợp đồng điện tử và cổng nhân viên (ESS) — tất cả trong một.";

export const SITE_DESCRIPTION_EN =
  "AZON is an all-in-one HR platform: GPS/WiFi/face attendance, multi-level leave approvals, automated payroll, e-contracts, and employee self-service (ESS).";

export const SITE_KEYWORDS_VI = [
  "phần mềm quản lý nhân sự",
  "phần mềm chấm công",
  "phần mềm tính lương",
  "HRM Việt Nam",
  "quản lý nhân viên",
  "chấm công GPS",
  "chấm công khuôn mặt",
  "ESS",
  "phần mềm HR cloud",
  "phần mềm chấm công online",
  "AZON",
];

export const SITE_KEYWORDS_EN = [
  "HR management software",
  "attendance software",
  "payroll software",
  "HRM Vietnam",
  "employee management",
  "GPS check-in",
  "face check-in",
  "Employee Self Service",
  "cloud HR",
  "AZON",
];

export const ORG_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  alternateName: "AZON HRM",
  url: SITE_URL,
  logo: `${SITE_URL}/logo/logo2.svg`,
  email: "support@azonsolution.com",
  telephone: "+84-329-300-677",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Ho Chi Minh City",
    addressCountry: "VN",
  },
  sameAs: [] as string[],
};

export const WEBSITE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: ["vi-VN", "en-US"],
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/blog?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export const SOFTWARE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: SITE_NAME,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web, iOS, Android",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "VND",
  },
  publisher: {
    "@type": "Organization",
    name: SITE_NAME,
  },
};
