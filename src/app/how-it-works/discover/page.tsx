"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  MapPin,
  Filter,
  Heart,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Globe,
  Tag,
} from "lucide-react";

const discoveryWays = [
  {
    icon: Search,
    title: "Search by category",
    description:
      "Whether you need AC repair, a travel buddy, or just someone to talk to — find the right category instantly.",
  },
  {
    icon: MapPin,
    title: "Location-based matching",
    description:
      "We prioritize buddies near you so help arrives fast. Real people, real neighborhoods.",
  },
  {
    icon: Filter,
    title: "Filter by vibe & style",
    description:
      "Not just skills — filter by personality. Want someone calm? Funny? Professional? You decide.",
  },
  {
    icon: Heart,
    title: "Shared interests",
    description:
      "Find buddies who share your hobbies, language, or background for a more natural connection.",
  },
];

const categories = [
  { name: "Everyday Help", emoji: "🛠", desc: "Repairs, moving, errands" },
  { name: "Emotional Support", emoji: "❤️", desc: "Talk, listen, feel heard" },
  { name: "Lifestyle & Fun", emoji: "🎬", desc: "Movies, travel, events" },
  { name: "Emergency", emoji: "🏥", desc: "Late-night, medicine, hospital" },
  { name: "Social Life", emoji: "🛍", desc: "Shopping, gym, city explore" },
  { name: "Just Company", emoji: "🧍", desc: "New city? Find someone" },
];

export default function DiscoverPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-b from-green-50/50 to-white pt-16 md:pt-28 pb-10 md:pb-16">
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
              <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center">
                <Search className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-sm font-bold uppercase tracking-widest text-green-600">
                Step 1
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5 leading-tight">
              Discover the right buddy
              <br />
              <span className="text-gray-400">for any moment</span>
            </h1>
            <p className="text-lg text-gray-500 max-w-2xl leading-relaxed">
              Search for buddies by category, location, or shared interests.
              HireBuddy makes it easy to find real people who match your need
              and your vibe.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* How Discovery Works */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
              How discovery works
            </h2>
            <p className="text-gray-500 text-center max-w-lg mx-auto mb-14">
              Finding the right person is simple, fast, and personal.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {discoveryWays.map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.08}>
                <div className="group bg-white rounded-2xl border border-gray-100 p-7 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full">
                  <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center mb-5 group-hover:bg-green-50 group-hover:border-green-200 transition-colors">
                    <item.icon className="w-6 h-6 text-gray-600 group-hover:text-green-600 transition-colors" />
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

      {/* Browse Categories */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
              Explore real-life categories
            </h2>
            <p className="text-gray-500 text-center max-w-lg mx-auto mb-14">
              Not job categories — human situations.
            </p>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {categories.map((cat, i) => (
              <FadeIn key={cat.name} delay={i * 0.06}>
                <Link
                  href="/buddies"
                  className="group flex items-center gap-4 bg-white rounded-2xl border border-gray-100 px-6 py-5 hover:shadow-lg hover:border-gray-200 transition-all duration-300"
                >
                  <span className="text-3xl">{cat.emoji}</span>
                  <div className="flex-1">
                    <p className="font-bold text-gray-900 group-hover:text-primary transition-colors">
                      {cat.name}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">{cat.desc}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Collage */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Real people, real moments
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto mb-12">
              Every buddy is someone's neighbor, friend, or community member.
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto">
              <div className="rounded-2xl overflow-hidden aspect-[3/4] shadow-sm">
                <Image
                  src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=400"
                  alt="Buddy helping"
                  width={400}
                  height={530}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-2xl overflow-hidden aspect-[3/4] shadow-sm -mt-6">
                <Image
                  src="https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&q=80&w=400"
                  alt="People connecting"
                  width={400}
                  height={530}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-2xl overflow-hidden aspect-[3/4] shadow-sm mt-4">
                <Image
                  src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=400"
                  alt="Community"
                  width={400}
                  height={530}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA  */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ready to discover?
            </h2>
            <p className="text-gray-500 max-w-md mx-auto mb-8">
              Browse buddies near you and find the right person today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/buddies"
                className="px-8 py-4 bg-primary text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all"
              >
                Browse Buddies
              </Link>
              <Link
                href="/how-it-works/choose"
                className="px-8 py-4 bg-white text-gray-700 font-bold rounded-full border-2 border-gray-200 hover:border-gray-300 hover:shadow-md transition-all inline-flex items-center gap-2"
              >
                Next: How to Choose
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
