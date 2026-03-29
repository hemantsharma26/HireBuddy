"use client";

import { motion, useReducedMotion } from "framer-motion";
import { duration, easing } from "@/lib/motion";

/* ═══════════════════════════════════════════════════
   FadeInView — Scroll-triggered lazy fade-in
   Uses IntersectionObserver via framer-motion
   Respects prefers-reduced-motion
   ═══════════════════════════════════════════════════ */

interface FadeInViewProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  /** Viewport threshold 0–1 */
  threshold?: number;
  /** Trigger only once */
  once?: boolean;
}

export function FadeInView({
  children,
  delay = 0,
  className,
  threshold = 0.15,
  once = true,
}: FadeInViewProps) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: threshold }}
      transition={{
        duration: duration.premium,
        delay,
        ease: easing.inOut,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
