"use client";

import { Hero } from "@/components/feature/Hero";
import { SocialProof } from "@/components/feature/SocialProof";
import { CategoriesGrid } from "@/components/feature/CategoriesGrid";
import { BuddyCarousel } from "@/components/feature/BuddyCarousel";
import { FeatureBlock } from "@/components/feature/FeatureBlock";
import { HowItWorks } from "@/components/feature/HowItWorks";
import { EmotionalCTA } from "@/components/feature/EmotionalCTA";
import { PostSituationBanner } from "@/components/feature/PostSituationBanner";

export default function Home() {
  return (
    <>
      <Hero />

      <PostSituationBanner />
      
      <SocialProof />
      
      <CategoriesGrid />
      
      <BuddyCarousel />
      
      {/* Gradient Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent w-full max-w-7xl mx-auto" />

      {/* Feature 1: Safety - Gray Background with Overlap Effect */}
      <FeatureBlock 
        title="Safety First. Verified Buddies."
        description="Your peace of mind is our priority. Every buddy undergoes strict government ID verification and background checks, ensuring a safe and trusted community for everyone."
        image="https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&q=80&w=1200"
        align="left"
        className="bg-white -mt-12 md:-mt-16 relative z-10 rounded-t-[2.5rem]"
      />

      {/* Feature 2: Real Connections - White Background */}
      <FeatureBlock 
        title="Real Connections. No Robots."
        description="Find someone who matches your vibe. From professional help to casual company, connect with people who care."
        image="https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=1200"
        align="right"
        className="bg-white border-t border-gray-100"
      />

      <HowItWorks />
      
      <EmotionalCTA />
    </>
  );
}
