/* ═══════════════════════════════════════════════════
   Company Pages — Data Engine
   About · Blog · Careers · Contact
   ═══════════════════════════════════════════════════ */

// ── ABOUT ──────────────────────────────────────────

export interface Belief {
  title: string;
  body: string;
}

export const beliefs: Belief[] = [
  {
    title: "People need people",
    body: "No algorithm can replace a warm conversation. We believe meaningful human presence is a basic need — not a luxury.",
  },
  {
    title: "Conversations heal",
    body: "Sometimes you don't need a therapist, you need a friend. A single genuine conversation can shift your entire day.",
  },
  {
    title: "Safety first",
    body: "Connection without trust is hollow. Every interaction on HireBuddy is built on verified identities and respectful boundaries.",
  },
  {
    title: "No judgment",
    body: "Whether you need someone to sit with you in silence or join you for coffee — every reason is valid. Always.",
  },
];

export interface TrustPillar {
  title: string;
  description: string;
}

export const trustPillars: TrustPillar[] = [
  {
    title: "Privacy by design",
    description:
      "Your data stays yours. End-to-end encryption, minimal collection, never sold. We'd rather shut down than betray your trust.",
  },
  {
    title: "Verified identities",
    description:
      "Government ID checks + face verification for every buddy. Real people, real accountability, real safety.",
  },
  {
    title: "Respectful community",
    description:
      "Zero tolerance for harassment. AI moderation + human review ensures every interaction meets our community standards.",
  },
];

// ── BLOG ───────────────────────────────────────────

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  image: string;
  featured?: boolean;
  author: string;
}

export const blogCategories = [
  "All",
  "Mental Health",
  "Human Connection",
  "Modern Life",
  "Stories",
  "Product Updates",
];

export const blogPosts: BlogPost[] = [
  {
    id: "loneliness-epidemic",
    title: "The Loneliness Epidemic: Why Connection Is the New Wellness",
    excerpt:
      "In a world of infinite scroll, real human contact is becoming the rarest resource. Here's what we can do about it.",
    category: "Mental Health",
    readTime: "7 min read",
    date: "Feb 18, 2026",
    image:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=800",
    featured: true,
    author: "Arjun Mehta",
  },
  {
    id: "strangers-to-friends",
    title: "From Strangers to Friends in One Coffee",
    excerpt:
      "How three HireBuddy users found lifelong friendships in the most unexpected situations.",
    category: "Stories",
    readTime: "5 min read",
    date: "Feb 14, 2026",
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=800",
    author: "Priya Kapoor",
  },
  {
    id: "why-men-dont-talk",
    title: "Why Men Don't Talk — And How We Can Change That",
    excerpt:
      "Society taught men to stay silent. We're building a space where vulnerability is strength.",
    category: "Human Connection",
    readTime: "6 min read",
    date: "Feb 10, 2026",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800",
    author: "Rahul Deshpande",
  },
  {
    id: "digital-detox-myth",
    title: "The Digital Detox Myth: Why Going Offline Isn't Enough",
    excerpt:
      "Unplugging only works if you plug into something real. The real cure for screen fatigue is genuine presence.",
    category: "Modern Life",
    readTime: "4 min read",
    date: "Feb 6, 2026",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800",
    author: "Sneha Rajan",
  },
  {
    id: "smart-bidding-launch",
    title: "Introducing Smart Bidding: Let Buddies Come to You",
    excerpt:
      "Post your situation and receive personalized bids from verified buddies. Less searching, more connecting.",
    category: "Product Updates",
    readTime: "3 min read",
    date: "Feb 2, 2026",
    image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=800",
    author: "HireBuddy Team",
  },
  {
    id: "weekend-alone-guide",
    title: "How to Make the Most of a Weekend Alone (Without Feeling Alone)",
    excerpt:
      "Being solo doesn't mean being lonely. A guide to intentional solitude — and when to reach out.",
    category: "Modern Life",
    readTime: "5 min read",
    date: "Jan 28, 2026",
    image:
      "https://images.unsplash.com/photo-1488998427799-e3362cec87c3?auto=format&fit=crop&q=80&w=800",
    author: "Meera Iyer",
  },
  {
    id: "grief-companion",
    title: "When Grief Needs a Companion, Not Advice",
    excerpt:
      "Sometimes the most healing thing someone can do is sit beside you in silence.",
    category: "Mental Health",
    readTime: "6 min read",
    date: "Jan 22, 2026",
    image:
      "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&q=80&w=800",
    author: "Arjun Mehta",
  },
  {
    id: "art-of-listening",
    title: "The Lost Art of Listening: Why Being Heard Changes Everything",
    excerpt:
      "In an age of hot takes and instant replies, the ability to truly listen has become a superpower.",
    category: "Human Connection",
    readTime: "5 min read",
    date: "Jan 16, 2026",
    image:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800",
    author: "Priya Kapoor",
  },
];

// ── CAREERS ────────────────────────────────────────

export interface CultureValue {
  title: string;
  body: string;
}

export const cultureValues: CultureValue[] = [
  {
    title: "Kindness",
    body: "We treat every user, teammate, and partner the way we'd treat a friend having a hard day. Kindness isn't soft — it's our operating system.",
  },
  {
    title: "Ownership",
    body: "You won't be a cog here. You'll own problems end-to-end, ship real features, and see your work change real lives.",
  },
  {
    title: "Craft",
    body: "We obsess over the pixel, the word, the UX flow. Good enough isn't. We build things we're proud to show our mothers.",
  },
  {
    title: "Empathy-first building",
    body: "Every feature starts with a human need, not a KPI. We build from the heart first, then validate with data.",
  },
];

export interface Perk {
  title: string;
  description: string;
}

export const perks: Perk[] = [
  {
    title: "Remote-first",
    description: "Work from anywhere in India. Show up as yourself.",
  },
  {
    title: "Flexible hours",
    description: "We care about output, not online status. Do your best work on your schedule.",
  },
  {
    title: "Deep purpose",
    description: "You'll never wonder if your work matters. It does — to real people, every single day.",
  },
];

export interface JobRole {
  id: string;
  title: string;
  team: string;
  location: string;
  type: string;
  summary: string;
}

export const jobRoles: JobRole[] = [
  {
    id: "fe-eng",
    title: "Frontend Engineer",
    team: "Engineering",
    location: "Remote (India)",
    type: "Full-time",
    summary:
      "Build beautiful, accessible interfaces that help people find human connection when they need it most.",
  },
  {
    id: "prod-designer",
    title: "Product Designer",
    team: "Design",
    location: "Remote (India)",
    type: "Full-time",
    summary:
      "Shape the experience layer of a human-first platform. Turn empathy into pixels.",
  },
  {
    id: "community-lead",
    title: "Community Lead",
    team: "Community",
    location: "Remote (India)",
    type: "Full-time",
    summary:
      "Own the heart of HireBuddy. Nurture, protect, and grow a community where people genuinely care about each other.",
  },
  {
    id: "be-eng",
    title: "Backend Engineer",
    team: "Engineering",
    location: "Remote (India)",
    type: "Full-time",
    summary:
      "Build scalable systems that power real-time human connections — matching, messaging, safety, and trust infrastructure.",
  },
];

// ── CONTACT ────────────────────────────────────────

export interface ContactChannel {
  label: string;
  email: string;
  description: string;
}

export const contactChannels: ContactChannel[] = [
  {
    label: "Support",
    email: "support@hirebuddy.app",
    description: "Questions about your account, bookings, or the platform.",
  },
  {
    label: "Partnerships",
    email: "partners@hirebuddy.app",
    description: "Collaborate with us on events, content, or community.",
  },
  {
    label: "Safety",
    email: "safety@hirebuddy.app",
    description: "Report concerns or get help with safety issues.",
  },
];

export const contactTopics = [
  "Support",
  "Safety",
  "Partnerships",
  "Media",
  "Other",
];
