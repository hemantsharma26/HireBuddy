"use client";

import { PageTransition } from "@/components/ui/PageTransition";
import { StickySmartCTA } from "@/components/ui/StickySmartCTA";

/* ═══════════════════════════════════════════════════
   Client Shell — Page transitions + sticky CTA
   Wraps {children} in layout.tsx
   ═══════════════════════════════════════════════════ */

export function ClientShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageTransition>{children}</PageTransition>
      <StickySmartCTA />
    </>
  );
}
