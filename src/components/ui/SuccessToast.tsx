"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Heart, PartyPopper } from "lucide-react";
import { cn } from "@/lib/utils";
import { duration, easing } from "@/lib/motion";

/* ═══════════════════════════════════════════════════
   Success Toast — Gentle positive feedback
   No confetti, just warm confirmation.
   ═══════════════════════════════════════════════════ */

type ToastVariant = "success" | "connect" | "rsvp";

interface SuccessToastProps {
  show: boolean;
  variant?: ToastVariant;
  message?: string;
  onDone?: () => void;
}

const variants: Record<ToastVariant, { icon: React.ElementType; color: string; defaultMsg: string }> = {
  success: {
    icon: CheckCircle2,
    color: "text-emerald-500",
    defaultMsg: "You're all set. That was easy.",
  },
  connect: {
    icon: Heart,
    color: "text-primary",
    defaultMsg: "Connection sent! They'll get back soon.",
  },
  rsvp: {
    icon: PartyPopper,
    color: "text-violet-500",
    defaultMsg: "You're in! See you there.",
  },
};

export function SuccessToast({
  show,
  variant = "success",
  message,
  onDone,
}: SuccessToastProps) {
  const config = variants[variant];
  const Icon = config.icon;

  return (
    <AnimatePresence onExitComplete={onDone}>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.95 }}
          transition={{ duration: duration.premium, ease: easing.inOut }}
          className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-white border border-gray-100 rounded-2xl px-5 py-3.5 shadow-xl flex items-center gap-3"
        >
          <div className={cn("shrink-0", config.color)}>
            <Icon className="w-5 h-5" />
          </div>
          <span className="text-sm font-semibold text-gray-800">
            {message || config.defaultMsg}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
