"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  Users,
  ArrowRight,
  MapPin,
  Heart,
  X,
  Sparkles,
  Radio,
} from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { EmptyState } from "@/components/feature/EmptyState";
import { SocialProofStrip } from "@/components/trust";
import { FirstTimeNudge } from "@/components/ui/FirstTimeNudge";
import { cn } from "@/lib/utils";
import { cities, type City } from "@/data/explore";

/* ═══════════════════════════════════════════════════
   Cities — Hyperlocal Discovery
   Find people around you.
   ═══════════════════════════════════════════════════ */

function CityCard({ city, delay }: { city: City; delay: number }) {
  return (
    <FadeIn delay={delay}>
      <Link
        href="/buddies"
        className="block group bg-white border border-gray-100 rounded-[1.25rem] p-6 shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-300"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary/70" />
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors">
              {city.name}
            </h3>
          </div>
          {city.activeNow > 0 && (
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-primary">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/60 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              {city.activeNow} active
            </span>
          )}
        </div>

        <p className="text-xs text-gray-400 font-medium mb-1">{city.state}</p>
        <p className="text-sm text-gray-500 mb-5">
          {city.buddyCount.toLocaleString()} people available tonight
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <Users className="w-3.5 h-3.5" />
            <span className="font-medium">
              {city.buddyCount.toLocaleString()} buddies
            </span>
          </div>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
            Explore <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </Link>
    </FadeIn>
  );
}

export default function CitiesPage() {
  const [search, setSearch] = useState("");

  const featured = cities.filter((c) => c.featured);

  const filtered = useMemo(() => {
    if (!search.trim()) return cities;
    const q = search.toLowerCase();
    return cities.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.state.toLowerCase().includes(q)
    );
  }, [search]);

  const totalActive = cities.reduce((sum, c) => sum + c.activeNow, 0);

  return (
    <main className="min-h-screen bg-white">
      {/* ── HERO ── */}
      <section className="relative overflow-hidden">
        {/* Banner Image */}
        <Image
          src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80&w=1920"
          alt="Cities banner"
          fill
          priority
          className="object-cover"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a]/85 via-[#1e1b4b]/80 to-[#312e81]/85" />

        <div className="hidden sm:block absolute top-1/4 left-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full bg-purple-500/10 blur-[120px] pointer-events-none" />
        <div className="hidden sm:block absolute bottom-0 right-1/4 w-[250px] md:w-[400px] h-[250px] md:h-[400px] rounded-full bg-primary/5 blur-[100px] pointer-events-none" />

        <div className="container-custom relative pt-16 md:pt-24 pb-14 md:pb-20 text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-white/70 text-xs font-semibold mb-6 border border-white/10">
              <MapPin className="w-3.5 h-3.5 text-primary" />
              Local Discovery
            </div>
          </FadeIn>

          <FadeIn delay={0.05}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 tracking-tight leading-[1.1]">
              Find people around you.
            </h1>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p className="text-lg md:text-xl text-white/60 max-w-lg mx-auto mb-6 leading-relaxed font-medium">
              Real connections start close to home.
            </p>
            <SocialProofStrip variant="dark" className="mb-8 mx-auto" />
          </FadeIn>

          {/* Search bar */}
          <FadeIn delay={0.15}>
            <div className="relative max-w-xl mx-auto">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-purple-400/20 rounded-full blur opacity-50 group-hover:opacity-70 transition duration-500" />
                <div className="relative bg-white p-2 pl-6 rounded-full shadow-lg flex items-center transition-all focus-within:ring-2 focus-within:ring-primary/20">
                  <Search className="h-5 w-5 text-gray-400 mr-3 shrink-0" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search cities..."
                    className="flex-1 bg-transparent outline-none text-gray-900 placeholder:text-gray-400 h-10 md:h-12 text-base md:text-lg"
                  />
                  {search ? (
                    <button
                      onClick={() => setSearch("")}
                      className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  ) : (
                    <button className="bg-primary hover:bg-[#F03541] text-white rounded-full p-3 md:px-6 md:py-3 font-bold transition-transform active:scale-95 shadow-md">
                      <Search className="h-5 w-5 md:hidden" />
                      <span className="hidden md:inline">Find my city</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.25}>
            <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-sm text-white/40 font-medium">
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary/80" />
                {cities.length} cities
              </span>
              <span className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-purple-400/80" />
                {totalActive} people active now
              </span>
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="container-custom py-10 md:py-16 space-y-16 md:space-y-24">
        <FirstTimeNudge
          id="cities-first-visit"
          text="Search for your city or browse popular ones. Buddies are available across 24+ cities."
        />
        {/* ── Popular cities ── */}
        {!search && (
          <section>
            <FadeIn>
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-5 h-5 text-primary" />
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
                  Popular Cities
                </h2>
              </div>
            </FadeIn>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {featured.map((c, i) => (
                <CityCard key={c.id} city={c} delay={i * 0.05} />
              ))}
            </div>
          </section>
        )}

        {/* ── All / search results ── */}
        <section>
          <FadeIn>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 tracking-tight">
              {search ? `People near "${search}"` : "Everywhere people connect"}
            </h2>
            <p className="text-gray-500 mb-8">
              {filtered.length} cit{filtered.length !== 1 ? "ies" : "y"} with active buddies
            </p>
          </FadeIn>

          {filtered.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((c, i) => (
                <CityCard key={c.id} city={c} delay={i * 0.03} />
              ))}
            </div>
          ) : (
            <EmptyState variant="cities" />
          )}
        </section>

        {/* ── CTA banner ── */}
        <section>
          <FadeIn>
            <div className="relative rounded-[1.5rem] px-6 py-10 md:px-12 md:py-14 text-center overflow-hidden">
              {/* Banner Image */}
              <Image
                src="https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&q=80&w=1920"
                alt="City expansion banner"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-gray-900/85 to-gray-800/90" />
              <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 right-0 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
              <div className="relative z-10">
                <Heart className="w-8 h-8 text-primary/80 mx-auto mb-4" />
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight">
                  Your city isn&rsquo;t listed yet?
                </h2>
                <p className="text-white/50 max-w-md mx-auto mb-8">
                  We&rsquo;re expanding fast. Post your situation and be the first in your city.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link
                    href="/post-request"
                    className="inline-flex items-center gap-2 bg-[#FF6B6B] hover:bg-[#ff5252] text-white rounded-full px-8 py-4 font-bold text-base transition-all hover:scale-105 active:scale-95 shadow-xl shadow-red-500/20"
                  >
                    Post Your Situation
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/buddies"
                    className="inline-flex items-center gap-2 text-white/50 hover:text-white font-semibold px-5 py-3 rounded-full transition-colors text-sm border border-white/10 hover:border-white/20"
                  >
                    Browse all buddies
                  </Link>
                </div>
              </div>
            </div>
          </FadeIn>
        </section>
      </div>
    </main>
  );
}
