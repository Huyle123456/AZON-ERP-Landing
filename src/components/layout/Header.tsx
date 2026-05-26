"use client";

import Button from "@/components/ui/Button";
import { NAV_LINKS } from "@/lib/constants";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  // Strip any leading /en or /vie segment for "is this the home page?" logic.
  const localelessPath =
    pathname.replace(/^\/(en|vie)(?=\/|$)/, "") || "/";
  const isHome = localelessPath === "/";

  const [scrollY, setScrollY] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const locale = useLocale();
  const tNav = useTranslations("nav");
  const tHeader = useTranslations("header");

  // On non-home pages the header is always in its "scrolled" (white) state.
  const scrolled = !isHome || scrollY;

  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => setScrollY(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const changeLocale = (newLocale: "en" | "vie") => {
    // Replace the leading locale segment. Both /en/* and /vie/* are rewritten
    // by middleware to the same internal path, so client-side navigation
    // alone won't refetch the layout (which holds NextIntlClientProvider's
    // messages). router.refresh() invalidates the cache and pulls fresh RSC
    // for the new URL, so the language swaps without a full page reload.
    const stripped =
      pathname.replace(/^\/(en|vie)(?=\/|$)/, "") || "/";
    const target = `/${newLocale}${stripped === "/" ? "" : stripped}`;
    router.push(target);
    router.refresh();
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        backgroundColor: scrolled ? "rgba(255, 255, 255, 0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        boxShadow: scrolled ? "0 1px 3px rgba(0, 0, 0, 0.08)" : "none",
        transition: "background-color 0.8s cubic-bezier(0.4, 0, 0.2, 1), backdrop-filter 0.8s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
        {/* Logo — links home (and scrolls to top when already on home) */}
        <Link
          href="/"
          onClick={() => {
            if (isHome) {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="text-xl font-bold text-primary-500 cursor-pointer"
          aria-label="Trang chủ"
        >
          {/* Mobile logo — invert to white when hero background is dark */}
          <Image
            src="/logo/logo1.svg"
            alt="AZON Logo"
            width={40}
            height={40}
            className={`inline-block mr-2 md:hidden transition-[filter] duration-500 ${
              scrolled ? "" : "brightness-0 invert"
            }`}
          />
          {/* Desktop logo — invert color when hero background is dark */}
          <Image
            src="/logo/logo2.svg"
            alt="AZON Logo"
            width={120}
            height={64}
            className={`hidden md:inline-block mr-2 transition-[filter] duration-500 ${
              scrolled ? "" : "brightness-0 invert"
            }`}
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10 ml-10">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                scrolled
                  ? "text-gray-700 hover:text-primary-500"
                  : "text-white hover:text-yellow-300"
              }`}
            >
              {tNav(link.key)}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3 ml-auto">
          <button
            onClick={() => changeLocale(locale === "vie" ? "en" : "vie")}
            className={`text-xs font-medium cursor-pointer px-3 py-2 rounded-lg transition-colors ${
              scrolled
                ? "text-gray-500 hover:bg-gray-100 hover:text-primary-500"
                : "text-white hover:bg-white/10 hover:text-yellow-300"
            }`}
            aria-label="Đổi ngôn ngữ"
          >
            {locale === "vie" ? "EN" : "VI"}
          </button>
          <Button
            href="/login"
            variant={scrolled ? "outline" : "outline-white"}
            className="py-2 px-0! w-24 text-xs"
          >
            {tHeader("login")}
          </Button>
          <Button
            href="/register"
            variant="gradient"
            gradient={{
              from: "from-yellow-300",
              to: "to-yellow-500",
              hoverFrom: "hover:from-yellow-200",
              hoverTo: "hover:to-yellow-400",
              text: "text-primary-900",
              shadow: "shadow-yellow-500/25",
            }}
            className="py-2 px-0! w-24 text-xs"
          >
            {tHeader("register")}
          </Button>
        </div>

        {/* Mobile Hamburger */}
        <div className="flex md:hidden items-center gap-2 ml-auto">
          <button
            onClick={() => changeLocale(locale === "vie" ? "en" : "vie")}
            className={`text-xs font-medium p-2 rounded-lg transition-colors ${
              scrolled
                ? "text-gray-600 hover:bg-gray-100"
                : "text-white hover:bg-white/10"
            }`}
            aria-label="Đổi ngôn ngữ"
          >
            {locale === "vie" ? "EN" : "VI"}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`p-2 rounded-lg transition-colors ${
              scrolled ? "text-gray-600" : "text-white"
            }`}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100"
          >
            <div className="px-4 py-4 space-y-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-sm font-medium text-gray-700 py-2"
                >
                  {tNav(link.key)}
                </Link>
              ))}
              <div className="flex gap-3 pt-2">
                <Button href="/login" variant="outline" className="flex-1 py-2 text-xs">
                  {tHeader("login")}
                </Button>
                <Button href="/register" className="flex-1 py-2 text-xs">
                  {tHeader("trial")}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
