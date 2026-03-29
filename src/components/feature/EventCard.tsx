"use client";

import Link from "next/link";
import {
  Users,
  ArrowRight,
  Calendar,
  MapPin,
  Wifi,
  TrendingUp,
} from "lucide-react";
import { cn, getFullImageUrl } from "@/lib/utils";
import { FadeIn } from "@/components/ui/FadeIn";
import { RSVPButton } from "@/components/feature/RSVPButton";
import { useRSVP } from "@/context/RSVPContext";
import type { Event } from "@/data/explore";

/* ═══════════════════════════════════════════════════
   EventCard — Modular event card with RSVP support
   Components: EventImage, EventDetails, AttendeeRow, RSVPButton
   ═══════════════════════════════════════════════════ */

/* ── Fake avatar colors for preview ── */
const avatarColors = [
  "bg-blue-100 text-blue-600",
  "bg-purple-100 text-purple-600",
  "bg-amber-100 text-amber-600",
  "bg-rose-100 text-rose-600",
  "bg-teal-100 text-teal-600",
];

/* ── EventImage ── */
function EventImage({ event }: { event: Event }) {
  return (
    <div className="relative h-36 sm:h-44 overflow-hidden">
      <img
        src={getFullImageUrl(event.image)}
        alt={event.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

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
  );
}

/* ── EventDetails ── */
function EventDetails({ event }: { event: Event }) {
  return (
    <div>
      <span className="text-[11px] font-medium text-gray-400 uppercase tracking-wide">
        {event.category}
      </span>
      <h3 className="text-lg font-bold text-gray-900 mt-1 mb-1.5 group-hover:text-primary transition-colors">
        {event.title}
      </h3>
      <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-2">
        {event.description}
      </p>
    </div>
  );
}

/* ── AttendeeRow ── */
function AttendeeRow({ eventId }: { eventId: string }) {
  const { getState } = useRSVP();
  const { attendees } = getState(eventId);

  // Show mini avatar stack (first 3 attendees placeholder)
  const showAvatars = attendees > 0;
  const avatarCount = Math.min(attendees, 3);
  const extraCount = attendees - avatarCount;

  return (
    <div className="flex items-center gap-2">
      {showAvatars && (
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
        <span className="font-medium tabular-nums transition-all duration-300">
          {attendees}
        </span>
        <span>attending</span>
      </div>
    </div>
  );
}

/* ── EventCard (composed) ── */
export function EventCard({ event, delay }: { event: Event; delay: number }) {
  return (
    <FadeIn delay={delay}>
      <div className="group bg-white border border-gray-100 rounded-[1.25rem] overflow-hidden shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-300 hover:-translate-y-1">
        <Link href={`/events/${event.id}`}>
          <EventImage event={event} />
        </Link>
        <div className="p-5">
          <Link href={`/events/${event.id}`}>
            <EventDetails event={event} />
          </Link>
          {/* Urgency signal */}
          <div className="flex items-center gap-1.5 mb-3 text-[11px] text-gray-400 font-medium">
            <TrendingUp className="w-3 h-3 text-primary/70" />
            {event.attendees > 5
              ? `${Math.floor(event.attendees * 0.3)} RSVPs in the last hour`
              : "Just posted — be the first to join"}
          </div>
          {/* Footer: attendee row + RSVP */}
          <div className="flex items-center justify-between">
            <AttendeeRow eventId={event.id} />
            <RSVPButton eventId={event.id} />
          </div>
        </div>
      </div>
    </FadeIn>
  );
}
