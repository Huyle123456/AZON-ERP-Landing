"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Gift, Rocket, Scale, Shield } from "lucide-react";

type IconKey = "rocket" | "shield" | "scale" | "gift";

const ICONS: Record<IconKey, React.ComponentType<{ className?: string }>> = {
  rocket: Rocket,
  shield: Shield,
  scale: Scale,
  gift: Gift,
};

// Per-card accent palette — gradient for the icon tile + soft glow ring.
const ACCENTS: Record<
  IconKey,
  { from: string; to: string; ring: string; text: string }
> = {
  rocket: {
    from: "from-primary-400",
    to: "to-indigo-500",
    ring: "shadow-primary-500/30",
    text: "text-primary-600",
  },
  shield: {
    from: "from-emerald-400",
    to: "to-teal-500",
    ring: "shadow-emerald-500/30",
    text: "text-emerald-600",
  },
  scale: {
    from: "from-amber-400",
    to: "to-orange-500",
    ring: "shadow-amber-500/30",
    text: "text-amber-600",
  },
  gift: {
    from: "from-pink-400",
    to: "to-rose-500",
    ring: "shadow-rose-500/30",
    text: "text-rose-600",
  },
};

interface Item {
  icon: IconKey;
  title: string;
  desc: string;
}

export default function SocialProof() {
  const t = useTranslations("socialProof");
  const items = t.raw("items") as Item[];

  return (
    <section className="relative overflow-hidden py-20 md:py-28 bg-linear-to-b from-slate-50 via-white to-slate-50">
      {/* Subtle decorative blobs */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-80 w-80 rounded-full bg-primary-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-indigo-200/30 blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-50 border border-primary-100 px-3 py-1 text-xs font-semibold text-primary-700 mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-primary-500 animate-pulse" />
            AZON ERP
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-900 tracking-tight">
            {t("heading")}
          </h2>
          <p className="mt-3 md:mt-4 text-base md:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            {t("subheading")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {items.map((item, idx) => {
            const Icon = ICONS[item.icon] ?? Rocket;
            const accent = ACCENTS[item.icon] ?? ACCENTS.rocket;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative"
              >
                {/* Glow on hover */}
                <div
                  className={`absolute -inset-0.5 rounded-2xl bg-linear-to-br ${accent.from} ${accent.to} opacity-0 blur-md group-hover:opacity-40 transition-opacity duration-500`}
                />
                <div className="relative h-full rounded-2xl bg-white border border-slate-200/80 p-6 md:p-7 hover:border-transparent transition-all duration-300 hover:-translate-y-1">
                  {/* Step number */}
                  <span className="absolute top-5 right-5 text-xs font-mono font-semibold text-slate-300 group-hover:text-slate-400 transition-colors">
                    0{idx + 1}
                  </span>

                  {/* Icon tile */}
                  <div
                    className={`relative inline-flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br ${accent.from} ${accent.to} text-white shadow-lg ${accent.ring}`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-primary-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">
                    {item.desc}
                  </p>

                  {/* Bottom accent line */}
                  <div
                    className={`mt-5 h-0.5 w-10 rounded-full bg-linear-to-r ${accent.from} ${accent.to} opacity-60 group-hover:w-full transition-all duration-500`}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
