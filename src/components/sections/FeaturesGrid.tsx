"use client";

import Card from "@/components/ui/Card";
import { FEATURES } from "@/lib/constants";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
import Image from "next/image";
import {
  Sparkles,
  Briefcase,
  TrendingUp,
  Target,
  Zap,
  Award,
  Rocket,
  CheckCircle2,
  Boxes,
  Layers,
} from "lucide-react";

const FLOATING_ICONS = [
  { Icon: Sparkles, top: "8%", left: "6%", size: 32, delay: 0 },
  { Icon: Briefcase, top: "18%", right: "8%", size: 36, delay: 0.5 },
  { Icon: TrendingUp, top: "55%", left: "4%", size: 40, delay: 1 },
  { Icon: Target, bottom: "15%", right: "6%", size: 34, delay: 1.5 },
  { Icon: Zap, top: "38%", right: "12%", size: 28, delay: 0.8 },
  { Icon: Award, bottom: "25%", left: "8%", size: 36, delay: 1.2 },
  { Icon: Rocket, top: "70%", right: "18%", size: 30, delay: 0.3 },
  { Icon: CheckCircle2, top: "28%", left: "14%", size: 26, delay: 1.8 },
];

export default function FeaturesGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("features");

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".feature-card");

      gsap.from(cards, {
        opacity: 0,
        y: 60,
        scale: 0.9,
        duration: 1,
        ease: "power3.out",
        stagger: { each: 0.1, from: "start" },
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      cards.forEach((card) => {
        const onEnter = () =>
          gsap.to(card, { y: -8, scale: 1.02, duration: 1, ease: "power2.out" });
        const onLeave = () =>
          gsap.to(card, { y: 0, scale: 1, duration: 1, ease: "power2.out" });
        card.addEventListener("mouseenter", onEnter);
        card.addEventListener("mouseleave", onLeave);
      });

      const floatingIcons = gsap.utils.toArray<HTMLElement>(".floating-icon");
      floatingIcons.forEach((icon, i) => {
        gsap.to(icon, {
          y: "random(-20, 20)",
          x: "random(-15, 15)",
          rotation: "random(-15, 15)",
          duration: "random(4, 7)",
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: i * 0.2,
        });
      });

      gsap.from(floatingIcons, {
        opacity: 0,
        scale: 0,
        duration: 1,
        ease: "back.out(1.7)",
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      const headingIcon = sectionRef.current?.querySelector(".heading-icon");
      if (headingIcon) {
        gsap.from(headingIcon, {
          opacity: 0,
          scale: 0,
          rotation: -180,
          duration: 1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        });
        gsap.to(headingIcon, {
          y: -6,
          duration: 2,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      }

      const subtitleIcon = sectionRef.current?.querySelector(".subtitle-icon");
      if (subtitleIcon) {
        gsap.to(subtitleIcon, {
          rotation: 360,
          duration: 8,
          ease: "none",
          repeat: -1,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="features"
      className="py-16 md:py-24 bg-linear-to-br from-primary-700 via-primary-600 to-primary-800 relative overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="absolute inset-0 opacity-25 pointer-events-none">
        <div className="absolute top-20 -left-20 w-96 h-96 bg-primary-400 rounded-full blur-3xl" />
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-primary-300 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-primary-500 rounded-full blur-3xl" />
      </div>

      <div className="absolute inset-0 pointer-events-none">
        {FLOATING_ICONS.map(({ Icon, top, left, right, bottom, size }, i) => (
          <div
            key={i}
            className="floating-icon absolute text-white/20"
            style={{ top, left, right, bottom }}
          >
            <Icon style={{ width: size, height: size }} strokeWidth={1.5} />
          </div>
        ))}
      </div>

      <svg
        className="absolute top-0 left-0 w-full h-24 text-white/5 pointer-events-none"
        preserveAspectRatio="none"
        viewBox="0 0 1440 100"
      >
        <path
          fill="currentColor"
          d="M0,40 C360,100 1080,0 1440,60 L1440,0 L0,0 Z"
        />
      </svg>

      {/* Decorative illustration — bottom-left, behind content */}
      <div className="hidden lg:block absolute -bottom-8 -left-10 w-88 xl:w-104 opacity-30 pointer-events-none select-none">
        <Image
          src="/images/extraction-amico.svg"
          alt=""
          width={520}
          height={520}
          className="w-full h-auto"
          aria-hidden
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="heading-title text-3xl md:text-4xl font-bold mb-4 text-white flex items-center justify-center gap-3 flex-wrap">
            <span className="heading-icon inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/15 backdrop-blur-sm border border-white/25">
              <Boxes className="w-6 h-6 md:w-7 md:h-7 text-white" strokeWidth={2} />
            </span>
            <span>{t("title")}</span>
          </h2>
          <p className="heading-subtitle text-lg text-primary-100 flex items-center justify-center gap-2 flex-wrap">
            <Layers className="subtitle-icon w-5 h-5 text-primary-200" strokeWidth={2} />
            <span>{t("subtitle")}</span>
          </p>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {FEATURES.map((feature) => (
            <div key={feature.key} className="feature-card">
              <Card className="h-full bg-white/95 backdrop-blur-sm border-white/20">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {t(`items.${feature.key}.title`)}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {t(`items.${feature.key}.description`)}
                </p>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
