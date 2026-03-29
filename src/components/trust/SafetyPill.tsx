"use client";

import { ShieldCheck, Lock, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

/* ═══════════════════════════════════════════════════
   Safety Pill — Reassurance microcopy badges
   ═══════════════════════════════════════════════════ */

type SafetyVariant = "verified" | "privacy" | "consent";

interface SafetyPillProps {
  variant?: SafetyVariant;
  className?: string;
}

const safetyConfig: Record<
  SafetyVariant,
  { icon: React.ElementType; text: string }
> = {
  verified: {
    icon: ShieldCheck,
    text: "All buddies are ID verified",
  },
  privacy: {
    icon: Lock,
    text: "Your privacy is always protected",
  },
  consent: {
    icon: Eye,
    text: "No personal data shared without consent",
  },
};

export function SafetyPill({ variant = "verified", className }: SafetyPillProps) {
  const config = safetyConfig[variant];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-emerald-50/80 border border-emerald-100 text-emerald-700 text-xs font-semibold shadow-sm",
        className
      )}
    >
      <Icon className="w-4 h-4 shrink-0 text-emerald-500" />
      {config.text}
    </div>
  );
}

/** Compact row of all safety pills */
export function SafetyStrip({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-wrap items-center justify-center gap-3", className)}>
      <SafetyPill variant="verified" />
      <SafetyPill variant="privacy" />
      <SafetyPill variant="consent" />
    </div>
  );
}
