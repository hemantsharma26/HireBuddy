"use client";

import { Users, TrendingUp, ShieldCheck, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

/* ═══════════════════════════════════════════════════
   Social Proof Strip — Micro social proof everywhere
   ═══════════════════════════════════════════════════ */

interface SocialProofItem {
  icon: React.ElementType;
  text: string;
  highlight?: string;
}

const defaultProofs: SocialProofItem[] = [
  { icon: Users, text: "Trusted by", highlight: "10,000+ Indians" },
  { icon: TrendingUp, text: "1,200 connections", highlight: "this week" },
  { icon: ShieldCheck, text: "92% feel safer", highlight: "with verified buddies" },
];

interface SocialProofStripProps {
  items?: SocialProofItem[];
  variant?: "light" | "dark" | "muted";
  className?: string;
}

export function SocialProofStrip({
  items = defaultProofs,
  variant = "muted",
  className,
}: SocialProofStripProps) {
  const colorMap = {
    light: {
      wrapper: "bg-white/5 border-white/10",
      icon: "text-primary/70",
      text: "text-white/50",
      highlight: "text-white/80",
    },
    dark: {
      wrapper: "bg-gray-50 border-gray-100",
      icon: "text-primary/70",
      text: "text-gray-400",
      highlight: "text-gray-700",
    },
    muted: {
      wrapper: "bg-gray-50/50 border-gray-100/50",
      icon: "text-gray-400",
      text: "text-gray-400",
      highlight: "text-gray-600",
    },
  };
  const colors = colorMap[variant];

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-x-6 gap-y-2 rounded-full px-6 py-2.5 border text-xs font-medium",
        colors.wrapper,
        className
      )}
    >
      {items.map((item, i) => {
        const Icon = item.icon;
        return (
          <span key={i} className={cn("inline-flex items-center gap-1.5", colors.text)}>
            <Icon className={cn("w-3.5 h-3.5", colors.icon)} />
            {item.text}{" "}
            {item.highlight && (
              <span className={cn("font-semibold", colors.highlight)}>
                {item.highlight}
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}

/** Small inline proof for cards / sections */
export function MiniProof({
  icon: Icon = Heart,
  text,
  className,
}: {
  icon?: React.ElementType;
  text: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-[11px] text-gray-400 font-medium",
        className
      )}
    >
      <Icon className="w-3 h-3 text-gray-300" />
      {text}
    </span>
  );
}
