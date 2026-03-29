"use client";

import Link from "next/link";
import {
  ArrowRight,
  Heart,
  Shield,
  Eye,
  Users,
  MessageCircle,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { beliefs, trustPillars } from "@/data/company";

/* ═══════════════════════════════════════════════════
   About — Built for the moments you shouldn't face alone.
   ═══════════════════════════════════════════════════ */

const beliefIcons = [Users, MessageCircle, Shield, Eye];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#312e81]">
        <div className="hidden sm:block absolute top-1/4 left-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full bg-purple-500/10 blur-[120px] pointer-events-none" />
        <div className="hidden sm:block absolute bottom-0 right-1/4 w-[250px] md:w-[400px] h-[250px] md:h-[400px] rounded-full bg-primary/5 blur-[100px] pointer-events-none" />

        <div className="container-custom relative pt-20 md:pt-28 pb-16 md:pb-24 text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-white/70 text-xs font-semibold mb-6 border border-white/10">
              <Heart className="w-3.5 h-3.5 text-primary" />
              Our Story
            </div>
          </FadeIn>

          <FadeIn delay={0.05}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-5 tracking-tight leading-[1.1] max-w-3xl mx-auto">
              Built for the moments you shouldn&rsquo;t face alone.
            </h1>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed font-medium">
              HireBuddy exists to bring real people together — when life feels
              heavy, confusing, or quiet.
            </p>
          </FadeIn>
        </div>
      </section>

      <div className="container-custom">
        {/* ── OUR STORY ── */}
        <section className="py-16 md:py-24 max-w-3xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 tracking-tight">
              Why we started
            </h2>
          </FadeIn>

          <FadeIn delay={0.05}>
            <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed space-y-5">
              <p>
                We live in the most connected era in human history — and somehow,
                the most lonely. Billions of people carry smartphones, scroll
                through feeds, and accumulate followers. Yet when it&rsquo;s 2 AM
                and you&rsquo;re sitting alone with a thought that won&rsquo;t
                leave, there&rsquo;s no app for that.
              </p>
              <p>
                HireBuddy was born from a simple observation: the gap between
                digital connection and emotional presence is enormous. People
                don&rsquo;t need more content — they need more company. Not a
                chatbot. Not an influencer&rsquo;s post. A real human being who
                shows up.
              </p>
              <p>
                We started building in a small room in Bangalore with one
                question:{" "}
                <span className="text-gray-900 font-semibold">
                  What if finding someone to be with was as easy as ordering
                  dinner?
                </span>
              </p>
              <p>
                Not a dating app. Not a therapy replacement. Just…&nbsp;a person.
                Someone to walk with you, eat with you, sit beside you, or simply
                listen. That&rsquo;s HireBuddy.
              </p>
            </div>
          </FadeIn>
        </section>

        {/* ── WHAT WE BELIEVE ── */}
        <section className="py-16 md:py-24 border-t border-gray-100">
          <FadeIn>
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 tracking-tight">
                What we believe
              </h2>
              <p className="text-gray-500 max-w-lg mx-auto">
                Four principles that guide every decision we make.
              </p>
            </div>
          </FadeIn>

          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {beliefs.map((belief, i) => {
              const Icon = beliefIcons[i];
              return (
                <FadeIn key={belief.title} delay={i * 0.06}>
                  <div className="bg-white border border-gray-100 rounded-[1.25rem] p-7 shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-300 group h-full">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/15 transition-colors">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {belief.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {belief.body}
                    </p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </section>

        {/* ── HOW IT WORKS (mini) ── */}
        <section className="py-16 md:py-24 border-t border-gray-100">
          <FadeIn>
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 tracking-tight">
                How HireBuddy works
              </h2>
              <p className="text-gray-500 max-w-lg mx-auto">
                Three simple steps to never face a moment alone.
              </p>
            </div>
          </FadeIn>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: "01",
                title: "Post a need",
                desc: "Describe what you're going through — moving day, hospital visit, or just need someone to talk to.",
              },
              {
                step: "02",
                title: "People respond",
                desc: "Verified buddies see your request and offer to help. Real people, real empathy, real availability.",
              },
              {
                step: "03",
                title: "Choose your buddy",
                desc: "Pick the person who feels right. Chat, meet, and let the connection do its thing.",
              },
            ].map((item, i) => (
              <FadeIn key={item.step} delay={i * 0.08}>
                <div className="text-center md:text-left group">
                  <div className="text-5xl font-extrabold text-primary/15 mb-3 group-hover:text-primary/25 transition-colors">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* ── OUR VISION ── */}
        <section className="py-16 md:py-24 border-t border-gray-100">
          <div className="max-w-3xl mx-auto text-center">
            <FadeIn>
              <Sparkles className="w-8 h-8 text-primary/60 mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 tracking-tight">
                Where we&rsquo;re going
              </h2>
            </FadeIn>
            <FadeIn delay={0.05}>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                We&rsquo;re building the{" "}
                <span className="text-gray-900 font-semibold">
                  emotional infrastructure of the internet
                </span>
                . A human layer beneath the digital surface — where anyone,
                anywhere, can find another person in minutes.
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="text-gray-500 leading-relaxed">
                Today it&rsquo;s India. Tomorrow it&rsquo;s every city on earth
                where someone sits alone and wishes they didn&rsquo;t have to.
                We want HireBuddy to be the first place people think of when
                they need someone — not a product, but a reflex.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* ── TRUST PILLARS ── */}
        <section className="py-16 md:py-24 border-t border-gray-100">
          <FadeIn>
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 tracking-tight">
                Built on trust
              </h2>
              <p className="text-gray-500 max-w-lg mx-auto">
                Connection without safety is hollow. We take this seriously.
              </p>
            </div>
          </FadeIn>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {trustPillars.map((p, i) => (
              <FadeIn key={p.title} delay={i * 0.06}>
                <div className="bg-gray-50 rounded-[1.25rem] p-7 hover:bg-gray-100/80 transition-colors h-full">
                  <CheckCircle2 className="w-5 h-5 text-primary mb-4" />
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {p.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {p.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* ── FOUNDER NOTE ── */}
        <section className="py-16 md:py-24 border-t border-gray-100">
          <FadeIn>
            <div className="max-w-2xl mx-auto bg-gradient-to-br from-gray-50 to-white border border-gray-100 rounded-[1.5rem] p-8 md:p-12">
              <p className="text-sm font-semibold text-primary mb-4 tracking-wide uppercase">
                A note from our founder
              </p>
              <p className="text-gray-600 leading-relaxed mb-4 text-[15px]">
                &ldquo;I started HireBuddy because I once sat alone in a new
                city with no one to call. Not for therapy. Not for a date. Just
                for company. That feeling — of wanting someone, anyone, to be
                present — shouldn&rsquo;t be this hard to solve.&rdquo;
              </p>
              <p className="text-gray-600 leading-relaxed mb-6 text-[15px]">
                &ldquo;We&rsquo;re not building another social network.
                We&rsquo;re building a safety net made of people. And I hope
                you&rsquo;ll be part of it.&rdquo;
              </p>
              <p className="text-gray-900 font-bold text-sm">
                — Arjun, Founder &amp; CEO
              </p>
            </div>
          </FadeIn>
        </section>
      </div>

      {/* ── CTA BANNER ── */}
      <section className="container-custom pb-16 md:pb-24">
        <FadeIn>
          <div className="relative bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 rounded-[1.5rem] px-6 py-10 md:px-12 md:py-14 text-center overflow-hidden">
            <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
            <div className="relative z-10">
              <Heart className="w-8 h-8 text-primary/80 mx-auto mb-4" />
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight">
                Ready to feel less alone?
              </h2>
              <p className="text-white/50 max-w-md mx-auto mb-8">
                Join thousands of people who chose connection over convenience.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/signup"
                  className="inline-flex items-center gap-2 bg-[#FF6B6B] hover:bg-[#ff5252] text-white rounded-full px-8 py-4 font-bold text-base transition-all hover:scale-105 active:scale-95 shadow-xl shadow-red-500/20"
                >
                  Join HireBuddy
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/how-it-works"
                  className="inline-flex items-center gap-2 text-white/50 hover:text-white font-semibold px-5 py-3 rounded-full transition-colors text-sm border border-white/10 hover:border-white/20"
                >
                  See how it works
                </Link>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>
    </main>
  );
}
