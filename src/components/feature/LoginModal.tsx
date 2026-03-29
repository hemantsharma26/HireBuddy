"use client";

import Link from "next/link";
import { X, Heart } from "lucide-react";
import { useEffect } from "react";

/* ═══════════════════════════════════════════════════
   LoginModal — Prompts unauthenticated users
   ═══════════════════════════════════════════════════ */

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
  /** Where to redirect after login */
  returnPath?: string;
}

export function LoginModal({
  open,
  onClose,
  returnPath = "/events",
}: LoginModalProps) {
  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close on escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  const redirectParam = encodeURIComponent(returnPath);

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal card */}
      <div className="relative bg-white rounded-[1.5rem] shadow-2xl w-full max-w-sm mx-4 p-8 animate-in fade-in zoom-in-95 slide-in-from-bottom-4 duration-300">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-200 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="text-center">
          {/* Icon */}
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
            <Heart className="w-7 h-7 text-primary" />
          </div>

          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Log in to join events
          </h2>
          <p className="text-sm text-gray-500 mb-8">
            Create meaningful connections by RSVPing to events that resonate
            with you.
          </p>

          <div className="flex flex-col gap-3">
            <Link
              href={`/login?redirect=${redirectParam}`}
              className="inline-flex items-center justify-center gap-2 bg-[#FF6B6B] hover:bg-[#ff5252] text-white rounded-full px-6 py-3.5 font-bold text-sm transition-all hover:scale-105 active:scale-95 shadow-lg shadow-red-500/20"
            >
              Log In
            </Link>
            <Link
              href={`/signup?redirect=${redirectParam}`}
              className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 font-bold text-sm text-gray-700 border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
