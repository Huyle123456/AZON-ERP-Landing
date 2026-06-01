"use client";

import dynamic from "next/dynamic";
import HeroSection from "@/components/sections/HeroSection";
import SocialProof from "@/components/sections/SocialProof";

// Above-the-fold (Hero + SocialProof) stay eager for fast LCP.
// Everything below the fold loads lazily on the client to slim the initial
// JS bundle and main-thread work.
const FeaturesGrid = dynamic(() => import("@/components/sections/FeaturesGrid"));
const FeatureDeepDive = dynamic(
  () => import("@/components/sections/FeatureDeepDive"),
);
const ESSHighlight = dynamic(() => import("@/components/sections/ESSHighlight"));
const AppFeatures = dynamic(() => import("@/components/sections/AppFeatures"));
const MidCTA = dynamic(() => import("@/components/sections/MidCTA"));
const Differentiators = dynamic(
  () => import("@/components/sections/Differentiators"),
);
const Pricing = dynamic(() => import("@/components/sections/Pricing"));
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
