"use client";

import { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "outline" | "outline-white" | "gradient";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  href?: string;
  /** For variant="gradient": Tailwind color classes, e.g. { from: "from-yellow-300", to: "to-yellow-500", hoverFrom: "hover:from-yellow-200", hoverTo: "hover:to-yellow-400", text: "text-primary-900", shadow: "shadow-yellow-500/25" } */
  gradient?: {
    from: string;
    to: string;
    hoverFrom?: string;
    hoverTo?: string;
    text?: string;
    shadow?: string;
  };
}

const variants: Record<Exclude<Variant, "gradient">, string> = {
  primary:
    "bg-primary-500 text-white hover:bg-primary-600 border border-transparent",
  outline:
    "border border-primary-500 text-primary-500 hover:bg-primary-50",
  "outline-white":
    "border border-white text-white hover:bg-white/10",
};

export default function Button({
  variant = "primary",
  gradient,
  href,
  children,
  className = "",
  ...props
}: ButtonProps) {
  const variantClasses =
    variant === "gradient" && gradient
      ? [
          "border border-transparent bg-linear-to-br shadow-md transition-all",
          gradient.from,
          gradient.to,
          gradient.hoverFrom ?? "",
          gradient.hoverTo ?? "",
          gradient.text ?? "text-white",
          gradient.shadow ?? "",
        ].join(" ")
      : variants[variant as Exclude<Variant, "gradient">];

  const cls = `inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200 cursor-pointer ${variantClasses} ${className}`;

  if (href) {
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    );
  }

  return (
    <button className={cls} {...props}>
      {children}
    </button>
  );
}
