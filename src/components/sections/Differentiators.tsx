"use client";

import { DIFFERENTIATORS } from "@/lib/constants";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Differentiators() {
  const t = useTranslations("differentiators");
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12 md:mb-16"
        >
          {t("title")}
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Illustration */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="w-full flex justify-center"
          >
            <Image
              src="/images/questions-pana.svg"
              alt={t("title")}
              width={520}
              height={520}
              className="w-full max-w-md h-auto"
            />
          </motion.div>

          {/* Cards stacked vertically */}
          <div className="flex flex-col gap-3">
            {DIFFERENTIATORS.map((item, i) => {
              const bullets = t.raw(`${item.key}.bullets`) as string[];
              return (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: i * 0.1 }}
                  className="bg-white rounded-2xl p-8 border border-gray-100 flex gap-6 items-start"
                >
                  <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center shrink-0">
                    <item.icon className="w-7 h-7 text-primary-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {t(`${item.key}.title`)}
                    </h3>
                    <ul className="space-y-1.5">
                      {bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="text-sm text-gray-600 flex gap-2"
                        >
                          <span className="text-primary-500 mt-1">•</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
