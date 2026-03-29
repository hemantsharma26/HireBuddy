"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Calendar,
  CalendarCheck,
  Sparkles,
  Clock,
} from "lucide-react";
import { useUserRsvps } from "@/hooks/useUserRsvps";
import { FadeIn } from "@/components/ui/FadeIn";
import { cn } from "@/lib/utils";
import { events, eventFilters } from "@/data/explore";
import { EventCard } from "@/components/feature/EventCard";
import { RSVPProvider, useRSVP } from "@/context/RSVPContext";
import { ToastProvider } from "@/context/ToastContext";
import { LoginModal } from "@/components/feature/LoginModal";
import { SocialProofStrip } from "@/components/trust";
import { FirstTimeNudge } from "@/components/ui/FirstTimeNudge";
import { EmptyState } from "@/components/feature/EmptyState";

/* ═══════════════════════════════════════════════════
   Events — Real-time experiences with buddies
   ═══════════════════════════════════════════════════ */

/** Build initial attendee map from static data */
const initialAttendees: Record<string, number> = {};
events.forEach((e) => {
  initialAttendees[e.id] = e.attendees;
});

/** Inner content — needs context providers above */
function EventsLoginModalBridge() {
  const { showLoginModal, setShowLoginModal } = useRSVP();
  return (
    <LoginModal
      open={showLoginModal}
      onClose={() => setShowLoginModal(false)}
      returnPath="/events"
    />
  );
}

function EventsContent() {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const { count: rsvpCount } = useUserRsvps();

  const filtered = useMemo(() => {
    if (activeFilter === "All") return events;
    if (activeFilter === "Today") {
      return events.filter((e) => e.date === "Feb 22, 2026");
    }
    if (activeFilter === "This Week") return events; // all within the week for demo
    if (activeFilter === "Online") return events.filter((e) => e.mode === "Online");
    if (activeFilter === "Offline") return events.filter((e) => e.mode === "Offline");
    return events;
  }, [activeFilter]);

  return (
    <main className="min-h-screen bg-white">
      {/* ── HERO ── */}
      <section className="relative overflow-hidden">
        {/* Banner Image */}
        <Image
          src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1920"
          alt="Event banner"
          fill
          priority
          className="object-cover"
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a]/85 via-[#1e1b4b]/80 to-[#312e81]/85" />

        <div className="hidden sm:block absolute top-1/4 left-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full bg-purple-500/10 blur-[120px] pointer-events-none" />
        <div className="hidden sm:block absolute bottom-0 right-1/4 w-[250px] md:w-[400px] h-[250px] md:h-[400px] rounded-full bg-primary/5 blur-[100px] pointer-events-none" />

        <div className="container-custom relative pt-16 md:pt-24 pb-14 md:pb-20 text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-white/70 text-xs font-semibold mb-6 border border-white/10">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              Experiences
            </div>
          </FadeIn>

          <FadeIn delay={0.05}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 tracking-tight leading-[1.1]">
              Shared moments feel better.
            </h1>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p className="text-lg md:text-xl text-white/60 max-w-lg mx-auto mb-10 leading-relaxed font-medium">
              Join experiences where strangers become friends.
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
              <Link
                href="/events/rsvps"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm text-white text-sm font-bold hover:bg-white/20 transition-all hover:scale-105 active:scale-95"
              >
                <CalendarCheck className="w-4 h-4" />
                My RSVPs
                <span className="ml-0.5 inline-flex items-center justify-center w-5 h-5 rounded-full bg-white/20 text-[11px] font-bold">
                  {rsvpCount}
                </span>
              </Link>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/40 font-medium">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary/80" />
                {events.length} upcoming events
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-purple-400/80" />
                New events daily
              </span>
            </div>
            <SocialProofStrip variant="light" className="mt-5" />
          </FadeIn>
        </div>
      </section>

      {/* ── Filters ── */}
      <div className="overflow-x-auto no-scrollbar border-b border-gray-100 bg-white sticky top-20 z-30">
        <div className="container-custom py-3">
          <div className="flex gap-2 min-w-max">
          {eventFilters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap border transition-all",
                activeFilter === f
                  ? "bg-primary/10 border-primary/30 text-primary"
                  : "bg-gray-50 border-gray-100 text-gray-500 hover:text-gray-700"
              )}
            >
              {f}
            </button>
          ))}          </div>        </div>
      </div>

      <div className="container-custom py-10 md:py-16 space-y-16 md:space-y-24">
        {/* First-time nudge */}
        <FirstTimeNudge
          id="events-first-visit"
          text="Browse experiences and RSVP instantly. People usually start with weekend events."
        />

        {/* ── Event grid ── */}
        <section>
          <FadeIn>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 tracking-tight">
              {activeFilter === "All" ? "Everything happening soon" : activeFilter}
            </h2>
            <p className="text-gray-500 mb-8">
              {filtered.length} experience{filtered.length !== 1 ? "s" : ""} waiting for you
            </p>
          </FadeIn>

          {filtered.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((e, i) => (
                <EventCard key={e.id} event={e} delay={i * 0.05} />
              ))}
            </div>
          ) : (
            <EmptyState variant="events" />
          )}
        </section>

        {/* ── CTA banner ── */}
        <section>
          <FadeIn>
            <div className="relative bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 rounded-[1.5rem] px-6 py-10 md:px-12 md:py-14 text-center overflow-hidden">
              <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 right-0 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
              <div className="relative z-10">
                <Sparkles className="w-8 h-8 text-primary/80 mx-auto mb-4" />
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight">
                  Want to host something?
                </h2>
                <p className="text-white/50 max-w-md mx-auto mb-8">
                  Create experiences that bring people together. Vent rooms, movie nights, walks — anything goes.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link
                    href="/create-event"
                    className="inline-flex items-center gap-2 bg-[#FF6B6B] hover:bg-[#ff5252] text-white rounded-full px-8 py-4 font-bold text-base transition-all hover:scale-105 active:scale-95 shadow-xl shadow-red-500/20"
                  >
                    Create an Event
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/groups"
                    className="inline-flex items-center gap-2 text-white/50 hover:text-white font-semibold px-5 py-3 rounded-full transition-colors text-sm border border-white/10 hover:border-white/20"
                  >
                    Browse groups
                  </Link>
                </div>
              </div>
            </div>
          </FadeIn>
        </section>
      </div>

      {/* Login modal triggered by RSVP context */}
      <EventsLoginModalBridge />
    </main>
  );
}

/* ═══════════════════════════════════════════════════
   Page — Wraps content in RSVP + Toast providers
   ═══════════════════════════════════════════════════ */

export default function EventsPage() {
  return (
    <ToastProvider>
      <RSVPProvider initialAttendees={initialAttendees}>
        <EventsContent />
      </RSVPProvider>
    </ToastProvider>
  );
}
