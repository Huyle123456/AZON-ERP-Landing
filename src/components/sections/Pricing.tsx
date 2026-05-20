"use client";

import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import { motion } from "framer-motion";
import { Check, Crown, Globe, Sparkles, Users, Zap } from "lucide-react";
import { useTranslations } from "next-intl";

const PLAN_CONFIG = [
  {
    key: "free",
    icon: Sparkles,
    highlight: false,
    ctaVariant: "outline" as const,
    hasPeriod: true,
  },
  {
    key: "standard",
    icon: Zap,
    highlight: true,
    ctaVariant: "primary" as const,
    hasPeriod: false,
    badge: true,
  },
  {
    key: "enterprise",
    icon: Crown,
    highlight: false,
    ctaVariant: "outline" as const,
    hasPeriod: false,
  },
];

const ADDON_CONFIG = [{ key: "customDomain", icon: Globe }];

export default function Pricing() {
  const t = useTranslations("pricing");

  return (
    <section id="pricing" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title={t("title")} subtitle={t("subtitle")} />

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {PLAN_CONFIG.map((plan, i) => {
            const features = t.raw(`plans.${plan.key}.features`) as string[];
            return (
              <motion.div
                key={plan.key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 1, delay: i * 0.1 }}
                className={`relative rounded-2xl p-8 flex flex-col ${
                  plan.highlight
                    ? "bg-primary-500 text-white ring-4 ring-primary-500/20 scale-[1.02]"
                    : "bg-white border border-gray-200"
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="bg-amber-400 text-amber-900 text-xs font-bold px-4 py-1.5 rounded-full">
                      {t("popularBadge")}
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      plan.highlight ? "bg-white/20" : "bg-primary-100"
                    }`}
                  >
                    <plan.icon
                      className={`w-5 h-5 ${
                        plan.highlight ? "text-white" : "text-primary-500"
                      }`}
                    />
                  </div>
                  <h3
                    className={`text-lg font-bold ${
                      plan.highlight ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {t(`plans.${plan.key}.name`)}
                  </h3>
                </div>

                <div className="mb-2">
                  <span
                    className={`text-3xl font-bold ${
                      plan.highlight ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {t(`plans.${plan.key}.price`)}
                  </span>
                  {plan.hasPeriod && (
                    <span
                      className={`text-sm ml-1 ${
                        plan.highlight ? "text-primary-100" : "text-gray-500"
                      }`}
                    >
                      /{t(`plans.${plan.key}.period`)}
                    </span>
                  )}
                </div>

                <p
                  className={`text-sm mb-6 ${
                    plan.highlight ? "text-primary-100" : "text-gray-500"
                  }`}
                >
                  {t(`plans.${plan.key}.description`)}
                </p>

                <ul className="space-y-3 mb-8 flex-1">
                  {features.map((feature) => (
                    <li key={feature} className="flex gap-2.5">
                      <Check
                        className={`w-4 h-4 shrink-0 mt-0.5 ${
                          plan.highlight ? "text-primary-200" : "text-primary-400"
                        }`}
                      />
                      <span
                        className={`text-sm ${
                          plan.highlight ? "text-primary-50" : "text-gray-600"
                        }`}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={plan.highlight ? "outline-white" : plan.ctaVariant}
                  className="w-full"
                >
                  {t(`plans.${plan.key}.cta`)}
                </Button>
              </motion.div>
            );
          })}
        </div>

        {/* Add-ons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h3 className="text-xl font-bold text-gray-900 text-center mb-6">
            {t("addonsTitle")}
          </h3>
          <div className="max-w-2xl mx-auto">
            {ADDON_CONFIG.map((addon) => (
              <div
                key={addon.key}
                className="flex items-start gap-4 bg-linear-to-r from-primary-50 to-indigo-50 rounded-2xl p-6 border border-primary-100"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center shrink-0">
                  <addon.icon className="w-6 h-6 text-primary-500" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <h4 className="text-lg font-semibold text-gray-900">
                      {t(`addons.${addon.key}.title`)}
                    </h4>
                    <span className="text-primary-500 font-bold text-sm bg-primary-100 px-3 py-1 rounded-full">
                      {t(`addons.${addon.key}.price`)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {t(`addons.${addon.key}.description`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Free tier highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-6 py-3">
            <Users className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-green-800">
              {t("freeTierNote")}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
