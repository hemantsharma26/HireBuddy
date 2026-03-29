"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowRight, Check, Loader2, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRSVP } from "@/context/RSVPContext";
import { useToast } from "@/context/ToastContext";

/* ═══════════════════════════════════════════════════
   RSVPButton — Reusable RSVP toggle component
   ═══════════════════════════════════════════════════ */

interface RSVPButtonProps {
  eventId: string;
  /** Event is full */
  isFull?: boolean;
  /** Event has expired (past date) */
  isExpired?: boolean;
  /** Private event flag */
  isPrivate?: boolean;
  className?: string;
}

export function RSVPButton({
  eventId,
  isFull = false,
  isExpired = false,
  isPrivate = false,
  className,
}: RSVPButtonProps) {
  const { getState, toggleRSVP } = useRSVP();
  const { toast } = useToast();
  const { isGoing, loading } = getState(eventId);

  const [showConfirm, setShowConfirm] = useState(false);
  const [showBurst, setShowBurst] = useState(false);
  const confirmRef = useRef<HTMLDivElement>(null);

  // Close confirm on outside click
  useEffect(() => {
    if (!showConfirm) return;
    const handler = (e: MouseEvent) => {
      if (confirmRef.current && !confirmRef.current.contains(e.target as Node)) {
        setShowConfirm(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [showConfirm]);

  // Edge cases
  if (isExpired) {
    return (
      <button
        disabled
        className={cn(
          "inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gray-100 text-gray-400 text-xs font-bold cursor-not-allowed",
          className
        )}
      >
        Event Ended
      </button>
    );
  }

  if (isFull && !isGoing) {
    return (
      <button
        disabled
        className={cn(
          "inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-amber-50 text-amber-600 border border-amber-100 text-xs font-bold cursor-not-allowed",
          className
        )}
        title="This event is full"
      >
        Waitlist
      </button>
    );
  }

  const handleClick = async () => {
    if (loading) return;

    // If already going, show confirm modal
    if (isGoing) {
      setShowConfirm(true);
      return;
    }

    // RSVP
    const ok = await toggleRSVP(eventId);
    if (ok) {
      setShowBurst(true);
      setTimeout(() => setShowBurst(false), 600);
      toast("You're in! See you at the event 🎉");
    }
  };

  const handleConfirmLeave = async () => {
    setShowConfirm(false);
    const ok = await toggleRSVP(eventId);
    if (ok) {
      toast("You've left the event", "info");
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        disabled={loading}
        title={isGoing ? "You've already joined this event" : undefined}
        className={cn(
          "relative inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all active:scale-95 overflow-hidden",
          isGoing
            ? "bg-emerald-50 text-emerald-600 border border-emerald-100 hover:bg-emerald-100"
            : "bg-primary hover:bg-[#F03541] text-white shadow-sm",
          loading && "opacity-70 cursor-wait",
          className
        )}
      >
        {/* Confetti burst effect */}
        {showBurst && (
          <span className="absolute inset-0 pointer-events-none">
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-primary/20 animate-ping" />
          </span>
        )}

        {loading ? (
          <Loader2 className="w-3 h-3 animate-spin" />
        ) : isGoing ? (
          <Check className="w-3 h-3" />
        ) : isPrivate ? (
          <Lock className="w-3 h-3" />
        ) : (
          <></>
        )}

        <span className="relative z-10">
          {loading
            ? "Please wait..."
            : isGoing
            ? "Going"
            : isPrivate
            ? "Request Access"
            : "RSVP"}
        </span>

        {!isGoing && !loading && !isPrivate && (
          <ArrowRight className="w-3 h-3 relative z-10" />
        )}
      </button>

      {/* Un-RSVP confirmation dropdown */}
      {showConfirm && (
        <div
          ref={confirmRef}
          className="absolute right-0 bottom-full mb-2 w-52 bg-white rounded-xl border border-gray-100 shadow-xl p-4 z-50 animate-in fade-in slide-in-from-bottom-2 duration-200"
        >
          <p className="text-sm font-semibold text-gray-900 mb-1">
            Leave this event?
          </p>
          <p className="text-xs text-gray-400 mb-3">
            You can always RSVP again later.
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setShowConfirm(false)}
              className="flex-1 px-3 py-2 rounded-lg border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Stay
            </button>
            <button
              onClick={handleConfirmLeave}
              className="flex-1 px-3 py-2 rounded-lg bg-red-50 text-xs font-semibold text-red-600 hover:bg-red-100 transition-colors"
            >
              Leave
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
