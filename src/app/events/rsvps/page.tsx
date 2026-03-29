"use client";

import Link from "next/link";
import {
  ArrowLeft,
  CalendarCheck,
  Calendar,
  MapPin,
  Wifi,
  Users,
  Sparkles,
  Check,
} from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { cn } from "@/lib/utils";
import { useUserRsvps } from "@/hooks/useUserRsvps";
import { RSVPProvider, useRSVP } from "@/context/RSVPContext";
import { ToastProvider } from "@/context/ToastContext";
import { RSVPButton } from "@/components/feature/RSVPButton";
import { LoginModal } from "@/components/feature/LoginModal";
import { events } from "@/data/explore";
import type { Event } from "@/data/explore";

/* ═══════════════════════════════════════════════════
   My RSVPs — Events the user has joined
   ═══════════════════════════════════════════════════ */

const avatarColors = [
  "bg-blue-100 text-blue-600",
  "bg-purple-100 text-purple-600",
  "bg-amber-100 text-amber-600",
  "bg-rose-100 text-rose-600",
  "bg-teal-100 text-teal-600",
];

/** Build initial attendee map from static data */
const initialAttendees: Record<string, number> = {};
events.forEach((e) => {
  initialAttendees[e.id] = e.attendees;
});

/* ── Attendee Row ── */
function AttendeeRow({ eventId }: { eventId: string }) {
  const { getState } = useRSVP();
  const { attendees } = getState(eventId);
  const avatarCount = Math.min(attendees, 3);

  return (
    <div className="flex items-center gap-2">
      {attendees > 0 && (
        <div className="flex -space-x-1.5">
          {Array.from({ length: avatarCount }).map((_, i) => (
            <div
              key={i}
              className={cn(
                "w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold border-2 border-white",
                avatarColors[i % avatarColors.length]
              )}
            >
              {String.fromCharCode(65 + i)}
            </div>
          ))}
        </div>
      )}
      <div className="flex items-center gap-1 text-xs text-gray-400">
        <Users className="w-3.5 h-3.5" />
        <span className="font-medium tabular-nums">{attendees}</span>
        <span>attending</span>
      </div>
    </div>
  );
}

/* ── RSVP Event Card ── */
function RsvpEventCard({ event, delay }: { event: Event; delay: number }) {
  return (
    <FadeIn delay={delay}>
      <div className="group bg-white border border-gray-100 rounded-[1.25rem] overflow-hidden shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-300">
        <Link href={`/events/${event.id}`}>
          <div className="relative h-36 sm:h-44 overflow-hidden">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

            {/* "You're going" badge */}
            <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-500/90 text-white backdrop-blur-sm border border-emerald-400/30">
              <Check className="w-3 h-3" />
              You&apos;re going
            </span>

            {/* Mode badge */}
            <span
              className={cn(
                "absolute top-3 right-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide backdrop-blur-sm border",
                event.mode === "Online"
                  ? "bg-white/20 text-white border-white/20"
                  : event.mode === "Offline"
                  ? "bg-white/90 text-gray-900 border-white/50"
                  : "bg-white/20 text-white border-white/20"
              )}
            >
              {event.mode === "Online" && <Wifi className="w-3 h-3" />}
              {event.mode === "Offline" && <MapPin className="w-3 h-3" />}
              {event.mode}
              {event.city && ` · ${event.city}`}
            </span>

            {/* Date overlay */}
            <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white text-xs font-medium">
              <Calendar className="w-3.5 h-3.5" />
              {event.date} · {event.time}
            </div>
          </div>
        </Link>

        <div className="p-5">
          <Link href={`/events/${event.id}`}>
            <span className="text-[11px] font-medium text-gray-400 uppercase tracking-wide">
              {event.category}
            </span>
            <h3 className="text-lg font-bold text-gray-900 mt-1 mb-1.5 group-hover:text-primary transition-colors">
              {event.title}
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-2">
              {event.description}
            </p>
          </Link>
          <div className="flex items-center justify-between">
            <AttendeeRow eventId={event.id} />
            <RSVPButton eventId={event.id} />
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

/* ── Empty State ── */
function EmptyRsvps() {
  return (
    <FadeIn>
      <div className="text-center py-12 md:py-20 max-w-md mx-auto">
        <div className="w-20 h-20 rounded-3xl bg-gray-50 flex items-center justify-center mx-auto mb-6">
          <CalendarCheck className="w-10 h-10 text-gray-300" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          No events yet
        </h2>
        <p className="text-gray-500 mb-8 leading-relaxed">
          Join your first experience and meet amazing people. Every connection
          starts with a single RSVP.
        </p>
        <Link
          href="/events"
          className="inline-flex items-center gap-2 bg-[#FF6B6B] hover:bg-[#ff5252] text-white rounded-full px-8 py-4 font-bold text-base transition-all hover:scale-105 active:scale-95 shadow-xl shadow-red-500/20"
        >
          <Sparkles className="w-4 h-4" />
          Explore Events
        </Link>
      </div>
    </FadeIn>
  );
}

/* ── Login Modal Bridge ── */
function RsvpLoginModalBridge() {
  const { showLoginModal, setShowLoginModal } = useRSVP();
  return (
    <LoginModal
      open={showLoginModal}
      onClose={() => setShowLoginModal(false)}
      returnPath="/events/rsvps"
    />
  );
}

/* ── Content ── */
function MyRsvpsContent() {
  const { rsvpEvents, count } = useUserRsvps();

  return (
    <main className="min-h-screen bg-white">
      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#312e81]">
        <div className="hidden sm:block absolute top-1/4 left-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full bg-purple-500/10 blur-[120px] pointer-events-none" />
        <div className="hidden sm:block absolute bottom-0 right-1/4 w-[250px] md:w-[400px] h-[250px] md:h-[400px] rounded-full bg-primary/5 blur-[100px] pointer-events-none" />

        <div className="container-custom relative pt-16 md:pt-24 pb-14 md:pb-20 text-center">
          <FadeIn>
            <Link
              href="/events"
              className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm font-medium transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Events
            </Link>
          </FadeIn>

          <FadeIn delay={0.05}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-white/70 text-xs font-semibold mb-6 border border-white/10">
              <CalendarCheck className="w-3.5 h-3.5 text-emerald-400" />
              My RSVPs
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 tracking-tight leading-[1.1]">
              Your upcoming experiences
            </h1>
          </FadeIn>

          <FadeIn delay={0.15}>
            <p className="text-lg md:text-xl text-white/60 max-w-lg mx-auto leading-relaxed font-medium">
              {count > 0
                ? `You've joined ${count} event${count !== 1 ? "s" : ""}. See you there!`
                : "You haven't joined any events yet."}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Content ── */}
      <div className="container-custom py-10 md:py-16">
        {count > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rsvpEvents.map((e, i) => (
              <RsvpEventCard key={e.id} event={e} delay={i * 0.05} />
            ))}
          </div>
        ) : (
          <EmptyRsvps />
        )}
      </div>

      <RsvpLoginModalBridge />
    </main>
  );
}

/* ═══════════════════════════════════════════════════
   Page — Wraps content in providers
   ═══════════════════════════════════════════════════ */

export default function MyRsvpsPage() {
  return (
    <ToastProvider>
      <RSVPProvider initialAttendees={initialAttendees}>
        <MyRsvpsContent />
      </RSVPProvider>
    </ToastProvider>
  );
}
