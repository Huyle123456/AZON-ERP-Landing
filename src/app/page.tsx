"use client";

import AppFeatures from "@/components/sections/AppFeatures";
import Differentiators from "@/components/sections/Differentiators";
import ESSHighlight from "@/components/sections/ESSHighlight";
import FeatureDeepDive from "@/components/sections/FeatureDeepDive";
import FeaturesGrid from "@/components/sections/FeaturesGrid";
import HeroSection from "@/components/sections/HeroSection";
import MidCTA from "@/components/sections/MidCTA";
import News from "@/components/sections/News";
import Pricing from "@/components/sections/Pricing";
import SocialProof from "@/components/sections/SocialProof";

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
