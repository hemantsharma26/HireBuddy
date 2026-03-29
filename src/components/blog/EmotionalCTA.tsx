import Link from "next/link";
import { ArrowRight, Heart, Users } from "lucide-react";

/**
 * Emotional CTA after article — converts readers into users.
 * "Feeling this too?" with action buttons to Find a Buddy / Join Community.
 */
export function EmotionalCTA() {
  return (
    <section className="my-16">
      <div className="relative bg-gradient-to-br from-gray-50 to-gray-100/80 rounded-2xl p-8 sm:p-12 text-center overflow-hidden border border-gray-100">
        {/* Subtle decorative blobs */}
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-purple-500/5 blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
            <Heart className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 tracking-tight">
            Feeling this too?
          </h2>
          <p className="text-gray-500 max-w-md mx-auto mb-8 leading-relaxed">
            You&rsquo;re not alone in feeling alone. Thousands of people are looking for the same thing — real human connection without the pretense.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/explore"
              className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-[#e0353d] text-white rounded-full px-7 py-3.5 font-bold text-sm transition-all hover:scale-105 active:scale-95 shadow-lg shadow-red-500/15"
            >
              <Users className="w-4 h-4" />
              Find a Buddy
            </Link>
            <Link
              href="/groups"
              className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 rounded-full px-7 py-3.5 font-bold text-sm transition-all border border-gray-200 hover:border-gray-300"
            >
              Join Community
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 text-gray-500 hover:text-primary font-semibold text-sm transition-colors px-4 py-3"
            >
              Share your story
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
