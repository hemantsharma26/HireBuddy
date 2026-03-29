/* ─── Security & Trust — Content Engine ─── */

export interface SafetyFeature {
  title: string;
  description: string;
  points: string[];
}

export interface ControlPoint {
  text: string;
}

export interface TrustStat {
  label: string;
  value: string;
  note: string;
}

export interface RoadmapItem {
  title: string;
  description: string;
}

/* ── Section 2 — How We Keep You Safe ── */
export const safetyFeatures: SafetyFeature[] = [
  {
    title: "Private Conversations",
    description: "What's said between you stays between you.",
    points: [
      "End-to-end protected sessions — your words stay between you and your buddy.",
      "No public exposure. Nothing you share is visible to anyone else.",
    ],
  },
  {
    title: "Verified Profiles",
    description: "Real people, confirmed identities.",
    points: [
      "Phone verification to confirm real humans.",
      "Email verification for account security.",
      "Optional ID verification for deeper trust.",
    ],
  },
  {
    title: "Smart Moderation",
    description: "Thoughtful oversight, not surveillance.",
    points: [
      "AI-assisted detection to flag harmful behavior (future-ready).",
      "Manual review by a real, thoughtful team.",
    ],
  },
  {
    title: "Report & Block Tools",
    description: "Your safety, one tap away.",
    points: [
      "One-tap reporting — takes less than 5 seconds.",
      "Instant blocking — no delay, no questions asked.",
    ],
  },
];

/* ── Section 3 — Your Control ── */
export const controlPoints: ControlPoint[] = [
  { text: "Choose how you connect — voice, video, or chat. It's always your call." },
  { text: "Leave any session at any time. No explanations needed." },
  { text: "Block anyone instantly. We won't argue." },
  { text: "No forced interactions. Ever." },
];

/* ── Section 4 — Data Privacy ── */
export const privacyPoints = [
  {
    title: "We don't sell your data.",
    description:
      "Your information exists to serve you — not advertisers, not third parties, not anyone else.",
  },
  {
    title: "Conversations stay private.",
    description:
      "What's said in a session stays there. We don't read, store, or analyze your conversations.",
  },
  {
    title: "Minimal data collection.",
    description:
      "We collect only what helps you feel safe and get a better experience. Nothing more.",
  },
];

export const privacyTagline =
  "We collect only what helps you feel safe.";

/* ── Section 5 — Trust Signals ── */
export const trustStats: TrustStat[] = [
  { label: "Verified Users", value: "2,400+", note: "and growing" },
  { label: "Sessions Completed", value: "8,100+", note: "real conversations" },
  { label: "Repeat Users", value: "74%", note: "came back for another session" },
];

/* ── Section 6 — If Something Goes Wrong ── */
export const responseActions = [
  {
    title: "24-hour review system",
    description:
      "Every report is reviewed within 24 hours by a real person — not a bot.",
  },
  {
    title: "Emergency flagging",
    description:
      "Critical situations get escalated immediately. We're building faster triage tools right now.",
  },
  {
    title: "Zero tolerance for abuse",
    description:
      "Harassment, threats, or exploitation result in permanent removal. No exceptions.",
  },
];

/* ── Section 7 — Safety Roadmap ── */
export const roadmapItems: RoadmapItem[] = [
  {
    title: "Background-verified buddies",
    description: "Optional deeper checks for buddies who want to build extra trust.",
  },
  {
    title: "Safety score",
    description: "A transparent, community-driven trust indicator on every profile.",
  },
  {
    title: "AI red-flag detection",
    description: "Early warning system that spots concerning patterns before harm happens.",
  },
];
