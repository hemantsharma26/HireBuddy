"use client";

import Link from "next/link";
import {
  ArrowRight,
  Heart,
  Rocket,
  Users,
  MapPin,
  Clock,
  Briefcase,
  Wifi,
  Sparkles,
  Star,
} from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import {
  cultureValues,
  perks,
  jobRoles,
  type JobRole,
} from "@/data/company";

/* ═══════════════════════════════════════════════════
   Careers — Build the future of human connection.
   ═══════════════════════════════════════════════════ */

const whyCards = [
  {
    icon: Heart,
    title: "Mission-driven",
    body: "Every line of code, every pixel, every decision is in service of a lonely person finding someone who cares.",
  },
  {
    icon: Sparkles,
    title: "Real impact",
    body: "You won't move KPIs — you'll move people. Users write to us about life-changing connections. That's your work.",
  },
  {
    icon: Users,
    title: "Small passionate team",
    body: "No bureaucracy. No politics. Just talented humans building something that matters, together.",
  },
  {
    icon: Star,
    title: "Build something meaningful",
    body: "This isn't another SaaS tool. You're building global emotional infrastructure. The kind of work that gets you out of bed.",
  },
];

const perkIcons = [Wifi, Clock, Rocket];

function RoleCard({ role, delay }: { role: JobRole; delay: number }) {
  return (
    <FadeIn delay={delay}>
      <div className="group bg-white border border-gray-100 rounded-[1.25rem] p-7 shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-300">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors">
              {role.title}
            </h3>
            <p className="text-sm text-gray-400 font-medium mt-0.5">
              {role.team}
            </p>
          </div>
          <span className="shrink-0 text-[11px] font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
            {role.type}
          </span>
        </div>
        <p className="text-gray-500 text-sm leading-relaxed mb-5">
          {role.summary}
        </p>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-xs text-gray-400">
            <MapPin className="w-3.5 h-3.5" />
            {role.location}
          </span>
          <Link
            href={`mailto:careers@hirebuddy.app?subject=Application: ${role.title}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-[#ff5252] transition-colors"
          >
            Apply Now
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </FadeIn>
  );
}

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#312e81]">
        <div className="hidden sm:block absolute top-1/4 left-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full bg-purple-500/10 blur-[120px] pointer-events-none" />
        <div className="hidden sm:block absolute bottom-0 right-1/4 w-[250px] md:w-[400px] h-[250px] md:h-[400px] rounded-full bg-primary/5 blur-[100px] pointer-events-none" />

        <div className="container-custom relative pt-20 md:pt-28 pb-16 md:pb-24 text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-white/70 text-xs font-semibold mb-6 border border-white/10">
              <Briefcase className="w-3.5 h-3.5 text-primary" />
              Careers
            </div>
          </FadeIn>

          <FadeIn delay={0.05}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-5 tracking-tight leading-[1.1] max-w-3xl mx-auto">
              Build the future of human connection.
            </h1>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p className="text-lg md:text-xl text-white/60 max-w-xl mx-auto leading-relaxed font-medium">
              If you care about people, you&rsquo;ll belong here.
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="mt-10">
              <a
                href="#open-roles"
                className="inline-flex items-center gap-2 bg-[#FF6B6B] hover:bg-[#ff5252] text-white rounded-full px-8 py-4 font-bold text-base transition-all hover:scale-105 active:scale-95 shadow-xl shadow-red-500/20"
              >
                See Open Roles
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="container-custom">
        {/* ── WHY WORK WITH US ── */}
        <section className="py-16 md:py-24">
          <FadeIn>
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 tracking-tight">
                Why work with us
              </h2>
              <p className="text-gray-500 max-w-lg mx-auto">
                This isn&rsquo;t just a job. It&rsquo;s a chance to build something the world genuinely needs.
              </p>
            </div>
          </FadeIn>

          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {whyCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <FadeIn key={card.title} delay={i * 0.06}>
                  <div className="bg-white border border-gray-100 rounded-[1.25rem] p-7 shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-300 group h-full">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/15 transition-colors">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {card.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {card.body}
                    </p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </section>

        {/* ── CULTURE ── */}
        <section className="py-16 md:py-24 border-t border-gray-100">
          <FadeIn>
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 tracking-tight">
                Our culture
              </h2>
              <p className="text-gray-500 max-w-lg mx-auto">
                How we show up for each other — and for the people we serve.
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {cultureValues.map((val, i) => (
              <FadeIn key={val.title} delay={i * 0.06}>
                <div className="group">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                    {val.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {val.body}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* ── OPEN ROLES ── */}
        <section
          id="open-roles"
          className="py-16 md:py-24 border-t border-gray-100 scroll-mt-24"
        >
          <FadeIn>
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 tracking-tight">
                Open roles
              </h2>
              <p className="text-gray-500 max-w-lg mx-auto">
                We&rsquo;re looking for people who build with heart.{" "}
                {jobRoles.length} position{jobRoles.length !== 1 ? "s" : ""}{" "}
                open.
              </p>
            </div>
          </FadeIn>

          {jobRoles.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {jobRoles.map((role, i) => (
                <RoleCard key={role.id} role={role} delay={i * 0.05} />
              ))}
            </div>
          ) : (
            <FadeIn>
              <div className="text-center max-w-md mx-auto py-12 px-6 bg-gray-50 rounded-[1.5rem]">
                <Heart className="w-8 h-8 text-primary/60 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  We&rsquo;re always looking for kind builders.
                </h3>
                <p className="text-gray-500 text-sm mb-5">
                  No open roles right now, but we&rsquo;d love to hear from
                  you.
                </p>
                <a
                  href="mailto:careers@hirebuddy.app"
                  className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:text-[#ff5252] transition-colors"
                >
                  careers@hirebuddy.app
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </FadeIn>
          )}

          <FadeIn delay={0.2}>
            <p className="text-center text-sm text-gray-400 mt-8">
              Don&rsquo;t see your role?{" "}
              <a
                href="mailto:careers@hirebuddy.app?subject=Open Application"
                className="text-primary font-semibold hover:underline"
              >
                Send us an open application
              </a>
            </p>
          </FadeIn>
        </section>

        {/* ── PERKS ── */}
        <section className="py-16 md:py-24 border-t border-gray-100">
          <FadeIn>
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 tracking-tight">
                What you get
              </h2>
            </div>
          </FadeIn>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {perks.map((perk, i) => {
              const Icon = perkIcons[i];
              return (
                <FadeIn key={perk.title} delay={i * 0.06}>
                  <div className="bg-gray-50 rounded-[1.25rem] p-7 text-center hover:bg-gray-100/80 transition-colors h-full">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-base font-bold text-gray-900 mb-1.5">
                      {perk.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {perk.description}
                    </p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </section>
      </div>

      {/* ── CTA BANNER ── */}
      <section className="container-custom pb-16 md:pb-24">
        <FadeIn>
          <div className="relative bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 rounded-[1.5rem] px-6 py-10 md:px-12 md:py-14 text-center overflow-hidden">
            <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
            <div className="relative z-10">
              <Rocket className="w-8 h-8 text-primary/80 mx-auto mb-4" />
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight">
                Ready to build something that matters?
              </h2>
              <p className="text-white/50 max-w-md mx-auto mb-8">
                We don&rsquo;t just want your skills. We want your heart.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="mailto:careers@hirebuddy.app"
                  className="inline-flex items-center gap-2 bg-[#FF6B6B] hover:bg-[#ff5252] text-white rounded-full px-8 py-4 font-bold text-base transition-all hover:scale-105 active:scale-95 shadow-xl shadow-red-500/20"
                >
                  Send Your Resume
                  <ArrowRight className="w-4 h-4" />
                </a>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-white/50 hover:text-white font-semibold px-5 py-3 rounded-full transition-colors text-sm border border-white/10 hover:border-white/20"
                >
                  Learn about us
                </Link>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>
    </main>
  );
}
