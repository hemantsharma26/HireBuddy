import { SearchX, ArrowRight, Heart, Users, MapPin, HelpCircle, Send, Calendar } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

/* ═══════════════════════════════════════════════════
   Emotional Empty State — Warm, human, actionable
   ═══════════════════════════════════════════════════ */

interface EmptyStateProps {
  variant?: "search" | "buddies" | "events" | "messages" | "general" | "groups" | "cities" | "requests" | "help" | "rsvps";
  className?: string;
}

const variants = {
  search: {
    icon: SearchX,
    title: "No matches right now",
    subtitle:
      "No buddies nearby right now — but someone amazing could be one tap away.",
    cta: "Post your situation",
    ctaHref: "/post-request",
  },
  buddies: {
    icon: Users,
    title: "Still waiting for buddies here",
    subtitle:
      "This area is new. Be the first to post — your buddy might already be looking for you.",
    cta: "Post a situation",
    ctaHref: "/post-request",
  },
  events: {
    icon: Calendar,
    title: "No events happening yet",
    subtitle:
      "Good things take time. Create an event and bring people together.",
    cta: "Create an event",
    ctaHref: "/create-event",
  },
  messages: {
    icon: Heart,
    title: "Your inbox is quiet... for now",
    subtitle:
      "Start a conversation with a buddy. A simple hello can change everything.",
    cta: "Find a buddy",
    ctaHref: "/buddies",
  },
  general: {
    icon: SearchX,
    title: "Nothing here yet",
    subtitle:
      "Try adjusting your filters or explore something new.",
    cta: "Explore",
    ctaHref: "/explore",
  },
  groups: {
    icon: Users,
    title: "No circles match that",
    subtitle:
      "We couldn't find a group — but new circles pop up daily. Try a different search or start your own.",
    cta: "Browse all groups",
    ctaHref: "/groups",
  },
  cities: {
    icon: MapPin,
    title: "That city isn't here yet",
    subtitle:
      "We're growing fast. Your city might show up soon — or you can help by spreading the word.",
    cta: "Explore all cities",
    ctaHref: "/cities",
  },
  requests: {
    icon: Send,
    title: "No requests here right now",
    subtitle:
      "People need support at all hours — check back soon or try another category.",
    cta: "Post your own",
    ctaHref: "/post-request",
  },
  help: {
    icon: HelpCircle,
    title: "No articles matched",
    subtitle:
      "We couldn't find anything for that — try a simpler term or reach out to us directly.",
    cta: "Contact support",
    ctaHref: "/contact",
  },
  rsvps: {
    icon: Calendar,
    title: "No events yet",
    subtitle:
      "When you RSVP to an event, it shows up here. Go explore what's happening around you.",
    cta: "Explore events",
    ctaHref: "/events",
  },
};

export function EmptyState({ variant = "search", className }: EmptyStateProps) {
  const v = variants[variant];
  const Icon = v.icon;

  return (
    <div className={cn("py-12 md:py-20 text-center", className)}>
      {/* Illustration blob */}
      <div className="relative inline-flex items-center justify-center w-24 h-24 mb-8">
        <div className="absolute inset-0 rounded-full bg-primary/5 animate-pulse" />
        <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-50 text-gray-400">
          <Icon className="w-9 h-9" />
        </div>
      </div>

      <h3 className="text-2xl font-bold text-gray-900 mb-3 tracking-tight">
        {v.title}
      </h3>
      <p className="text-gray-500 max-w-md mx-auto mb-8 leading-relaxed text-[15px]">
        {v.subtitle}
      </p>

      <Link
        href={v.ctaHref}
        className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#FF6B6B] hover:bg-[#ff5252] px-8 text-sm font-bold text-white shadow-lg shadow-red-500/20 transition-all hover:scale-105 active:scale-95 btn-glow"
      >
        {v.cta}
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
