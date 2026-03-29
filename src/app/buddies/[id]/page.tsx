"use client";

import { useEffect, useState } from "react";
import { type Buddy, buddies } from "@/data/buddies";
import {
  getExtendedProfile,
  type ExtendedProfile,
  type BuddyReview,
} from "@/data/buddyProfiles";
import {
  Star,
  ShieldCheck,
  MapPin,
  Clock,
  Heart,
  MessageCircle,
  Calendar,
  ChevronLeft,
  Lock,
  Users,
  CheckCircle2,
  CalendarClock,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { FadeIn } from "@/components/ui/FadeIn";
import { ShareBlock } from "@/components/ui/ShareBlock";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { cn, getFullImageUrl } from "@/lib/utils";
import { Send } from "lucide-react";
import { IconRenderer } from "@/components/ui/IconRenderer";

/* ═══════════════════════════════════════════════
   Buddy Profile Page — trust-first, human-first
   ═══════════════════════════════════════════════ */

export default function BuddyProfile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [buddy, setBuddy] = useState<Buddy | null>(null);
  const [profile, setProfile] = useState<ExtendedProfile | null>(null);
  const [saved, setSaved] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);

  useEffect(() => {
    params.then((unwrappedParams) => {
      const id = parseInt(unwrappedParams.id);
      const found = buddies.find((b) => b.id === id);
      if (found) {
        setBuddy(found);
        setProfile(getExtendedProfile(found));
      }
    });
  }, [params]);

  if (!buddy || !profile) return <ProfileSkeleton />;

  const firstName = buddy.name.split(" ")[0];

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-section pb-28 lg:pb-12">
        {/* ════════════════════════════════════════
            1. HERO PROFILE SECTION
            ════════════════════════════════════════ */}
        <section className="bg-card border-b border-border">
          <div className="container-custom py-6 md:py-10">
            {/* Back nav */}
            <Link
              href="/buddies"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-6 group"
            >
              <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              Back to Buddies
            </Link>

            <FadeIn>
              <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* ── Avatar ── */}
                <div className="relative w-full md:w-72 shrink-0">
                  <div className="aspect-square md:aspect-[4/5] w-full rounded-3xl overflow-hidden bg-muted shadow-soft">
                    <Image
                      src={getFullImageUrl(buddy.image) || ""}
                      alt={buddy.name}
                      width={400}
                      height={500}
                      className="w-full h-full object-cover"
                      priority
                    />
                  </div>
                  {/* Online badge */}
                  {profile.isOnline && (
                    <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm text-emerald-700 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-sm border border-border/50">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                      </span>
                      Online Now
                    </div>
                  )}
                  {/* Category pill */}
                  <div className="absolute bottom-4 left-4 bg-foreground/80 backdrop-blur-sm text-background text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                    {buddy.category}
                  </div>
                </div>

                {/* ── Profile Info ── */}
                <div className="flex-1 min-w-0">
                  {/* Name + verified */}
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
                      {buddy.name}
                      <span className="text-muted-foreground font-normal ml-2 text-2xl md:text-3xl">
                        {buddy.age}
                      </span>
                    </h1>
                    {buddy.verified && (
                      <span className="flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full text-xs font-bold border border-emerald-100 shrink-0">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Verified
                      </span>
                    )}
                  </div>

                  {/* Tagline */}
                  <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-1.5 italic">
                    &ldquo;{profile.tagline}&rdquo;
                  </p>

                  {/* Location */}
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-5">
                    <MapPin className="w-3.5 h-3.5" />
                    {buddy.location}
                  </div>

                  {/* Trust badges */}
                  <div className="flex flex-wrap gap-2.5 mb-6">
                    <TrustBadge
                      icon={
                        <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                      }
                      label={`${buddy.rating} Rating`}
                    />
                    <TrustBadge
                      icon={<Clock className="w-4 h-4 text-blue-500" />}
                      label={`${buddy.responseTime} reply`}
                    />
                    <TrustBadge
                      icon={
                        <MessageCircle className="w-4 h-4 text-violet-500" />
                      }
                      label={`${profile.totalConversations}+ sessions`}
                    />
                    <TrustBadge
                      icon={<Users className="w-4 h-4 text-rose-500" />}
                      label={`${profile.repeatPercent}% return`}
                    />
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {buddy.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full bg-section text-muted-foreground text-xs font-semibold border border-border"
                      >
                        {tag}
                      </span>
                    ))}
                    <span className="px-3 py-1 rounded-full bg-section text-muted-foreground text-xs font-semibold border border-border">
                      {buddy.style}
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-3xl font-bold text-foreground">
                      ₹{buddy.price}
                    </span>
                    <span className="text-muted-foreground text-sm">/hour</span>
                    {buddy.pricingMode === "SupportOffer" && (
                      <span className="ml-2 text-xs bg-amber-50 text-amber-700 px-2.5 py-0.5 rounded-full font-semibold border border-amber-100">
                        💡 Support Offer
                      </span>
                    )}
                    {buddy.pricingMode === "Premium" && (
                      <span className="ml-2 text-xs bg-violet-50 text-violet-700 px-2.5 py-0.5 rounded-full font-semibold border border-violet-100">
                        ✨ Premium
                      </span>
                    )}
                  </div>

                  {/* CTA buttons */}
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href={`/hire?buddy=${buddy.id}`}
                      className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold px-7 py-3.5 rounded-2xl shadow-lg hover:shadow-xl transition-all active:scale-[0.97]"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Talk Now
                    </Link>
                    <button className="inline-flex items-center gap-2 bg-card border-2 border-border text-foreground font-bold px-6 py-3.5 rounded-2xl hover:bg-muted transition-all active:scale-[0.97]">
                      <CalendarClock className="w-4 h-4" />
                      Schedule Later
                    </button>
                    <button
                      onClick={() => setSaved(!saved)}
                      className={cn(
                        "inline-flex items-center gap-2 px-4 py-3.5 rounded-2xl border-2 font-bold transition-all active:scale-[0.97]",
                        saved
                          ? "bg-rose-50 border-rose-200 text-rose-600"
                          : "bg-card border-border text-muted-foreground hover:text-foreground hover:bg-muted"
                      )}
                    >
                      <Heart
                        className={cn(
                          "w-4 h-4 transition-colors",
                          saved && "fill-rose-500 text-rose-500"
                        )}
                      />
                      {saved ? "Saved" : "Save"}
                    </button>
                  </div>

                  {/* Safety reassurance below CTA */}
                  <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
                    <Lock className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>
                      Your conversation is private & encrypted. Cancel anytime, no questions asked.
                    </span>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ════════════════════════════════════════
            2. MAIN CONTENT — Two-column layout
            ════════════════════════════════════════ */}
        <div className="container-custom py-8 md:py-10">
          <div className="grid lg:grid-cols-[1fr_minmax(300px,360px)] gap-8 items-start">
            {/* ── Left Column ── */}
            <div className="space-y-8">
              {/* ABOUT */}
              <FadeIn delay={0.05}>
                <SectionCard>
                  <SectionTitle>About {firstName}</SectionTitle>
                  <p className="text-muted-foreground leading-relaxed text-[17px] whitespace-pre-line">
                    {profile.about}
                  </p>
                </SectionCard>
              </FadeIn>

              {/* HOW THEY CAN HELP */}
              <FadeIn delay={0.1}>
                <SectionCard>
                  <SectionTitle>How {firstName} can help</SectionTitle>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {profile.helpAreas.map((area, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 bg-section border border-border rounded-2xl px-4 py-3.5 hover:shadow-soft hover:-translate-y-0.5 transition-all cursor-default"
                      >
                        <IconRenderer name={area.iconName} className="w-5 h-5 text-muted-foreground" strokeWidth={2} />
                        <span className="text-sm font-semibold text-foreground leading-tight">
                          {area.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </SectionCard>
              </FadeIn>

              {/* SESSION STYLE */}
              <FadeIn delay={0.15}>
                <SectionCard>
                  <SectionTitle>Session Style</SectionTitle>
                  <p className="text-muted-foreground text-sm mb-5">
                    What to expect when you connect with {firstName}
                  </p>
                  <div className="space-y-3">
                    {profile.sessionStyles.map((style, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-4 p-4 bg-section border border-border rounded-2xl hover:shadow-soft transition-all"
                      >
                        <div className="mt-0.5 shrink-0">
                          <IconRenderer name={style.iconName} className="w-6 h-6 text-primary" strokeWidth={1.5} />
                        </div>
                        <div>
                          <h4 className="font-bold text-foreground text-sm">
                            {style.label}
                          </h4>
                          <p className="text-muted-foreground text-sm mt-0.5 leading-relaxed">
                            {style.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </SectionCard>
              </FadeIn>

              {/* REVIEWS */}
              <FadeIn delay={0.2}>
                <SectionCard>
                  <div className="flex items-center justify-between mb-6">
                    <SectionTitle className="!mb-0">
                      What people say
                    </SectionTitle>
                    <div className="flex items-center gap-1.5 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-100 shrink-0">
                      <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                      <span className="font-bold text-sm text-foreground">
                        {buddy.rating}
                      </span>
                      <span className="text-xs text-muted-foreground hidden sm:inline">
                        ({buddy.reviews} reviews)
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {(showAllReviews
                      ? profile.reviews
                      : profile.reviews.slice(0, 3)
                    ).map((review) => (
                      <ReviewCard key={review.id} review={review} />
                    ))}
                  </div>

                  {profile.reviews.length > 3 && !showAllReviews && (
                    <button
                      onClick={() => setShowAllReviews(true)}
                      className="mt-5 w-full py-3 text-sm font-bold text-primary hover:text-primary/80 border border-border rounded-xl hover:bg-muted/50 transition-all"
                    >
                      Show all {profile.reviews.length} reviews
                    </button>
                  )}
                </SectionCard>
              </FadeIn>

              {/* POST SITUATION CTA */}
              <FadeIn delay={0.25}>
                <div className="bg-card border border-border rounded-2xl p-6 md:p-8 text-center">
                  <p className="text-muted-foreground text-[15px] leading-relaxed mb-4">
                    Not sure yet? <span className="font-semibold text-foreground">Post your situation</span> and receive support offers from multiple buddies — including {firstName}.
                  </p>
                  <Link
                    href="/post-request"
                    className="inline-flex items-center gap-2 bg-foreground hover:bg-foreground/90 text-background font-bold px-6 py-3 rounded-2xl transition-all active:scale-[0.97] text-sm"
                  >
                    <Send className="w-4 h-4" />
                    Post Your Situation
                  </Link>
                  <p className="mt-3 text-xs text-muted-foreground italic flex items-center justify-center gap-1.5">
                    This is a safe space. You are not alone. <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
                  </p>
                </div>
              </FadeIn>

              {/* SHARE */}
              <FadeIn delay={0.3}>
                <ShareBlock
                  title={`Share ${buddy.name}'s Profile`}
                  url={`https://hirebuddy.app/buddies/${buddy.id}`}
                />
              </FadeIn>
            </div>

            {/* ── Right Column: Sidebar ── */}
            <div className="space-y-6 lg:sticky lg:top-24">
              {/* TRUST & SOCIAL PROOF */}
              <FadeIn delay={0.1}>
                <SectionCard>
                  <h3 className="font-bold text-foreground text-base mb-5 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                    Trust & Credibility
                  </h3>

                  <div className="space-y-4 mb-5">
                    <TrustRow
                      label="Rating"
                      value={
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                "w-3.5 h-3.5",
                                i < Math.floor(buddy.rating)
                                  ? "text-amber-500 fill-amber-500"
                                  : "text-border"
                              )}
                            />
                          ))}
                          <span className="ml-1 font-bold text-sm">
                            {buddy.rating}
                          </span>
                        </div>
                      }
                    />
                    <TrustRow
                      label="Sessions"
                      value={`${profile.totalConversations}+ conversations`}
                    />
                    <TrustRow
                      label="Repeat Users"
                      value={`${profile.repeatPercent}%`}
                    />
                    <TrustRow
                      label="Member Since"
                      value={profile.joinedSince}
                    />
                    <TrustRow
                      label="Languages"
                      value={profile.languages.join(", ")}
                    />
                    <TrustRow
                      label="Vibe Score"
                      value={
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-emerald-500 rounded-full transition-all"
                              style={{ width: `${buddy.vibeScore}%` }}
                            />
                          </div>
                          <span className="text-xs font-bold">
                            {buddy.vibeScore}/100
                          </span>
                        </div>
                      }
                    />
                  </div>

                  <p className="text-xs text-muted-foreground text-center italic leading-relaxed">
                    {profile.trustMicrocopy}
                  </p>
                </SectionCard>
              </FadeIn>

              {/* AVAILABILITY */}
              <FadeIn delay={0.15}>
                <SectionCard>
                  <h3 className="font-bold text-foreground text-base mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-blue-500" />
                    Availability
                  </h3>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between p-3.5 bg-section rounded-xl border border-border">
                      <span className="text-sm text-muted-foreground">
                        Status
                      </span>
                      <span
                        className={cn(
                          "text-sm font-bold flex items-center gap-1.5",
                          profile.isOnline
                            ? "text-emerald-600"
                            : "text-amber-600"
                        )}
                      >
                        <span
                          className={cn(
                            "w-2 h-2 rounded-full",
                            profile.isOnline
                              ? "bg-emerald-500"
                              : "bg-amber-500"
                          )}
                        />
                        {profile.isOnline ? "Online Now" : "Away"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3.5 bg-section rounded-xl border border-border">
                      <span className="text-sm text-muted-foreground">
                        Next Slot
                      </span>
                      <span className="text-sm font-bold text-foreground">
                        {profile.nextSlot}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3.5 bg-section rounded-xl border border-border">
                      <span className="text-sm text-muted-foreground">
                        Response Time
                      </span>
                      <span className="text-sm font-bold text-foreground">
                        ~{buddy.responseTime}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground text-center">
                    Usually replies within {buddy.responseTime} ⚡
                  </p>
                </SectionCard>
              </FadeIn>

              {/* SAFETY & PRIVACY */}
              <FadeIn delay={0.2}>
                <SectionCard className="!p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Lock className="w-4 h-4 text-muted-foreground" />
                    <h4 className="font-bold text-foreground text-sm">
                      Your safety matters
                    </h4>
                  </div>
                  <ul className="space-y-2.5">
                    <SafetyItem text="All conversations are private & encrypted" />
                    <SafetyItem text="This is a no-judgment, safe space" />
                    <SafetyItem text="Community guidelines are strictly followed" />
                    <SafetyItem text="Report any concerns — we act fast" />
                  </ul>
                  <p className="mt-4 text-xs text-muted-foreground italic flex items-center gap-1.5">
                    Your comfort and trust come first. Always. <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
                  </p>
                </SectionCard>
              </FadeIn>

              {/* VERIFIED CREDENTIALS */}
              <FadeIn delay={0.25}>
                <div className="bg-emerald-50/60 border border-emerald-100 rounded-2xl p-5">
                  <h4 className="font-bold text-emerald-800 text-sm mb-3 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" />
                    Verified Credentials
                  </h4>
                  <div className="space-y-2">
                    {buddy.verificationLevel >= 1 && (
                      <VerifyItem text="Phone Verified" />
                    )}
                    {buddy.verificationLevel >= 2 && (
                      <VerifyItem text="Identity Verified" />
                    )}
                    {buddy.verificationLevel >= 3 && (
                      <VerifyItem text="Government ID Verified" />
                    )}
                    {buddy.jobsCompleted >= 50 && (
                      <VerifyItem
                        text={`${buddy.jobsCompleted}+ tasks completed`}
                      />
                    )}
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════
            9. STICKY MOBILE CTA
            ════════════════════════════════════════ */}
        <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-card/95 backdrop-blur-lg border-t border-border px-4 py-3 z-50">
          <div className="flex gap-3 max-w-lg mx-auto">
            <Link
              href={`/hire?buddy=${buddy.id}`}
              className="flex-1 inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold py-3.5 rounded-xl shadow-lg transition-all active:scale-[0.97] text-sm"
            >
              <MessageCircle className="w-4 h-4" />
              Talk Now
            </Link>
            <button className="flex-1 inline-flex items-center justify-center gap-2 bg-card border-2 border-border text-foreground font-bold py-3.5 rounded-xl transition-all active:scale-[0.97] text-sm">
              <CalendarClock className="w-4 h-4" />
              Schedule
            </button>
          </div>
          <p className="text-center text-[10px] text-muted-foreground mt-1.5">
            🔒 Private & encrypted · Cancel anytime
          </p>
        </div>
      </div>
    </ProtectedRoute>
  );
}

/* ═══════════════════════════════════════════
   Helper Components
   ═══════════════════════════════════════════ */

function TrustBadge({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div className="inline-flex items-center gap-2 bg-section border border-border px-3.5 py-2 rounded-xl">
      {icon}
      <span className="text-sm font-semibold text-foreground">{label}</span>
    </div>
  );
}

function SectionCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "bg-card border border-border rounded-2xl p-6 md:p-8",
        className
      )}
    >
      {children}
    </div>
  );
}

function SectionTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2 className={cn("text-xl font-bold text-foreground mb-5", className)}>
      {children}
    </h2>
  );
}

function TrustRow({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between py-0.5">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-semibold text-foreground">{value}</span>
    </div>
  );
}

function ReviewCard({ review }: { review: BuddyReview }) {
  return (
    <div className="p-5 bg-section border border-border rounded-2xl hover:shadow-soft transition-shadow">
      <div className="flex items-start gap-3 mb-3">
        <img
          src={getFullImageUrl(review.avatar)}
          alt={review.name}
          className="w-10 h-10 rounded-full object-cover bg-muted shrink-0"
          loading="lazy"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-foreground text-sm">{review.name}</h4>
            <span className="text-xs text-muted-foreground">
              {review.timeAgo}
            </span>
          </div>
          <div className="flex items-center gap-0.5 mt-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "w-3 h-3",
                  i < review.rating
                    ? "text-amber-500 fill-amber-500"
                    : "text-border"
                )}
              />
            ))}
          </div>
        </div>
      </div>
      <p className="text-muted-foreground text-sm leading-relaxed pl-[52px]">
        &ldquo;{review.text}&rdquo;
      </p>
    </div>
  );
}

function SafetyItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-2 text-sm text-muted-foreground">
      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
      {text}
    </li>
  );
}

function VerifyItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-emerald-700">
      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
      {text}
    </div>
  );
}

/* ═══════════════════════════════════════════
   Skeleton Loader — Premium feel
   ═══════════════════════════════════════════ */

function ProfileSkeleton() {
  return (
    <div className="min-h-screen bg-section">
      {/* Hero skeleton */}
      <div className="bg-card border-b border-border">
        <div className="container-custom py-6 md:py-10">
          <div className="h-5 w-32 bg-gradient-to-r from-gray-100 via-gray-200/70 to-gray-100 bg-[length:200%_100%] animate-shimmer rounded-lg mb-6" />
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-72 shrink-0">
              <div className="aspect-square md:aspect-[4/5] w-full rounded-3xl bg-gradient-to-r from-gray-100 via-gray-200/70 to-gray-100 bg-[length:200%_100%] animate-shimmer" />
            </div>
            <div className="flex-1 space-y-5 pt-2">
              <div className="h-10 w-64 bg-gradient-to-r from-gray-100 via-gray-200/70 to-gray-100 bg-[length:200%_100%] animate-shimmer rounded-xl" />
              <div className="h-6 w-96 max-w-full bg-gradient-to-r from-gray-100 via-gray-200/70 to-gray-100 bg-[length:200%_100%] animate-shimmer rounded-lg" />
              <div className="h-4 w-40 bg-gradient-to-r from-gray-100 via-gray-200/70 to-gray-100 bg-[length:200%_100%] animate-shimmer rounded-lg" />
              <div className="flex flex-wrap gap-2.5">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-10 w-32 bg-gradient-to-r from-gray-100 via-gray-200/70 to-gray-100 bg-[length:200%_100%] animate-shimmer rounded-xl" />
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-7 w-24 bg-gradient-to-r from-gray-100 via-gray-200/70 to-gray-100 bg-[length:200%_100%] animate-shimmer rounded-full" />
                ))}
              </div>
              <div className="h-9 w-36 bg-gradient-to-r from-gray-100 via-gray-200/70 to-gray-100 bg-[length:200%_100%] animate-shimmer rounded-xl" />
              <div className="flex flex-wrap gap-3 pt-2">
                <div className="h-13 w-36 bg-gradient-to-r from-gray-100 via-gray-200/70 to-gray-100 bg-[length:200%_100%] animate-shimmer rounded-2xl" />
                <div className="h-13 w-44 bg-gradient-to-r from-gray-100 via-gray-200/70 to-gray-100 bg-[length:200%_100%] animate-shimmer rounded-2xl" />
                <div className="h-13 w-24 bg-gradient-to-r from-gray-100 via-gray-200/70 to-gray-100 bg-[length:200%_100%] animate-shimmer rounded-2xl" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content skeleton */}
      <div className="container-custom py-8 md:py-10">
        <div className="grid lg:grid-cols-[1fr_minmax(300px,360px)] gap-8">
          <div className="space-y-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-4">
                <div className="h-6 w-48 bg-gradient-to-r from-gray-100 via-gray-200/70 to-gray-100 bg-[length:200%_100%] animate-shimmer rounded-lg" />
                <div className="space-y-2.5">
                  <div className="h-4 w-full bg-gradient-to-r from-gray-100 via-gray-200/70 to-gray-100 bg-[length:200%_100%] animate-shimmer rounded-lg" />
                  <div className="h-4 w-5/6 bg-gradient-to-r from-gray-100 via-gray-200/70 to-gray-100 bg-[length:200%_100%] animate-shimmer rounded-lg" />
                  <div className="h-4 w-3/4 bg-gradient-to-r from-gray-100 via-gray-200/70 to-gray-100 bg-[length:200%_100%] animate-shimmer rounded-lg" />
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card border border-border rounded-2xl p-5 md:p-6 space-y-3">
                <div className="h-5 w-40 bg-gradient-to-r from-gray-100 via-gray-200/70 to-gray-100 bg-[length:200%_100%] animate-shimmer rounded-lg" />
                <div className="space-y-2.5">
                  <div className="h-4 w-full bg-gradient-to-r from-gray-100 via-gray-200/70 to-gray-100 bg-[length:200%_100%] animate-shimmer rounded-lg" />
                  <div className="h-4 w-3/4 bg-gradient-to-r from-gray-100 via-gray-200/70 to-gray-100 bg-[length:200%_100%] animate-shimmer rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
