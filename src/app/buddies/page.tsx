"use client";

import { buddies } from "@/data/buddies";
import { BuddyCard } from "@/components/feature/BuddyCard";
import { SmartFilters } from "@/components/feature/SmartFilters";
import { EmptyState } from "@/components/feature/EmptyState";
import { useState } from "react";
import { ArrowUpDown, Sparkles, ShieldCheck, Clock, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/ui/FadeIn";
import { PostSituationBanner } from "@/components/feature/PostSituationBanner";
import { SafetyStrip } from "@/components/trust";
import { SocialProofStrip } from "@/components/trust";
import { FirstTimeNudge } from "@/components/ui/FirstTimeNudge";

type SortOption = "best_match" | "trust" | "available" | "budget";

const ITEMS_PER_PAGE = 8;

export default function BuddiesPage() {
  const [activeSort, setActiveSort] = useState<SortOption>("best_match");
  const [activeCategory, setActiveCategory] = useState("All Needs");
  const [activeVibe, setActiveVibe] = useState("Any Vibe");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [currentPage, setCurrentPage] = useState(1);

  // Filtering Logic
  const filteredBuddies = buddies.filter(buddy => {
    // Category Filter
    if (activeCategory !== "All Needs" && buddy.category !== activeCategory) return false;

    // Vibe Filter
    if (activeVibe !== "Any Vibe" && buddy.style !== activeVibe) return false;

    // Price Filter
    if (buddy.price < priceRange[0] || (priceRange[1] > 0 && buddy.price > priceRange[1])) return false;

    return true;
  });

  // Sorting Logic
  const sortedBuddies = [...filteredBuddies].sort((a, b) => {
    switch (activeSort) {
      case "best_match": return (b.trustScore + b.rating * 20) - (a.trustScore + a.rating * 20);
      case "trust": return b.trustScore - a.trustScore;
      case "available": return parseInt(b.lastActive) - parseInt(a.lastActive); 
      case "budget": return a.price - b.price;
      default: return 0;
    }
  });

  // Pagination Logic
  const totalPages = Math.ceil(sortedBuddies.length / ITEMS_PER_PAGE);
  const paginatedBuddies = sortedBuddies.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Reset page when filters change
  // Note: In a real app, use useEffect or reset in handlers. For simplicity here:
  if (currentPage > totalPages && totalPages > 0) setCurrentPage(1);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      
      {/* 1. Header / Page Intro */}
      <div className="bg-white border-b border-gray-100 pt-10 pb-8">
        <div className="container-custom">
           <FadeIn>
             <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-2">Find your buddy</h1>
             <p className="text-lg text-gray-500 max-w-2xl">
               Real people ready to help, talk, travel, support, or just be there. <br className="hidden md:block"/>
               Find someone you feel comfortable with.
             </p>
             
             <div className="mt-6 flex items-center gap-2 text-sm font-medium text-green-600 bg-green-50 px-3 py-1.5 rounded-full w-fit">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                </span>
                {filteredBuddies.length} buddies matching your criteria
             </div>

             {/* Safety reassurance */}
             <SafetyStrip className="mt-6" />
           </FadeIn>

           {/* First-time nudge */}
           <div className="mt-5">
             <FirstTimeNudge
               id="buddies-first-visit"
               text="Start by exploring buddies near you. Use filters to narrow down by vibe, category, or budget."
             />
           </div>
        </div>
      </div>

      <div className="container-custom -mt-8">
        
        {/* 2. Smart Filters (Sticky) */}
        <SmartFilters 
           activeCategory={activeCategory}
           activeVibe={activeVibe}
           priceRange={priceRange}
           onCategoryChange={(c) => { setActiveCategory(c); setCurrentPage(1); }}
           onVibeChange={(v) => { setActiveVibe(v); setCurrentPage(1); }}
           onPriceChange={(r) => { setPriceRange(r); setCurrentPage(1); }}
        />

        {/* 3. Trust-first Sorting & Results Count */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 px-2">
           <div>
             <span className="text-gray-400 font-medium text-sm block md:inline mb-2 md:mb-0">
                Sorted by:
             </span>
             <div className="inline-flex flex-wrap gap-2 md:ml-3">
               {[
                 { id: "best_match", label: "Best Match", icon: Sparkles },
                 { id: "trust", label: "Most Trusted", icon: ShieldCheck },
                 { id: "available", label: "Available Now", icon: Clock },
                 { id: "budget", label: "Budget Friendly", icon: Wallet },
               ].map((opt) => (
                 <button
                   key={opt.id}
                   onClick={() => setActiveSort(opt.id as SortOption)}
                   className={cn(
                     "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-bold transition-all border",
                     activeSort === opt.id
                       ? "bg-gray-900 text-white border-gray-900 shadow-sm"
                       : "bg-white text-gray-500 border-transparent hover:border-gray-200 hover:bg-white"
                   )}
                 >
                   <opt.icon className="w-3.5 h-3.5" />
                   {opt.label}
                 </button>
               ))}
             </div>
           </div>
           
           <div className="text-sm text-gray-400 font-medium">
             Showing {paginatedBuddies.length} of {sortedBuddies.length} buddies
           </div>
        </div>

        {/* 4. Buddy Grid */}
        {sortedBuddies.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 min-h-[300px] md:min-h-[500px]">
              {paginatedBuddies.map((buddy, index) => (
                <FadeIn key={buddy.id} delay={index * 0.05}>
                  <BuddyCard buddy={buddy} />
                </FadeIn>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center gap-2">
                <button 
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  className="px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 font-medium"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={cn(
                      "w-10 h-10 rounded-lg font-bold transition-colors",
                      currentPage === page
                        ? "bg-gray-900 text-white"
                        : "bg-white border border-gray-200 hover:bg-gray-50"
                    )}
                  >
                    {page}
                  </button>
                ))}
                <button 
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  className="px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 font-medium"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <EmptyState />
        )}
        
        {/* 5. Post Situation CTA */}
        <PostSituationBanner className="mt-12" />

        {/* 6. Soft Education Layer */}
        <div className="mt-10 py-8 border-t border-gray-200 text-center space-y-3">
           <SocialProofStrip variant="muted" />
           <p className="text-sm text-gray-400 max-w-xl mx-auto">
             HireBuddy highlights the best match for you based on trust, vibe, and reliability — not just price.
           </p>
           <p className="text-xs text-gray-300 mt-2 italic">This is a safe space. You are not alone.</p>
        </div>

      </div>
    </div>
  );
}
