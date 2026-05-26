"use client";

import { useTranslations } from "next-intl";

export type PlanId = "free" | "standard" | "enterprise";

const PLAN_IDS: PlanId[] = ["free", "standard", "enterprise"];
const HIGHLIGHT: Record<PlanId, boolean> = {
  free: false,
  standard: true,
  enterprise: false,
};

export default function PlanSelector({
  value,
  onChange,
}: {
  value: PlanId;
  onChange: (id: PlanId) => void;
}) {
  const t = useTranslations("auth.planSelector");

  return (
    <div className="grid sm:grid-cols-3 gap-3">
      {PLAN_IDS.map((id) => {
        const selected = value === id;
        const highlight = HIGHLIGHT[id];
        const features = t.raw(`${id}.features`) as string[];
        return (
          <button
            type="button"
            key={id}
            onClick={() => onChange(id)}
            className={`relative text-left rounded-xl border-2 p-4 transition-all cursor-pointer ${
              selected
                ? "border-primary-500 bg-primary-50/60 ring-4 ring-primary-100"
                : "border-slate-200 bg-white hover:border-primary-300"
            }`}
          >
            {highlight && !selected && (
              <span className="absolute -top-2 right-3 px-2 py-0.5 text-[10px] font-bold rounded-full bg-primary-500 text-white">
                {t(`${id}.badge`)}
              </span>
            )}
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-primary-900">{t(`${id}.name`)}</h3>
              <span
                className={`h-4 w-4 rounded-full border-2 flex items-center justify-center ${
                  selected ? "border-primary-500 bg-primary-500" : "border-slate-300"
                }`}
              >
                {selected && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
              </span>
            </div>
            <div className="mt-2">
              <p className="text-xl font-bold text-primary-700">{t(`${id}.price`)}</p>
              <p className="text-[11px] text-slate-500">{t(`${id}.priceNote`)}</p>
            </div>
            <ul className="mt-3 space-y-1.5">
              {features.map((f) => (
                <li
                  key={f}
                  className="text-xs text-slate-600 flex items-start gap-1.5"
                >
                  <svg
                    className="h-3.5 w-3.5 text-primary-500 mt-0.5 shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
          </button>
        );
      })}
    </div>
  );
}
