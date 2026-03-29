"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import Link from "next/link";
import {
  MessageCircle,
  ShieldCheck,
  Star,
  Heart,
  ArrowRight,
  ArrowLeft,
  Eye,
  ThumbsUp,
  Sparkles,
} from "lucide-react";

const chooseFeatures = [
  {
    icon: ShieldCheck,
    title: "Verified profiles",
    description:
      "Every buddy is ID-verified with a real photo. No fake accounts, no bots — just real humans you can trust.",
  },
  {
    icon: Star,
    title: "Ratings & reviews",
    description:
      "See honest reviews from real users. We actively monitor for fake activity so ratings mean something.",
  },
  {
    icon: Sparkles,
    title: "Vibe scores",
    description:
      "Go beyond skills — see vibe tags like Calm, Funny, Professional. Choose someone who matches your energy.",
  },
  {
    icon: Eye,
    title: "Transparent pricing",
    description:
      "See bid amounts, hourly rates, and trust-weighted pricing. No surprises, no hidden fees.",
  },
];

const vibeTags = [
  "Calm", "Friendly", "Funny", "Professional",
  "Listener", "Motivator", "Adventurous", "Reliable",
  "Patient", "Energetic",
];

const reviewExamples = [
  {
    name: "Priya",
    text: "She was so calm and made me feel completely safe during the hospital visit. Would request again!",
    rating: 5,
    category: "Emergency Support",
  },
  {
    name: "Arjun",
    text: "Great travel buddy. Knew the city well and we had an amazing time exploring together.",
    rating: 5,
    category: "Travel Buddy",
  },
  {
    name: "Meera",
    text: "Just needed someone to talk to after a rough week. She listened without judging. Thank you.",
    rating: 5,
    category: "Just Talk",
  },
];

export default function ChoosePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-b from-purple-50/50 to-white pt-16 md:pt-28 pb-10 md:pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <Link
              href="/how-it-works"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-400 hover:text-gray-600 transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to How It Works
            </Link>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-sm font-bold uppercase tracking-widest text-purple-600">
                Step 2
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5 leading-tight">
              Choose with confidence,
              <br />
              <span className="text-gray-400">not just convenience</span>
            </h1>
            <p className="text-lg text-gray-500 max-w-2xl leading-relaxed">
              Check verified profiles, read real reviews, and find your perfect
              match — not just the cheapest option, but the best one for you.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* What You See */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
              Everything you need to decide
            </h2>
            <p className="text-gray-500 text-center max-w-lg mx-auto mb-14">
              We surface the info that matters — so you pick the right person, not just any person.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {chooseFeatures.map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.08}>
                <div className="group bg-white rounded-2xl border border-gray-100 p-7 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full">
                  <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center mb-5 group-hover:bg-purple-50 group-hover:border-purple-200 transition-colors">
                    <item.icon className="w-6 h-6 text-gray-600 group-hover:text-purple-600 transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Vibe Matching */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Choose by vibe, not just by skill
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto mb-12">
              This is what makes HireBuddy different. You're not hiring a
              service — you're choosing a person.
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
              {vibeTags.map((vibe) => (
                <span
                  key={vibe}
                  className="px-6 py-3 rounded-full bg-white border border-gray-200 text-gray-700 font-bold text-sm hover:bg-purple-50 hover:border-purple-200 hover:text-purple-700 transition-all cursor-default"
                >
                  {vibe}
                </span>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.25}>
            <p className="mt-8 text-sm text-gray-400 italic">
              "Choose who feels right."
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Real Reviews */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
              What real users say
            </h2>
            <p className="text-gray-500 text-center max-w-lg mx-auto mb-14">
              Honest reviews from people who've been exactly where you are.
            </p>
          </FadeIn>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {reviewExamples.map((review, i) => (
              <FadeIn key={review.name} delay={i * 0.1}>
                <div className="bg-gray-50 rounded-2xl p-7 border border-gray-100 h-full flex flex-col">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: review.rating }).map((_, j) => (
                      <Star
                        key={j}
                        className="w-4 h-4 text-yellow-400 fill-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed mb-5 flex-1 italic">
                    "{review.text}"
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-gray-900">
                      — {review.name}
                    </span>
                    <span className="text-xs text-gray-400 font-semibold">
                      {review.category}
                    </span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              See it in action
            </h2>
            <p className="text-gray-500 max-w-md mx-auto mb-8">
              Browse real buddy profiles and find someone you'd actually want to
              meet.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/buddies"
                className="px-8 py-4 bg-primary text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all"
              >
                Browse Buddies
              </Link>
              <Link
                href="/how-it-works/connect"
                className="px-8 py-4 bg-white text-gray-700 font-bold rounded-full border-2 border-gray-200 hover:border-gray-300 hover:shadow-md transition-all inline-flex items-center gap-2"
              >
                Next: How to Connect
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
