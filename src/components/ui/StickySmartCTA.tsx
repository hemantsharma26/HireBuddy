"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, MessageSquarePlus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { duration, easing } from "@/lib/motion";

/* ═══════════════════════════════════════════════════
   Sticky Smart CTA — Mobile bottom bar + Desktop corner
   Context-aware, non-intrusive conversion nudge
   ═══════════════════════════════════════════════════ */

export function StickySmartCTA({ className }: { className?: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past hero (~400px)
      setVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* ─── Mobile: Sticky bottom bar ─── */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: duration.premium, ease: easing.inOut }}
            className={cn(
              "fixed bottom-0 left-0 right-0 z-40 lg:hidden",
              "bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]",
              "px-4 py-3 safe-area-bottom",
              className
            )}
          >
            <div className="flex items-center gap-2">
              <Link
                href="/buddies"
                className="flex-1 inline-flex items-center justify-center gap-2 h-11 rounded-full bg-gray-900 text-white text-sm font-bold transition-all active:scale-[0.97]"
              >
                <Search className="w-4 h-4" />
                Find a Buddy
              </Link>
              <Link
                href="/post-request"
                className="flex-1 inline-flex items-center justify-center gap-2 h-11 rounded-full bg-[#FF6B6B] text-white text-sm font-bold transition-all active:scale-[0.97] btn-glow"
              >
                <MessageSquarePlus className="w-4 h-4" />
                Post Situation
              </Link>
            </div>
          </motion.div>

          {/* ─── Desktop: Corner floating CTA ─── */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: duration.premium, ease: easing.inOut }}
            className={cn(
              "fixed bottom-6 right-6 z-40 hidden lg:flex flex-col gap-2",
              className
            )}
          >
            <Link
              href="/post-request"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#FF6B6B] text-white text-sm font-bold shadow-xl shadow-red-500/20 hover:shadow-2xl hover:shadow-red-500/30 transition-all hover:scale-105 active:scale-[0.97] btn-glow"
            >
              <MessageSquarePlus className="w-4 h-4" />
              Post a Situation
            </Link>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
