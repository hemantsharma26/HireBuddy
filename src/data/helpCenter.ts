/* ═══════════════════════════════════════════════════════
   Help Center — Data, Types & Content
   ═══════════════════════════════════════════════════════ */

// ── Category ──
export interface HelpCategory {
  id: string;
  title: string;
  iconName: string;
  description: string;
  articles: HelpArticle[];
}

// ── Article ──
export interface HelpArticle {
  id: string;
  title: string;
  preview: string;
  body: string[];        // paragraphs
  categoryId: string;
  featured?: boolean;
}

// ── Categories + embedded articles ──
export const helpCategories: HelpCategory[] = [
  {
    id: "getting-started",
    title: "Getting Started",
    iconName: "Rocket",
    description: "New here? We've got you.",
    articles: [
      {
        id: "what-is-hirebuddy",
        title: "What is HireBuddy?",
        preview: "HireBuddy connects you with real people for companionship, support, and everyday help.",
        categoryId: "getting-started",
        featured: true,
        body: [
          "HireBuddy is a people-first platform that connects you with real, verified humans for companionship, emotional support, and everyday tasks.",
          "Whether you need someone to talk to at 2 AM, a buddy for a movie, or just a calm presence during an anxious day — there's a person here for you.",
          "This isn't a job marketplace. It's a human connection network. People on HireBuddy are not workers — they're companions, listeners, and supporters who offer their time and presence.",
          "Every buddy goes through verification, and you can see trust scores, vibe tags, and real reviews before you connect. Your safety and comfort come first — always.",
        ],
      },
      {
        id: "how-it-works",
        title: "How HireBuddy works (step-by-step)",
        preview: "Discover, connect, and feel supported — here's the full journey.",
        categoryId: "getting-started",
        featured: true,
        body: [
          "Step 1 — Discover: Browse buddies by category, vibe, or location. Use filters to find someone who matches your energy.",
          "Step 2 — Connect: Check their profile, read reviews, and see their comfort settings. When you're ready, send a request or start a chat.",
          "Step 3 — Talk: Have a conversation — video, voice, or chat. The first few minutes can be free so you both feel comfortable.",
          "Step 4 — Appreciate: After your session, you can leave a review and send an appreciation (payment). It's not a fee — it's a thank-you for their time.",
          "That's it. No middlemen, no corporate walls. Just humans helping humans.",
        ],
      },
      {
        id: "first-session-guide",
        title: "Your first session — what to expect",
        preview: "Nervous? Totally normal. Here's how to make your first session feel easy.",
        categoryId: "getting-started",
        body: [
          "Your first session might feel a little nerve-wracking — that's completely normal. Here's what to expect so you can relax.",
          "Before the session: Pick a buddy whose vibe matches yours. Read their 'nervous message' on their profile — most buddies have one, and it's there to make you feel safe.",
          "During the session: There are no rules. Talk about whatever you want. Most people start with small talk and naturally move deeper. There's no pressure to 'perform' or be interesting.",
          "After the session: You can leave a review (anonymous if you prefer), rate your experience, and send an appreciation. If you didn't click, that's okay — try someone else. Finding the right buddy is like finding the right friend. It takes a moment.",
          "Remember: You're not a customer. You're a person. And so is your buddy. Treat the session like a conversation between two real humans — because that's exactly what it is.",
        ],
      },
    ],
  },
  {
    id: "finding-buddy",
    title: "Finding the Right Buddy",
    iconName: "Search",
    description: "Tips for finding your perfect match.",
    articles: [
      {
        id: "how-matching-works",
        title: "How matching works",
        preview: "We help you find the right person — not just the nearest one.",
        categoryId: "finding-buddy",
        body: [
          "HireBuddy doesn't just show you random profiles. Our matching considers vibe tags, availability, comfort settings, trust scores, and your specific needs.",
          "When you browse, profiles are ranked by relevance — not just by price or proximity. A buddy tagged 'Calm presence' who's available late night will show up first if you're searching at midnight.",
          "You can also post your situation (what you're going through) and let buddies come to you with support offers. This is often the most effective way to find the right match.",
          "Trust the process: read profiles carefully, check vibe tags, and don't rush. The right connection is worth the extra minute.",
        ],
      },
      {
        id: "support-offer-explained",
        title: "How the Support Offer system works",
        preview: "It's not bidding. It's buddies telling you what they can offer.",
        categoryId: "finding-buddy",
        featured: true,
        body: [
          "The Support Offer system lets you set a budget for the kind of help you need. Buddies then send you offers with their availability and a personal message.",
          "It's not an auction — it's a way for buddies to tell you: 'Hey, I'm here, and this is what I can offer.' You choose based on vibe, not just price.",
          "This system keeps things fair. Buddies with higher warmth scores and better reviews naturally stand out, while budget-friendly options remain accessible.",
          "To use it: Post a situation → set your budget range → wait for offers → pick the one that feels right.",
        ],
      },
      {
        id: "choosing-safely",
        title: "How to choose a buddy safely",
        preview: "Trust your instinct — and our verification layers.",
        categoryId: "finding-buddy",
        body: [
          "Your safety is the foundation of everything we build. Here's how to choose wisely:",
          "Check verification level: Buddies are verified at 3 levels — Phone, Company, and Government ID. Higher verification = more trust.",
          "Read reviews: Real reviews from real people. Look for patterns — not just star ratings.",
          "Look at comfort settings: A buddy who's transparent about their communication preferences (video, voice, chat) is more likely to respect yours.",
          "Trust your gut: If something feels off, it probably is. You can always skip and find someone else. There's no pressure to commit.",
        ],
      },
    ],
  },
  {
    id: "payments",
    title: "Payments & Pricing",
    iconName: "CreditCard",
    description: "How money works here — simply.",
    articles: [
      {
        id: "how-payments-work",
        title: "How payments work on HireBuddy",
        preview: "Simple, transparent, and fair for everyone.",
        categoryId: "payments",
        body: [
          "Payments on HireBuddy are called 'Support Appreciations.' They're not fees — they're a way of valuing someone's time and presence.",
          "How it works: After a session, you send the agreed appreciation amount. Payments are processed securely, and buddies receive their payout after a short holding period.",
          "A small platform fee (5%) helps us keep HireBuddy running, safe, and improving.",
          "If a buddy offers 'free first 5 minutes,' you can chat and decide if you want to continue — no commitment required.",
        ],
      },
      {
        id: "refund-policy",
        title: "Refund policy",
        preview: "If something went wrong, we'll make it right.",
        categoryId: "payments",
        body: [
          "We want every experience to be a good one. If it wasn't, here's how refunds work:",
          "Full refund: If a buddy doesn't show up or cancels last minute, you get a full refund — no questions asked.",
          "Partial refund: If the session was significantly shorter than agreed or if there was a technical issue, reach out and we'll work with you.",
          "Not eligible: If you simply didn't 'click' with a buddy, refunds aren't available — but we encourage you to try another buddy. Finding the right match takes a moment.",
          "To request a refund: Go to your session history → select the session → tap 'Report an issue' → our team will review within 24 hours.",
        ],
      },
      {
        id: "support-offer-pricing",
        title: "Understanding Support Offer pricing",
        preview: "You set the budget. Buddies set their value. Fairness wins.",
        categoryId: "payments",
        body: [
          "Support Offer pricing is flexible. You set a budget range based on what you're comfortable with, and buddies send offers within that range.",
          "Buddies with more experience, higher trust scores, and better reviews may set higher appreciation ranges — but that doesn't mean budget-friendly options aren't great. Many highly-rated buddies offer sessions starting at ₹100.",
          "The system is designed so that quality and affordability coexist. Nobody gets priced out of human connection.",
        ],
      },
    ],
  },
  {
    id: "safety",
    title: "Safety & Trust",
    iconName: "ShieldCheck",
    description: "Your safety is our foundation.",
    articles: [
      {
        id: "is-this-safe",
        title: "Is HireBuddy safe?",
        preview: "We built safety into every layer of the product.",
        categoryId: "safety",
        featured: true,
        body: [
          "Safety isn't a feature we added later — it's the foundation we built on.",
          "Every buddy goes through identity verification. Profiles show trust scores, vibe tags, and real reviews so you can make informed choices.",
          "Comfort settings let you control exactly how you communicate — video, voice, or chat only. Same-gender matching is available if that makes you more comfortable.",
          "All conversations happen within the platform. No personal contact info is shared unless you choose to.",
          "Our reporting system is real-time. If someone makes you uncomfortable, you can report them instantly. We investigate every report — no exceptions.",
          "Remember: trust your instinct. If something feels wrong, leave the session and report. We take every claim seriously.",
        ],
      },
      {
        id: "reporting-users",
        title: "How to report a user",
        preview: "If something feels wrong, we want to know. Immediately.",
        categoryId: "safety",
        body: [
          "Reporting is simple, fast, and completely confidential:",
          "During a session: Tap the safety icon → select a reason → submit. The report is logged immediately.",
          "After a session: Go to session history → select the session → 'Report an issue.'",
          "From a profile: Tap the three-dot menu → 'Report this person.'",
          "What happens next: Our trust team reviews every report within 24 hours. Serious violations (harassment, threats) trigger immediate account suspension.",
          "Your report is always confidential. The other person will never know who reported them.",
        ],
      },
      {
        id: "privacy-explained",
        title: "Your privacy on HireBuddy",
        preview: "What we collect, what we don't, and why.",
        categoryId: "safety",
        body: [
          "We collect only what's necessary to keep the platform running and safe. Here's the honest breakdown:",
          "We collect: Your name, email, phone (for verification), profile info you choose to share, session history, and payment info.",
          "We don't collect: Your conversations (we don't read or store chat content), your location in real-time, or any data we don't need.",
          "We never sell your data. Period. Your information is used to improve matching, keep you safe, and process payments — nothing else.",
          "You can request a full data export or account deletion at any time from your profile settings.",
        ],
      },
    ],
  },
  {
    id: "account",
    title: "Account Help",
    iconName: "User",
    description: "Manage your account easily.",
    articles: [
      {
        id: "reset-password",
        title: "How to reset your password",
        preview: "Forgot it? No worries. Let's get you back in.",
        categoryId: "account",
        body: [
          "If you're logged in: Go to your Profile → Account & Security → Change Password. Enter your current password and set a new one.",
          "If you're locked out: On the login page, tap 'Forgot password?' → enter your email → we'll send a reset link. Check your spam folder if you don't see it.",
          "For security, all other sessions will be logged out when you change your password.",
          "Pro tip: Use a password that's at least 12 characters with a mix of letters, numbers, and symbols. Your HireBuddy account carries trust — protect it well.",
        ],
      },
      {
        id: "change-email",
        title: "How to change your email",
        preview: "Quick and secure — with OTP verification.",
        categoryId: "account",
        body: [
          "Go to your Profile → Account & Security → Change Email.",
          "Enter your new email address and tap 'Send verification code.' We'll send a 6-digit OTP to your new email.",
          "Enter the code to confirm. Your email will be instantly updated.",
          "Note: Your old email will receive a notification about the change for security purposes.",
        ],
      },
      {
        id: "delete-account",
        title: "How to delete your account",
        preview: "We'll be sad to see you go, but we respect your choice.",
        categoryId: "account",
        body: [
          "You can delete your account at any time. Here's how:",
          "Go to Profile → Account & Security → scroll to the bottom → 'Delete my account.'",
          "You'll need to confirm with your password. After confirmation, your account enters a 30-day grace period. During this time, you can log back in to cancel the deletion.",
          "After 30 days, all your data is permanently removed — profile, reviews, session history, and payment records.",
          "We'll miss you. If you ever want to come back, you're always welcome.",
        ],
      },
    ],
  },
  {
    id: "for-buddies",
    title: "For Buddies",
    iconName: "Heart",
    description: "Everything about being a buddy.",
    articles: [
      {
        id: "how-to-earn",
        title: "How to earn on HireBuddy",
        preview: "Help people, share your presence, and get appreciated for it.",
        categoryId: "for-buddies",
        body: [
          "Earning on HireBuddy comes from being genuinely helpful, present, and human. It's not about selling a service — it's about sharing your time.",
          "Set your Support Appreciation range on your profile. This tells people what you value your time at. You can also toggle 'Free first 5 minutes' to let people try before committing.",
          "The more complete your profile (higher warmth score), the more visible you are. Buddies with 70%+ warmth get 3× more connections.",
          "After sessions, users send you appreciation payments. These are processed securely and paid out to your linked bank account weekly.",
        ],
      },
      {
        id: "getting-verified",
        title: "Getting verified as a buddy",
        preview: "Verification builds trust — and gets you more connections.",
        categoryId: "for-buddies",
        body: [
          "Verification happens in 3 levels:",
          "Level 1 — Phone: Automatic when you sign up. This confirms you're a real person.",
          "Level 2 — Company/Institute: Optionally link your workplace or university. Adds credibility.",
          "Level 3 — Government ID: Upload a government-issued ID (Aadhaar, PAN, Passport, etc.). This gives you the highest trust badge.",
          "Verified buddies get significantly more session requests. A Government ID badge increases trust by 5×.",
          "We verify documents securely and never share your ID with other users — only the badge is visible.",
        ],
      },
      {
        id: "payouts",
        title: "How payouts work",
        preview: "Your earnings, sent to your bank reliably.",
        categoryId: "for-buddies",
        body: [
          "After a session, the appreciation amount is held for a brief period (for dispute resolution) and then released to your payout balance.",
          "Payouts are processed weekly to your linked bank account. You can track your earnings and pending amounts in your dashboard.",
          "A 5% platform fee is deducted from each appreciation to keep HireBuddy running and improving.",
          "If there's an issue with your payout, reach out to us at support@hirebuddy.app. We respond within 24 hours.",
        ],
      },
    ],
  },
];

// ── All articles flat list (for search) ──
export const allArticles: HelpArticle[] = helpCategories.flatMap(
  (cat) => cat.articles
);

// ── Featured articles ──
export const featuredArticles: HelpArticle[] = allArticles.filter(
  (a) => a.featured
);

// ── Search helper ──
export function searchArticles(query: string): HelpArticle[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase();
  return allArticles.filter(
    (a) =>
      a.title.toLowerCase().includes(q) ||
      a.preview.toLowerCase().includes(q) ||
      a.body.some((p) => p.toLowerCase().includes(q))
  );
}
