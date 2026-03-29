"use client";

import { ShieldCheck, Star, Fingerprint, Zap, Flame } from "lucide-react";
import { cn } from "@/lib/utils";

/* ═══════════════════════════════════════════════════
   Trust Badge System — Subtle, inline trust indicators
   ═══════════════════════════════════════════════════ */

export type BadgeVariant =
  | "verified"
  | "top-rated"
  | "background-checked"
  | "active"
  | "responsive";

interface VerifiedBadgeProps {
  variant?: BadgeVariant;
  size?: "sm" | "md";
  showLabel?: boolean;
  className?: string;
}

const badgeConfig: Record<
  BadgeVariant,
  { icon: React.ElementType; label: string; color: string; bg: string }
> = {
  verified: {
    icon: ShieldCheck,
    label: "ID Verified",
    color: "text-blue-600",
    bg: "bg-blue-50 border-blue-100",
  },
  "top-rated": {
    icon: Star,
    label: "Top Rated",
    color: "text-amber-600",
    bg: "bg-amber-50 border-amber-100",
  },
  "background-checked": {
    icon: Fingerprint,
    label: "Background Checked",
    color: "text-emerald-600",
    bg: "bg-emerald-50 border-emerald-100",
  },
  active: {
    icon: Zap,
    label: "Active Recently",
    color: "text-violet-600",
    bg: "bg-violet-50 border-violet-100",
  },
  responsive: {
    icon: Flame,
    label: "Highly Responsive",
    color: "text-orange-600",
    bg: "bg-orange-50 border-orange-100",
  },
};

export function VerifiedBadge({
  variant = "verified",
  size = "sm",
  showLabel = false,
  className,
}: VerifiedBadgeProps) {
  const config = badgeConfig[variant];
  const Icon = config.icon;
  const iconSize = size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4";

  if (!showLabel) {
    return (
      <Icon
        className={cn(iconSize, config.color, className)}
        aria-label={config.label}
      />
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border font-medium",
        config.bg,
        config.color,
        size === "sm"
          ? "px-2 py-0.5 text-[10px]"
          : "px-2.5 py-1 text-xs",
        className
      )}
    >
      <Icon className={iconSize} />
      {config.label}
    </span>
  );
}
