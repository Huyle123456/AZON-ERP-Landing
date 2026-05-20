"use client";

import { APP_FEATURES } from "@/lib/constants";
import { motion } from "framer-motion";
import { CheckCircle2, Smartphone } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function AppFeatures() {
  const t = useTranslations("appFeatures");
  return (
    <section id="app-features" className="relative py-16 md:py-24 overflow-hidden">
      {/* Background image — employees working in an office with blue tones */}
      <div className="absolute inset-0">
        <Image
          src="/images/bg1.avif"
          alt=""
          fill
          sizes="100vw"
          className="object-cover blur-sm scale-105"
          aria-hidden
          priority
        />
        {/* Overlay — lighter to show more of the image */}
        <div className="absolute inset-0 bg-linear-to-b from-white/70 via-white/30 to-white/70" />
        <div className="absolute inset-0 bg-primary-50/15" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Custom heading with phone mockup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
        >
          {/* Phone mockup with logo */}
          <div className="flex justify-center mb-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.1 }}
              className="relative"
            >
              <div className="w-20 h-36 bg-gray-900 rounded-2xl p-1.5 shadow-xl relative">
                <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-8 h-1.5 bg-gray-800 rounded-full z-10" />
                <div className="w-full h-full bg-white rounded-xl flex flex-col items-center justify-center gap-1.5 overflow-hidden">
                  <Image src="/logo/logo3.png" alt="AZON" width={32} height={32} className="rounded-lg" />
                  <span className="text-[7px] font-bold text-gray-800">AZON</span>
                  <span className="text-[5px] text-gray-400">Employee App</span>
                </div>
              </div>
              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-3 -right-8 bg-primary-500 text-white text-[7px] font-bold px-2 py-1 rounded-full shadow-md"
              >
                <Smartphone className="w-3 h-3 inline mr-0.5" />
                {t("appLabel")}
              </motion.div>
            </motion.div>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t("title")}
          </h2>
          <p className="text-lg text-gray-700">{t("subtitle")}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {APP_FEATURES.map((feature, i) => {
            const bullets = t.raw(`${feature.key}.bullets`) as string[];
            const hasSubtitle = "hasSubtitle" in feature && feature.hasSubtitle;
            return (
              <motion.div
                key={feature.key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 1, delay: i * 0.08 }}
                className="bg-white rounded-2xl  p-6 md:p-8  hover:shadow-xl hover:border-primary-200 transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center shrink-0">
                    <feature.icon className="w-6 h-6 text-primary-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {t(`${feature.key}.title`)}
                    </h3>
                    {hasSubtitle && (
                      <p className="text-sm text-gray-500">
                        {t(`${feature.key}.subtitle`)}
                      </p>
                    )}
                  </div>
                </div>
                <ul className="space-y-3">
                  {bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary-400 shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600 leading-relaxed">
                        {bullet}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
