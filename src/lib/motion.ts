/* ═══════════════════════════════════════════════════
   Motion Design Tokens — HireBuddy
   Consistent, subtle, premium motion across the app.
   ═══════════════════════════════════════════════════ */

/** Duration tokens (ms) */
export const duration = {
  fast: 0.12,
  normal: 0.2,
  premium: 0.3,
  slow: 0.5,
} as const;

/** Easing curves */
export const easing = {
  /** Snappy UI interactions */
  out: [0.0, 0.0, 0.2, 1] as [number, number, number, number],
  /** Smooth hero / entry animations */
  inOut: [0.4, 0.0, 0.2, 1] as [number, number, number, number],
  /** Gentle bounce */
  softBounce: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
} as const;

/* ── Framer-motion variant presets ── */

/** Standard fade-up entrance */
export const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: duration.premium, delay, ease: easing.inOut },
  }),
} as const;

/** Fade in only (no vertical movement) */
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: duration.normal, delay, ease: easing.out },
  }),
} as const;

/** Stagger children container */
export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
} as const;

/** Card hover lift — use with whileHover */
export const cardHover = {
  y: -4,
  transition: { duration: duration.normal, ease: easing.out },
} as const;

/** Button press — use with whileTap */
export const buttonTap = {
  scale: 0.97,
  transition: { duration: duration.fast, ease: easing.out },
} as const;

/** Page transition — wraps route content */
export const pageTransition = {
  initial: { opacity: 0, y: 8 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.premium, ease: easing.inOut },
  },
  exit: {
    opacity: 0,
    y: -4,
    transition: { duration: duration.fast, ease: easing.out },
  },
} as const;

/** Scale pop — for micro-delight moments */
export const scalePop = {
  initial: { scale: 0.9, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: { duration: duration.normal, ease: easing.softBounce },
  },
} as const;
