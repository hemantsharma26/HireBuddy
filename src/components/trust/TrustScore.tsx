"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

/* ═══════════════════════════════════════════════════
   Trust Score — Compact rating display with context
   ═══════════════════════════════════════════════════ */

interface TrustScoreProps {
  rating: number;
  reviews?: number;
  size?: "sm" | "md" | "lg";
  showCount?: boolean;
  className?: string;
}

export function TrustScore({
  rating,
  reviews,
  size = "sm",
  showCount = true,
  className,
}: TrustScoreProps) {
  const stars = Math.round(rating);

  return (
    <div className={cn("inline-flex items-center gap-1.5", className)}>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn(
              size === "sm" ? "w-3 h-3" : size === "md" ? "w-3.5 h-3.5" : "w-4 h-4",
              i < stars
                ? "text-amber-400 fill-amber-400"
                : "text-gray-200 fill-gray-200"
            )}
          />
        ))}
      </div>
      <span
        className={cn(
          "font-bold text-gray-900",
          size === "sm" ? "text-xs" : size === "md" ? "text-sm" : "text-base"
        )}
      >
        {rating.toFixed(1)}
      </span>
      {showCount && reviews !== undefined && (
        <span
          className={cn(
            "text-gray-400",
            size === "sm" ? "text-[10px]" : "text-xs"
          )}
        >
          ({reviews})
        </span>
      )}
    </div>
  );
}
