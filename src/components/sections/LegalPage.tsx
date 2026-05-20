"use client";

import type { LegalDoc } from "@/lib/legal";
import { motion } from "framer-motion";

export default function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <main className="bg-white min-h-screen pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-10"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            {doc.title}
          </h1>
          <p className="text-sm text-gray-500">
            {doc.updatedLabel}: {doc.updatedDate}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="space-y-8"
        >
          <p className="text-base text-gray-700 leading-relaxed">{doc.intro}</p>

          {doc.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">
                {section.heading}
              </h2>
              {section.paragraphs?.map((p, idx) => (
                <p
                  key={idx}
                  className="text-base text-gray-700 leading-relaxed mb-3"
                >
                  {p}
                </p>
              ))}
              {section.bullets && (
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  {section.bullets.map((b, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </motion.div>
      </div>
    </main>
  );
}
