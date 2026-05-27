"use client";

import Button from "@/components/ui/Button";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";

export default function MidCTA() {
  const t = useTranslations("midCta");
  const locale = useLocale();
  return (
    <section className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl overflow-hidden relative">
          {/* Background image — team meeting */}
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=2400&q=80"
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
              aria-hidden
            />
            {/* Brand-colored overlay for readability + theme consistency */}
            <div className="absolute inset-0 bg-linear-to-r from-primary-800/80 via-primary-700/60 to-primary-600/40" />
          </div>

          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4" />

          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center p-8 md:p-12 lg:p-16">
            {/* Left: Text */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight mb-4">
                {t("titleLine1")}
                <br />
                {t("titleLine2")}
              </h2>
              <p className="text-primary-100 text-sm md:text-base leading-relaxed mb-8 max-w-lg">
                {t("description")}
              </p>
              <Button href={`/${locale}/register`} variant="outline-white" className="px-6! py-3!">
                {t("button")}
              </Button>
            </motion.div>

            {/* Right: Dashboard mockup */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              {/* Main dashboard card */}
              <div className="bg-white rounded-2xl shadow-2xl p-5 relative z-10">
                {/* Top stats row */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-[10px] text-gray-400 mb-0.5">{t("totalEmployees")}</p>
                    <p className="text-2xl font-bold text-gray-800">8,476</p>
                  </div>
                  <div className="flex items-center gap-1 bg-emerald-50 px-2 py-1 rounded-full">
                    <svg className="w-3 h-3 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                    <span className="text-[10px] font-semibold text-emerald-600">103,45%</span>
                  </div>
                </div>

                {/* Mini chart bars */}
                <div className="flex items-end gap-1.5 h-16 mb-3">
                  {[40, 65, 45, 80, 55, 70, 90, 60, 75, 85, 50, 95].map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${h}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: i * 0.05 }}
                      className={`flex-1 rounded-sm ${
                        i === 11 ? "bg-primary-500" : "bg-primary-100"
                      }`}
                    />
                  ))}
                </div>

                {/* Bottom stats */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-gray-50 rounded-lg p-2">
                    <p className="text-[8px] text-gray-400">{t("workToday")}</p>
                    <p className="text-sm font-bold text-gray-800">7,892</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2">
                    <p className="text-[8px] text-gray-400">{t("onLeave")}</p>
                    <p className="text-sm font-bold text-amber-600">142</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2">
                    <p className="text-[8px] text-gray-400">{t("overtime")}</p>
                    <p className="text-sm font-bold text-primary-500">356</p>
                  </div>
                </div>
              </div>

              {/* Floating small card - top right */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-4 z-20 bg-white rounded-xl shadow-lg px-3 py-2.5"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-gray-800">{t("attendanceRate")}</p>
                    <p className="text-xs font-bold text-emerald-600">98.2%</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating small card - bottom left */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-4 -left-4 z-20 bg-white rounded-xl shadow-lg px-3 py-2.5"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-gray-800">{t("payrollCost")}</p>
                    <p className="text-xs font-bold text-primary-500">2.4 tỷ</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
