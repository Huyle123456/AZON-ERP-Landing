"use client";

import FloatingContact from "@/components/layout/FloatingContact";
import Footer from "@/components/layout/Footer";
import FooterBackdrop from "@/components/layout/FooterBackdrop";
import Header from "@/components/layout/Header";
import AppFeatures from "@/components/sections/AppFeatures";
import CTASection from "@/components/sections/CTASection";
import Differentiators from "@/components/sections/Differentiators";
import Pricing from "@/components/sections/Pricing";
import ESSHighlight from "@/components/sections/ESSHighlight";
import FeatureDeepDive from "@/components/sections/FeatureDeepDive";
import FeaturesGrid from "@/components/sections/FeaturesGrid";
import MidCTA from "@/components/sections/MidCTA";
import HeroSection from "@/components/sections/HeroSection";
import News from "@/components/sections/News";
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
