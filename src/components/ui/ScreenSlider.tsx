"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

/* ── Types ── */
type MockScreen = {
  title: string;
  breadcrumb: string;
  headers: string[];
  rows: { cells: string[]; status?: string }[];
};

type FloatingBadge = {
  label: string;
  value: string;
  color: string; // tailwind gradient classes
  position: string;
  floatDuration: number;
};

interface ScreenSliderProps {
  screens: MockScreen[];
  badges: FloatingBadge[];
  interval?: number;
}

/* ── Browser Mockup ── */
function BrowserMockup({ screen }: { screen: MockScreen }) {
  return (
    <div className="bg-white rounded-xl shadow-2xl shadow-gray-300/40 border border-gray-200 overflow-hidden w-full h-full flex flex-col">
      {/* Top bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 border-b border-gray-200">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 mx-3">
          <div className="bg-white rounded-md border border-gray-200 px-3 py-1 text-[9px] text-gray-400 truncate">
            app.azon.vn/{screen.title.toLowerCase().replace(/\s/g, "-")}
          </div>
        </div>
      </div>

      {/* Sidebar + Content */}
      <div className="flex flex-1 min-h-0">
        <div className="w-10 bg-primary-500 flex flex-col items-center py-3 gap-2.5 shrink-0">
          <div className="w-5 h-5 bg-white/30 rounded" />
          <div className="w-5 h-1 bg-white/20 rounded" />
          <div className="w-5 h-1 bg-white/20 rounded" />
          <div className="w-5 h-1 bg-white/40 rounded" />
          <div className="w-5 h-1 bg-white/20 rounded" />
        </div>
        <div className="flex-1 p-3 min-w-0 overflow-hidden">
          <p className="text-[7px] text-gray-400 mb-1 truncate">{screen.breadcrumb}</p>
          <h3 className="text-[11px] font-bold text-gray-800 mb-2">{screen.title}</h3>

          <div className="border border-gray-100 rounded-lg overflow-hidden">
            <div
              className="grid gap-0"
              style={{ gridTemplateColumns: `repeat(${screen.headers.length}, 1fr)` }}
            >
              {screen.headers.map((h) => (
                <div
                  key={h}
                  className="bg-gray-50 px-1.5 py-1 text-[6px] font-semibold text-gray-500 truncate border-b border-gray-100"
                >
                  {h}
                </div>
              ))}
            </div>
            {screen.rows.map((row, ri) => (
              <div
                key={ri}
                className="grid gap-0 border-b border-gray-50 last:border-0"
                style={{ gridTemplateColumns: `repeat(${screen.headers.length}, 1fr)` }}
              >
                {row.cells.map((cell, ci) => (
                  <div key={ci} className="px-1.5 py-1.5 text-[7px] text-gray-600 truncate">
                    {ci === row.cells.length - 1 && row.status ? (
                      <span
                        className={`inline-block px-1.5 py-0.5 rounded text-[6px] font-medium ${
                          row.status === "green"
                            ? "bg-emerald-50 text-emerald-600"
                            : row.status === "orange"
                              ? "bg-amber-50 text-amber-600"
                              : row.status === "red"
                                ? "bg-red-50 text-red-600"
                                : "bg-primary-50 text-primary-500"
                        }`}
                      >
                        {cell}
                      </span>
                    ) : (
                      cell
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Main Slider ── */
export default function ScreenSlider({ screens, badges, interval = 4000 }: ScreenSliderProps) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % screens.length);
    }, interval);
    return () => clearInterval(timer);
  }, [screens.length, interval]);

  return (
    <div className="relative">
      {/* Browser mockup with slide animation — fixed height across all slides */}
      <div className="relative z-10 h-64 md:h-72">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 1 }}
            className="h-full"
          >
            <BrowserMockup screen={screens[active]} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide dots */}
      <div className="flex justify-center gap-2 mt-3">
        {screens.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === active ? "w-5 bg-primary-500" : "w-1.5 bg-gray-300 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>

      {/* Floating badges */}
      {badges.map((badge, i) => (
        <motion.div
          key={badge.label}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 + i * 0.15 }}
          className={`absolute ${badge.position} z-20`}
        >
          <motion.div
            animate={{ y: [0, -7, 0] }}
            transition={{ duration: badge.floatDuration, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
            className="bg-white rounded-xl shadow-lg shadow-gray-200/60 border border-gray-100 px-3 py-2 flex items-center gap-2"
          >
            <div className={`w-7 h-7 rounded-lg bg-linear-to-br ${badge.color} flex items-center justify-center shrink-0`}>
              <div className="w-3 h-3 border-2 border-white rounded-sm" />
            </div>
            <div>
              <p className="text-[8px] text-gray-400">{badge.label}</p>
              <p className="text-[10px] font-bold text-gray-800">{badge.value}</p>
            </div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
