// Types + thin client for the Posts CMS API. All requests go through our
// same-origin proxy routes under /api/blog/* so the upstream URL stays
// server-side and CORS isn't a concern for the browser.

export interface ApiEnvelope<T> {
  success: boolean;
  error_code?: string | null;
  message?: string | null;
  data: T;
  meta?: PaginationMeta | null;
}

export interface PaginationMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface CategoryRef {
  id: number;
  name: string;
  slug: string;
}

export interface TagRef {
  id: number;
  name: string;
  slug: string;
}

export interface PostListItem {
  id: number;
  locale?: string;
  slug: string;
  title: string;
  excerpt?: string | null;
  featured_image_url?: string | null;
  featured_image_alt?: string | null;
  is_pinned?: boolean;
  views_count?: number;
  published_at?: string | null;
  categories?: CategoryRef[];
  tags?: TagRef[];
  author?: { id: number; name: string } | null;
  meta_title?: string | null;
  meta_description?: string | null;
}

export interface AvailableTranslation {
  locale: string;
  slug: string;
  title: string;
}

export interface PostDetail extends PostListItem {
  content_html: string;
  content_blocks?: unknown;
  meta_keywords?: string[] | string | null;
  available_translations?: AvailableTranslation[];
}

/**
 * Site uses "vie"/"en"; backend API uses "vi"/"en". Map here so every
 * caller can pass the site locale verbatim.
 */
export function apiLang(locale: string | undefined): "vi" | "en" {
  return locale === "en" ? "en" : "vi";
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string | null;
  parent_id?: number | null;
  published_count?: number;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
  published_count?: number;
}

export interface PostsQuery {
  page?: number;
  per_page?: number;
  q?: string;
  category?: string;
  tag?: string;
}

/**
 * Resolve a base URL we can hit from server-side fetch (RSC / route handlers).
 * Falls back to localhost during dev. Setting NEXT_PUBLIC_SITE_URL lets the
 * server know its own origin during preview deployments.
 */
function originForServer(): string {
  if (typeof window !== "undefined") return "";
  const fromEnv =
    process.env.NEXT_PUBLIC_SITE_URL ?? process.env.VERCEL_URL ?? "";
  if (!fromEnv) return "http://localhost:3000";
  return fromEnv.startsWith("http") ? fromEnv : `https://${fromEnv}`;
}

async function get<T>(
  path: string,
  query: Record<string, string | number | undefined> = {},
  locale?: string,
): Promise<ApiEnvelope<T>> {
  const params = new URLSearchParams();
  // Always send `lang` to the API (default "vi"). Backend honours it and
  // also returns `meta.locale` so we can confirm.
  params.set("lang", apiLang(locale));
  for (const [k, v] of Object.entries(query)) {
    if (v === undefined || v === "" || v === null) continue;
    params.set(k, String(v));
  }
  const url = `${originForServer()}${path}?${params.toString()}`;
  const res = await fetch(url, {
    headers: locale ? { "Accept-Language": apiLang(locale) } : undefined,
    next: { revalidate: 60 },
  });
  if (!res.ok && res.status !== 404) {
    throw new Error(`Blog API ${path} failed: ${res.status}`);
  }
  return (await res.json()) as ApiEnvelope<T>;
}

export function fetchPosts(query: PostsQuery, locale?: string) {
  return get<PostListItem[]>(
    "/api/blog/posts",
    query as Record<string, string | number | undefined>,
    locale,
  );
}

export function fetchPost(slug: string, locale?: string) {
  return get<PostDetail>(`/api/blog/posts/${encodeURIComponent(slug)}`, {}, locale);
}

export function fetchCategories(locale?: string) {
  return get<Category[]>("/api/blog/categories", {}, locale);
}

export function fetchTags(locale?: string) {
  return get<Tag[]>("/api/blog/tags", {}, locale);
}
