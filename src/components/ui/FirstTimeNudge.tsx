"use client";

import { useEffect, useState } from "react";
import { X, Lightbulb } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { duration, easing } from "@/lib/motion";

/* ═══════════════════════════════════════════════════
   First-Time Nudge — Dismissible onboarding tooltip
   ═══════════════════════════════════════════════════ */

interface NudgeProps {
  /** Unique key for localStorage dismiss tracking */
  id: string;
  text: string;
  className?: string;
}

export function FirstTimeNudge({ id, text, className }: NudgeProps) {
  const [visible, setVisible] = useState(false);
  const storageKey = `hirebuddy_nudge_${id}`;

  useEffect(() => {
    const dismissed = localStorage.getItem(storageKey);
    if (!dismissed) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [storageKey]);

  const dismiss = () => {
    setVisible(false);
    localStorage.setItem(storageKey, "1");
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 8, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 4, scale: 0.96 }}
          transition={{ duration: duration.premium, ease: easing.inOut }}
          className={cn(
            "flex items-start gap-2.5 bg-amber-50 border border-amber-100 text-amber-800 rounded-xl px-4 py-3 text-xs font-medium shadow-sm",
            className
          )}
        >
          <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
          <span className="flex-1 leading-relaxed">{text}</span>
          <button
            onClick={dismiss}
            className="shrink-0 text-amber-400 hover:text-amber-600 transition-colors"
            aria-label="Dismiss"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
