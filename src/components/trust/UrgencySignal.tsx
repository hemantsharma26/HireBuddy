"use client";

import { Eye, TrendingUp, Clock, Flame } from "lucide-react";
import { cn } from "@/lib/utils";

/* ═══════════════════════════════════════════════════
   Urgency Signal — Subtle, organic conversion nudges
   "5 people viewed this today" / "Trending in your city"
   ═══════════════════════════════════════════════════ */

type UrgencyVariant = "views" | "trending" | "recent" | "hot";

interface UrgencySignalProps {
  variant?: UrgencyVariant;
  text: string;
  className?: string;
}

const config: Record<UrgencyVariant, { icon: React.ElementType; color: string }> = {
  views: { icon: Eye, color: "text-gray-500" },
  trending: { icon: TrendingUp, color: "text-primary" },
  recent: { icon: Clock, color: "text-blue-500" },
  hot: { icon: Flame, color: "text-orange-500" },
};

export function UrgencySignal({
  variant = "views",
  text,
  className,
}: UrgencySignalProps) {
  const { icon: Icon, color } = config[variant];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-[11px] font-medium text-gray-400",
        className
      )}
    >
      <Icon className={cn("w-3 h-3", color)} />
      {text}
    </span>
  );
}
