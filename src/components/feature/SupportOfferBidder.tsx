"use client";

import { useState, useEffect } from 'react';
import { TASK_TYPES, getBidQuality } from '@/lib/pricing';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SupportOfferBidderProps {
  taskType: string; // e.g., 'movie'
  onBidChange: (amount: number) => void;
}

export function SupportOfferBidder({ taskType, onBidChange }: SupportOfferBidderProps) {
  // Default to 'utility-support' if type not found
  const task = TASK_TYPES[taskType] || TASK_TYPES['utility-support']; 
  const [bid, setBid] = useState<number>(task.avgPrice);
  const [quality, setQuality] = useState(getBidQuality(task.avgPrice, taskType));

  useEffect(() => {
    // Reset bid when task type changes
    setBid(task.avgPrice);
  }, [taskType]);

  useEffect(() => {
    setQuality(getBidQuality(bid, taskType));
    onBidChange(bid);
  }, [bid, taskType, onBidChange]);

  return (
    <div className="bg-card p-6 rounded-2xl border shadow-sm space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h3 className="text-lg font-semibold">Your Offer</h3>
          <p className="text-sm text-muted-foreground">{task.label} Range: ₹{task.minPrice} - ₹{task.maxPrice}</p>
        </div>
        <div className="text-right">
          <span className="text-3xl font-bold text-primary">₹{bid}</span>
          <div className={cn("text-xs font-bold uppercase tracking-wider", quality.color)}>
            {quality.label}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <input 
          type="range" 
          min={task.minPrice} 
          max={task.maxPrice} 
          step={50}
          value={bid} 
          onChange={(e) => setBid(Number(e.target.value))}
          className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
        />
        
        <div className="flex justify-between text-xs text-muted-foreground font-medium">
          <span>₹{task.minPrice} (Min)</span>
          <span>₹{task.avgPrice} (Avg)</span>
          <span>₹{task.maxPrice} (Max)</span>
        </div>
      </div>

      <div className="bg-blue-50/50 p-4 rounded-xl flex gap-3 text-sm">
        <AlertCircle className="h-5 w-5 text-blue-600 shrink-0" />
        <p className="text-blue-700">
          <span className="font-semibold">Fair Price Promise:</span> Bids above <span className="font-bold">₹{task.avgPrice}</span> help you match with higher vibe & trusted buddies.
        </p>
      </div>

      <div className="pt-4 border-t flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Platform Fee</span>
        <span className="font-medium">₹{Math.round(bid * 0.05)} (5%)</span>
      </div>
    </div>
  );
}
