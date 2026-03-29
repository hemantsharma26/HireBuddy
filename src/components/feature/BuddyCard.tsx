"use client";

import { Star, ShieldCheck, Heart, Clock, MapPin, Eye, Zap } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { cn, getFullImageUrl } from "@/lib/utils";
import { Buddy } from "@/data/buddies";
import { useAuth } from "@/context/AuthContext";

/* Deterministic fake signals per buddy id */
const activityData = [
  { lastActive: "Just now", hangouts: 48, responseTime: "~10 min", views: 7 },
  { lastActive: "2h ago", hangouts: 23, responseTime: "~25 min", views: 3 },
  { lastActive: "30m ago", hangouts: 112, responseTime: "~5 min", views: 12 },
  { lastActive: "1h ago", hangouts: 36, responseTime: "~15 min", views: 5 },
  { lastActive: "5m ago", hangouts: 67, responseTime: "~8 min", views: 9 },
  { lastActive: "3h ago", hangouts: 19, responseTime: "~30 min", views: 2 },
];

interface BuddyCardProps {
  buddy: Buddy;
}

export function BuddyCard({ buddy }: BuddyCardProps) {
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const isAvailableNow = buddy.id !== 2;
  const activity = activityData[(buddy.id - 1) % activityData.length];

  const handleViewProfile = () => {
    if (isLoggedIn) {
      router.push(`/buddies/${buddy.id}`);
    } else {
      router.push(`/login?redirect=${encodeURIComponent(`/buddies/${buddy.id}`)}`);
    }
  };

  return (
    <div className="group relative bg-white rounded-3xl border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden h-full transform hover:-translate-y-1">
      {/* Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
        <Image
          src={getFullImageUrl(buddy.image) || ""}
          alt={buddy.name}
          width={400}
          height={300}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />

        {/* Online badge */}
        {isAvailableNow && (
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur text-green-700 px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wide shadow-sm flex items-center gap-1.5 border border-white/50">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            Online
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1 relative">
        {/* Floating category pill */}
        <div className="absolute -top-4 left-5 bg-gray-900 text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg uppercase tracking-wider">
          {buddy.category}
        </div>

        {/* Name + Rating */}
        <div className="mt-2 flex justify-between items-start mb-2">
          <div>
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-1.5">
              {buddy.name}
              <span className="text-gray-400 font-normal text-lg">, {buddy.age}</span>
              {buddy.verified && (
                <ShieldCheck className="w-5 h-5 text-blue-500 fill-blue-50" aria-label="ID Verified" />
              )}
            </h3>
            <div className="flex items-center gap-1.5 text-sm text-gray-500 mt-1 font-medium">
              <MapPin className="w-3.5 h-3.5 text-gray-400" />
              {buddy.location}
            </div>
          </div>

          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg border border-yellow-100">
              <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
              <span className="font-bold text-gray-900 text-sm">{buddy.rating}</span>
            </div>
            <span className="text-[10px] text-gray-400 mt-1 font-medium">{buddy.reviews} reviews</span>
          </div>
        </div>

        {/* Authenticity signals row */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-3 text-[11px] text-gray-400">
          <span className="inline-flex items-center gap-1">
            <Clock className="w-3 h-3 text-gray-300" />
            Active {activity.lastActive}
          </span>
          <span className="inline-flex items-center gap-1">
            <Heart className="w-3 h-3 text-gray-300" />
            {activity.hangouts} hangouts
          </span>
          <span className="inline-flex items-center gap-1">
            <Zap className="w-3 h-3 text-gray-300" />
            Responds {activity.responseTime}
          </span>
          <span className="inline-flex items-center gap-1 text-orange-400">
            <Eye className="w-3 h-3" />
            {activity.views} viewed today
          </span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {buddy.tags.map((tag, i) => (
            <span key={i} className="px-3 py-1 rounded-full bg-gray-50 text-gray-600 text-xs font-semibold border border-gray-100 group-hover:border-gray-200 transition-colors">
              {tag}
            </span>
          ))}
        </div>

        {/* Bottom Action */}
        <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between gap-4">
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Starting at</p>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-bold text-gray-900">₹{buddy.price}</span>
              <span className="text-xs text-gray-400 font-medium">/hr</span>
            </div>
          </div>

          <button
            onClick={handleViewProfile}
            className="flex-1 px-4 py-3 bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white text-sm font-bold rounded-xl transition-all shadow-sm hover:shadow-md active:scale-95"
          >
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
}
