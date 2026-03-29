"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Shield,
  Lock,
  BadgeCheck,
  ScanEye,
  ShieldAlert,
  CheckCircle2,
  Heart,
  EyeOff,
  MessageCircle,
  Ban,
  Video,
  ArrowRight,
  Flag,
  Sparkles,
  Users,
  BarChart3,
  RefreshCw,
  Clock,
  AlertTriangle,
  Rocket,
  Fingerprint,
  Activity,
  Cpu,
  Star,
} from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import {
  safetyFeatures,
  controlPoints,
  privacyPoints,
  privacyTagline,
  trustStats,
  responseActions,
  roadmapItems,
} from "@/data/security";

/* ─── Icon set for safety features ─── */
const featureIcons = [Lock, BadgeCheck, ScanEye, ShieldAlert];

/* ─── Icon set for privacy points ─── */
const privacyIcons = [ShieldAlert, Lock, EyeOff];

/* ─── Icon set for trust stats ─── */
const statIcons = [Users, BarChart3, RefreshCw];

/* ─── Icon set for response actions ─── */
const actionIcons = [Clock, AlertTriangle, ShieldAlert];

/* ─── Icon set for roadmap ─── */
const roadmapIcons = [Fingerprint, Activity, Cpu];

/* ================================================================
   PAGE — Security & Trust
   Brand-aligned: navy/purple hero, coral accents, warm tone
   ================================================================ */
export default function SecurityPage() {
  const [reportHover, setReportHover] = useState(false);

  return (
    <main className="min-h-screen bg-white">
      {/* ─────────────────────────────────────────────
          SECTION 1 — HERO (Navy → Purple gradient)
      ───────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#312e81]">
        {/* Soft glow orbs */}
        <div className="hidden sm:block absolute top-1/4 left-1/3 w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full bg-purple-500/10 blur-[120px] pointer-events-none" />
        <div className="hidden sm:block absolute bottom-0 right-1/4 w-[250px] md:w-[400px] h-[250px] md:h-[400px] rounded-full bg-primary/5 blur-[100px] pointer-events-none" />

        <div className="container-custom relative pt-16 md:pt-24 pb-14 md:pb-20 text-center max-w-3xl mx-auto">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-white/70 text-xs font-semibold mb-6 border border-white/10">
              <Shield className="w-3.5 h-3.5 text-primary" />
              Security &amp; Trust
            </div>
          </FadeIn>

          <FadeIn delay={0.05}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-5">
              Your safety is built into{" "}
              <br className="hidden sm:block" />
              everything we do.
            </h1>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p className="text-lg md:text-xl text-white/60 leading-relaxed max-w-2xl mx-auto mb-10 font-medium">
              HireBuddy is built around emotional safety, privacy, and real
              human trust. We built this carefully so you can feel safe.
            </p>
          </FadeIn>

          {/* Trust badges — coral dots, not green */}
          <FadeIn delay={0.2}>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                "Private conversations",
                "Verified users",
                "Real moderation",
              ].map((badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white/80 text-sm font-medium border border-white/10"
                >
                  <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                  {badge}
                </span>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          SECTION 2 — HOW WE KEEP YOU SAFE
      ───────────────────────────────────────────── */}
      <section className="bg-white section-padding">
        <div className="container-custom">
          <FadeIn>
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 tracking-tight">
                How we keep you safe
              </h2>
              <p className="text-gray-500 max-w-xl mx-auto">
                These aren&rsquo;t marketing claims. They&rsquo;re the systems
                running behind every session.
              </p>
            </div>
          </FadeIn>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {safetyFeatures.map((feature, i) => {
              const Icon = featureIcons[i] || Shield;
              return (
                <FadeIn key={feature.title} delay={0.1 * i}>
                  <div className="group h-full rounded-[1.25rem] border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-300">
                    <div className="w-12 h-12 rounded-2xl bg-gray-50 text-gray-600 flex items-center justify-center mb-5 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-bold text-gray-900 mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-xs text-gray-400 mb-3">
                      {feature.description}
                    </p>
                    <ul className="space-y-2">
                      {feature.points.map((point, j) => (
                        <li
                          key={j}
                          className="flex gap-2 text-sm text-gray-500 leading-relaxed"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0 mt-2" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          SECTION 3 — YOUR CONTROL
      ───────────────────────────────────────────── */}
      <section className="bg-gray-50 section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            {/* Left — Copy */}
            <FadeIn>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 tracking-tight">
                  You&rsquo;re always in control.
                </h2>
                <p className="text-gray-500 mb-8">
                  We designed HireBuddy so you never feel trapped, pressured, or
                  uncomfortable. Everything is opt-in.
                </p>

                <ul className="space-y-5">
                  {controlPoints.map((point, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <span className="text-gray-700 leading-relaxed text-[15px]">
                        {point.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            {/* Right — Visual card */}
            <FadeIn delay={0.15}>
              <div className="rounded-[1.25rem] bg-white border border-gray-100 shadow-sm p-8 space-y-5">
                <div className="flex items-center gap-3 text-gray-700 text-sm font-medium">
                  <Video className="w-5 h-5 text-primary/70" />
                  Choose voice, video, or chat
                </div>
                <div className="flex items-center gap-3 text-gray-700 text-sm font-medium">
                  <ArrowRight className="w-5 h-5 text-primary/70" />
                  Leave anytime — one tap
                </div>
                <div className="flex items-center gap-3 text-gray-700 text-sm font-medium">
                  <Ban className="w-5 h-5 text-primary/70" />
                  Block instantly — no questions
                </div>
                <div className="flex items-center gap-3 text-gray-700 text-sm font-medium">
                  <Heart className="w-5 h-5 text-primary/70" />
                  No forced interactions. Ever.
                </div>
                <div className="pt-4 border-t border-gray-100 text-xs text-gray-400 italic">
                  Your comfort shapes every session.
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          SECTION 4 — DATA PRIVACY
      ───────────────────────────────────────────── */}
      <section className="bg-white section-padding">
        <div className="container-custom">
          <FadeIn>
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 text-gray-500 text-xs font-semibold tracking-wide uppercase mb-4">
                <EyeOff className="w-4 h-4" />
                Data Privacy
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 tracking-tight">
                Simple privacy. No fine print.
              </h2>
              <p className="text-gray-500 max-w-lg mx-auto">
                We believe privacy should be easy to understand — not buried in
                a 50-page document.
              </p>
            </div>
          </FadeIn>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-10">
            {privacyPoints.map((point, i) => {
              const Icon = privacyIcons[i] || Shield;
              return (
                <FadeIn key={point.title} delay={0.1 * i}>
                  <div className="text-center px-2">
                    <div className="w-12 h-12 rounded-2xl bg-gray-50 text-gray-500 flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-gray-900 mb-2">
                      {point.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                </FadeIn>
              );
            })}
          </div>

          <FadeIn delay={0.3}>
            <div className="text-center">
              <p className="inline-block bg-gray-50 text-gray-700 font-medium text-sm px-6 py-3 rounded-full border border-gray-100">
                &ldquo;{privacyTagline}&rdquo;
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          SECTION 5 — TRUST SIGNALS
      ───────────────────────────────────────────── */}
      <section className="bg-gray-50 section-padding">
        <div className="container-custom">
          <FadeIn>
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 tracking-tight">
                Trust you can see
              </h2>
              <p className="text-gray-500 max-w-lg mx-auto">
                These numbers come from real people using HireBuddy every day.
              </p>
            </div>
          </FadeIn>

          <div className="grid sm:grid-cols-3 gap-5 max-w-3xl mx-auto">
            {trustStats.map((stat, i) => {
              const StatIcon = statIcons[i] || Users;
              return (
                <FadeIn key={stat.label} delay={0.1 * i}>
                  <div className="text-center bg-white rounded-[1.25rem] border border-gray-100 p-8 shadow-sm hover:shadow-md transition-shadow">
                    <StatIcon className="w-6 h-6 text-primary/70 mx-auto mb-3" />
                    <p className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-1 tracking-tight">
                      {stat.value}
                    </p>
                    <p className="text-sm font-semibold text-gray-700 mb-1">
                      {stat.label}
                    </p>
                    <p className="text-xs text-gray-400">{stat.note}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          SECTION 6 — IF SOMETHING GOES WRONG
      ───────────────────────────────────────────── */}
      <section className="bg-white section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            {/* Left — Cards */}
            <FadeIn>
              <div className="space-y-4">
                {responseActions.map((action, i) => {
                  const ActionIcon = actionIcons[i] || Clock;
                  return (
                    <div
                      key={action.title}
                      className="flex gap-4 items-start bg-white rounded-[1.25rem] border border-gray-100 p-5 shadow-sm hover:shadow-md hover:border-gray-200 transition-all"
                    >
                      <div className="w-10 h-10 rounded-xl bg-gray-50 text-gray-500 flex items-center justify-center shrink-0">
                        <ActionIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-gray-900 mb-1">
                          {action.title}
                        </h3>
                        <p className="text-sm text-gray-500 leading-relaxed">
                          {action.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </FadeIn>

            {/* Right — Copy + CTA */}
            <FadeIn delay={0.15}>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 tracking-tight">
                  We take action fast.
                </h2>
                <p className="text-gray-500 leading-relaxed mb-8">
                  If something doesn&rsquo;t feel right, tell us. We
                  don&rsquo;t wait. We don&rsquo;t ignore. Every report matters.
                </p>

                <Link
                  href="/help-center"
                  onMouseEnter={() => setReportHover(true)}
                  onMouseLeave={() => setReportHover(false)}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-primary hover:bg-[#F03541] text-white font-bold text-sm transition-all active:scale-95 shadow-lg shadow-primary/20"
                >
                  <Flag className="w-4 h-4" />
                  Report a concern
                  <ArrowRight
                    className={`w-4 h-4 transition-transform ${reportHover ? "translate-x-1" : ""}`}
                  />
                </Link>

                <p className="text-xs text-gray-400 mt-4">
                  All reports are anonymous and treated with priority.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          SECTION 7 — FUTURE SAFETY ROADMAP
      ───────────────────────────────────────────── */}
      <section className="bg-gray-50 section-padding">
        <div className="container-custom">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center mb-12">
              <div className="inline-flex items-center gap-2 text-gray-500 text-xs font-semibold tracking-wide uppercase mb-4">
                <Rocket className="w-4 h-4" />
                Coming Soon
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 tracking-tight">
                We&rsquo;re not done yet.
              </h2>
              <p className="text-gray-500 max-w-lg mx-auto">
                Safety is a living commitment — not a checkbox. Here&rsquo;s
                what&rsquo;s next on our roadmap.
              </p>
            </div>
          </FadeIn>

          <div className="grid sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {roadmapItems.map((item, i) => {
              const ItemIcon = roadmapIcons[i] || Sparkles;
              return (
                <FadeIn key={item.title} delay={0.1 * i}>
                  <div className="relative rounded-[1.25rem] bg-white border border-dashed border-gray-200 p-6 text-center shadow-sm hover:border-gray-300 transition-colors">
                    {/* "Soon" badge */}
                    <span className="absolute -top-2.5 right-4 bg-primary/10 text-primary text-[10px] font-bold tracking-wide uppercase px-2.5 py-0.5 rounded-full">
                      Soon
                    </span>
                    <ItemIcon className="w-7 h-7 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-sm font-bold text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          CLOSING CTA — Dark banner matching PostSituationBanner
      ───────────────────────────────────────────── */}
      <section className="bg-white py-16 md:py-20">
        <div className="container-custom">
          <FadeIn>
            <div className="relative bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 rounded-[1.5rem] px-6 py-12 md:px-12 md:py-16 text-center overflow-hidden">
              {/* Decorative glow */}
              <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 right-0 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

              <div className="relative z-10">
                <Shield className="w-10 h-10 text-primary/80 mx-auto mb-5" />
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight leading-tight">
                  Built carefully, so you can feel safe.
                </h2>
                <p className="text-white/50 leading-relaxed mb-8 max-w-xl mx-auto">
                  We know trust is earned — not claimed. Everything on this page
                  is something we practice, not just something we wrote.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Link
                    href="/buddies"
                    className="inline-flex items-center gap-2 bg-[#FF6B6B] hover:bg-[#ff5252] text-white rounded-full px-8 py-4 font-bold text-base transition-all hover:scale-105 active:scale-95 shadow-xl shadow-red-500/20"
                  >
                    Find a Buddy
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/help-center"
                    className="inline-flex items-center gap-2 text-white/50 hover:text-white font-semibold px-5 py-3 rounded-full transition-colors text-sm border border-white/10 hover:border-white/20"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Visit Help Center
                  </Link>
                </div>

                <p className="mt-6 text-sm text-gray-500 font-medium">
                  Trusted by thousands finding real connections
                </p>
                <p className="mt-1 text-xs text-gray-600 italic">
                  This is a safe space. You are not alone.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
