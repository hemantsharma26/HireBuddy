/* ═══════════════════════════════════════════
   Support Request Data — Problem-First Model
   ═══════════════════════════════════════════ */

export type UrgencyLevel = "whenever" | "today" | "urgent" | "right-now";
export type RequestStatus = "open" | "in-progress" | "closed";

export interface SupportRequest {
  id: number;
  situation: string;
  category: string;
  budget: string;
  duration: string;
  language: string;
  anonymous: boolean;
  urgency: UrgencyLevel;
  status: RequestStatus;
  postedAt: string;
  postedBy: string;
  avatar: string;
  offersReceived: number;
}

export const urgencyLabels: Record<UrgencyLevel, { label: string; iconName: string; color: string }> = {
  "whenever": { label: "Whenever", iconName: "Leaf", color: "text-emerald-600 bg-emerald-50 border-emerald-100" },
  "today": { label: "Today", iconName: "Sun", color: "text-amber-600 bg-amber-50 border-amber-100" },
  "urgent": { label: "Urgent", iconName: "Zap", color: "text-orange-600 bg-orange-50 border-orange-100" },
  "right-now": { label: "Right Now", iconName: "AlertCircle", color: "text-red-600 bg-red-50 border-red-100" },
};

export const emotionalCategories = [
  { iconName: "MessageCircle", label: "Just Need to Talk" },
  { iconName: "Users", label: "Feeling Lonely" },
  { iconName: "HeartOff", label: "Breakup / Heartbreak" },
  { iconName: "Brain", label: "Anxiety / Overthinking" },
  { iconName: "Briefcase", label: "Career Confusion" },
  { iconName: "Book", label: "Study Stress" },
  { iconName: "Moon", label: "Late Night Support" },
  { iconName: "Home", label: "Homesickness" },
  { iconName: "UserPlus", label: "Need a Companion" },
  { iconName: "Wrench", label: "Real Life Help" },
  { iconName: "Car", label: "Emergency Situation" },
  { iconName: "HandHeart", label: "Just Need Someone Around" },
];

export const languageOptions = [
  "Hindi",
  "English",
  "Hinglish",
  "Kannada",
  "Tamil",
  "Telugu",
  "Marathi",
  "Bengali",
];

export const durationOptions = [
  "15 minutes",
  "30 minutes",
  "1 hour",
  "2 hours",
  "Half day",
  "Flexible",
];

/* ── Sample open requests (for demo) ── */
export const sampleRequests: SupportRequest[] = [
  {
    id: 1,
    situation:
      "Having a really rough week. Just moved to a new city alone and the silence at home is getting to me. Would love someone to talk to who understands.",
    category: "Feeling Lonely",
    budget: "₹500–800",
    duration: "1 hour",
    language: "Hinglish",
    anonymous: false,
    urgency: "today",
    status: "open",
    postedAt: "25 min ago",
    postedBy: "Aryan",
    avatar: "https://i.pravatar.cc/150?img=33",
    offersReceived: 3,
  },
  {
    id: 2,
    situation:
      "Going through a bad breakup and can't stop overthinking. I don't need advice, just someone who'll listen without judging.",
    category: "Breakup / Heartbreak",
    budget: "₹800–1200",
    duration: "30 minutes",
    language: "Hindi",
    anonymous: true,
    urgency: "urgent",
    status: "open",
    postedAt: "1 hour ago",
    postedBy: "Anonymous",
    avatar: "",
    offersReceived: 5,
  },
  {
    id: 3,
    situation:
      "Confused about career switch from engineering to design. Need someone who's been through this and can have a chill, honest conversation.",
    category: "Career Confusion",
    budget: "₹600–1000",
    duration: "1 hour",
    language: "English",
    anonymous: false,
    urgency: "whenever",
    status: "open",
    postedAt: "2 hours ago",
    postedBy: "Priya",
    avatar: "https://i.pravatar.cc/150?img=5",
    offersReceived: 2,
  },
  {
    id: 4,
    situation:
      "Can't sleep. Anxiety is at peak. Just want a calm voice on call. Nothing heavy — just gentle talk to help me wind down.",
    category: "Late Night Support",
    budget: "₹400–600",
    duration: "30 minutes",
    language: "Hinglish",
    anonymous: true,
    urgency: "right-now",
    status: "open",
    postedAt: "10 min ago",
    postedBy: "Anonymous",
    avatar: "",
    offersReceived: 7,
  },
  {
    id: 5,
    situation:
      "Exam tomorrow and I'm spiraling. Need a study accountability buddy for the next few hours. Someone chill who keeps me on track.",
    category: "Study Stress",
    budget: "₹300–500",
    duration: "2 hours",
    language: "Hinglish",
    anonymous: false,
    urgency: "urgent",
    status: "open",
    postedAt: "40 min ago",
    postedBy: "Rahul",
    avatar: "https://i.pravatar.cc/150?img=11",
    offersReceived: 1,
  },
  {
    id: 6,
    situation:
      "Need someone to accompany me to the hospital for a check-up. A bit scared to go alone. Just need a reassuring presence.",
    category: "Need a Companion",
    budget: "₹700–1000",
    duration: "Half day",
    language: "Kannada",
    anonymous: false,
    urgency: "today",
    status: "open",
    postedAt: "3 hours ago",
    postedBy: "Meera",
    avatar: "https://i.pravatar.cc/150?img=9",
    offersReceived: 4,
  },
  {
    id: 7,
    situation:
      "My AC stopped working and it's 38°C outside. Need someone reliable who can fix it today. Preferably someone with experience.",
    category: "Real Life Help",
    budget: "₹500–800",
    duration: "1 hour",
    language: "Hindi",
    anonymous: false,
    urgency: "urgent",
    status: "open",
    postedAt: "45 min ago",
    postedBy: "Vikash",
    avatar: "https://i.pravatar.cc/150?img=12",
    offersReceived: 6,
  },
  {
    id: 8,
    situation:
      "Feeling really low after losing a pet. Don't want to burden my friends with this. Just want to talk to someone kind and gentle about it.",
    category: "Just Need to Talk",
    budget: "₹400–700",
    duration: "30 minutes",
    language: "English",
    anonymous: true,
    urgency: "today",
    status: "open",
    postedAt: "1.5 hours ago",
    postedBy: "Anonymous",
    avatar: "",
    offersReceived: 3,
  },
];
