/* ═══════════════════════════════════════════════════════════
   Profile Editor — Types, Constants & Warmth Calculator
   ═══════════════════════════════════════════════════════════ */

// ── Core Profile Shape ──
export interface UserProfile {
  // Section 1 — Basic Identity
  photoUrl: string;
  displayName: string;
  ageRange: string;
  city: string;
  district: string;
  state: string;
  pincode: string;
  languages: string[];
  pronouns: string;

  // Section 2 — About Me
  aboutMe: string;

  // Section 3 — Vibe Selector
  vibes: string[];

  // Section 4 — What You Can Help With
  helpWith: string[];

  // Section 5 — Availability Style
  availability: string[];

  // Section 6 — Comfort Settings
  comfortVideo: boolean | null;
  comfortVoice: boolean | null;
  comfortChatOnly: boolean | null;
  sameGenderOnly: boolean;

  // Section 7 — Support Appreciation (Pricing)
  sessionRangeMin: number;
  sessionRangeMax: number;
  freeFirst5Min: boolean;
  openToLowBudget: boolean;

  // Section 8 — Personal Touch
  favoriteQuote: string;
  oneTrulyCareAbout: string;
  songThatDefinesYou: string;
  nervousMessage: string;

  // Section 9 — Trust Layer (read-only / system)
  idVerified: boolean;
}

// ── Empty/default profile ──
export const emptyProfile: UserProfile = {
  photoUrl: "",
  displayName: "",
  ageRange: "",
  city: "",
  district: "",
  state: "",
  pincode: "",
  languages: [],
  pronouns: "",
  aboutMe: "",
  vibes: [],
  helpWith: [],
  availability: [],
  comfortVideo: null,
  comfortVoice: null,
  comfortChatOnly: null,
  sameGenderOnly: false,
  sessionRangeMin: 0,
  sessionRangeMax: 0,
  freeFirst5Min: false,
  openToLowBudget: false,
  favoriteQuote: "",
  oneTrulyCareAbout: "",
  songThatDefinesYou: "",
  nervousMessage: "",
  idVerified: false,
};

// ── Constants ──

export const ageRangeOptions = [
  "18–21",
  "22–25",
  "26–30",
  "31–35",
  "36–40",
  "41–50",
  "50+",
];

export const languageOptionsList = [
  "Hindi",
  "English",
  "Hinglish",
  "Tamil",
  "Telugu",
  "Bengali",
  "Marathi",
  "Gujarati",
  "Kannada",
  "Malayalam",
  "Punjabi",
  "Urdu",
];

export const pronounOptions = [
  "He/Him",
  "She/Her",
  "They/Them",
  "Prefer not to say",
];

export const vibeTags = [
  { label: "Listener", iconName: "Ear" },
  { label: "Funny", iconName: "Smile" },
  { label: "Calm presence", iconName: "Waves" },
  { label: "Deep thinker", iconName: "Brain" },
  { label: "Motivator", iconName: "Zap" },
  { label: "Non-judgmental", iconName: "Heart" },
  { label: "Spiritual", iconName: "Bird" },
  { label: "Practical advisor", iconName: "Compass" },
  { label: "Late-night talker", iconName: "Moon" },
  { label: "Hype person", iconName: "PartyPopper" },
  { label: "Storyteller", iconName: "BookOpen" },
  { label: "Empath", iconName: "HandHeart" },
];

export const helpCategories = [
  { label: "Feeling lonely", iconName: "Users" },
  { label: "Anxiety talks", iconName: "MessageCircle" },
  { label: "Late night chats", iconName: "Moon" },
  { label: "Breakup support", iconName: "HeartCrack" },
  { label: "Need someone to listen", iconName: "Ear" },
  { label: "Movie companion", iconName: "Film" },
  { label: "Travel buddy", iconName: "Plane" },
  { label: "Study partner", iconName: "Book" },
  { label: "Motivation calls", iconName: "Zap" },
  { label: "Just random talks", iconName: "MessageSquare" },
  { label: "Career confusion", iconName: "HelpCircle" },
  { label: "Family stuff", iconName: "Home" },
];

export const availabilityOptions = [
  { label: "Usually available instantly", iconName: "Zap", desc: "I can hop on quickly" },
  { label: "Evenings mostly", iconName: "Sunset", desc: "After 6 PM works best" },
  { label: "Late night person", iconName: "Moon", desc: "Owl hours are my hours" },
  { label: "Weekends", iconName: "Sun", desc: "Saturday & Sunday vibes" },
  { label: "Scheduled chats only", iconName: "Calendar", desc: "I prefer planned sessions" },
];

// ── About Me Placeholder Prompts (rotate) ──
export const aboutMePrompts = [
  "How would your friends describe you?",
  "What kind of conversations do you enjoy?",
  "When someone talks to you, what can they expect?",
  "What makes you a good person to talk to?",
  "Describe a moment when you really helped someone feel better.",
];

// ── Warmth Score Calculator ──
export function calculateWarmth(profile: UserProfile): number {
  let score = 0;
  const total = 100;

  // Section 1 — Basic Identity (20 pts)
  if (profile.photoUrl) score += 5;
  if (profile.displayName.trim()) score += 3;
  if (profile.city.trim()) score += 2;
  if (profile.district.trim()) score += 2;
  if (profile.state.trim()) score += 3;
  if (profile.pincode.trim()) score += 2;
  if (profile.languages.length > 0) score += 2;
  if (profile.ageRange) score += 0.5;
  if (profile.pronouns) score += 0.5;

  // Section 2 — About Me (25 pts — most important)
  const aboutLen = profile.aboutMe.trim().length;
  if (aboutLen > 0) score += 5;
  if (aboutLen >= 50) score += 5;
  if (aboutLen >= 120) score += 8;
  if (aboutLen >= 200) score += 7;

  // Section 3 — Vibes (10 pts)
  score += Math.min(profile.vibes.length * 2, 10);

  // Section 4 — Help With (10 pts)
  score += Math.min(profile.helpWith.length * 2, 10);

  // Section 5 — Availability (5 pts)
  if (profile.availability.length > 0) score += 5;

  // Section 6 — Comfort Settings (5 pts)
  if (profile.comfortVideo !== null) score += 2;
  if (profile.comfortVoice !== null) score += 1;
  if (profile.comfortChatOnly !== null) score += 2;

  // Section 7 — Pricing (10 pts)
  if (profile.sessionRangeMin > 0 || profile.sessionRangeMax > 0) score += 5;
  if (profile.freeFirst5Min) score += 3;
  if (profile.openToLowBudget) score += 2;

  // Section 8 — Personal Touch (15 pts)
  if (profile.favoriteQuote.trim()) score += 4;
  if (profile.oneTrulyCareAbout.trim()) score += 4;
  if (profile.songThatDefinesYou.trim()) score += 3;
  if (profile.nervousMessage.trim()) score += 4;

  return Math.min(Math.round((score / total) * 100), 100);
}

// ── Warmth label from score ──
export function warmthLabel(score: number): { text: string; color: string } {
  if (score >= 90) return { text: "Radiant 🌟", color: "text-amber-500" };
  if (score >= 70) return { text: "Warm 🔥", color: "text-orange-500" };
  if (score >= 50) return { text: "Getting there ☀️", color: "text-yellow-500" };
  if (score >= 25) return { text: "Just starting 🌱", color: "text-emerald-500" };
  return { text: "Empty canvas 🎨", color: "text-muted-foreground" };
}
