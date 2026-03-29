"use client";

import Link from "next/link";
import { Send, Heart, Shield } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { cn } from "@/lib/utils";

/* ═══════════════════════════════════════════
   "Post Your Situation" CTA Banner
   Reusable across Homepage, Buddies, etc.
   ═══════════════════════════════════════════ */

export function PostSituationBanner({ className }: { className?: string }) {
  return (
    <section className={cn("py-10 md:py-14", className)}>
      <div className="container-custom">
        <FadeIn>
          <div className="relative bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 rounded-3xl px-6 py-10 md:px-12 md:py-14 text-center overflow-hidden">
            {/* Subtle decorative elements */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

            <div className="relative z-10">
              <Heart className="w-8 h-8 text-primary/80 mx-auto mb-4" />

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 leading-tight tracking-tight">
                Going through something?
                <br className="hidden sm:block" />
                <span className="text-gray-300 font-normal text-xl md:text-2xl">
                  You don&apos;t have to figure it out alone.
                </span>
              </h2>

              <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-8">
                Share what you&apos;re going through. Real, verified humans will
                respond with support offers — on your terms.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                <Link
                  href="/post-request"
                  className="inline-flex items-center gap-2.5 bg-primary hover:bg-primary/90 text-white font-bold px-8 py-4 rounded-2xl shadow-lg shadow-primary/20 hover:shadow-xl transition-all active:scale-[0.97] text-base"
                >
                  <Send className="w-4 h-4" />
                  Post Your Situation
                </Link>
                <Link
                  href="/requests"
                  className="inline-flex items-center gap-2 text-gray-400 hover:text-white font-semibold px-5 py-3 rounded-xl transition-colors text-sm"
                >
                  See open requests →
                </Link>
              </div>

              <div className="mt-6 flex items-center justify-center gap-1.5 text-xs text-gray-500">
                <Shield className="w-3 h-3" />
                <span>
                  This is a safe space. You are not alone.
                </span>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
