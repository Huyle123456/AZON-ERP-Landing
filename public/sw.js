// AZON ERP Landing — Service Worker
// -----------------------------------------------------------------------------
// Strategy summary:
//   • HTML navigations            → network-first, fall back to cache, then offline
//   • Static assets (JS/CSS/font) → stale-while-revalidate
//   • Images                      → cache-first with size cap
//   • API calls                   → network-only (never cache POSTs / form data)
//
// Bump CACHE_VERSION to force every client to drop the old caches on the next
// activate. Same idea as a cache-buster query string.

const CACHE_VERSION = "v1";
const HTML_CACHE = `azon-html-${CACHE_VERSION}`;
const STATIC_CACHE = `azon-static-${CACHE_VERSION}`;
const IMAGE_CACHE = `azon-images-${CACHE_VERSION}`;
const KNOWN_CACHES = [HTML_CACHE, STATIC_CACHE, IMAGE_CACHE];

const OFFLINE_URL = "/offline.html";
const PRECACHE_URLS = [OFFLINE_URL, "/logo/logo1.svg", "/logo/logo2.svg"];

const MAX_IMAGE_CACHE_ENTRIES = 80;

// -----------------------------------------------------------------------------
// Install: precache the offline shell + a couple of brand assets.
self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(STATIC_CACHE);
      await cache.addAll(PRECACHE_URLS);
      await self.skipWaiting();
    })(),
  );
});

// -----------------------------------------------------------------------------
// Activate: clean up old caches + take control of open clients immediately.
self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys.filter((k) => !KNOWN_CACHES.includes(k)).map((k) => caches.delete(k)),
      );
      await self.clients.claim();
    })(),
  );
});

// -----------------------------------------------------------------------------
// Allow the page to instruct the SW to activate a pending update immediately.
self.addEventListener("message", (event) => {
  if (event.data === "SKIP_WAITING") self.skipWaiting();
});

// -----------------------------------------------------------------------------
// Helpers
function isApiRequest(url) {
  return url.pathname.startsWith("/api/");
}

function isHtmlNavigation(request) {
  return (
    request.mode === "navigate" ||
    (request.method === "GET" &&
      request.headers.get("accept")?.includes("text/html"))
  );
}

function isImageRequest(request, url) {
  if (request.destination === "image") return true;
  return /\.(?:png|jpe?g|webp|avif|gif|svg|ico)$/i.test(url.pathname);
}

function isStaticAsset(url) {
  if (url.pathname.startsWith("/_next/static/")) return true;
  return /\.(?:js|css|woff2?|ttf|otf)$/i.test(url.pathname);
}

async function trimCache(cacheName, maxEntries) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  if (keys.length <= maxEntries) return;
  // FIFO — drop the oldest entries first.
  await Promise.all(
    keys.slice(0, keys.length - maxEntries).map((k) => cache.delete(k)),
  );
}

// -----------------------------------------------------------------------------
// Fetch handler
self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return; // skip POST/PUT/DELETE entirely
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return; // skip cross-origin

  // API: never cache.
  if (isApiRequest(url)) return;

  // HTML navigations: network-first → cache → offline shell.
  if (isHtmlNavigation(request)) {
    event.respondWith(
      (async () => {
        try {
          const fresh = await fetch(request);
          const cache = await caches.open(HTML_CACHE);
          cache.put(request, fresh.clone());
          return fresh;
        } catch {
          const cached = await caches.match(request);
          if (cached) return cached;
          const offline = await caches.match(OFFLINE_URL);
          return (
            offline ??
            new Response("Offline", {
              status: 503,
              headers: { "Content-Type": "text/plain" },
            })
          );
        }
      })(),
    );
    return;
  }

  // Images: cache-first with a soft size cap.
  if (isImageRequest(request, url)) {
    event.respondWith(
      (async () => {
        const cached = await caches.match(request);
        if (cached) return cached;
        const response = await fetch(request);
        if (response.ok) {
          const cache = await caches.open(IMAGE_CACHE);
          cache.put(request, response.clone());
          trimCache(IMAGE_CACHE, MAX_IMAGE_CACHE_ENTRIES);
        }
        return response;
      })(),
    );
    return;
  }

  // JS / CSS / fonts: stale-while-revalidate.
  if (isStaticAsset(url)) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(STATIC_CACHE);
        const cached = await cache.match(request);
        const network = fetch(request)
          .then((response) => {
            if (response.ok) cache.put(request, response.clone());
            return response;
          })
          .catch(() => cached);
        return cached ?? (await network);
      })(),
    );
    return;
  }

  // Default: just pass through.
});
