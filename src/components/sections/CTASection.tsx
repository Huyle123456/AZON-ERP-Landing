"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Button from "@/components/ui/Button";

export default function CTASection() {
  const t = useTranslations("cta");
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t("title")}
          </h2>
          <p className="text-lg text-gray-200 mb-8">{t("description")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              href="/register?plan=free"
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
              {t("register")}
            </Button>
            <Button
              href="/register?plan=standard"
              variant="outline-white"
              className="px-8! py-3.5! text-base!"
            >
              {t("contact")}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
