"use client";

import { useEffect } from "react";

/**
 * Registers /sw.js once on mount. Runs only in production builds so that
 * `next dev` hot-reload isn't intercepted by stale cached assets.
 *
 * If a waiting worker is detected it auto-tells it to skipWaiting so the
 * new version takes over without a manual hard refresh.
 */
export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator)) return;

    const register = async () => {
      try {
        const registration = await navigator.serviceWorker.register("/sw.js", {
          scope: "/",
        });

        // If there is already a waiting worker, activate it right away.
        if (registration.waiting) {
          registration.waiting.postMessage("SKIP_WAITING");
        }

        // Listen for new updates becoming installed.
        registration.addEventListener("updatefound", () => {
          const newWorker = registration.installing;
          if (!newWorker) return;
          newWorker.addEventListener("statechange", () => {
            if (
              newWorker.state === "installed" &&
              navigator.serviceWorker.controller
            ) {
              // A new version is ready while the page is open.
              newWorker.postMessage("SKIP_WAITING");
            }
          });
        });

        // When the active worker changes (after SKIP_WAITING), reload to
        // pick up the new assets cleanly.
        let reloading = false;
        navigator.serviceWorker.addEventListener("controllerchange", () => {
          if (reloading) return;
          reloading = true;
          window.location.reload();
        });
      } catch (err) {
        // Swallow — SW failures should never break the page.
        if (process.env.NODE_ENV !== "production") {
          console.warn("[sw] registration failed:", err);
        }
      }
    };

    // Defer until the page is idle so SW work doesn't compete with LCP.
    const ric = (
      window as unknown as {
        requestIdleCallback?: (cb: () => void) => number;
      }
    ).requestIdleCallback;
    if (typeof ric === "function") {
      ric(register);
    } else {
      window.addEventListener("load", register, { once: true });
    }
  }, []);

  return null;
}
