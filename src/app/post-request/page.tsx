"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Heart,
  Send,
  Shield,
  Eye,
  EyeOff,
  ChevronLeft,
  CheckCircle2,
} from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { cn } from "@/lib/utils";
import { IconRenderer } from "@/components/ui/IconRenderer";
import {
  emotionalCategories,
  languageOptions,
  durationOptions,
  type UrgencyLevel,
} from "@/data/requests";

/* ═══════════════════════════════════════════
   Post Your Situation — Problem-First Page
   ═══════════════════════════════════════════ */

export default function PostRequestPage() {
  const [situation, setSituation] = useState("");
  const [category, setCategory] = useState("");
  const [budget, setBudget] = useState("");
  const [duration, setDuration] = useState("");
  const [language, setLanguage] = useState("Hinglish");
  const [anonymous, setAnonymous] = useState(false);
  const [urgency, setUrgency] = useState<UrgencyLevel>("today");
  const [submitted, setSubmitted] = useState(false);

  const urgencyOptions: {
    value: UrgencyLevel;
    label: string;
    iconName: string;
    desc: string;
  }[] = [
    {
      value: "whenever",
      label: "Whenever",
      iconName: "Leaf",
      desc: "No rush, take it easy",
    },
    {
      value: "today",
      label: "Today",
      iconName: "Sun",
      desc: "Would like help today",
    },
    {
      value: "urgent",
      label: "Urgent",
      iconName: "Zap",
      desc: "Need help soon",
    },
    {
      value: "right-now",
      label: "Right Now",
      iconName: "AlertCircle",
      desc: "Please, as soon as possible",
    },
  ];

  const handleSubmit = () => {
    if (!situation.trim() || !category) return;
    setSubmitted(true);
    // In production: POST to API
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-section flex items-center justify-center px-4">
        <FadeIn>
          <div className="bg-card border border-border rounded-3xl p-8 md:p-12 max-w-lg mx-auto text-center">
            <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8 text-emerald-600" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3 flex items-center justify-center gap-2">
              Your request is live <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
            </h1>
            <p className="text-muted-foreground leading-relaxed mb-2">
              Buddies are already seeing your post. You&apos;ll start receiving
              support offers shortly.
            </p>
            <p className="text-sm text-muted-foreground italic mb-8">
              This is a safe space. You are not alone.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/requests"
                className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold px-6 py-3.5 rounded-2xl shadow-lg transition-all active:scale-[0.97]"
              >
                View Open Requests
              </Link>
              <Link
                href="/buddies"
                className="inline-flex items-center justify-center gap-2 bg-card border-2 border-border text-foreground font-bold px-6 py-3.5 rounded-2xl hover:bg-muted transition-all active:scale-[0.97]"
              >
                Browse Buddies
              </Link>
            </div>
          </div>
        </FadeIn>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-section pb-16">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="container-custom py-6 md:py-10">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-6 group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Back to Home
          </Link>

          <FadeIn>
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3 leading-tight">
                What are you going through right now?
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Share what you need. Real people will respond with support
                offers. No judgment, no pressure — just genuine help.
              </p>
              <p className="mt-3 text-sm text-muted-foreground italic flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5" />
                This is a safe space. You are not alone.
              </p>
            </div>
          </FadeIn>
        </div>
      </div>

      <div className="container-custom py-8 md:py-10 max-w-2xl">
        <div className="space-y-8">
          {/* ── 1. Situation / What's on your mind ── */}
          <FadeIn delay={0.05}>
            <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
              <label className="block text-base font-bold text-foreground mb-1.5">
                Tell us what&apos;s happening
              </label>
              <p className="text-sm text-muted-foreground mb-4">
                Be as open as you&apos;re comfortable with. This helps buddies
                understand how to support you best.
              </p>
              <textarea
                value={situation}
                onChange={(e) => setSituation(e.target.value)}
                placeholder="e.g., I just moved to a new city and the silence is getting to me. Would love someone who understands..."
                rows={5}
                className="w-full bg-section border border-border rounded-xl px-4 py-3.5 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 resize-none text-[15px] leading-relaxed"
              />
              <p className="mt-2 text-xs text-muted-foreground flex items-center gap-1.5">
                Your words stay between you and the buddy you choose. <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
              </p>
            </div>
          </FadeIn>

          {/* ── 2. Emotional Category ── */}
          <FadeIn delay={0.1}>
            <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
              <label className="block text-base font-bold text-foreground mb-1.5">
                What best describes your situation?
              </label>
              <p className="text-sm text-muted-foreground mb-4">
                Pick the closest match — it helps the right buddies find you
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {emotionalCategories.map((cat) => (
                   <button
                    key={cat.label}
                    onClick={() => setCategory(cat.label)}
                    className={cn(
                      "flex items-center gap-2.5 px-4 py-3 rounded-xl border text-sm font-semibold transition-all text-left",
                      category === cat.label
                        ? "bg-primary/5 border-primary/30 text-foreground ring-1 ring-primary/20"
                        : "bg-section border-border text-muted-foreground hover:border-border hover:bg-muted"
                    )}
                  >
                    <IconRenderer name={cat.iconName} className="w-5 h-5 shrink-0" strokeWidth={2} />
                    <span className="leading-tight">{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* ── 3. Urgency ── */}
          <FadeIn delay={0.15}>
            <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
              <label className="block text-base font-bold text-foreground mb-1.5">
                How soon do you need support?
              </label>
              <p className="text-sm text-muted-foreground mb-4">
                No pressure — every timeline is valid
              </p>
              <div className="grid grid-cols-2 gap-2.5">
                {urgencyOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setUrgency(opt.value)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3.5 rounded-xl border text-left transition-all",
                      urgency === opt.value
                        ? "bg-primary/5 border-primary/30 ring-1 ring-primary/20"
                        : "bg-section border-border hover:bg-muted"
                    )}
                  >
                    <IconRenderer name={opt.iconName} className="w-5 h-5" />
                    <div>
                      <div className="text-sm font-bold text-foreground">
                        {opt.label}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {opt.desc}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* ── 4. Budget + Duration + Language (compact row) ── */}
          <FadeIn delay={0.2}>
            <div className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-5">
              <h3 className="text-base font-bold text-foreground">
                A few more details{" "}
                <span className="text-muted-foreground font-normal text-sm">
                  (optional)
                </span>
              </h3>

              {/* Budget */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Budget range
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    "₹200–500",
                    "₹500–800",
                    "₹800–1200",
                    "Flexible",
                  ].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setBudget(opt)}
                      className={cn(
                        "px-3 py-2.5 rounded-xl border text-sm font-semibold transition-all",
                        budget === opt
                          ? "bg-primary/5 border-primary/30 text-foreground ring-1 ring-primary/20"
                          : "bg-section border-border text-muted-foreground hover:bg-muted"
                      )}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Duration */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  How long do you need support?
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {durationOptions.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setDuration(opt)}
                      className={cn(
                        "px-3 py-2.5 rounded-xl border text-xs font-semibold transition-all",
                        duration === opt
                          ? "bg-primary/5 border-primary/30 text-foreground ring-1 ring-primary/20"
                          : "bg-section border-border text-muted-foreground hover:bg-muted"
                      )}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Language */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Preferred language
                </label>
                <div className="flex flex-wrap gap-2">
                  {languageOptions.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setLanguage(lang)}
                      className={cn(
                        "px-3.5 py-2 rounded-full border text-sm font-semibold transition-all",
                        language === lang
                          ? "bg-primary/5 border-primary/30 text-foreground ring-1 ring-primary/20"
                          : "bg-section border-border text-muted-foreground hover:bg-muted"
                      )}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>

          {/* ── 5. Anonymous Toggle ── */}
          <FadeIn delay={0.25}>
            <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
              <button
                onClick={() => setAnonymous(!anonymous)}
                className="w-full flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  {anonymous ? (
                    <EyeOff className="w-5 h-5 text-violet-500" />
                  ) : (
                    <Eye className="w-5 h-5 text-muted-foreground" />
                  )}
                  <div className="text-left">
                    <div className="text-sm font-bold text-foreground">
                      Post anonymously
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {anonymous
                        ? "Your identity is hidden. Buddies won't see your name."
                        : "Your first name will be visible to buddies"}
                    </div>
                  </div>
                </div>
                <div
                  className={cn(
                    "w-12 h-7 rounded-full transition-colors relative shrink-0",
                    anonymous ? "bg-violet-500" : "bg-muted"
                  )}
                >
                  <div
                    className={cn(
                      "absolute top-1 w-5 h-5 bg-white rounded-full shadow-sm transition-transform",
                      anonymous ? "translate-x-6" : "translate-x-1"
                    )}
                  />
                </div>
              </button>
            </div>
          </FadeIn>

          {/* ── 6. Submit ── */}
          <FadeIn delay={0.3}>
            <div className="space-y-4">
              <button
                onClick={handleSubmit}
                disabled={!situation.trim() || !category}
                className={cn(
                  "w-full inline-flex items-center justify-center gap-2.5 font-bold py-4 rounded-2xl text-lg shadow-lg transition-all active:scale-[0.97]",
                  situation.trim() && category
                    ? "bg-primary hover:bg-primary/90 text-white hover:shadow-xl"
                    : "bg-muted text-muted-foreground cursor-not-allowed shadow-none"
                )}
              >
                <Send className="w-5 h-5" />
                Post Your Situation
              </button>

              <div className="flex items-start gap-2.5 text-xs text-muted-foreground px-1">
                <Heart className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                <p>
                  Your post will be visible to verified buddies who can help.
                  You choose who to connect with. This is a safe space — you are
                  not alone.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
