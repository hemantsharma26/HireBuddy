import { type Buddy } from "./buddies";

/* ═══════════════════════════════════════════
   Extended Profile Data — Buddy Profile Page
   ═══════════════════════════════════════════ */

export interface BuddyReview {
  id: number;
  name: string;
  avatar: string;
  text: string;
  rating: number;
  timeAgo: string;
}

export interface ExtendedProfile {
  tagline: string;
  about: string;
  helpAreas: { iconName: string; label: string }[];
  sessionStyles: { iconName: string; label: string; desc: string }[];
  reviews: BuddyReview[];
  languages: string[];
  joinedSince: string;
  repeatPercent: number;
  totalConversations: number;
  nextSlot: string;
  isOnline: boolean;
  trustMicrocopy: string;
}

/* ── Taglines keyed by Buddy.style ── */
const styleTaglines: Record<string, string> = {
  Calm: "A peaceful presence when you need to slow down and breathe",
  Fun: "Your go-to person for good vibes and brighter days",
  Pro: "Reliable, efficient, and always gets the job done right",
  Energetic: "High energy, fast action — when you need things done now",
  Empathetic: "Someone who truly understands what you're going through",
  "Good Listener":
    "Sometimes you just need someone who listens without judging",
};

/* ── About text generated per category ── */
function generateAbout(buddy: Buddy): string {
  const firstName = buddy.name.split(" ")[0];

  const aboutMap: Record<string, string> = {
    "Just Talk": `Hi, I'm ${firstName}. I believe everyone deserves to be heard — really heard. Whether it's 2 AM and your thoughts won't stop, or you just need someone to talk to after a long day, I'm here.\n\nNo advice unless you want it. No judgment, ever. Just a warm, patient conversation.\n\nThink of me as that friend who always picks up the phone.`,

    "Emotional Support": `Hey, I'm ${firstName}. I've been through my own tough phases, and I know how much a kind, patient presence can mean.\n\nI'm here to listen, to hold space, and to remind you that it's okay to not be okay. My sessions are a safe, judgment-free zone where you can just… be yourself.\n\nLet's talk whenever you're ready. 💛`,

    "Night Safety": `I'm ${firstName}, and I take safety seriously. Whether you need someone to walk with you at night, wait until you get home safe, or just be there when things feel uneasy — that's what I do.\n\nI'm background-verified, strong, and calm under pressure. Your safety is my priority, always.`,

    "Emergency Help": `${firstName} here. When things go wrong — car trouble, medical emergency, or you're just in a tough spot — I'm the person you call.\n\nI respond fast, stay calm, and get things sorted. I've helped people in some really stressful moments, and I'll be there for you too. No panic, just solutions.`,

    "Travel Buddy": `Hi! I'm ${firstName}, and I love exploring new places and meeting new people. Traveling alone can feel lonely or intimidating, so I'm here to be your companion.\n\nWhether it's a road trip, a new city, or just a weekend adventure — I bring the good vibes, the snacks, and the playlist. Let's make some memories! 🌍`,

    "Movie Companion": `I'm ${firstName}, and I believe movies are better with company! Whether it's the latest blockbuster, a cozy indie film, or a midnight horror show — let's grab popcorn and enjoy it together.\n\nI'm fun, easy-going, and I promise not to spoil the ending. 🍿`,

    "Shopping Buddy": `Hey there! I'm ${firstName}. Shopping alone? Not anymore! I love helping people find the perfect outfit, navigate sales, or just have someone to carry bags and give honest opinions.\n\nI've got an eye for style and the patience to try "just one more store." Let's make it fun!`,

    "AC Repair": `I'm ${firstName}, your go-to AC expert. With years of experience, I diagnose and fix cooling issues fast — from deep cleaning to gas refills to complete repairs.\n\nI use professional-grade tools, explain what I'm doing, and clean up after myself. No more sweating while waiting for unreliable technicians.`,

    "Electricity Issue": `${firstName} here — licensed electrician with years of hands-on experience. From flickering lights to full wiring issues, I fix it safely and quickly.\n\nI carry my own tools, explain everything before I start, and clean up after myself. Your home, your rules.`,

    "Medicine Delivery": `I'm ${firstName}, and I know that when you need medicine, you need it fast. Whether it's late night, raining, or you're just too unwell to step out — I'll get your prescriptions picked up and delivered to your door.\n\nQuick, careful, and reliable. Your health doesn't wait, and neither do I.`,

    "Human Presence": `Hi, I'm ${firstName}. Sometimes you don't need a professional — you just need a person. Someone to sit with you, be around, make the room feel less empty.\n\nThat's me. No agenda, no performance. Just genuine human company whenever life feels a bit too quiet.`,

    "Real Life Help": `I'm ${firstName}, and I'm great with my hands. Leaky taps, furniture assembly, small repairs — I handle it all with care and reliability.\n\nI show up on time, explain what needs to be done, and leave things better than I found them. It's that simple.`,

    Lifestyle: `Hey, I'm ${firstName}! I love helping people make the most of life's everyday moments — from gym sessions to food adventures to simply having a good time.\n\nI bring energy, good vibes, and zero judgment. Whether you need a workout buddy or someone to try that new café with, I'm your person.`,
  };

  return (
    aboutMap[buddy.category] ||
    `Hi, I'm ${firstName}! I love helping people and making their day a little easier. Whether you need a hand with something specific or just want some company, I'm your person.\n\nI've been doing this for a while now, and every interaction reminds me why I started — because human connection matters. Let's connect!`
  );
}

/* ── Help areas per category ── */
function generateHelpAreas(buddy: Buddy): { iconName: string; label: string }[] {
  const areaMap: Record<string, { iconName: string; label: string }[]> = {
    "Just Talk": [
      { iconName: "MessageCircle", label: "Late Night Talks" },
      { iconName: "Users", label: "Emotional Offloading" },
      { iconName: "Briefcase", label: "Career Confusion" },
      { iconName: "HeartOff", label: "Breakup Support" },
      { iconName: "Smile", label: "Loneliness" },
      { iconName: "BookOpen", label: "Study Motivation" },
    ],
    "Emotional Support": [
      { iconName: "Heart", label: "Anxiety Support" },
      { iconName: "ShieldCheck", label: "Depression Check-in" },
      { iconName: "User", label: "Loneliness" },
      { iconName: "HeartOff", label: "Relationship Issues" },
      { iconName: "Brain", label: "Overthinking" },
      { iconName: "Moon", label: "Sleep Anxiety" },
    ],
    "Night Safety": [
      { iconName: "Moon", label: "Night Walks" },
      { iconName: "Home", label: "Safe Escort Home" },
      { iconName: "Car", label: "Late Night Travel" },
      { iconName: "Eye", label: "Watchful Presence" },
    ],
    "Emergency Help": [
      { iconName: "Car", label: "Car Trouble" },
      { iconName: "Hospital", label: "Hospital Runs" },
      { iconName: "Wrench", label: "Quick Fixes" },
      { iconName: "PhoneCall", label: "Crisis Support" },
    ],
    "Travel Buddy": [
      { iconName: "Plane", label: "Weekend Trips" },
      { iconName: "Camera", label: "Photography Walks" },
      { iconName: "Mountain", label: "Adventure Treks" },
      { iconName: "Utensils", label: "Food Exploration" },
    ],
    "Movie Companion": [
      { iconName: "Film", label: "Movie Nights" },
      { iconName: "Clapperboard", label: "Theater Outings" },
      { iconName: "Tv", label: "Binge Watch" },
      { iconName: "Theater", label: "Live Events" },
    ],
    "Shopping Buddy": [
      { iconName: "ShoppingBag", label: "Mall Trips" },
      { iconName: "Palette", label: "Fashion Advice" },
      { iconName: "Tag", label: "Sale Hunting" },
      { iconName: "Gift", label: "Gift Shopping" },
    ],
    "AC Repair": [
      { iconName: "Snowflake", label: "AC Not Cooling" },
      { iconName: "Droplets", label: "Water Leaking" },
      { iconName: "Wrench", label: "Deep Cleaning" },
      { iconName: "Zap", label: "Gas Refill" },
    ],
    "Electricity Issue": [
      { iconName: "Lightbulb", label: "Light Fixtures" },
      { iconName: "Zap", label: "Short Circuit" },
      { iconName: "Activity", label: "Wiring Issues" },
      { iconName: "Home", label: "Full House Check" },
    ],
    "Medicine Delivery": [
      { iconName: "Pill", label: "Prescription Pickup" },
      { iconName: "Hospital", label: "Pharmacy Run" },
      { iconName: "Moon", label: "Late Night Delivery" },
      { iconName: "Zap", label: "Urgent Medicine" },
    ],
    "Human Presence": [
      { iconName: "Handshake", label: "Just Be Around" },
      { iconName: "Coffee", label: "Coffee Companion" },
      { iconName: "Home", label: "Home Company" },
      { iconName: "MessageSquare", label: "Light Chats" },
    ],
    "Real Life Help": [
      { iconName: "Wrench", label: "Small Repairs" },
      { iconName: "Box", label: "Furniture Assembly" },
      { iconName: "Package", label: "Heavy Lifting" },
      { iconName: "Home", label: "Home Maintenance" },
    ],
    Lifestyle: [
      { iconName: "Dumbbell", label: "Gym Buddy" },
      { iconName: "Utensils", label: "Foodie Runs" },
      { iconName: "PartyPopper", label: "Event Company" },
      { iconName: "Gamepad2", label: "Gaming Buddy" },
    ],
    "Utility Support": [
      { iconName: "Dog", label: "Pet Care" },
      { iconName: "Package", label: "Errands" },
      { iconName: "Home", label: "House Help" },
      { iconName: "ShoppingCart", label: "Grocery Run" },
    ],
  };

  return (
    areaMap[buddy.category] || [
      { iconName: "Heart", label: "General Help" },
      { iconName: "MessageSquare", label: "Friendly Chat" },
      { iconName: "User", label: "Companionship" },
      { iconName: "Star", label: "Quality Service" },
    ]
  );
}

/* ── Session styles from buddy.style ── */
function generateSessionStyles(
  buddy: Buddy
): { iconName: string; label: string; desc: string }[] {
  switch (buddy.style) {
    case "Calm":
      return [
        {
          iconName: "Heart",
          label: "Peaceful Listener",
          desc: "Creates a calm, safe space for you to open up",
        },
        {
          iconName: "Clock",
          label: "No Rush",
          desc: "Takes time, never hurries the conversation",
        },
        {
          iconName: "Leaf",
          label: "Gentle Guidance",
          desc: "Offers perspective only when you ask for it",
        },
      ];
    case "Fun":
      return [
        {
          iconName: "Flame",
          label: "Energy Booster",
          desc: "Brings good vibes and positive energy to every session",
        },
        {
          iconName: "Smile",
          label: "Mood Lifter",
          desc: "Knows how to make you smile, even on tough days",
        },
        {
          iconName: "PartyPopper",
          label: "Adventure Ready",
          desc: "Always up for trying something new and exciting",
        },
      ];
    case "Pro":
      return [
        {
          iconName: "Brain",
          label: "Structured Approach",
          desc: "Systematic and thorough in everything they do",
        },
        {
          iconName: "CheckCircle2",
          label: "Results-Oriented",
          desc: "Focused on getting the job done right, every time",
        },
        {
          iconName: "ShieldCheck",
          label: "Reliable & Punctual",
          desc: "Always on time, always prepared, always professional",
        },
      ];
    case "Energetic":
      return [
        {
          iconName: "Zap",
          label: "Quick & Responsive",
          desc: "Fast action when you need it — no delays",
        },
        {
          iconName: "Dumbbell",
          label: "Can-Do Attitude",
          desc: "Nothing is too much trouble, goes the extra mile",
        },
        {
          iconName: "Rocket",
          label: "High Energy",
          desc: "Brings enthusiasm and momentum to every task",
        },
      ];
    case "Empathetic":
      return [
        {
          iconName: "Heart",
          label: "Deep Empathy",
          desc: "Truly understands your feelings without pretending",
        },
        {
          iconName: "Shield",
          label: "No Judgment Zone",
          desc: "A completely safe space to be your authentic self",
        },
        {
          iconName: "Sun",
          label: "Emotional Anchor",
          desc: "Validates your experiences and makes you feel seen",
        },
      ];
    case "Good Listener":
      return [
        {
          iconName: "Ear",
          label: "Active Listener",
          desc: "Hears what you say — and what you don't say",
        },
        {
          iconName: "MessageCircle",
          label: "Comfortable Silence",
          desc: "Doesn't need to fill every pause with noise",
        },
        {
          iconName: "Sparkles",
          label: "Thoughtful Responses",
          desc: "Every word is considered, caring, and genuine",
        },
      ];
    default:
      return [
        {
          iconName: "User",
          label: "Friendly & Warm",
          desc: "Makes you feel comfortable from the first moment",
        },
        {
          iconName: "MessageSquare",
          label: "Good Communicator",
          desc: "Clear, kind, and always respectful",
        },
        {
          iconName: "Star",
          label: "Committed",
          desc: "Dedicated to making every session valuable",
        },
      ];
  }
}

/* ── Review pool — diverse, warm, human-sounding ── */
const reviewPool: Omit<BuddyReview, "id">[] = [
  {
    name: "Aisha",
    avatar: "https://i.pravatar.cc/150?img=1",
    text: "I was going through a really rough patch and didn't know who to talk to. This session felt like talking to someone who genuinely cared. No judgment, just warmth.",
    rating: 5,
    timeAgo: "2 weeks ago",
  },
  {
    name: "Rohan",
    avatar: "https://i.pravatar.cc/150?img=3",
    text: "Honestly didn't expect much, but this was surprisingly comforting. Felt heard for the first time in months. Will definitely book again.",
    rating: 5,
    timeAgo: "1 month ago",
  },
  {
    name: "Priyanka",
    avatar: "https://i.pravatar.cc/150?img=5",
    text: "Super professional and kind. Made me feel safe instantly. The whole experience felt very human — nothing robotic or scripted.",
    rating: 5,
    timeAgo: "3 weeks ago",
  },
  {
    name: "Vikash",
    avatar: "https://i.pravatar.cc/150?img=8",
    text: "Was nervous about hiring someone for this, but it turned out to be exactly what I needed. So grateful this platform exists.",
    rating: 4,
    timeAgo: "1 month ago",
  },
  {
    name: "Meera",
    avatar: "https://i.pravatar.cc/150?img=9",
    text: "The best part? No awkward silences. Just natural, flowing conversation. Like meeting an old friend for chai. 10/10 experience.",
    rating: 5,
    timeAgo: "2 months ago",
  },
  {
    name: "Arjun",
    avatar: "https://i.pravatar.cc/150?img=11",
    text: "Punctual, friendly, and incredibly skilled. Fixed my issue in under an hour and explained everything so well. Highly recommend!",
    rating: 5,
    timeAgo: "1 week ago",
  },
  {
    name: "Sneha",
    avatar: "https://i.pravatar.cc/150?img=16",
    text: "Felt like hanging out with an old friend. There's something really special about this platform — it's real human connection.",
    rating: 5,
    timeAgo: "3 weeks ago",
  },
  {
    name: "Dev",
    avatar: "https://i.pravatar.cc/150?img=12",
    text: "Quick, efficient, and super polite. Explained everything clearly before starting. Will call again for sure.",
    rating: 5,
    timeAgo: "2 weeks ago",
  },
  {
    name: "Nisha",
    avatar: "https://i.pravatar.cc/150?img=20",
    text: "I booked this for my mom and she loved it. Said it was the nicest conversation she'd had in weeks. Thank you!",
    rating: 5,
    timeAgo: "1 month ago",
  },
  {
    name: "Karan",
    avatar: "https://i.pravatar.cc/150?img=13",
    text: "Reliable and trustworthy. You can tell this person actually cares about what they do. It's rare to find that these days.",
    rating: 4,
    timeAgo: "2 months ago",
  },
  {
    name: "Simran",
    avatar: "https://i.pravatar.cc/150?img=23",
    text: "I was feeling really alone after moving to a new city. One session changed my whole week. Sometimes one conversation is all you need.",
    rating: 5,
    timeAgo: "1 week ago",
  },
  {
    name: "Tarun",
    avatar: "https://i.pravatar.cc/150?img=14",
    text: "Booked late at night during an emergency. Response was instant. Handled everything calmly. Can't thank them enough.",
    rating: 5,
    timeAgo: "3 weeks ago",
  },
];

/* ── Assign reviews per buddy (rotating from pool) ── */
function getReviews(buddyId: number, count: number = 5): BuddyReview[] {
  const startIdx = ((buddyId - 1) * 3) % reviewPool.length;
  const reviews: BuddyReview[] = [];
  for (let i = 0; i < count; i++) {
    const idx = (startIdx + i) % reviewPool.length;
    reviews.push({ ...reviewPool[idx], id: i + 1 });
  }
  return reviews;
}

/* ═══════════════════════════════════════════
   Main export: build extended profile from
   base Buddy data
   ═══════════════════════════════════════════ */
export function getExtendedProfile(buddy: Buddy): ExtendedProfile {
  const isOnline =
    buddy.lastActive === "Online" ||
    (buddy.lastActive.endsWith("m ago") && parseInt(buddy.lastActive) <= 15);

  const reviewCount = Math.min(
    Math.max(4, Math.floor(buddy.reviews / 15)),
    reviewPool.length
  );

  return {
    tagline:
      styleTaglines[buddy.style] ||
      "Here to help, one conversation at a time",
    about: generateAbout(buddy),
    helpAreas: generateHelpAreas(buddy),
    sessionStyles: generateSessionStyles(buddy),
    reviews: getReviews(buddy.id, reviewCount),
    languages: [
      "Hindi",
      "English",
      ...(buddy.location.includes("Bangalore") ? ["Kannada"] : []),
    ],
    joinedSince:
      buddy.jobsCompleted > 100
        ? "Jan 2024"
        : buddy.jobsCompleted > 50
          ? "Jun 2024"
          : "Oct 2024",
    repeatPercent: Math.min(
      95,
      buddy.trustScore - 5 - ((buddy.id * 3) % 8)
    ),
    totalConversations: buddy.jobsCompleted + buddy.reviews,
    nextSlot: isOnline ? "Available now" : "Today, 4:00 PM",
    isOnline,
    trustMicrocopy: `Trusted by ${buddy.reviews}+ people during their toughest days`,
  };
}
