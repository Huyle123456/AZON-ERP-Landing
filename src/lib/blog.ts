// Blog posts data. Text is keyed — actual title/excerpt/content come from messages/{locale}.json
// under "blog.posts.<key>".
export type BlogPost = {
  slug: string;
  key: string;
  cover: string;
  date: string;
  category: "notice" | "award" | "partner" | "promo";
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "mien-phi-hoa-don-dien-tu",
    key: "notice",
    cover: "/images/news/notice.svg",
    date: "2026-05-14",
    category: "notice",
  },
  {
    slug: "top-10-san-pham-tin-dung-2025",
    key: "award",
    cover: "/images/news/award.svg",
    date: "2025-12-28",
    category: "award",
  },
  {
    slug: "vietinbank-thong-bao-thanh-toan",
    key: "partnerBank1",
    cover: "/images/news/partner-bank-1.svg",
    date: "2025-11-12",
    category: "partner",
  },
  {
    slug: "vietcombank-bien-dong-tai-khoan",
    key: "partnerBank2",
    cover: "/images/news/partner-bank-2.svg",
    date: "2025-10-05",
    category: "partner",
  },
  {
    slug: "combo-3-nam-azon-giam-5370k",
    key: "promo",
    cover: "/images/news/promo.svg",
    date: "2025-09-18",
    category: "promo",
  },
  {
    slug: "azon-hop-tac-mbbank-1000-ty",
    key: "partnerMb",
    cover: "/images/news/partner-mb.svg",
    date: "2025-08-22",
    category: "partner",
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getRelated(currentSlug: string, limit = 3): BlogPost[] {
  return BLOG_POSTS.filter((p) => p.slug !== currentSlug).slice(0, limit);
}
