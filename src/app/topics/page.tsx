"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Heart,
  Users,
  Calendar,
  MessageCircle,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { SocialProofStrip } from "@/components/trust";
import { cn } from "@/lib/utils";
import { IconRenderer } from "@/components/ui/IconRenderer";
import { topics, type Topic } from "@/data/explore";

/* ═══════════════════════════════════════════════════
   Topics — Conversation-first Discovery
   Start with how you feel, not what you need.
   ═══════════════════════════════════════════════════ */

function TopicCard({
  topic,
  isSelected,
  onClick,
  delay,
}: {
  topic: Topic;
  isSelected: boolean;
  onClick: () => void;
  delay: number;
}) {
  return (
    <FadeIn delay={delay}>
      <button
        onClick={onClick}
        className={cn(
          "w-full text-left rounded-[1.25rem] p-5 md:p-6 border transition-all duration-300 group",
          isSelected
            ? "bg-primary/5 border-primary/20 shadow-md"
            : "bg-white border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200"
        )}
      >
        <div className="flex items-start gap-4">
          <div className="mt-1 bg-gray-50 p-2.5 rounded-xl border border-gray-100 group-hover:bg-primary/10 group-hover:border-primary/20 transition-all">
            <IconRenderer name={topic.iconName} className="w-6 h-6 text-primary" strokeWidth={1.5} />
          </div>
          <div className="flex-1 min-w-0">
            <h3
              className={cn(
                "text-lg font-bold mb-1 transition-colors",
                isSelected ? "text-primary" : "text-gray-900 group-hover:text-primary"
              )}
            >
              {topic.name}
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed mb-3">
              {topic.description}
            </p>
            <div className="flex flex-wrap gap-3 text-xs text-gray-400">
              <span className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                {topic.buddyCount} buddies
              </span>
              <span className="flex items-center gap-1">
                <MessageCircle className="w-3 h-3" />
                {topic.groupCount} groups
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {topic.eventCount} events
              </span>
            </div>
          </div>
          <ChevronRight
            className={cn(
              "w-5 h-5 shrink-0 mt-2 transition-all",
              isSelected ? "text-primary translate-x-0.5" : "text-gray-300 group-hover:text-gray-500"
            )}
          />
        </div>
      </button>
    </FadeIn>
  );
}

function TopicDetail({ topic }: { topic: Topic }) {
  return (
    <FadeIn>
      <div className="bg-white border border-gray-100 rounded-[1.25rem] p-6 md:p-8 shadow-sm">
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-primary/10 p-4 rounded-2xl border border-primary/20">
            <IconRenderer name={topic.iconName} className="w-10 h-10 text-primary" strokeWidth={1.5} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{topic.name}</h2>
            <p className="text-sm text-gray-500">{topic.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-50 rounded-2xl p-4 text-center">
            <p className="text-2xl font-extrabold text-gray-900 tracking-tight">{topic.buddyCount}</p>
            <p className="text-xs text-gray-400 font-medium mt-0.5">Buddies</p>
          </div>
          <div className="bg-gray-50 rounded-2xl p-4 text-center">
            <p className="text-2xl font-extrabold text-gray-900 tracking-tight">{topic.groupCount}</p>
            <p className="text-xs text-gray-400 font-medium mt-0.5">Groups</p>
          </div>
          <div className="bg-gray-50 rounded-2xl p-4 text-center">
            <p className="text-2xl font-extrabold text-gray-900 tracking-tight">{topic.eventCount}</p>
            <p className="text-xs text-gray-400 font-medium mt-0.5">Events</p>
          </div>
        </div>

        <div className="space-y-3">
          <Link
            href="/buddies"
            className="flex items-center justify-between w-full px-5 py-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-primary/70" />
              <div>
                <p className="text-sm font-bold text-gray-900">Find buddies</p>
                <p className="text-xs text-gray-400">
                  People who understand {topic.name.toLowerCase()}
                </p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
          </Link>

          <Link
            href="/groups"
            className="flex items-center justify-between w-full px-5 py-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <MessageCircle className="w-5 h-5 text-primary/70" />
              <div>
                <p className="text-sm font-bold text-gray-900">Join groups</p>
                <p className="text-xs text-gray-400">
                  Circles focused on {topic.name.toLowerCase()}
                </p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
          </Link>

          <Link
            href="/events"
            className="flex items-center justify-between w-full px-5 py-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-primary/70" />
              <div>
                <p className="text-sm font-bold text-gray-900">Upcoming events</p>
                <p className="text-xs text-gray-400">
                  Experiences related to {topic.name.toLowerCase()}
                </p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
          </Link>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-100">
          <Link
            href="/post-request"
            className="inline-flex items-center gap-2 w-full justify-center bg-primary hover:bg-[#F03541] text-white rounded-full px-6 py-3.5 font-bold text-sm transition-all active:scale-95 shadow-lg shadow-primary/20"
          >
            Post about {topic.name.toLowerCase()}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </FadeIn>
  );
}

export default function TopicsPage() {
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

  return (
    <main className="min-h-screen bg-white">
      {/* ── HERO ── */}
      <section className="relative overflow-hidden">
        {/* Banner Image */}
        <Image
          src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=1920"
          alt="Topics banner"
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
              <IconRenderer name="MessageCircle" className="w-3.5 h-3.5 text-primary" />
              Conversations
            </div>
          </FadeIn>

          <FadeIn delay={0.05}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 tracking-tight leading-[1.1]">
              Start with how you feel.
            </h1>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p className="text-lg md:text-xl text-white/60 max-w-lg mx-auto mb-6 leading-relaxed font-medium">
              Explore conversations that understand you.
            </p>
            <SocialProofStrip variant="dark" className="mb-8 mx-auto" />
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/40 font-medium">
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary/80" />
                {topics.length} topics
              </span>
              <span className="flex items-center gap-2">
                <Users className="w-4 h-4 text-purple-400/80" />
                Real human connections
              </span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Quick pills (mobile scrollable) ── */}
      <div className="overflow-x-auto no-scrollbar border-b border-gray-100 bg-white sticky top-20 z-30">
        <div className="container-custom py-3">
          <div className="flex gap-2 min-w-max">
          {topics.map((t) => (
            <button
              key={t.id}
              onClick={() => setSelectedTopic(t)}
              className={cn(
                "flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap border transition-all",
                selectedTopic?.id === t.id
                  ? "bg-primary/10 border-primary/30 text-primary"
                  : "bg-gray-50 border-gray-100 text-gray-500 hover:text-gray-700"
              )}
            >
              <IconRenderer name={t.iconName} className="w-4 h-4" />
              {t.name}
            </button>
          ))}          </div>        </div>
      </div>

      <div className="container-custom py-10 md:py-16">
        <div className="grid lg:grid-cols-[1fr_400px] gap-8 items-start">
          {/* Left: Topic list */}
          <div className="space-y-3">
            <FadeIn>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 tracking-tight">
                What&rsquo;s on your mind?
              </h2>
              <p className="text-gray-500 mb-8">
                Tap a topic to discover buddies, groups, and events around it.
              </p>
            </FadeIn>

            {topics.map((t, i) => (
              <TopicCard
                key={t.id}
                topic={t}
                isSelected={selectedTopic?.id === t.id}
                onClick={() => setSelectedTopic(t)}
                delay={i * 0.03}
              />
            ))}
          </div>

          {/* Right: Detail panel (desktop sticky / mobile inline) */}
          <div className="hidden lg:block sticky top-32">
            {selectedTopic ? (
              <TopicDetail topic={selectedTopic} />
            ) : (
              <FadeIn>
                <div className="bg-gray-50 border border-gray-100 rounded-[1.25rem] p-8 text-center">
                  <Heart className="w-10 h-10 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 font-medium">
                    Select a topic
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    Discover who&rsquo;s here to help.
                  </p>
                </div>
              </FadeIn>
            )}
          </div>
        </div>

        {/* Mobile detail panel (below the list) */}
        {selectedTopic && (
          <div className="lg:hidden mt-8">
            <TopicDetail topic={selectedTopic} />
          </div>
        )}

        {/* ── CTA banner ── */}
        <div className="mt-16 md:mt-24">
          <FadeIn>
            <div className="relative bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 rounded-[1.5rem] px-6 py-10 md:px-12 md:py-14 text-center overflow-hidden">
              <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 right-0 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
              <div className="relative z-10">
                <MessageCircle className="w-8 h-8 text-primary/80 mx-auto mb-4" />
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight">
                  Don&rsquo;t see your topic?
                </h2>
                <p className="text-white/50 max-w-md mx-auto mb-8">
                  Share what you&rsquo;re feeling. Someone here gets it.
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
        </div>
      </div>
    </main>
  );
}
