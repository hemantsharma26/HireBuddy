"use client";

import { useState } from "react";
import { SupportOfferBidder } from "@/components/feature/SupportOfferBidder";
import { FadeIn } from "@/components/ui/FadeIn";
import Link from "next/link";
import {
  Zap,
  Tag,
  Star,
  ArrowRight,
  CheckCircle,
  ShieldCheck,
  Clock,
  Users,
  Sparkles,
  FileEdit,
  Heart,
  MessageCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

type HireMode = "instant" | "smart" | "premium";

/* ─────────────────────────────────────────────
   DATA
   ───────────────────────────────────────────── */

const categories = [
  "Movie Companion",
  "Travel Buddy",
  "Emotional Support",
  "Shopping Buddy",
  "AC Repair",
  "Night Safety",
  "Just Talk",
  "Emergency Help",
  "Electricity Issue",
  "Medicine Delivery",
];

const steps = [
  {
    icon: FileEdit,
    title: "Describe your need",
    description: "Tell us what kind of help you're looking for.",
  },
  {
    icon: Users,
    title: "Choose your style",
    description: "Pick Instant, Support Offer, or Premium — whatever feels right.",
  },
  {
    icon: Heart,
    title: "Get matched",
    description: "We connect you with a real, verified person nearby.",
  },
];

const trustPoints = [
  { icon: ShieldCheck, text: "Government ID verified" },
  { icon: Star, text: "Trust scored & reviewed" },
  { icon: Clock, text: "Average match in 3 minutes" },
  { icon: MessageCircle, text: "Chat before confirming" },
];

/* ─────────────────────────────────────────────
   PAGE
   ───────────────────────────────────────────── */

export default function HirePage() {
  const [selectedMode, setSelectedMode] = useState<HireMode>("smart");
  const [bidAmount, setBidAmount] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("Movie Companion");

  const modes = [
    {
      id: "instant" as HireMode,
      icon: Zap,
      title: "Instant Hire",
      description: "Fixed price. Auto-matched in 2 mins.",
      price: "₹850",
      priceLabel: "Fixed price",
      badgeText: "Fastest",
      badgeColor: "bg-blue-50 text-blue-600",
      borderActive: "border-blue-500 bg-blue-50/30 ring-2 ring-blue-500/20",
      borderDefault: "border-gray-200 hover:border-blue-300",
      iconBg: "bg-blue-100 text-blue-600",
    },
    {
      id: "smart" as HireMode,
      icon: Tag,
      title: "Support Offer",
      description: "You set the price. Best value.",
      price: "You decide",
      priceLabel: "Flexible pricing",
      badgeText: "Most Popular",
      badgeColor: "bg-primary/10 text-primary",
      borderActive: "border-primary bg-primary/5 ring-2 ring-primary/20",
      borderDefault: "border-gray-200 hover:border-primary/40",
      iconBg: "bg-orange-100 text-orange-600",
    },
    {
      id: "premium" as HireMode,
      icon: Star,
      title: "Premium Only",
      description: "Top rated (4.8+). VIP experience.",
      price: "₹1200+",
      priceLabel: "Starting from",
      badgeText: "Top 1%",
      badgeColor: "bg-purple-50 text-purple-600",
      borderActive: "border-purple-500 bg-purple-50/30 ring-2 ring-purple-500/20",
      borderDefault: "border-gray-200 hover:border-purple-300",
      iconBg: "bg-purple-100 text-purple-600",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* ═══════════════════════════════════════
          HERO
          ═══════════════════════════════════════ */}
      <section className="bg-gradient-to-b from-gray-50 to-white pt-16 md:pt-28 pb-10 md:pb-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <FadeIn>
            <p className="text-sm font-bold uppercase tracking-widest text-primary mb-4">
              Post Your Need
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5 leading-tight">
              Tell us what you need.
              <br />
              <span className="text-gray-400">We'll find the right person.</span>
            </h1>
            <p className="text-lg text-gray-500 max-w-xl mx-auto">
              Whether it's urgent help or just company — describe your need, choose
              how you want to hire, and get matched with a real, trusted buddy.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          STEP 1: CHOOSE CATEGORY
          ═══════════════════════════════════════ */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <FadeIn>
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-xs font-bold tracking-widest text-primary uppercase">
                Step 1
              </span>
              <h2 className="text-2xl font-bold text-gray-900">
                What do you need help with?
              </h2>
            </div>
            <p className="text-gray-500 text-sm mb-8">
              Pick a category that best describes your situation.
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="flex flex-wrap gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={cn(
                    "px-5 py-2.5 rounded-xl text-sm font-bold transition-all border",
                    selectedCategory === cat
                      ? "bg-gray-900 text-white border-gray-900 shadow-md scale-105"
                      : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          STEP 2: CHOOSE HIRE MODE
          ═══════════════════════════════════════ */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <FadeIn>
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-xs font-bold tracking-widest text-primary uppercase">
                Step 2
              </span>
              <h2 className="text-2xl font-bold text-gray-900">
                How do you want to hire?
              </h2>
            </div>
            <p className="text-gray-500 text-sm mb-8">
              Choose the option that feels right for you.
            </p>
          </FadeIn>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 mb-10">
            {modes.map((mode, i) => (
              <FadeIn key={mode.id} delay={i * 0.08}>
                <div
                  onClick={() => setSelectedMode(mode.id)}
                  className={cn(
                    "cursor-pointer border-2 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg relative",
                    selectedMode === mode.id
                      ? mode.borderActive
                      : mode.borderDefault
                  )}
                >
                  {/* Active Indicator */}
                  {selectedMode === mode.id && (
                    <div className="absolute top-4 right-4">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                  )}

                  {/* Badge */}
                  <span
                    className={cn(
                      "inline-block text-xs font-bold px-3 py-1 rounded-full mb-4",
                      mode.badgeColor
                    )}
                  >
                    {mode.badgeText}
                  </span>

                  {/* Icon */}
                  <div
                    className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center mb-4",
                      mode.iconBg
                    )}
                  >
                    <mode.icon className="w-6 h-6" />
                  </div>

                  {/* Text */}
                  <h3 className="font-bold text-lg text-gray-900 mb-1">
                    {mode.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-5">
                    {mode.description}
                  </p>

                  {/* Price */}
                  <div className="border-t border-gray-100 pt-4">
                    <p className="text-2xl font-bold text-gray-900">
                      {mode.price}
                    </p>
                    <p className="text-xs text-gray-400">{mode.priceLabel}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Mode-specific detail panel */}
          <FadeIn delay={0.25}>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
              {selectedMode === "smart" && (
                <div className="max-w-xl mx-auto">
                  <h3 className="text-xl font-bold text-gray-900 mb-1 text-center">
                    Set your Support Offer
                  </h3>
                  <p className="text-sm text-gray-500 mb-6 text-center">
                    for <span className="font-semibold text-gray-800">{selectedCategory}</span>
                  </p>
                  <SupportOfferBidder
                    taskType="movie"
                    onBidChange={setBidAmount}
                  />
                </div>
              )}

              {selectedMode === "instant" && (
                <div className="text-center py-6">
                  <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto mb-5">
                    <Zap className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Instant Match
                  </h3>
                  <p className="text-gray-500 text-sm mb-6 max-w-md mx-auto">
                    We'll match you with the nearest available buddy for{" "}
                    <span className="font-semibold text-gray-800">{selectedCategory}</span>{" "}
                    immediately. No waiting, no bidding.
                  </p>
                  <div className="text-4xl font-bold text-gray-900 mb-1">₹850</div>
                  <p className="text-sm text-gray-400">Fixed Platform Price</p>
                </div>
              )}

              {selectedMode === "premium" && (
                <div className="text-center py-6">
                  <div className="w-16 h-16 rounded-2xl bg-purple-50 flex items-center justify-center mx-auto mb-5">
                    <Sparkles className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Premium Selection
                  </h3>
                  <p className="text-gray-500 text-sm mb-6 max-w-md mx-auto">
                    Access the top 1% of trusted companions for{" "}
                    <span className="font-semibold text-gray-800">{selectedCategory}</span>.
                    Rated 4.8+ with verified backgrounds.
                  </p>
                  <div className="text-4xl font-bold text-gray-900 mb-1">₹1200+</div>
                  <p className="text-sm text-gray-400">Starting from</p>
                </div>
              )}

              {/* CTA Button */}
              <div className="mt-8 flex justify-center">
                <button className="bg-primary text-white hover:bg-primary/90 font-bold text-base px-10 py-4 rounded-full flex items-center gap-3 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 active:scale-95">
                  Continue to Request
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          HOW IT WORKS MINI
          ═══════════════════════════════════════ */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <FadeIn>
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">
              How hiring a buddy works
            </h2>
          </FadeIn>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <FadeIn key={step.title} delay={i * 0.1}>
                <div className="text-center group">
                  <div className="w-14 h-14 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-center mx-auto mb-5 group-hover:shadow-md group-hover:border-gray-300 transition-all">
                    <step.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-base font-bold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-500">{step.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          TRUST STRIP
          ═══════════════════════════════════════ */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <FadeIn>
            <div className="flex flex-wrap justify-center gap-6">
              {trustPoints.map((item, i) => (
                <div
                  key={item.text}
                  className="flex items-center gap-2.5 bg-white rounded-xl px-5 py-3 border border-gray-100 shadow-sm"
                >
                  <item.icon className="w-4.5 h-4.5 text-secondary flex-shrink-0" />
                  <span className="text-sm font-semibold text-gray-700">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FINAL CTA
          ═══════════════════════════════════════ */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              Not sure what to post?
            </h2>
            <p className="text-gray-500 max-w-md mx-auto mb-8">
              Browse real buddies first. See who's available, read reviews, and
              find someone who feels right.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/buddies"
                className="px-8 py-3.5 bg-white text-gray-700 font-bold rounded-full border-2 border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-300 inline-flex items-center gap-2"
              >
                Browse Buddies
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/explore"
                className="px-8 py-3.5 text-sm font-bold text-primary hover:underline inline-flex items-center gap-2"
              >
                Explore use cases
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
