"use client";

import { use, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Wifi,
  Globe,
  Shield,
  Users,
  Tag,
  Share2,
  Heart,
  User,
  ArrowRight,
  Check,
  Loader2,
  X,
} from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { cn, getFullImageUrl } from "@/lib/utils";
import { getEventById, events } from "@/data/explore";
import { RSVPProvider, useRSVP } from "@/context/RSVPContext";
import { ToastProvider, useToast } from "@/context/ToastContext";
import { LoginModal } from "@/components/feature/LoginModal";

/* ═══════════════════════════════════════════════════
   Event Detail Page — /events/[id]
   Immersive, emotional, human-first design
   ═══════════════════════════════════════════════════ */

/** Build initial attendee map from static data */
const initialAttendees: Record<string, number> = {};
events.forEach((e) => {
  initialAttendees[e.id] = e.attendees;
});

/* ── Avatar colours for attendee preview ── */
const avatarColors = [
  "bg-blue-100 text-blue-600",
  "bg-purple-100 text-purple-600",
  "bg-amber-100 text-amber-600",
  "bg-rose-100 text-rose-600",
  "bg-teal-100 text-teal-600",
  "bg-indigo-100 text-indigo-600",
  "bg-emerald-100 text-emerald-600",
  "bg-orange-100 text-orange-600",
];

const fakeNames = [
  "Aarav", "Meera", "Kabir", "Priya", "Rohan", "Nisha", "Dev", "Ananya",
  "Sid", "Neha", "Arjun", "Tara", "Vikram", "Ishita", "Rahul", "Diya",
];

/* ══════════════════════════════════════════
   Hero Section — Full-width cover + floating card
   ══════════════════════════════════════════ */
function HeroSection({
  event,
}: {
  event: NonNullable<ReturnType<typeof getEventById>>;
}) {
  return (
    <section className="relative h-[50vh] min-h-[380px] md:h-[56vh] overflow-hidden">
      <img
        src={getFullImageUrl(event.image)}
        alt={event.title}
        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

      {/* Back button */}
      <div className="absolute top-6 left-6 z-10">
        <Link
          href="/events"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/30 backdrop-blur-md text-white text-sm font-semibold border border-white/10 hover:bg-black/50 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Events
        </Link>
      </div>

      {/* Floating info card */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <div className="container-custom pb-8 md:pb-12">
          <FadeIn>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm text-white text-xs font-bold border border-white/10">
                {event.category}
              </span>
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm border",
                  event.mode === "Online"
                    ? "bg-white/15 text-white border-white/10"
                    : "bg-white/90 text-gray-900 border-white/30"
                )}
              >
                {event.mode === "Online" ? (
                  <Wifi className="w-3 h-3" />
                ) : (
                  <MapPin className="w-3 h-3" />
                )}
                {event.mode}
                {event.city && ` · ${event.city}`}
              </span>
            </div>
          </FadeIn>

          <FadeIn delay={0.05}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.1] mb-3">
              {event.title}
            </h1>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="flex flex-wrap items-center gap-4 text-white/70 text-sm font-medium">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {event.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {event.time}
              </span>
              {event.duration && (
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-purple-300" />
                  {event.duration}
                </span>
              )}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   Detail RSVP Button — larger version for detail page
   ══════════════════════════════════════════ */
function DetailRSVPButton({ eventId }: { eventId: string }) {
  const { getState, toggleRSVP } = useRSVP();
  const { toast } = useToast();
  const { isGoing, loading } = getState(eventId);

  const handleClick = async () => {
    if (loading) return;
    const ok = await toggleRSVP(eventId);
    if (ok) {
      if (!isGoing) {
        toast("You're in! See you at the event 🎉");
      } else {
        toast("You've left the event", "info");
      }
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={cn(
        "inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base transition-all active:scale-95",
        isGoing
          ? "bg-emerald-50 text-emerald-600 border-2 border-emerald-100 hover:bg-emerald-100"
          : "bg-[#FF6B6B] hover:bg-[#ff5252] text-white shadow-xl shadow-red-500/20 hover:scale-105",
        loading && "opacity-70 cursor-wait"
      )}
    >
      {loading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : isGoing ? (
        <Check className="w-5 h-5" />
      ) : null}
      {loading ? "Please wait..." : isGoing ? "Going ✓" : "RSVP →"}
    </button>
  );
}

/* ══════════════════════════════════════════
   Description Section
   ══════════════════════════════════════════ */
function DescriptionSection({
  event,
}: {
  event: NonNullable<ReturnType<typeof getEventById>>;
}) {
  const description = event.longDescription || event.description;

  return (
    <FadeIn delay={0.05}>
      <div className="bg-white rounded-[1.25rem] border border-gray-100 p-6 md:p-8 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Heart className="w-5 h-5 text-primary" />
          About this event
        </h2>
        <div className="prose prose-gray max-w-none">
          {description.split("\n\n").map((para, i) => (
            <p
              key={i}
              className="text-gray-600 leading-relaxed mb-4 last:mb-0"
            >
              {para}
            </p>
          ))}
        </div>

        {/* Safe-space messaging */}
        {event.safetyLevel && (
          <div className="mt-6 flex items-start gap-3 p-4 rounded-xl bg-emerald-50 border border-emerald-100">
            <Shield className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-emerald-800">
                {event.safetyLevel}
              </p>
              <p className="text-xs text-emerald-600 mt-0.5">
                This event follows HireBuddy&apos;s community guidelines for
                respectful and safe interaction.
              </p>
            </div>
          </div>
        )}
      </div>
    </FadeIn>
  );
}

/* ══════════════════════════════════════════
   Host Section
   ══════════════════════════════════════════ */
function HostSection({
  host,
}: {
  host: { name: string; avatar?: string; bio: string };
}) {
  const initials = host.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <FadeIn delay={0.1}>
      <div className="bg-white rounded-[1.25rem] border border-gray-100 p-6 md:p-8 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2">
          <User className="w-5 h-5 text-primary" />
          Your Host
        </h2>

        <div className="flex items-start gap-4">
          {host.avatar ? (
            <img
              src={getFullImageUrl(host.avatar)}
              alt={host.name}
              className="w-14 h-14 rounded-2xl object-cover"
            />
          ) : (
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-purple-100 flex items-center justify-center text-primary font-bold text-lg">
              {initials}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-gray-900">{host.name}</h3>
            <p className="text-sm text-gray-500 mt-1 leading-relaxed">
              {host.bio}
            </p>
            <button className="mt-3 inline-flex items-center gap-1.5 text-primary text-sm font-semibold hover:underline">
              View profile
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

/* ══════════════════════════════════════════
   Attendees Preview + "See all" modal
   ══════════════════════════════════════════ */
function AttendeesSection({ eventId }: { eventId: string }) {
  const { getState } = useRSVP();
  const { attendees } = getState(eventId);
  const [showAll, setShowAll] = useState(false);

  const avatarCount = Math.min(attendees, 8);
  const extraCount = Math.max(attendees - avatarCount, 0);

  return (
    <FadeIn delay={0.15}>
      <div className="bg-white rounded-[1.25rem] border border-gray-100 p-6 md:p-8 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2">
          <Users className="w-5 h-5 text-primary" />
          People going
        </h2>

        <div className="flex items-center gap-4">
          <div className="flex -space-x-2">
            {Array.from({ length: avatarCount }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  "w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold border-3 border-white shadow-sm",
                  avatarColors[i % avatarColors.length]
                )}
              >
                {fakeNames[i]?.[0] ?? String.fromCharCode(65 + i)}
              </div>
            ))}
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900 tabular-nums">
              {attendees} people going
            </p>
            {extraCount > 0 && (
              <button
                onClick={() => setShowAll(true)}
                className="text-xs text-primary font-semibold hover:underline"
              >
                See all attendees
              </button>
            )}
          </div>
        </div>
      </div>

      {/* "See all attendees" modal (mock) */}
      {showAll && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setShowAll(false)}
          />
          <div className="relative bg-white rounded-[1.5rem] shadow-2xl w-full max-w-md mx-4 p-6 animate-in fade-in zoom-in-95 slide-in-from-bottom-4 duration-300 max-h-[70vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">
                Attendees ({attendees})
              </h3>
              <button
                onClick={() => setShowAll(false)}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-200 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="overflow-y-auto space-y-3 pr-1">
              {Array.from({ length: Math.min(attendees, 16) }).map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div
                    className={cn(
                      "w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0",
                      avatarColors[i % avatarColors.length]
                    )}
                  >
                    {fakeNames[i % fakeNames.length][0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {fakeNames[i % fakeNames.length]}
                    </p>
                    <p className="text-xs text-gray-400">HireBuddy member</p>
                  </div>
                </div>
              ))}
              {attendees > 16 && (
                <p className="text-center text-sm text-gray-400 py-2">
                  +{attendees - 16} more attendees
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </FadeIn>
  );
}

/* ══════════════════════════════════════════
   Event Details Grid — 2-column layout
   ══════════════════════════════════════════ */
function DetailsGrid({
  event,
}: {
  event: NonNullable<ReturnType<typeof getEventById>>;
}) {
  const items = [
    { icon: Calendar, label: "Date", value: event.date },
    { icon: Clock, label: "Time", value: event.time },
    ...(event.duration
      ? [{ icon: Clock, label: "Duration", value: event.duration }]
      : []),
    ...(event.language
      ? [{ icon: Globe, label: "Language", value: event.language }]
      : []),
    { icon: Tag, label: "Category", value: event.category },
    ...(event.safetyLevel
      ? [{ icon: Shield, label: "Safety", value: event.safetyLevel }]
      : []),
    ...(event.ageGroup
      ? [{ icon: Users, label: "Age group", value: event.ageGroup }]
      : []),
    ...(event.mode === "Offline" && event.city
      ? [{ icon: MapPin, label: "Location", value: event.city }]
      : []),
    ...(event.mode === "Online"
      ? [{ icon: Wifi, label: "Mode", value: "Online (link shared after RSVP)" }]
      : []),
  ];

  return (
    <FadeIn delay={0.2}>
      <div className="bg-white rounded-[1.25rem] border border-gray-100 p-6 md:p-8 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-5">
          Event Details
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {items.map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100"
            >
              <div className="w-9 h-9 rounded-lg bg-white border border-gray-100 flex items-center justify-center shrink-0">
                <item.icon className="w-4.5 h-4.5 text-gray-400" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">
                  {item.label}
                </p>
                <p className="text-sm font-semibold text-gray-900 mt-0.5">
                  {item.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </FadeIn>
  );
}

/* ══════════════════════════════════════════
   Share Block
   ══════════════════════════════════════════ */
function ShareSection({ event }: { event: NonNullable<ReturnType<typeof getEventById>> }) {
  const { toast } = useToast();

  const handleCopyLink = () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    navigator.clipboard.writeText(url).then(() => {
      toast("Link copied to clipboard!");
    });
  };

  return (
    <FadeIn delay={0.25}>
      <div className="bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 rounded-[1.25rem] p-6 md:p-8 text-center overflow-hidden relative">
        <div className="absolute top-0 left-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="relative z-10">
          <Share2 className="w-8 h-8 text-white/40 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white mb-2">
            Share this event
          </h3>
          <p className="text-sm text-white/40 mb-5">
            Know someone who'd love this? Invite them along.
          </p>
          <button
            onClick={handleCopyLink}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white text-sm font-bold hover:bg-white/10 transition-all"
          >
            <Share2 className="w-4 h-4" />
            Copy Event Link
          </button>
        </div>
      </div>
    </FadeIn>
  );
}

/* ══════════════════════════════════════════
   Sticky Bottom CTA (Mobile)
   ══════════════════════════════════════════ */
function StickyBottomCTA({ eventId }: { eventId: string }) {
  const { getState, toggleRSVP } = useRSVP();
  const { toast } = useToast();
  const { isGoing, loading } = getState(eventId);

  const handleClick = async () => {
    if (loading) return;
    const ok = await toggleRSVP(eventId);
    if (ok) {
      if (!isGoing) {
        toast("You're in! See you at the event 🎉");
      } else {
        toast("You've left the event", "info");
      }
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/95 backdrop-blur-lg border-t border-gray-100 shadow-2xl px-4 py-3">
      <div className="flex items-center gap-3">
        <button
          onClick={handleClick}
          disabled={loading}
          className={cn(
            "flex-1 inline-flex items-center justify-center gap-2 py-3.5 rounded-full font-bold text-sm transition-all active:scale-95",
            isGoing
              ? "bg-emerald-50 text-emerald-600 border-2 border-emerald-100"
              : "bg-[#FF6B6B] text-white shadow-lg shadow-red-500/20",
            loading && "opacity-70 cursor-wait"
          )}
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : isGoing ? (
            <Check className="w-4 h-4" />
          ) : null}
          {loading ? "Please wait..." : isGoing ? "Going ✓" : "RSVP →"}
        </button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   404-friendly fallback
   ══════════════════════════════════════════ */
function EventNotFound() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="w-20 h-20 rounded-3xl bg-gray-50 flex items-center justify-center mx-auto mb-6">
          <Calendar className="w-10 h-10 text-gray-300" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Event not found
        </h1>
        <p className="text-gray-500 mb-8">
          This event may have been removed or the link might be incorrect. Don&apos;t worry — there are plenty more experiences waiting for you.
        </p>
        <Link
          href="/events"
          className="inline-flex items-center gap-2 bg-[#FF6B6B] hover:bg-[#ff5252] text-white rounded-full px-8 py-4 font-bold text-base transition-all hover:scale-105 active:scale-95 shadow-xl shadow-red-500/20"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Events
        </Link>
      </div>
    </main>
  );
}

/* ══════════════════════════════════════════
   Login Modal Bridge
   ══════════════════════════════════════════ */
function DetailLoginModalBridge({ eventId }: { eventId: string }) {
  const { showLoginModal, setShowLoginModal } = useRSVP();
  return (
    <LoginModal
      open={showLoginModal}
      onClose={() => setShowLoginModal(false)}
      returnPath={`/events/${eventId}`}
    />
  );
}

/* ══════════════════════════════════════════
   Event Detail Content (needs providers above)
   ══════════════════════════════════════════ */
function EventDetailContent({
  event,
}: {
  event: NonNullable<ReturnType<typeof getEventById>>;
}) {
  return (
    <main className="min-h-screen bg-gray-50/50">
      {/* Hero */}
      <HeroSection event={event} />

      {/* Content */}
      <div className="container-custom py-8 md:py-12">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left column: main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Primary CTA */}
            <FadeIn>
              <div className="hidden md:flex items-center gap-4">
                <DetailRSVPButton eventId={event.id} />
              </div>
            </FadeIn>

            <DescriptionSection event={event} />
            <AttendeesSection eventId={event.id} />
          </div>

          {/* Right column: sidebar */}
          <div className="space-y-6">
            <DetailsGrid event={event} />
            {event.host && <HostSection host={event.host} />}
            <ShareSection event={event} />
          </div>
        </div>
      </div>

      {/* Mobile sticky CTA */}
      <StickyBottomCTA eventId={event.id} />

      {/* Login modal bridge */}
      <DetailLoginModalBridge eventId={event.id} />
    </main>
  );
}

/* ═══════════════════════════════════════════════════
   Page — Dynamic route /events/[id]
   ═══════════════════════════════════════════════════ */

export default function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const event = getEventById(id);

  if (!event) {
    return <EventNotFound />;
  }

  return (
    <ToastProvider>
      <RSVPProvider initialAttendees={initialAttendees}>
        <EventDetailContent event={event} />
      </RSVPProvider>
    </ToastProvider>
  );
}
