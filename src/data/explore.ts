/* ═══════════════════════════════════════════════════
   Explore — Community Discovery Data Engine
   Groups, Events, Topics, Cities
   ═══════════════════════════════════════════════════ */

/* ── GROUPS ── */
export interface Group {
  id: string;
  name: string;
  tagline: string;
  category: string;
  memberCount: number;
  trending?: boolean;
}

export const groupCategories = [
  "All",
  "Emotional",
  "Social",
  "Study",
  "Travel",
  "Lifestyle",
  "Night Owls",
] as const;

export const groups: Group[] = [
  { id: "g1", name: "Late Night Talkers", tagline: "When the world sleeps, we talk.", category: "Night Owls", memberCount: 842, trending: true },
  { id: "g2", name: "Solo Travelers India", tagline: "Exploring alone doesn't mean lonely.", category: "Travel", memberCount: 1240, trending: true },
  { id: "g3", name: "Heartbreak Healing Circle", tagline: "You'll get through this. Together.", category: "Emotional", memberCount: 567 },
  { id: "g4", name: "Study Together Club", tagline: "Focused sessions with friendly faces.", category: "Study", memberCount: 1890, trending: true },
  { id: "g5", name: "New City Friends", tagline: "Just moved? Find your first friend here.", category: "Social", memberCount: 723 },
  { id: "g6", name: "Anxiety Support Network", tagline: "A safe space for heavy days.", category: "Emotional", memberCount: 1100 },
  { id: "g7", name: "Morning Walk Buddies", tagline: "Start the day with someone beside you.", category: "Lifestyle", memberCount: 456 },
  { id: "g8", name: "Career Confused Club", tagline: "Not knowing is okay. Let's figure it out.", category: "Study", memberCount: 934 },
  { id: "g9", name: "Movie Night Crew", tagline: "Because movies hit different with company.", category: "Social", memberCount: 678 },
  { id: "g10", name: "Midnight Overthinkers", tagline: "For when your brain won't shut up.", category: "Night Owls", memberCount: 1420, trending: true },
  { id: "g11", name: "Weekend Explorers", tagline: "Saturdays are for spontaneous plans.", category: "Travel", memberCount: 560 },
  { id: "g12", name: "Parents Needing a Break", tagline: "You deserve to breathe too.", category: "Lifestyle", memberCount: 345 },
];

/* ── EVENTS ── */
export interface Event {
  id: string;
  title: string;
  description: string;
  /** Rich long description for the detail page */
  longDescription?: string;
  date: string;
  time: string;
  /** Duration label e.g. "1.5 hours" */
  duration?: string;
  mode: "Online" | "Offline" | "Hybrid";
  city?: string;
  attendees: number;
  image: string;
  category: string;
  /** Language of the event */
  language?: string;
  /** Safety label e.g. "Safe Space" */
  safetyLevel?: string;
  /** Age group label */
  ageGroup?: string;
  /** Host info */
  host?: {
    name: string;
    avatar?: string;
    bio: string;
  };
}

export const eventFilters = ["All", "Today", "This Week", "Online", "Offline"] as const;

export const events: Event[] = [
  {
    id: "e1",
    title: "Midnight Vent Room",
    description: "A safe space to let it all out. No judgement, just listening.",
    longDescription:
      "Sometimes you just need someone to listen. The Midnight Vent Room is a moderated, judgement-free zone where you can share what's weighing on you — anonymously or openly. Our trained listeners create a circle of empathy. No advice unless you ask. No fixing. Just presence.\n\nWhether it's heartbreak, exam pressure, family drama, or something you can't name yet — you're welcome here. We've held over 40 sessions and every single one has ended with someone saying 'I feel lighter.' That's the whole point.",
    date: "Feb 22, 2026",
    time: "11:30 PM",
    duration: "1.5 hours",
    mode: "Online",
    attendees: 34,
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=800",
    category: "Emotional",
    language: "English / Hindi",
    safetyLevel: "Moderated Safe Space",
    ageGroup: "18+",
    host: {
      name: "Priya Sharma",
      bio: "Certified counsellor & community builder. Believes everyone deserves to be heard.",
    },
  },
  {
    id: "e2",
    title: "Sunday Coffee Meetup",
    description: "Grab a coffee with strangers who might become friends.",
    longDescription:
      "There's something magical about sharing coffee with someone you've never met. This is not networking. This is not speed-dating. This is just humans meeting humans over warm cups and cold mornings.\n\nWe'll meet at a cozy café in Koramangala, Bangalore. Tables of 4 — so conversations stay intimate. Our regulars say this is the highlight of their week. No agenda. No pressure. Just show up and be yourself.",
    date: "Feb 23, 2026",
    time: "10:00 AM",
    duration: "2 hours",
    mode: "Offline",
    city: "Bangalore",
    attendees: 18,
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=800",
    category: "Social",
    language: "English",
    safetyLevel: "Public Venue",
    ageGroup: "All ages",
    host: {
      name: "Arjun Mehta",
      bio: "Coffee enthusiast & friendship architect. Moved to Bangalore alone and decided no one else should feel that way.",
    },
  },
  {
    id: "e3",
    title: "Online Movie Night: Before Sunrise",
    description: "Watch together, feel together. Discussions after.",
    longDescription:
      "We're watching 'Before Sunrise' — the most human love story ever put on screen — together on a shared stream. After the movie, we'll have an open discussion about connection, vulnerability, and what it means to truly meet someone.\n\nBring your blanket, your favourite snack, and an open heart. Past movie nights have turned strangers into lifelong friends. This isn't just a watch party — it's an experience you'll carry with you.",
    date: "Feb 24, 2026",
    time: "9:00 PM",
    duration: "3 hours",
    mode: "Online",
    attendees: 52,
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=800",
    category: "Social",
    language: "English",
    safetyLevel: "Community Moderated",
    ageGroup: "16+",
    host: {
      name: "Neha Kapoor",
      bio: "Film lover who believes cinema is group therapy. Has hosted 20+ watch parties on HireBuddy.",
    },
  },
  {
    id: "e4",
    title: "City Walk: Old Delhi",
    description: "Explore the lanes of Old Delhi with a buddy by your side.",
    longDescription:
      "Old Delhi is a sensory explosion — the smell of spices, the sound of rickshaw bells, the colours of Chandni Chowk. But experiencing it alone and experiencing it with new friends are two completely different feelings.\n\nJoin us for a 3-hour guided walk through the heart of Delhi. We'll visit Jama Masjid, taste the best paranthas in the city, and wander through hidden lanes most tourists never see. Walking speed: slow. Conversation level: deep.",
    date: "Feb 25, 2026",
    time: "6:00 PM",
    duration: "3 hours",
    mode: "Offline",
    city: "Delhi",
    attendees: 12,
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&q=80&w=800",
    category: "Travel",
    language: "Hindi / English",
    safetyLevel: "Group Walk (Guide Present)",
    ageGroup: "All ages",
    host: {
      name: "Kabir Singh",
      bio: "Delhi-born storyteller. Knows every lane and legend. Runs heritage walks that feel like time travel.",
    },
  },
  {
    id: "e5",
    title: "Listening Circle",
    description: "No advice. Just presence. You'll be heard here.",
    longDescription:
      "The Listening Circle is our most intimate event. A small group of 8-10 people sit together (virtually) and take turns sharing whatever's on their mind. The only rule: no one gives advice. We listen. We nod. We hold space.\n\nThis format was inspired by Quaker meetings and talking circles. It's transformative. Many participants describe it as the first time they truly felt heard without someone trying to fix them. You can share or just listen — both are equally valued.",
    date: "Feb 26, 2026",
    time: "8:00 PM",
    duration: "1 hour",
    mode: "Online",
    attendees: 28,
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=800",
    category: "Emotional",
    language: "English",
    safetyLevel: "Moderated Safe Space",
    ageGroup: "18+",
    host: {
      name: "Ananya Iyer",
      bio: "Mindfulness facilitator and psychology student. Passionate about creating spaces where silence is comfortable.",
    },
  },
  {
    id: "e6",
    title: "Study Sprint: 2 Hours of Focus",
    description: "Body-double with strangers. Get things done together.",
    longDescription:
      "Body-doubling is a productivity technique where you work alongside someone else — even silently — and somehow get twice as much done. That's what Study Sprint is.\n\nWe hop on a call. Cameras on or off — your choice. 25 minutes of focused work, 5-minute social break. Repeat 4 times. You'll be amazed at how much you accomplish when you're not alone with your procrastination. Our regulars include students, freelancers, and people who just need structure.",
    date: "Feb 22, 2026",
    time: "4:00 PM",
    duration: "2 hours",
    mode: "Online",
    attendees: 67,
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800",
    category: "Study",
    language: "English / Hindi",
    safetyLevel: "Community Moderated",
    ageGroup: "All ages",
    host: {
      name: "Rohan Das",
      bio: "Productivity nerd and final-year engineering student. Created Study Sprint because he couldn't study alone.",
    },
  },
];

/** Lookup event by ID */
export function getEventById(id: string): Event | undefined {
  return events.find((e) => e.id === id);
}

/* ── TOPICS ── */
export interface Topic {
  id: string;
  name: string;
  iconName: string;
  description: string;
  buddyCount: number;
  groupCount: number;
  eventCount: number;
}

export const topics: Topic[] = [
  { id: "t1", name: "Loneliness", iconName: "Moon", description: "When the silence is too loud.", buddyCount: 340, groupCount: 4, eventCount: 3 },
  { id: "t2", name: "Breakups", iconName: "HeartOff", description: "Healing is not linear. But you're not alone.", buddyCount: 280, groupCount: 3, eventCount: 2 },
  { id: "t3", name: "Career Confusion", iconName: "Compass", description: "Not knowing your path is the start of finding it.", buddyCount: 410, groupCount: 5, eventCount: 4 },
  { id: "t4", name: "Anxiety", iconName: "Waves", description: "Sometimes you just need someone to sit with you.", buddyCount: 520, groupCount: 6, eventCount: 5 },
  { id: "t5", name: "Moving to a New City", iconName: "Building2", description: "New place, new chapter. Find your first friend.", buddyCount: 190, groupCount: 3, eventCount: 2 },
  { id: "t6", name: "Night Overthinking", iconName: "CloudMoon", description: "For when 3 AM feels like the heaviest hour.", buddyCount: 380, groupCount: 3, eventCount: 3 },
  { id: "t7", name: "Friendship", iconName: "Users", description: "Real friends. Not followers.", buddyCount: 450, groupCount: 7, eventCount: 6 },
  { id: "t8", name: "Self-worth", iconName: "Smile", description: "You are enough. Let someone remind you.", buddyCount: 210, groupCount: 2, eventCount: 1 },
  { id: "t9", name: "Grief & Loss", iconName: "Heart", description: "There's no right way to grieve. Just be.", buddyCount: 160, groupCount: 2, eventCount: 2 },
  { id: "t10", name: "Exam Stress", iconName: "BookOpen", description: "It's just an exam. But your feelings are valid.", buddyCount: 380, groupCount: 4, eventCount: 3 },
  { id: "t11", name: "Family Pressure", iconName: "Home", description: "They mean well. But sometimes it's heavy.", buddyCount: 290, groupCount: 3, eventCount: 2 },
  { id: "t12", name: "Just Need to Talk", iconName: "MessageCircle", description: "No topic needed. Just a human voice.", buddyCount: 600, groupCount: 5, eventCount: 4 },
];

/* ── CITIES ── */
export interface City {
  id: string;
  name: string;
  state: string;
  buddyCount: number;
  activeNow: number;
  featured?: boolean;
}

export const cities: City[] = [
  { id: "c1", name: "Delhi", state: "Delhi", buddyCount: 1200, activeNow: 89, featured: true },
  { id: "c2", name: "Bangalore", state: "Karnataka", buddyCount: 980, activeNow: 72, featured: true },
  { id: "c3", name: "Mumbai", state: "Maharashtra", buddyCount: 1050, activeNow: 64, featured: true },
  { id: "c4", name: "Hyderabad", state: "Telangana", buddyCount: 640, activeNow: 41, featured: true },
  { id: "c5", name: "Pune", state: "Maharashtra", buddyCount: 520, activeNow: 38, featured: true },
  { id: "c6", name: "Chennai", state: "Tamil Nadu", buddyCount: 480, activeNow: 29, featured: true },
  { id: "c7", name: "Kolkata", state: "West Bengal", buddyCount: 390, activeNow: 24 },
  { id: "c8", name: "Jaipur", state: "Rajasthan", buddyCount: 270, activeNow: 18 },
  { id: "c9", name: "Ahmedabad", state: "Gujarat", buddyCount: 310, activeNow: 21 },
  { id: "c10", name: "Lucknow", state: "Uttar Pradesh", buddyCount: 220, activeNow: 14 },
  { id: "c11", name: "Chandigarh", state: "Punjab", buddyCount: 180, activeNow: 11 },
  { id: "c12", name: "Kochi", state: "Kerala", buddyCount: 210, activeNow: 15 },
];
