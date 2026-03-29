"use client";

import { Filter, Search, ChevronDown, Check } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const filters = {
  categories: [
    "All Needs", 
    "Electricity Issue", 
    "AC Repair", 
    "Medicine Delivery", 
    "Night Safety", 
    "Travel Buddy", 
    "Movie Companion", 
    "Just Talk", 
    "Shopping Buddy", 
    "Emotional Support", 
    "Emergency Help"
  ],
  vibes: ["Any Vibe", "Calm", "Good Listener", "Energetic", "Professional", "Funny"],
  availability: ["Any Time", "Online Now", "Today", "This Weekend"],
};

interface SmartFiltersProps {
  activeCategory: string;
  activeVibe: string;
  priceRange: [number, number];
  onCategoryChange: (category: string) => void;
  onVibeChange: (vibe: string) => void;
  onPriceChange: (range: [number, number]) => void;
}

export function SmartFilters({ 
  activeCategory, 
  activeVibe, 
  priceRange,
  onCategoryChange, 
  onVibeChange, 
  onPriceChange 
}: SmartFiltersProps) {
  return (
    <div className="w-full mb-8">
      {/* Container - blurred background */}
      <div className="bg-white/80 backdrop-blur-xl border border-white/20 shadow-soft rounded-2xl p-4 md:p-6">
        
        {/* Row 1: Primary Filters (Vibe, Price) */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6 border-b border-gray-100 pb-4">
           
           {/* Vibe Selector */}
           <div className="flex items-center gap-2 overflow-x-auto no-scrollbar max-w-full">
             <span className="text-xs font-bold text-gray-400 uppercase tracking-wide mr-1 shrink-0">Vibe:</span>
             {filters.vibes.slice(1).map((vibe) => (
               <button
                  key={vibe}
                  onClick={() => onVibeChange(vibe)}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors shrink-0",
                    activeVibe === vibe
                      ? "bg-purple-50 border-purple-200 text-purple-700"
                      : "bg-white border-gray-100 text-gray-500 hover:border-gray-200"
                  )}
               >
                 {vibe}
               </button>
             ))}
           </div>

           {/* Price Range */}
           <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 shrink-0">
            <span className="text-xs font-bold text-gray-400 uppercase">Price:</span>
            <input 
              type="number" 
              placeholder="Min"
              value={priceRange[0] || ''}
              onChange={(e) => onPriceChange([Number(e.target.value), priceRange[1]])}
              className="w-14 text-xs font-semibold bg-transparent border-none focus:ring-0 p-0 text-right"
            />
            <span className="text-gray-300">-</span>
            <input 
              type="number" 
              placeholder="Max"
              value={priceRange[1] || ''}
              onChange={(e) => onPriceChange([priceRange[0], Number(e.target.value)])}
              className="w-14 text-xs font-semibold bg-transparent border-none focus:ring-0 p-0"
            />
           </div>
        </div>

        {/* Row 2: Categories (Flex Wrap - No Scroll) */}
        <div>
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3 block">Looking for:</span>
          <div className="flex flex-wrap gap-2">
            {filters.categories.map((cat) => (
              <button
                key={cat}
                onClick={() => onCategoryChange(cat)}
                className={cn(
                  "px-4 py-2 rounded-xl text-sm font-bold transition-all border",
                  activeCategory === cat 
                    ? "bg-gray-900 text-white border-gray-900 shadow-md transform scale-105" 
                    : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
