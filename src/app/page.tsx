"use client";

import dynamic from "next/dynamic";
import AppFeatures from "@/components/sections/AppFeatures";
import FeaturesGrid from "@/components/sections/FeaturesGrid";
import HeroSection from "@/components/sections/HeroSection";
import Pricing from "@/components/sections/Pricing";
import SocialProof from "@/components/sections/SocialProof";

// Eager imports for:
//   - Above-the-fold (Hero + SocialProof) → fast LCP
//   - Sections targeted by nav anchors (#features, #app-features, #pricing) →
//     hash navigation needs the element to exist immediately, otherwise the
//     browser can't scroll to it in production builds where chunks load on
//     demand.
const FeatureDeepDive = dynamic(
  () => import("@/components/sections/FeatureDeepDive"),
);
const ESSHighlight = dynamic(() => import("@/components/sections/ESSHighlight"));
const MidCTA = dynamic(() => import("@/components/sections/MidCTA"));
const Differentiators = dynamic(
  () => import("@/components/sections/Differentiators"),
);
const News = dynamic(() => import("@/components/sections/News"));

export default function Home() {
  return (
    <main>
      <HeroSection />
      <SocialProof />
      <FeaturesGrid />
      <FeatureDeepDive />
      <ESSHighlight />
      <AppFeatures />
      <MidCTA />
      <Differentiators />
      <Pricing />
      <News />
    </main>
  );
}
