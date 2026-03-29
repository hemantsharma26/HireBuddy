"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { FadeInView } from "@/components/ui/FadeInView";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Star,
  MessageCircle,
  AlertTriangle,
  TrendingUp,
  Sparkles,
  FileEdit,
  Users,
  Heart,
  Lock,
} from "lucide-react";
import { SocialProofStrip } from "@/components/trust";
import { FirstTimeNudge } from "@/components/ui/FirstTimeNudge";
import { IconRenderer } from "@/components/ui/IconRenderer";

/* ─────────────────────────────────────────────
   DATA
   ───────────────────────────────────────────── */

const situations = [
  {
    iconName: "Wrench",
    title: "Everyday Help",
    description: "Fix something. Move something. Get something done.",
    image:
      "https://images.unsplash.com/photo-1581092921461-eab62e97a783?auto=format&fit=crop&q=80&w=600",
    color: "from-amber-50 to-orange-50",
  },
  {
    iconName: "Heart",
    title: "Emotional Support",
    description: "Talk to someone. Vent. Feel heard.",
    image:
      "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&q=80&w=600",
    color: "from-rose-50 to-pink-50",
  },
  {
    iconName: "PartyPopper",
    title: "Lifestyle & Fun",
    description: "Movie companion. Travel buddy. Event partner.",
    image:
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&q=80&w=600",
    color: "from-violet-50 to-purple-50",
  },
  {
    iconName: "AlertCircle",
    title: "Emergency Support",
    description: "Late-night help. Medicine pickup. Hospital visit.",
    image:
      "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&q=80&w=600",
    color: "from-red-50 to-rose-50",
  },
  {
    iconName: "Users",
    title: "Social & Daily Life",
    description: "Shopping buddy. Gym partner. City exploration.",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=600",
    color: "from-emerald-50 to-teal-50",
  },
  {
    iconName: "User",
    title: "Just Someone There",
    description: "New city? Feeling alone? Find company.",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=600",
    color: "from-sky-50 to-blue-50",
  },
];

const trendingTasks = [
  { label: "Late night companionship", count: "2.4k requests" },
  { label: "AC repair help", count: "1.8k requests" },
  { label: "First date wing support", count: "950 requests" },
  { label: "Moving house help", count: "1.2k requests" },
  { label: "Study partner", count: "3.1k requests" },
  { label: "Elder support visits", count: "780 requests" },
];

const vibes = [
  "Calm", "Friendly", "Funny", "Professional",
  "Listener", "Motivator", "Adventurous", "Reliable",
];

const safetyPoints = [
  { icon: ShieldCheck, label: "Verified profiles" },
  { icon: Star, label: "Trust scores" },
  { icon: MessageCircle, label: "Reviews from real users" },
  { icon: Lock, label: "Private communication" },
  { icon: AlertTriangle, label: "Reporting tools" },
];

const steps = [
  {
    num: "01",
    title: "Post what you need",
    desc: "Describe your situation — big or small.",
    icon: FileEdit,
  },
  {
    num: "02",
    title: "Get trusted responses",
    desc: "Verified buddies reach out to you.",
    icon: Users,
  },
  {
    num: "03",
    title: "Choose who feels right",
    desc: "Pick someone based on vibe, not just price.",
    icon: Heart,
  },
];

/* ─────────────────────────────────────────────
   PAGE
   ───────────────────────────────────────────── */

export default function ExplorePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* ═══════════════════════════════════════
          1️⃣  HERO — Inspire Curiosity
          ═══════════════════════════════════════ */}
      <section className="bg-gradient-to-b from-gray-50 to-white pt-10 pb-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <FadeIn>
            <p className="text-sm font-bold uppercase tracking-widest text-primary mb-4">
              Discover · Inspire · Connect
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Explore what you can do
              <br />
              <span className="text-gray-400">with HireBuddy</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
              From fixing a light to finding someone to talk to — discover the
              many ways people support each other.
            </p>
          </FadeIn>

          {/* Soft Collage */}
          <FadeIn delay={0.2}>
            <div className="mt-14 grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
              <div className="rounded-2xl overflow-hidden aspect-[3/4] shadow-soft">
                <Image
                  src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=400"
                  alt="Friends helping"
                  width={400}
                  height={530}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-2xl overflow-hidden aspect-[3/4] shadow-soft -mt-8">
                <Image
                  src="https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&q=80&w=400"
                  alt="People connecting"
                  width={400}
                  height={530}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-2xl overflow-hidden aspect-[3/4] shadow-soft mt-4">
                <Image
                  src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=400"
                  alt="Community moments"
                  width={400}
                  height={530}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="mt-8 text-sm text-gray-400 italic">
              Real people. Real moments.
            </p>
            <SocialProofStrip variant="dark" className="mt-4 mx-auto" />
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          2️⃣  REAL-LIFE SITUATIONS
          ═══════════════════════════════════════ */}
      <FirstTimeNudge
        id="explore-first-visit"
        text="Scroll down to see real situations people post — from late-night company to moving help."
      />
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <p className="text-sm font-bold uppercase tracking-widest text-primary mb-3 text-center">
              Life Problems → Human Solutions
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 text-center mb-4">
              When life needs a little help
            </h2>
            <p className="text-gray-500 text-center max-w-xl mx-auto mb-14">
              Not services — human support. For every moment that matters.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {situations.map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.08}>
                <div className="group relative bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={600}
                      height={375}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute bottom-4 left-4 bg-white/20 backdrop-blur-md rounded-xl p-2 border border-white/30">
                      <IconRenderer name={item.iconName} className="w-6 h-6 text-white" strokeWidth={2} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 text-sm mb-6 flex-1">
                      {item.description}
                    </p>
                    <Link
                      href="/buddies"
                      className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:gap-3 transition-all"
                    >
                      Explore buddies
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          3️⃣  TRENDING RIGHT NOW
          ═══════════════════════════════════════ */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <div className="flex items-center gap-3 justify-center mb-3">
              <TrendingUp className="w-5 h-5 text-primary" />
              <p className="text-sm font-bold uppercase tracking-widest text-primary">
                Trending
              </p>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 text-center mb-4">
              People are hiring buddies for…
            </h2>
            <p className="text-gray-500 text-center max-w-lg mx-auto mb-14">
              See what others are finding help with right now.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {trendingTasks.map((task, i) => (
              <FadeIn key={task.label} delay={i * 0.06}>
                <Link
                  href="/buddies"
                  className="group flex items-center justify-between bg-white rounded-2xl border border-gray-100 px-6 py-5 hover:shadow-lg hover:border-gray-200 transition-all duration-300"
                >
                  <div>
                    <p className="font-bold text-gray-900 group-hover:text-primary transition-colors">
                      {task.label}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">{task.count}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          4️⃣  EXPLORE BY VIBE
          ═══════════════════════════════════════ */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <FadeIn>
            <div className="flex items-center gap-2 justify-center mb-3">
              <Sparkles className="w-5 h-5 text-purple-500" />
              <p className="text-sm font-bold uppercase tracking-widest text-purple-500">
                Unique to HireBuddy
              </p>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Find someone who matches your vibe
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto mb-12">
              Choose who feels right. Not just who's available.
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
              {vibes.map((vibe) => (
                <Link
                  key={vibe}
                  href={`/buddies?vibe=${vibe}`}
                  className="group px-6 py-3 rounded-full bg-gray-50 border border-gray-200 text-gray-700 font-bold text-sm hover:bg-gray-900 hover:text-white hover:border-gray-900 hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  {vibe}
                </Link>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.25}>
            <p className="mt-10 text-sm text-gray-400 italic">
              "Not services — human support."
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          5️⃣  HOW IT ACTUALLY WORKS
          ═══════════════════════════════════════ */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 text-center mb-4">
              How it actually works
            </h2>
            <p className="text-gray-500 text-center max-w-lg mx-auto mb-14">
              Three simple steps to finding the help you need.
            </p>
          </FadeIn>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {steps.map((step, i) => (
              <FadeIn key={step.num} delay={i * 0.1}>
                <div className="text-center group">
                  <div className="w-16 h-16 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg group-hover:border-gray-300 transition-all">
                    <step.icon className="w-7 h-7 text-primary" />
                  </div>
                  <span className="text-xs font-bold text-gray-300 tracking-widest">
                    STEP {step.num}
                  </span>
                  <h3 className="text-lg font-bold text-gray-900 mt-2 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-500">{step.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.35}>
            <div className="text-center mt-12">
              <Link
                href="/how-it-works"
                className="text-sm font-bold text-primary hover:underline inline-flex items-center gap-1"
              >
                Learn more about how it works
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          6️⃣  SAFETY REASSURANCE
          ═══════════════════════════════════════ */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
              Designed with safety in mind
            </h2>
            <p className="text-gray-500 text-center max-w-lg mx-auto mb-14">
              Your comfort and security come first. Always.
            </p>
          </FadeIn>

          <div className="flex flex-wrap justify-center gap-6 max-w-3xl mx-auto">
            {safetyPoints.map((point, i) => (
              <FadeIn key={point.label} delay={i * 0.06}>
                <div className="flex items-center gap-3 bg-gray-50 rounded-2xl px-6 py-4 border border-gray-100">
                  <point.icon className="w-5 h-5 text-secondary flex-shrink-0" />
                  <span className="text-sm font-semibold text-gray-700">
                    {point.label}
                  </span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          7️⃣  FINAL CTA
          ═══════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Whatever you need —<br />
              <span className="text-gray-400">
                you don't have to do it alone.
              </span>
            </h2>
            <p className="text-gray-500 max-w-md mx-auto mb-10">
              Real people are ready to help. Find your buddy today.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/buddies"
                className="px-8 py-4 bg-primary text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-base"
              >
                Find a Buddy
              </Link>
              <Link
                href="/hire"
                className="px-8 py-4 bg-white text-gray-700 font-bold rounded-full border-2 border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-300 text-base"
              >
                Post Your Need
              </Link>
            </div>

            <p className="mt-10 text-xs text-gray-400 tracking-wide">
              Choose who feels right.
            </p>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
