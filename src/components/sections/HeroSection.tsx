"use client";

import Button from "@/components/ui/Button";
import { AnimatePresence, motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";

/* ══════════════════════════════════════
   SLIDE 1 — Floating Icon Cards (original)
   ══════════════════════════════════════ */

const FLOATING_CARDS = [
  {
    key: "attendance",
    icon: (
      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: "bg-linear-to-br from-primary-400 to-primary-500",
    position: "top-4 right-8",
  },
  {
    key: "leave",
    icon: (
      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    color: "bg-linear-to-br from-emerald-400 to-emerald-500",
    position: "top-24 right-52",
  },
  {
    key: "payslip",
    icon: (
      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    color: "bg-linear-to-br from-violet-400 to-purple-500",
    position: "top-44 right-4",
  },
  {
    key: "hr",
    icon: (
      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    color: "bg-linear-to-br from-orange-400 to-orange-500",
    position: "top-74 right-74",
  },
  {
    key: "contract",
    icon: (
      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    color: "bg-linear-to-br from-pink-400 to-rose-500",
    position: "top-80 right-8",
  },
  {
    key: "notification",
    icon: (
      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    ),
    color: "bg-linear-to-br from-amber-400 to-amber-500",
    position: "top-12 right-[22rem]",
  },
  {
    key: "report",
    icon: (
      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    color: "bg-linear-to-br from-cyan-400 to-cyan-500",
    position: "top-52 right-[25rem]",
  },
] as const;

function FloatingCardsSlide() {
  // Cards orbit around the center logo like satellites around Earth.
  // Using nested rotators: outer rotates positions around center;
  // inner counter-rotates so card labels stay upright.
  const t = useTranslations("hero");
  const orbitDuration = 20; // seconds per full revolution
  const orbitRadius = 200;

  return (
    <div className="relative h-112 w-full">
      {/* Decorative dashed orbit circles */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 550 450" preserveAspectRatio="xMidYMid meet">
        <circle cx="275" cy="225" r="120" fill="none" stroke="#d1d5db" strokeWidth="1" strokeDasharray="4 8" opacity="0.4" />
        <circle cx="275" cy="225" r="200" fill="none" stroke="#d1d5db" strokeWidth="1" strokeDasharray="4 8" opacity="0.25" />
      </svg>

      {/* Center app icon */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 1, ease: "backOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
      >
        <div className="relative">
          <Image src="/logo/logo3.png" alt="AZON Logo" width={140} height={140} className="rounded-3xl shadow-xl shadow-primary-500/25" />

          {/* Mini notification popup anchored to top-right of logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: [0, -3, 0] }}
            transition={{
              opacity: { duration: 1, delay: 1 },
              scale: { duration: 1, delay: 1, ease: "backOut" },
              y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 },
            }}
            className="absolute -top-2 -right-2 bg-white rounded-xl shadow-lg shadow-gray-200/60 border border-gray-100 px-2.5 py-1.5 flex items-center gap-2 z-20 translate-x-1/3"
          >
            <div className="w-6 h-6 rounded-lg bg-linear-to-br from-primary-400 to-primary-500 flex items-center justify-center shrink-0 relative">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full text-[7px] font-bold text-white flex items-center justify-center ring-1 ring-white">
                1
              </span>
            </div>
            <p className="text-[10px] font-medium text-gray-700 whitespace-nowrap">
              {t("notification")}
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Orbiting cards: evenly distributed on a circle, rotating continuously */}
      {FLOATING_CARDS.map((card, i) => {
        const angle = (i / FLOATING_CARDS.length) * 2 * Math.PI; // radians, evenly spaced
        const startX = Math.cos(angle - Math.PI / 2) * orbitRadius;
        const startY = Math.sin(angle - Math.PI / 2) * orbitRadius;

        return (
          <motion.div
            key={card.key}
            className="absolute top-1/2 left-1/2"
            initial={{ x: startX, y: startY, scale: 0, opacity: 0 }}
            animate={{
              x: Array.from({ length: 61 }, (_, k) => {
                const a = angle - Math.PI / 2 + (k / 60) * 2 * Math.PI;
                return Math.cos(a) * orbitRadius;
              }),
              y: Array.from({ length: 61 }, (_, k) => {
                const a = angle - Math.PI / 2 + (k / 60) * 2 * Math.PI;
                return Math.sin(a) * orbitRadius;
              }),
              scale: 1,
              opacity: 1,
            }}
            transition={{
              x: { duration: orbitDuration, repeat: Infinity, ease: "linear" },
              y: { duration: orbitDuration, repeat: Infinity, ease: "linear" },
              scale: { duration: 1, delay: 0.2 + i * 0.08, ease: "backOut" },
              opacity: { duration: 1, delay: 0.2 + i * 0.08 },
            }}
            style={{ translateX: "-50%", translateY: "-50%" }}
          >
            <div className="bg-white rounded-xl shadow-lg shadow-gray-200/50 border border-gray-100 px-4 py-3 flex items-center gap-3 cursor-default whitespace-nowrap">
              <div className={`w-9 h-9 ${card.color} rounded-lg flex items-center justify-center shrink-0`}>
                {card.icon}
              </div>
              <span className="text-sm font-medium text-gray-700">{t(`cards.${card.key}`)}</span>
            </div>
          </motion.div>
        );
      })}

    </div>
  );
}

/* ══════════════════════════════════════
   SLIDE 2+ — Browser Mockup Screens
   ══════════════════════════════════════ */

interface ScreenData {
  title: string;
  breadcrumb: string;
  url: string;
  headers: string[];
  rows: string[][];
  statusActive: string;
}

function useScreenData(): ScreenData {
  const t = useTranslations("hero.browserMock");
  return {
    title: t("title"),
    breadcrumb: t("breadcrumb"),
    url: t("url"),
    headers: t.raw("headers") as string[],
    rows: t.raw("rows") as string[][],
    statusActive: t("statusActive"),
  };
}

function BrowserMockup({ screen }: { screen: ScreenData }) {
  return (
    <div className="bg-white rounded-xl shadow-2xl shadow-gray-300/40 border border-gray-200 overflow-hidden w-full">
      {/* Browser top bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 border-b border-gray-200">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 mx-3">
          <div className="bg-white rounded-md border border-gray-200 px-3 py-1 text-[9px] text-gray-400 truncate">
            {screen.url}
          </div>
        </div>
      </div>

      {/* Sidebar + Content */}
      <div className="flex">
        <div className="w-10 bg-primary-500 flex flex-col items-center py-3 gap-2.5 shrink-0">
          <div className="w-5 h-5 bg-white/30 rounded" />
          <div className="w-5 h-1 bg-white/20 rounded" />
          <div className="w-5 h-1 bg-white/20 rounded" />
          <div className="w-5 h-1 bg-white/40 rounded" />
          <div className="w-5 h-1 bg-white/20 rounded" />
          <div className="w-5 h-1 bg-white/20 rounded" />
        </div>

        <div className="flex-1 p-3 min-w-0">
          <p className="text-[7px] text-gray-400 mb-1 truncate">{screen.breadcrumb}</p>
          <h3 className="text-[11px] font-bold text-gray-800 mb-2">{screen.title}</h3>

          <div className="border border-gray-100 rounded-lg overflow-hidden">
            <div className="grid gap-0" style={{ gridTemplateColumns: `repeat(${screen.headers.length}, 1fr)` }}>
              {screen.headers.map((h) => (
                <div key={h} className="bg-gray-50 px-1.5 py-1 text-[6px] font-semibold text-gray-500 truncate border-b border-gray-100">
                  {h}
                </div>
              ))}
            </div>
            {screen.rows.map((row, ri) => {
              // Each row has N-1 plain cells; the last column is the status badge.
              const cells = [...row, screen.statusActive];
              return (
                <div
                  key={ri}
                  className="grid gap-0 border-b border-gray-50 last:border-0"
                  style={{ gridTemplateColumns: `repeat(${screen.headers.length}, 1fr)` }}
                >
                  {cells.map((cell, ci) => (
                    <div key={ci} className="px-1.5 py-1.5 text-[7px] text-gray-600 truncate">
                      {ci === cells.length - 1 ? (
                        <span className="inline-block px-1.5 py-0.5 rounded text-[6px] font-medium bg-emerald-50 text-emerald-600">
                          {cell}
                        </span>
                      ) : (
                        cell
                      )}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function BrowserSlide({ screenIndex: _screenIndex }: { screenIndex: number }) {
  const t = useTranslations("hero");
  const screen = useScreenData();
  return (
    <div className="relative w-full">
      <BrowserMockup screen={screen} />

      {/* Floating tooltip cards around the browser */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-6 -left-4 z-20 bg-white rounded-xl shadow-lg shadow-gray-200/60 border border-gray-100 px-3 py-2 flex items-center gap-2"
      >
        <div className="w-7 h-7 rounded-lg bg-linear-to-br from-primary-400 to-primary-500 flex items-center justify-center">
          <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <p className="text-[9px] font-bold text-gray-800">{screen.title}</p>
          <p className="text-[7px] text-gray-400">{t("viewing")}</p>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -bottom-4 -right-2 z-20 bg-white rounded-xl shadow-lg border border-gray-100 px-3 py-2 flex items-center gap-2"
      >
        <div className="w-7 h-7 rounded-lg bg-linear-to-br from-emerald-400 to-emerald-500 flex items-center justify-center relative">
          <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </svg>
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full text-[7px] font-bold text-white flex items-center justify-center ring-1 ring-white">
            3
          </span>
        </div>
        <div>
          <p className="text-[9px] font-bold text-gray-800">AZON</p>
          <p className="text-[7px] text-gray-400">{t("notificationNew")}</p>
        </div>
      </motion.div>
    </div>
  );
}

/* ══════════════════════════════════════
   SLIDE — Storyset Illustration
   ══════════════════════════════════════ */

const ILLUSTRATIONS = [
  {
    src: "/images/team-analytics.svg",
    alt: "Team collaborating on analytics dashboard",
  },
  {
    src: "/images/office-management.svg",
    alt: "Office management with schedule and task tracking",
  },
];

function IllustrationSlide({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative h-112 w-full flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="w-full h-full flex items-center justify-center"
      >
        <Image
          src={src}
          alt={alt}
          width={680}
          height={540}
          className="w-full h-full object-contain"
          priority
        />
      </motion.div>
    </div>
  );
}

/* ══════════════════════════════════════
   MAIN HERO — Auto-switching slides
   ══════════════════════════════════════ */

// Total slides: ILLUSTRATIONS + 1 (floating cards) + 1 (browser mockup screen)
const TOTAL_SLIDES = ILLUSTRATIONS.length + 1 + 1;

export default function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const t = useTranslations("hero");
  const locale = useLocale();

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % TOTAL_SLIDES);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white">
      {/* Mobile background — blurred office photo */}
      <div className="absolute inset-0 lg:hidden">
        <Image
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80"
          alt=""
          fill
          sizes="100vw"
          className="object-cover blur-sm scale-110"
          aria-hidden
          priority
        />
        <div className="absolute inset-0 bg-linear-to-b from-primary-900/85 via-primary-800/75 to-primary-700/85" />
      </div>

      {/* Desktop — blurred office photo layer behind the blob */}
      <div className="hidden lg:block absolute inset-0 pointer-events-none">
        <Image
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2000&q=80"
          alt=""
          fill
          sizes="100vw"
          className="object-cover blur-xs scale-105"
          aria-hidden
          priority
        />
      </div>

      {/* Desktop — Large curved blob shape (darkens the photo, shaped edge on the right) */}
      <motion.svg
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none"
        preserveAspectRatio="none"
        viewBox="0 0 1440 900"
        aria-hidden
      >
        <defs>
          <linearGradient id="hero-blob-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0f1f33" stopOpacity="0.92" />
            <stop offset="50%" stopColor="#1f3f65" stopOpacity="0.88" />
            <stop offset="100%" stopColor="#2F5E97" stopOpacity="0.82" />
          </linearGradient>
        </defs>

        {/* Main large blob — gentle wave from top-right to bottom, curving back at bottom */}
        <path
          d="M0,0 L1280,0 C1260,180 1180,340 1040,460 C900,580 820,680 880,820 C920,880 960,900 960,900 L0,900 Z"
          fill="url(#hero-blob-gradient)"
        />

        {/* Decorative concentric circles (bottom-left corner) */}
        <circle cx="120" cy="780" r="140" fill="none" stroke="white" strokeWidth="1" opacity="0.1" strokeDasharray="4 8" />
        <circle cx="120" cy="780" r="90" fill="none" stroke="white" strokeWidth="1" opacity="0.12" strokeDasharray="4 8" />
      </motion.svg>

      {/* Floating decorative dots */}
      <div className="absolute top-[22%] right-[6%] w-6 h-6 rounded-full bg-yellow-400 animate-[float_4s_ease-in-out_infinite]" />
      <div className="absolute bottom-[18%] right-[3%] w-4 h-4 rounded-full bg-yellow-300 animate-[float_5s_ease-in-out_infinite_0.8s]" />
      <div className="absolute top-[55%] right-[10%] w-2.5 h-2.5 rounded-full bg-yellow-200 animate-[float_6s_ease-in-out_infinite_1.5s]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-28 md:py-36">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* ── Left: Text ── */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="flex items-center gap-3 mb-6"
            >
              <Image src="/logo/logo3.png" alt="AZON Logo" width={40} height={40} className="w-8 h-8 md:w-10 md:h-10 rounded-xl shadow-md" />
              <span className="text-xs md:text-sm font-semibold text-white">
                {t("badge")}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-white leading-tight"
              style={{ textShadow: "0 2px 16px rgba(0, 0, 0, 0.25)" }}
            >
              {t("titleLine1")}
              <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-yellow-200 to-yellow-100">
                {t("titleHighlight")}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="mt-4 md:mt-6 text-sm md:text-lg text-white max-w-lg leading-relaxed"
              style={{ textShadow: "0 1px 8px rgba(0, 0, 0, 0.2)" }}
            >
              {t("description")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.35 }}
              className="mt-8 flex flex-col sm:flex-row gap-4"
            >
              <Button
                href={`/${locale}/register`}
                variant="gradient"
                gradient={{
                  from: "from-yellow-300",
                  to: "to-yellow-500",
                  hoverFrom: "hover:from-yellow-200",
                  hoverTo: "hover:to-yellow-400",
                  text: "text-primary-900",
                  shadow: "shadow-yellow-500/25",
                }}
                className="px-8! py-3.5! text-base! hover:-translate-y-0.5"
              >
                {t("cta")}
              </Button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="mt-4 text-sm text-white/85"
            >
              {t("freeNote")}
            </motion.p>
          </div>

          {/* ── Right: Auto-switching slides ── */}
          <div className="relative hidden lg:block">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              <div className="relative h-112 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSlide}
                    initial={{ opacity: 0, scale: 0.95, y: 16 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -16 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    {activeSlide === 0 ? (
                      <IllustrationSlide {...ILLUSTRATIONS[0]} />
                    ) : activeSlide === 1 ? (
                      <FloatingCardsSlide />
                    ) : activeSlide === 2 ? (
                      <BrowserSlide screenIndex={0} />
                    ) : (
                      <IllustrationSlide {...ILLUSTRATIONS[1]} />
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Slide indicator dots */}
              <div className="flex justify-center gap-2 mt-6">
                {Array.from({ length: TOTAL_SLIDES }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveSlide(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === activeSlide
                        ? "w-6 bg-primary-500"
                        : "w-1.5 bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
