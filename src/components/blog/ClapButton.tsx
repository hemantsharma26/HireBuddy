"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface ClapButtonProps {
  slug: string;
}

/**
 * Clap/like button with localStorage persistence and animated feedback.
 */
export function ClapButton({ slug }: ClapButtonProps) {
  const storageKey = `hirebuddy_claps_${slug}`;
  const [claps, setClaps] = useState(0);
  const [userClaps, setUserClaps] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const data = JSON.parse(stored);
        setClaps(data.total || 0);
        setUserClaps(data.user || 0);
      } else {
        // Seed with a realistic-looking number
        const seed = slug.length * 7 + 42;
        setClaps(seed);
      }
    } catch {
      // ignore
    }
  }, [slug, storageKey]);

  function handleClap() {
    if (userClaps >= 50) return; // Max 50 claps per user

    const newTotal = claps + 1;
    const newUser = userClaps + 1;
    setClaps(newTotal);
    setUserClaps(newUser);
    setAnimating(true);
    setTimeout(() => setAnimating(false), 400);

    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify({ total: newTotal, user: newUser })
      );
    } catch {
      // ignore
    }
  }

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={handleClap}
        className={cn(
          "relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200",
          "border-2",
          userClaps > 0
            ? "border-primary/30 bg-primary/5 text-primary"
            : "border-gray-200 bg-white text-gray-400 hover:border-primary/30 hover:text-primary",
          animating && "scale-125"
        )}
        aria-label="Clap for this article"
      >
        <Heart
          className={cn(
            "w-5 h-5 transition-all",
            userClaps > 0 && "fill-primary"
          )}
        />
        {animating && (
          <span className="absolute -top-2 -right-1 text-xs font-bold text-primary animate-bounce">
            +1
          </span>
        )}
      </button>
      <span className="text-sm font-medium text-gray-500">
        {claps > 0 && claps}
      </span>
    </div>
  );
}
