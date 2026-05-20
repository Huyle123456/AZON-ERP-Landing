"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const LOGOS = [
  { name: "VINGROUP", style: "font-bold tracking-wider text-gray-700" },
  { name: "TOPICA", style: "font-bold text-blue-700" },
  { name: "Vietnam Airlines", style: "font-semibold text-amber-700 italic" },
  { name: "Traphaco", style: "font-bold text-emerald-700" },
  { name: "M.O.I", style: "font-bold tracking-widest text-rose-700" },
  { name: "BAMBOO", style: "font-bold text-green-700 tracking-wider" },
  { name: "BENTLEY", style: "font-bold text-gray-800 tracking-[0.2em]" },
  { name: "Elmich", style: "font-bold text-red-700 italic" },
  { name: "FPT Software", style: "font-bold text-orange-600" },
  { name: "THACO", style: "font-bold text-blue-800 tracking-wider" },
];

export default function SocialProof() {
  const t = useTranslations("socialProof");
  return (
    <section className="py-10 bg-white border-t border-gray-100 overflow-hidden">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center text-sm text-gray-400 mb-8"
      >
        <span className="text-primary-500 font-semibold">{t("trustedBy")}</span>{" "}
        {t("suffix")}
      </motion.p>

      {/* Marquee container */}
      <div className="relative">
        {/* Gradient fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-linear-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-linear-to-l from-white to-transparent z-10" />

        <div className="animate-marquee flex items-center gap-16 w-max">
          {[...LOGOS, ...LOGOS].map((logo, i) => (
            <div
              key={`${logo.name}-${i}`}
              className="shrink-0 flex items-center justify-center h-10 opacity-40 hover:opacity-70 transition-opacity duration-300 grayscale hover:grayscale-0"
            >
              <span className={`text-lg select-none ${logo.style}`}>
                {logo.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
