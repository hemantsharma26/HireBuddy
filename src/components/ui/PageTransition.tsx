"use client";

import { motion } from "framer-motion";
import { pageTransition } from "@/lib/motion";

/* ═══════════════════════════════════════════════════
   Page Transition Wrapper
   Soft fade-up on route change (120–160ms)
   ═══════════════════════════════════════════════════ */

export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={pageTransition.initial}
      animate={pageTransition.animate}
      className="will-change-[opacity,transform]"
    >
      {children}
    </motion.div>
  );
}
