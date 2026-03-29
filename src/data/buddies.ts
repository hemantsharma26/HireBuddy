export interface Buddy {
  id: number;
  name: string;
  age: number;
  rating: number;
  reviews: number;
  verified: boolean;
  price: number;
  tags: string[];
  image: string;
  trustScore: number; // 0-100
  category:
    | "Human Presence"
    | "Real Life Help"
    | "Emotional Support"
    | "Utility Support"
    | "Lifestyle"
    | "Electricity Issue"
    | "AC Repair"
    | "Medicine Delivery"
    | "Night Safety"
    | "Travel Buddy"
    | "Movie Companion"
    | "Just Talk"
    | "Shopping Buddy"
    | "Emergency Help";
  location: string;

  // Growth Fields
  verificationLevel: 1 | 2 | 3; // 1: Phone, 2: Company, 3: Govt ID
  lastActive: string;
  responseTime: string;
  jobsCompleted: number;

  // New P2P Fields
  vibeScore: number; // 0-100 (Subjective "Vibe" check)
  style: "Calm" | "Fun" | "Pro" | "Energetic" | "Empathetic" | "Good Listener";
  pricingMode: "Instant" | "SupportOffer" | "Premium";
}

export const buddies: Buddy[] = [
  // --- REAL LIFE HELP (AC, Light, etc) ---
  {
    id: 1,
    name: "Arjun P.",
    age: 35,
    rating: 5.0,
    reviews: 150,
    verified: true,
    price: 600,
    tags: ["AC Repair", "Cooling Expert", "Pro Tool Kit"],
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=500",
    trustScore: 99,
    category: "AC Repair",
    location: "Yelahanka, Bangalore",
    verificationLevel: 3,
    lastActive: "10m ago",
    responseTime: "5m",
    jobsCompleted: 200,
    vibeScore: 89,
    style: "Pro",
    pricingMode: "Instant",
  },
  {
    id: 2,
    name: "Suresh K.",
    age: 42,
    rating: 4.8,
    reviews: 80,
    verified: true,
    price: 400,
    tags: ["Electrician", "Wiring", "Fuse Fix"],
    image:
      "https://images.unsplash.com/photo-1615109398623-88346a601842?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    trustScore: 95,
    category: "Electricity Issue",
    location: "Hebbal, Bangalore",
    verificationLevel: 2,
    lastActive: "1h ago",
    responseTime: "20m",
    jobsCompleted: 150,
    vibeScore: 85,
    style: "Pro",
    pricingMode: "Instant",
  },
  {
    id: 3,
    name: "Ramesh T.",
    age: 29,
    rating: 4.7,
    reviews: 45,
    verified: true,
    price: 300,
    tags: ["Medicine Run", "Pharmacy", "Urgent"],
    image:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80&w=500",
    trustScore: 92,
    category: "Medicine Delivery",
    location: "Indiranagar, Bangalore",
    verificationLevel: 2,
    lastActive: "5m ago",
    responseTime: "10m",
    jobsCompleted: 60,
    vibeScore: 90,
    style: "Energetic",
    pricingMode: "Instant",
  },

  // --- NIGHT SAFETY / EMERGENCY ---
  {
    id: 4,
    name: "Vikram R.",
    age: 34,
    rating: 4.9,
    reviews: 95,
    verified: true,
    price: 800,
    tags: ["Night Guard", "Safe Walk", "Strong"],
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=500",
    trustScore: 98,
    category: "Night Safety",
    location: "Koramangala, Bangalore",
    verificationLevel: 3,
    lastActive: "2m ago",
    responseTime: "1m",
    jobsCompleted: 85,
    vibeScore: 94,
    style: "Pro",
    pricingMode: "Premium",
  },
  {
    id: 5,
    name: "Amit B.",
    age: 31,
    rating: 5.0,
    reviews: 40,
    verified: true,
    price: 1000,
    tags: ["Emergency", "Car Trouble", "Help Now"],
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=500",
    trustScore: 97,
    category: "Emergency Help",
    location: "MG Road, Bangalore",
    verificationLevel: 3,
    lastActive: "Online",
    responseTime: "Instant",
    jobsCompleted: 20,
    vibeScore: 92,
    style: "Calm",
    pricingMode: "Premium",
  },

  // --- COMPANIONSHIP (Movies, Travel, Shopping) ---
  {
    id: 6,
    name: "Rahul S.",
    age: 28,
    rating: 4.9,
    reviews: 124,
    verified: true,
    price: 700,
    tags: ["Travel Buddy", "Photographer", "Explorer"],
    image:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=500",
    trustScore: 98,
    category: "Travel Buddy",
    location: "Indiranagar, Bangalore",
    verificationLevel: 3,
    lastActive: "10m ago",
    responseTime: "1h",
    jobsCompleted: 45,
    vibeScore: 95,
    style: "Fun",
    pricingMode: "SupportOffer",
  },
  {
    id: 7,
    name: "Priya M.",
    age: 24,
    rating: 4.8,
    reviews: 89,
    verified: true,
    price: 850,
    tags: ["Movie Buff", "Cinema", "Popcorn"],
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=500",
    trustScore: 95,
    category: "Movie Companion",
    location: "Koramangala, Bangalore",
    verificationLevel: 2,
    lastActive: "25m ago",
    responseTime: "2h",
    jobsCompleted: 32,
    vibeScore: 92,
    style: "Energetic",
    pricingMode: "Instant",
  },
  {
    id: 8,
    name: "Kavya L.",
    age: 27,
    rating: 4.8,
    reviews: 90,
    verified: true,
    price: 800,
    tags: ["Shopping", "Fashion Advice", "Stylist"],
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=500",
    trustScore: 94,
    category: "Shopping Buddy",
    location: "Malleshwaram, Bangalore",
    verificationLevel: 2,
    lastActive: "45m ago",
    responseTime: "2h",
    jobsCompleted: 40,
    vibeScore: 91,
    style: "Energetic",
    pricingMode: "SupportOffer",
  },

  // --- EMOTIONAL SUPPORT / TALK ---
  {
    id: 9,
    name: "Sunitra",
    age: 26,
    rating: 5.0,
    reviews: 45,
    verified: true,
    price: 1200,
    tags: ["Deep Talk", "Listener", "Advice"],
    image:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=500",
    trustScore: 99,
    category: "Just Talk",
    location: "JP Nagar, Bangalore",
    verificationLevel: 2,
    lastActive: "3h ago",
    responseTime: "4h",
    jobsCompleted: 15,
    vibeScore: 96,
    style: "Good Listener",
    pricingMode: "SupportOffer",
  },
  {
    id: 10,
    name: "Anjali D.",
    age: 29,
    rating: 4.9,
    reviews: 67,
    verified: true,
    price: 900,
    tags: ["Anxiety Support", "Calm Presence", "Therapeutic"],
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=500",
    trustScore: 96,
    category: "Emotional Support",
    location: "Indiranagar, Bangalore",
    verificationLevel: 3,
    lastActive: "15m ago",
    responseTime: "1h",
    jobsCompleted: 50,
    vibeScore: 94,
    style: "Empathetic",
    pricingMode: "Premium",
  },

  // --- UTILITY/OTHERS (Filler for pagination test) ---
  {
    id: 11,
    name: "Meera K.",
    age: 23,
    rating: 4.7,
    reviews: 25,
    verified: true,
    price: 350,
    tags: ["Pet Sitting", "Dog Walking"],
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=500",
    trustScore: 90,
    category: "Utility Support",
    location: "Jayanagar, Bangalore",
    verificationLevel: 2,
    lastActive: "30m ago",
    responseTime: "20m",
    jobsCompleted: 15,
    vibeScore: 93,
    style: "Energetic",
    pricingMode: "Instant",
  },
  {
    id: 12,
    name: "Siddharth",
    age: 31,
    rating: 4.9,
    reviews: 80,
    verified: true,
    price: 1500,
    tags: ["Standup", "Funny", "Events"],
    image:
      "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&q=80&w=500",
    trustScore: 97,
    category: "Lifestyle",
    location: "Indiranagar, Bangalore",
    verificationLevel: 3,
    lastActive: "1h ago",
    responseTime: "1h",
    jobsCompleted: 60,
    vibeScore: 95,
    style: "Fun",
    pricingMode: "SupportOffer",
  },
  {
    id: 13,
    name: "Rohan M.",
    age: 25,
    rating: 4.5,
    reviews: 34,
    verified: false,
    price: 450,
    tags: ["Gym Buddy", "Spotter"],
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=500",
    trustScore: 85,
    category: "Lifestyle",
    location: "Koramangala, Bangalore",
    verificationLevel: 1,
    lastActive: "2h ago",
    responseTime: "30m",
    jobsCompleted: 20,
    vibeScore: 90,
    style: "Energetic",
    pricingMode: "Instant",
  },
  {
    id: 14,
    name: "Tanya C.",
    age: 27,
    rating: 4.6,
    reviews: 18,
    verified: true,
    price: 550,
    tags: ["Baking", "Cooking Help", "Foodie"],
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=500",
    trustScore: 91,
    category: "Lifestyle",
    location: "Indiranagar, Bangalore",
    verificationLevel: 1,
    lastActive: "5h ago",
    responseTime: "10m",
    jobsCompleted: 10,
    vibeScore: 92,
    style: "Calm",
    pricingMode: "Instant",
  },
  {
    id: 15,
    name: "Deepak V.",
    age: 38,
    rating: 4.9,
    reviews: 210,
    verified: true,
    price: 200,
    tags: ["Plumbing", "Leaky Tap", "Pipe Fix"],
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=500",
    trustScore: 96,
    category: "Real Life Help",
    location: "HSR Layout, Bangalore",
    verificationLevel: 3,
    lastActive: "15m ago",
    responseTime: "5m",
    jobsCompleted: 300,
    vibeScore: 87,
    style: "Pro",
    pricingMode: "Instant",
  },
];
