export const TASK_TYPES: Record<
  string,
  { minPrice: number; maxPrice: number; avgPrice: number; label: string }
> = {
  "real-life-help": {
    minPrice: 400,
    maxPrice: 1500,
    avgPrice: 600,
    label: "House Fixes / Moving",
  },
  "human-presence": {
    minPrice: 600,
    maxPrice: 3000,
    avgPrice: 1000,
    label: "Travel / Event Buddy",
  },
  "emotional-support": {
    minPrice: 500,
    maxPrice: 2000,
    avgPrice: 800,
    label: "Talk / Stress Relief",
  },
  "utility-support": {
    minPrice: 300,
    maxPrice: 1200,
    avgPrice: 500,
    label: "Errands / Medical",
  },
  lifestyle: {
    minPrice: 700,
    maxPrice: 2500,
    avgPrice: 1200,
    label: "Gym / Movie Buddy",
  },
};

export type BidQuality = {
  label: "Fair Price" | "Premium Buddy" | "Budget Option" | "Trusted Choice";
  color: string;
};

export function getBidQuality(amount: number, type: string): BidQuality {
  const task = TASK_TYPES[type] || TASK_TYPES["utility-support"];

  if (amount >= task.maxPrice * 0.9) {
    return { label: "Premium Buddy", color: "text-purple-600" };
  }
  if (amount >= task.avgPrice) {
    return { label: "Trusted Choice", color: "text-green-600" };
  }
  if (amount >= task.minPrice * 1.2) {
    return { label: "Fair Price", color: "text-blue-600" };
  }
  return { label: "Budget Option", color: "text-orange-500" };
}
