"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { SkeletonProfile } from "@/components/skeleton";
import {
  Camera,
  User,
  Heart,
  Sparkles,
  HandHeart,
  Clock,
  Shield,
  Quote,
  BadgeCheck,
  ChevronLeft,
  Eye,
  EyeOff,
  Save,
  CheckCircle2,
  AlertCircle,
  X,
  Music,
  MessageCircle,
  Video,
  Phone,
  MessageSquare,
  Users,
  MapPin,
  TrendingUp,
  Activity,
  Info,
  Calendar,
} from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { IconRenderer } from "@/components/ui/IconRenderer";
import { cn, getFullImageUrl } from "@/lib/utils";
import {
  type UserProfile,
  emptyProfile,
  ageRangeOptions,
  languageOptionsList,
  pronounOptions,
  vibeTags,
  helpCategories,
  availabilityOptions,
  aboutMePrompts,
  calculateWarmth,
  warmthLabel,
} from "@/data/profileEditor";

/* ═══════════════════════════════════════════════════════
   Edit Profile — Your Digital Self, Not a Job Listing
   ═══════════════════════════════════════════════════════ */

const STORAGE_KEY = "hb_profile_draft";

// ── Autosave hook ──
function useAutosave(profile: UserProfile) {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
        setLastSaved(new Date());
      } catch {
        // storage full — silent fail
      }
    }, 800);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [profile]);

  return lastSaved;
}

// ── Section wrapper ──
function Section({
  id,
  icon: Icon,
  number,
  title,
  subtitle,
  children,
}: {
  id: string;
  icon: React.ElementType;
  number: number;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28">
      <FadeIn>
        <div className="bg-card border border-border rounded-3xl p-6 md:p-8 shadow-soft">
          <div className="flex items-start gap-4 mb-6">
            <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-primary/10 text-primary shrink-0">
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-0.5">
                Step {number}
              </p>
              <h2 className="text-xl md:text-2xl font-bold text-foreground">
                {title}
              </h2>
              {subtitle && (
                <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
              )}
            </div>
          </div>
          {children}
        </div>
      </FadeIn>
    </section>
  );
}

// ── Chip selector ──
function ChipSelect({
  options,
  selected,
  onToggle,
  max,
}: {
  options: { label: string; iconName: string; desc?: string }[];
  selected: string[];
  onToggle: (label: string) => void;
  max?: number;
}) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {options.map((opt) => {
        const isSelected = selected.includes(opt.label);
        const isDisabled = max !== undefined && !isSelected && selected.length >= max;
        return (
          <button
            key={opt.label}
            type="button"
            onClick={() => !isDisabled && onToggle(opt.label)}
            disabled={isDisabled}
            title={opt.desc}
            className={cn(
              "inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-medium border transition-all",
              isSelected
                ? "bg-primary/10 border-primary/30 text-primary ring-1 ring-primary/20"
                : "bg-muted border-border text-muted-foreground hover:border-primary/20 hover:text-foreground",
              isDisabled && "opacity-40 cursor-not-allowed"
            )}
          >
            <IconRenderer name={opt.iconName} className="w-4 h-4" strokeWidth={2} />
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

// ── Toggle pill ──
function TogglePill({
  label,
  icon: Icon,
  value,
  onChange,
}: {
  label: string;
  icon: React.ElementType;
  value: boolean | null;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3 px-1">
      <div className="flex items-center gap-3">
        <Icon className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm font-medium text-foreground">{label}</span>
      </div>
      <div className="flex gap-1.5">
        <button
          type="button"
          onClick={() => onChange(true)}
          className={cn(
            "px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all",
            value === true
              ? "bg-emerald-50 border-emerald-300 text-emerald-700"
              : "bg-muted border-border text-muted-foreground hover:border-emerald-200"
          )}
        >
          Yes
        </button>
        <button
          type="button"
          onClick={() => onChange(false)}
          className={cn(
            "px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all",
            value === false
              ? "bg-rose-50 border-rose-300 text-rose-700"
              : "bg-muted border-border text-muted-foreground hover:border-rose-200"
          )}
        >
          No
        </button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   LIVE PREVIEW PANEL
   ══════════════════════════════════════════ */
function LivePreview({
  profile,
  warmth,
  onClose,
  isMobile,
}: {
  profile: UserProfile;
  warmth: number;
  onClose?: () => void;
  isMobile?: boolean;
}) {
  const wl = warmthLabel(warmth);

  return (
    <div
      className={cn(
        "bg-card border border-border rounded-3xl overflow-hidden",
        isMobile ? "w-full" : "w-full"
      )}
    >
      {/* Header */}
      <div className="bg-gradient-to-br from-primary/5 to-secondary/5 p-6 pb-8 text-center relative">
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4" />
          </button>
        )}
        {/* Photo */}
        <div className="w-20 h-20 rounded-full bg-muted border-4 border-card mx-auto mb-3 overflow-hidden flex items-center justify-center">
          {profile.photoUrl ? (
            <img
              src={getFullImageUrl(profile.photoUrl)}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <User className="w-8 h-8 text-muted-foreground" />
          )}
        </div>
        <h3 className="text-lg font-bold text-foreground">
          {profile.displayName || "Your Name"}
        </h3>
        <div className="flex items-center justify-center gap-2 mt-1 text-sm text-muted-foreground">
          {(profile.city || profile.state) && (
            <span>
              {profile.city}
              {profile.city && profile.state ? `, ${profile.state}` : profile.state}
            </span>
          )}
          {(profile.city || profile.state) && profile.ageRange && <span>·</span>}
          {profile.ageRange && <span>{profile.ageRange}</span>}
          {profile.pronouns && (
            <>
              <span>·</span>
              <span>{profile.pronouns}</span>
            </>
          )}
        </div>
        {profile.idVerified && (
          <div className="flex items-center justify-center gap-1 text-xs text-emerald-600 font-bold mt-2">
            <BadgeCheck className="w-3.5 h-3.5" /> Verified
          </div>
        )}
      </div>

      <div className="p-5 space-y-5">
        {/* Warmth meter */}
        <div className="text-center">
          <div className="w-full h-2 rounded-full bg-muted overflow-hidden mb-2">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-primary transition-all duration-700 ease-out"
              style={{ width: `${warmth}%` }}
            />
          </div>
          <p className="text-xs font-bold">
            <span className="text-muted-foreground">Profile warmth:</span>{" "}
            <span className={wl.color}>
              {warmth}% — {wl.text}
            </span>
          </p>
        </div>

        {/* Vibes */}
        {profile.vibes.length > 0 && (
          <div>
            <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-2">
              Vibe
            </p>
            <div className="flex flex-wrap gap-1.5">
              {profile.vibes.map((v) => {
                const tag = vibeTags.find((t) => t.label === v);
                return (
                  <span
                    key={v}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/8 text-primary text-[11px] font-bold border border-primary/10"
                  >
                    {tag?.iconName && <IconRenderer name={tag.iconName} className="w-3 h-3" strokeWidth={2.5} />}
                    {v}
                  </span>
                );
              })}
            </div>
          </div>
        )}

        {/* About */}
        {profile.aboutMe.trim() && (
          <div>
            <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-2">
              About
            </p>
            <p className="text-sm text-foreground leading-relaxed line-clamp-4">
              {profile.aboutMe}
            </p>
          </div>
        )}

        {/* Help with */}
        {profile.helpWith.length > 0 && (
          <div>
            <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-2">
              Can help with
            </p>
            <div className="flex flex-wrap gap-1.5">
              {profile.helpWith.map((h) => {
                const cat = helpCategories.find((c) => c.label === h);
                return (
                  <span
                    key={h}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-muted text-muted-foreground text-[11px] font-bold border border-border"
                  >
                    {cat?.iconName && <IconRenderer name={cat.iconName} className="w-3 h-3" strokeWidth={2.5} />}
                    {h}
                  </span>
                );
              })}
            </div>
          </div>
        )}

        {/* Availability */}
        {profile.availability.length > 0 && (
          <div>
            <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-2">
              Available
            </p>
            <div className="flex flex-wrap gap-1.5">
              {profile.availability.map((a) => {
                const opt = availabilityOptions.find((o) => o.label === a);
                return (
                  <span
                    key={a}
                    className="text-[11px] font-bold text-muted-foreground flex items-center gap-1.5"
                  >
                    {opt?.iconName && <IconRenderer name={opt.iconName} className="w-3 h-3" strokeWidth={2.5} />}
                    {a}
                  </span>
                );
              })}
            </div>
          </div>
        )}

        {/* Comfort icons */}
        <div className="flex items-center gap-3 text-muted-foreground">
          {profile.comfortVideo === true && (
            <div className="flex items-center gap-1 text-xs">
              <Video className="w-3.5 h-3.5" /> Video
            </div>
          )}
          {profile.comfortVoice === true && (
            <div className="flex items-center gap-1 text-xs">
              <Phone className="w-3.5 h-3.5" /> Voice
            </div>
          )}
          {profile.comfortChatOnly === true && (
            <div className="flex items-center gap-1 text-xs">
              <MessageSquare className="w-3.5 h-3.5" /> Chat
            </div>
          )}
        </div>

        {/* Pricing */}
        {(profile.sessionRangeMin > 0 || profile.sessionRangeMax > 0) && (
          <div className="bg-muted rounded-2xl p-3 text-center">
            <p className="text-xs text-muted-foreground mb-1">
              Support Appreciation
            </p>
            <p className="text-lg font-bold text-foreground">
              ₹{profile.sessionRangeMin || "–"} — ₹
              {profile.sessionRangeMax || "–"}
            </p>
            {profile.freeFirst5Min && (
              <p className="text-xs text-emerald-600 font-bold mt-1 flex items-center justify-center gap-1">
                <Heart className="w-3 h-3 fill-emerald-600/10" />
                First 5 min free
              </p>
            )}
          </div>
        )}

        {/* Personal touch */}
        {profile.favoriteQuote.trim() && (
          <div className="border-l-2 border-primary/30 pl-3">
            <p className="text-xs italic text-muted-foreground leading-relaxed">
              &ldquo;{profile.favoriteQuote}&rdquo;
            </p>
          </div>
        )}

        {profile.nervousMessage.trim() && (
          <div className="bg-amber-50/60 dark:bg-amber-900/10 rounded-2xl p-3">
            <p className="text-xs text-muted-foreground mb-1 font-bold">
              If you&apos;re nervous to talk:
            </p>
            <p className="text-sm text-foreground leading-relaxed">
              {profile.nervousMessage}
            </p>
          </div>
        )}

        {/* Languages */}
        {profile.languages.length > 0 && (
          <p className="text-[11px] font-bold text-muted-foreground flex items-center gap-1.5">
            <IconRenderer name="Languages" className="w-3.5 h-3.5" />
            {profile.languages.join(", ")}
          </p>
        )}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   MAIN PAGE
   ══════════════════════════════════════════ */
export default function EditProfilePage() {
  const [profile, setProfile] = useState<UserProfile>(emptyProfile);
  const [showPreview, setShowPreview] = useState(false);
  const [promptIndex, setPromptIndex] = useState(0);
  const [hydrated, setHydrated] = useState(false);
  const [saveFlash, setSaveFlash] = useState(false);
  const lastSaved = useAutosave(profile);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Hydrate draft from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Partial<UserProfile>;
        setProfile((prev) => ({ ...prev, ...parsed }));
      }
    } catch {
      // corrupt data — start fresh
    }
    setHydrated(true);
  }, []);

  // Rotate about-me placeholder prompt
  useEffect(() => {
    const interval = setInterval(() => {
      setPromptIndex((i) => (i + 1) % aboutMePrompts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Helpers
  const update = useCallback(
    <K extends keyof UserProfile>(key: K, value: UserProfile[K]) => {
      setProfile((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const toggleInArray = useCallback(
    (key: "vibes" | "helpWith" | "availability" | "languages", item: string, max?: number) => {
      setProfile((prev) => {
        const arr = prev[key] as string[];
        if (arr.includes(item)) {
          return { ...prev, [key]: arr.filter((x) => x !== item) };
        }
        if (max !== undefined && arr.length >= max) return prev;
        return { ...prev, [key]: [...arr, item] };
      });
    },
    []
  );

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result;
      if (typeof result === "string") {
        update("photoUrl", result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveDraft = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
      setSaveFlash(true);
      setTimeout(() => setSaveFlash(false), 2000);
    } catch {
      // silent
    }
  };

  const [isLocating, setIsLocating] = useState(false);

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          // Using Nominatim for free reverse geocoding
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();
          const addr = data.address;
          
          if (addr) {
            update("city", addr.city || addr.town || addr.village || "");
            update("district", addr.state_district || addr.county || addr.suburb || "");
            update("state", addr.state || "");
            update("pincode", addr.postcode || "");
          }
        } catch (error) {
          console.error("Error fetching location:", error);
          alert("Could not fetch address details. Please enter manually.");
        } finally {
          setIsLocating(false);
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        alert("Location access denied or unavailable.");
        setIsLocating(false);
      },
      { enableHighAccuracy: true }
    );
  };

  const warmth = calculateWarmth(profile);
  const wl = warmthLabel(warmth);
  const aboutLen = profile.aboutMe.trim().length;

  if (!hydrated) {
    return (
      <div className="min-h-screen bg-section">
        <SkeletonProfile />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-section">
      {/* ── Sticky top bar ── */}
      <div className="sticky top-20 z-40 bg-card/80 backdrop-blur-lg border-b border-border">
        <div className="container-custom flex items-center justify-between h-14 gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/buddies"
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back</span>
            </Link>
            <div className="w-px h-5 bg-border" />
            <h1 className="text-sm md:text-base font-bold text-foreground">
              Edit Your Profile
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {/* Warmth badge */}
            <div className="hidden sm:flex items-center gap-2 bg-muted px-3 py-1.5 rounded-full">
              <div className="w-16 h-1.5 rounded-full bg-border overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-amber-400 to-primary transition-all duration-500"
                  style={{ width: `${warmth}%` }}
                />
              </div>
              <span className={cn("text-xs font-bold", wl.color)}>
                {warmth}%
              </span>
            </div>

            {/* Preview toggle (mobile) */}
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPreview ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
              Preview
            </button>

            {/* Save draft */}
            <button
              onClick={handleSaveDraft}
              className={cn(
                "flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold transition-all",
                saveFlash
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-300"
                  : "bg-foreground text-card border border-transparent hover:opacity-90"
              )}
            >
              {saveFlash ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  Saved!
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Draft
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Autosave indicator */}
      {lastSaved && (
        <div className="container-custom">
          <p className="text-[11px] text-muted-foreground text-right pt-2">
            Auto-saved {lastSaved.toLocaleTimeString()}
          </p>
        </div>
      )}

      {/* ── Mobile preview overlay ── */}
      {showPreview && (
        <div className="lg:hidden fixed inset-0 z-50 bg-background/80 backdrop-blur-sm overflow-y-auto p-4 pt-20">
          <LivePreview
            profile={profile}
            warmth={warmth}
            onClose={() => setShowPreview(false)}
            isMobile
          />
        </div>
      )}

      {/* ── Main layout: form + sidebar preview ── */}
      <div className="container-custom py-8">
        <div className="flex gap-8 items-start">
          {/* LEFT — Form */}
          <div className="flex-1 min-w-0 space-y-6 max-w-2xl">
            <Section
              id="identity"
              icon={User}
              number={1}
              title="Identity & Location"
              subtitle="Help people feel safer when they know who they're talking to."
            >
              {/* Photo upload */}
              <div className="flex flex-col sm:flex-row items-start gap-6 mb-6">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="relative group w-28 h-28 rounded-3xl bg-muted border-2 border-dashed border-border hover:border-primary/40 transition-all overflow-hidden shrink-0 flex items-center justify-center"
                >
                  {profile.photoUrl ? (
                    <img
                      src={getFullImageUrl(profile.photoUrl)}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center">
                      <Camera className="w-6 h-6 text-muted-foreground mx-auto mb-1" />
                      <span className="text-[11px] text-muted-foreground font-medium">
                        Add photo
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-3xl">
                    <Camera className="w-5 h-5 text-white" />
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handlePhotoUpload}
                  />
                </button>

                <div className="flex-1 w-full space-y-3">
                  {/* Display name */}
                  <div>
                    <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5">
                      Display name *
                    </label>
                    <input
                      type="text"
                      value={profile.displayName}
                      onChange={(e) => update("displayName", e.target.value)}
                      placeholder="What should people call you?"
                      className="w-full bg-muted border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
                    />
                  </div>

                  <div className="space-y-4">
                    {/* City + Get Location Button */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-1">
                        <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5">
                          City
                        </label>
                        <input
                          type="text"
                          value={profile.city}
                          onChange={(e) => update("city", e.target.value)}
                          placeholder="E.g. Mumbai"
                          className="w-full bg-muted border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all font-medium"
                        />
                      </div>
                      <div className="flex items-end">
                        <button
                          type="button"
                          onClick={getCurrentLocation}
                          disabled={isLocating}
                          className={cn(
                            "flex items-center gap-2 px-4 py-3 rounded-xl border border-dashed text-sm font-bold transition-all w-full sm:w-auto",
                            isLocating 
                              ? "bg-primary/5 border-primary/30 text-primary opacity-70 cursor-not-allowed"
                              : "border-border text-muted-foreground hover:border-primary/40 hover:text-primary hover:bg-primary/5"
                          )}
                        >
                          {isLocating ? (
                            <span className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                          ) : (
                            <MapPin className="w-4 h-4" />
                          )}
                          {isLocating ? "Locating..." : "Use current location"}
                        </button>
                      </div>
                    </div>

                    {/* State + District + Pin Code Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5">
                          District
                        </label>
                        <input
                          type="text"
                          value={profile.district}
                          onChange={(e) => update("district", e.target.value)}
                          placeholder="District"
                          className="w-full bg-muted border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5">
                          State
                        </label>
                        <input
                          type="text"
                          value={profile.state}
                          onChange={(e) => update("state", e.target.value)}
                          placeholder="State"
                          className="w-full bg-muted border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5">
                          Pin Code
                        </label>
                        <input
                          type="text"
                          value={profile.pincode}
                          onChange={(e) => update("pincode", e.target.value)}
                          placeholder="Pincode"
                          className="w-full bg-muted border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all font-medium"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Age range + Pronouns row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                <div>
                  <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5">
                    Age range{" "}
                    <span className="font-normal normal-case text-muted-foreground/60">
                      (optional)
                    </span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {ageRangeOptions.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() =>
                          update("ageRange", profile.ageRange === opt ? "" : opt)
                        }
                        className={cn(
                          "px-3 py-1.5 rounded-xl text-xs font-medium border transition-all",
                          profile.ageRange === opt
                            ? "bg-primary/10 border-primary/30 text-primary"
                            : "bg-muted border-border text-muted-foreground hover:border-primary/20"
                        )}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5">
                    Pronouns{" "}
                    <span className="font-normal normal-case text-muted-foreground/60">
                      (optional)
                    </span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {pronounOptions.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() =>
                          update("pronouns", profile.pronouns === opt ? "" : opt)
                        }
                        className={cn(
                          "px-3 py-1.5 rounded-xl text-xs font-medium border transition-all",
                          profile.pronouns === opt
                            ? "bg-primary/10 border-primary/30 text-primary"
                            : "bg-muted border-border text-muted-foreground hover:border-primary/20"
                        )}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Languages */}
              <div>
                <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5">
                  Languages you speak
                </label>
                <div className="flex flex-wrap gap-2">
                  {languageOptionsList.map((lang) => {
                    const isSelected = profile.languages.includes(lang);
                    return (
                      <button
                        key={lang}
                        type="button"
                        onClick={() => toggleInArray("languages", lang)}
                        className={cn(
                          "px-3 py-1.5 rounded-xl text-xs font-medium border transition-all",
                          isSelected
                            ? "bg-primary/10 border-primary/30 text-primary"
                            : "bg-muted border-border text-muted-foreground hover:border-primary/20"
                        )}
                      >
                        {lang}
                      </button>
                    );
                  })}
                </div>
              </div>
            </Section>

            {/* ────────────────────────────────
               SECTION 2 — ABOUT ME
               ──────────────────────────────── */}
            <Section
              id="about"
              icon={Heart}
              number={2}
              title="Your Story"
              subtitle="This is the heart of your profile. Let people know the real you."
            >
              <div className="relative">
                <textarea
                  value={profile.aboutMe}
                  onChange={(e) => update("aboutMe", e.target.value)}
                  placeholder={aboutMePrompts[promptIndex]}
                  rows={6}
                  className="w-full bg-muted border border-border rounded-2xl px-5 py-4 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all resize-none leading-relaxed"
                />
                <div className="flex items-center justify-between mt-2 px-1">
                  <div className="flex items-center gap-2 text-xs">
                    {aboutLen > 0 && aboutLen < 50 && (
                      <span className="flex items-center gap-1 text-amber-600">
                        <AlertCircle className="w-3 h-3" />
                        A little more would help people connect with you
                      </span>
                    )}
                    {aboutLen >= 50 && aboutLen < 120 && (
                      <span className="flex items-center gap-1 text-yellow-600">
                        <Sparkles className="w-3 h-3" />
                        Looking good! A few more lines would make it shine
                      </span>
                    )}
                    {aboutLen >= 120 && (
                      <span className="flex items-center gap-1 text-emerald-600">
                        <CheckCircle2 className="w-3 h-3" />
                        Beautiful. People will feel like they know you already
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground tabular-nums">
                    {aboutLen}
                  </span>
                </div>
              </div>

              <div className="mt-4 bg-muted/50 rounded-2xl p-4">
                <p className="text-xs text-muted-foreground font-medium mb-2">
                  💡 Try weaving in:
                </p>
                <ul className="space-y-1 text-xs text-muted-foreground">
                  <li>• How would your friends describe you?</li>
                  <li>• What kind of conversations do you enjoy?</li>
                  <li>• When someone talks to you, what can they expect?</li>
                </ul>
              </div>
            </Section>

            {/* ────────────────────────────────
               SECTION 3 — VIBE SELECTOR
               ──────────────────────────────── */}
            <Section
              id="vibes"
              icon={Sparkles}
              number={3}
              title="Your Vibe"
              subtitle="Pick up to 5 tags that describe your energy. These show as soft chips on your profile."
            >
              <ChipSelect
                options={vibeTags}
                selected={profile.vibes}
                onToggle={(v) => toggleInArray("vibes", v, 5)}
                max={5}
              />
              <p className="text-xs text-muted-foreground mt-3">
                {profile.vibes.length}/5 selected
              </p>
            </Section>

            {/* ────────────────────────────────
               SECTION 4 — WHAT YOU CAN HELP WITH
               ──────────────────────────────── */}
            <Section
              id="helpwith"
              icon={HandHeart}
              number={4}
              title="What You Can Help With"
              subtitle="Select the situations where you can be there for someone."
            >
              <ChipSelect
                options={helpCategories}
                selected={profile.helpWith}
                onToggle={(h) => toggleInArray("helpWith", h)}
              />
            </Section>

            {/* ────────────────────────────────
               SECTION 5 — AVAILABILITY STYLE
               ──────────────────────────────── */}
            <Section
              id="availability"
              icon={Clock}
              number={5}
              title="When Are You Around?"
              subtitle="Let people know when you're most likely available. No strict schedules — just your vibe."
            >
              <div className="space-y-2">
                {availabilityOptions.map((opt) => {
                  const isSelected = profile.availability.includes(opt.label);
                  return (
                    <button
                      key={opt.label}
                      type="button"
                      onClick={() => toggleInArray("availability", opt.label)}
                      className={cn(
                        "w-full flex items-center gap-4 px-5 py-4 rounded-2xl border text-left transition-all",
                        isSelected
                          ? "bg-primary/5 border-primary/30 ring-1 ring-primary/10"
                          : "bg-muted border-border hover:border-primary/20"
                      )}
                    >
                      <IconRenderer name={opt.iconName} className="w-5 h-5" strokeWidth={2} />
                      <div>
                        <p
                          className={cn(
                            "text-sm font-semibold",
                            isSelected
                              ? "text-primary"
                              : "text-foreground"
                          )}
                        >
                          {opt.label}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {opt.desc}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </Section>

            {/* ────────────────────────────────
               SECTION 6 — COMFORT SETTINGS
               ──────────────────────────────── */}
            <Section
              id="comfort"
              icon={Shield}
              number={6}
              title="Comfort Settings"
              subtitle="Set boundaries so people know what to expect. This builds trust."
            >
              <div className="divide-y divide-border">
                <TogglePill
                  label="Comfortable with video calls"
                  icon={Video}
                  value={profile.comfortVideo}
                  onChange={(v) => update("comfortVideo", v)}
                />
                <TogglePill
                  label="Voice calls preferred"
                  icon={Phone}
                  value={profile.comfortVoice}
                  onChange={(v) => update("comfortVoice", v)}
                />
                <TogglePill
                  label="Chat only option"
                  icon={MessageSquare}
                  value={profile.comfortChatOnly}
                  onChange={(v) => update("comfortChatOnly", v)}
                />
              </div>

              <div className="mt-5 flex items-center justify-between gap-4 bg-muted rounded-2xl px-5 py-4">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      Same-gender connections only
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Optional safety preference
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    update("sameGenderOnly", !profile.sameGenderOnly)
                  }
                  className={cn(
                    "relative w-11 h-6 rounded-full transition-colors",
                    profile.sameGenderOnly ? "bg-primary" : "bg-border"
                  )}
                >
                  <span
                    className={cn(
                      "absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform",
                      profile.sameGenderOnly && "translate-x-5"
                    )}
                  />
                </button>
              </div>
            </Section>

            {/* ────────────────────────────────
               SECTION 7 — SUPPORT APPRECIATION
               ──────────────────────────────── */}
            <Section
              id="pricing"
              icon={Heart}
              number={7}
              title="Support Appreciation"
              subtitle="This is not a fee. It's an appreciation for your time and presence."
            >
              <div className="grid grid-cols-2 gap-4 mb-5">
                <div>
                  <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5">
                    From (₹)
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={profile.sessionRangeMin || ""}
                    onChange={(e) =>
                      update("sessionRangeMin", parseInt(e.target.value) || 0)
                    }
                    placeholder="100"
                    className="w-full bg-muted border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5">
                    To (₹)
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={profile.sessionRangeMax || ""}
                    onChange={(e) =>
                      update("sessionRangeMax", parseInt(e.target.value) || 0)
                    }
                    placeholder="500"
                    className="w-full bg-muted border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between gap-4 bg-muted rounded-2xl px-5 py-4">
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      Free first 5 minutes
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Let people feel comfortable before committing
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      update("freeFirst5Min", !profile.freeFirst5Min)
                    }
                    className={cn(
                      "relative w-11 h-6 rounded-full transition-colors shrink-0",
                      profile.freeFirst5Min ? "bg-emerald-500" : "bg-border"
                    )}
                  >
                    <span
                      className={cn(
                        "absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform",
                        profile.freeFirst5Min && "translate-x-5"
                      )}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between gap-4 bg-muted rounded-2xl px-5 py-4">
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      Open to low-budget users
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Show your profile to people who can&apos;t afford premium
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      update("openToLowBudget", !profile.openToLowBudget)
                    }
                    className={cn(
                      "relative w-11 h-6 rounded-full transition-colors shrink-0",
                      profile.openToLowBudget ? "bg-emerald-500" : "bg-border"
                    )}
                  >
                    <span
                      className={cn(
                        "absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform",
                        profile.openToLowBudget && "translate-x-5"
                      )}
                    />
                  </button>
                </div>
              </div>

              <p className="text-xs text-muted-foreground italic mt-4 text-center flex items-center justify-center gap-1.5">
                <Heart className="w-3 h-3 text-primary/60" />
                This is not a fee. It&apos;s an appreciation for your time.
              </p>
            </Section>

            {/* ────────────────────────────────
               SECTION 8 — PERSONAL TOUCH
               ──────────────────────────────── */}
            <Section
              id="personal"
              icon={Quote}
              number={8}
              title="Personal Touch"
              subtitle="Optional — but these make profiles unforgettable."
            >
              <div className="space-y-5">
                {/* Favorite quote */}
                <div>
                  <label className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5">
                    <Quote className="w-3.5 h-3.5" /> Favorite quote
                  </label>
                  <input
                    type="text"
                    value={profile.favoriteQuote}
                    onChange={(e) => update("favoriteQuote", e.target.value)}
                    placeholder="A line that stays with you..."
                    className="w-full bg-muted border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
                  />
                </div>

                {/* One thing you truly care about */}
                <div>
                  <label className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5">
                    <Heart className="w-3.5 h-3.5" /> One thing you truly care
                    about
                  </label>
                  <input
                    type="text"
                    value={profile.oneTrulyCareAbout}
                    onChange={(e) =>
                      update("oneTrulyCareAbout", e.target.value)
                    }
                    placeholder="Mental health, animals, kindness..."
                    className="w-full bg-muted border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
                  />
                </div>

                {/* Song that defines you */}
                <div>
                  <label className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5">
                    <Music className="w-3.5 h-3.5" /> A song that defines you
                  </label>
                  <input
                    type="text"
                    value={profile.songThatDefinesYou}
                    onChange={(e) =>
                      update("songThatDefinesYou", e.target.value)
                    }
                    placeholder="That one song on repeat..."
                    className="w-full bg-muted border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
                  />
                </div>

                {/* Nervous message */}
                <div>
                  <label className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5">
                    <MessageCircle className="w-3.5 h-3.5" /> If someone is
                    nervous to talk, tell them this...
                  </label>
                  <textarea
                    value={profile.nervousMessage}
                    onChange={(e) => update("nervousMessage", e.target.value)}
                    placeholder="Hey, no pressure at all. Let's just talk like friends..."
                    rows={3}
                    className="w-full bg-muted border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all resize-none"
                  />
                </div>
              </div>
            </Section>

            {/* ────────────────────────────────
               SECTION 9 — TRUST LAYER
               ──────────────────────────────── */}
            <Section
              id="trust"
              icon={BadgeCheck}
              number={9}
              title="Trust Layer"
              subtitle="People trust complete profiles more."
            >
              {/* Warmth meter */}
              <div className="bg-muted rounded-2xl p-6 mb-5">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-bold text-foreground">
                    Your profile warmth
                  </p>
                  <span className={cn("text-lg font-bold", wl.color)}>
                    {warmth}%
                  </span>
                </div>
                <div className="w-full h-3 rounded-full bg-border overflow-hidden mb-2">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-primary transition-all duration-700 ease-out"
                    style={{ width: `${warmth}%` }}
                  />
                </div>
                <p className={cn("text-sm font-semibold", wl.color)}>
                  {wl.text}
                </p>
                {warmth < 70 && (
                  <p className="text-xs text-muted-foreground mt-2">
                    Profiles with 70%+ warmth get 3× more connections. Keep
                    going!
                  </p>
                )}
              </div>

              {/* Completion hints */}
              <div className="space-y-2">
                {[
                  {
                    done: !!profile.photoUrl,
                    label: "Add a friendly photo",
                    points: "+8%",
                  },
                  {
                    done: !!profile.displayName.trim(),
                    label: "Set your display name",
                    points: "+4%",
                  },
                  {
                    done: profile.aboutMe.trim().length >= 120,
                    label: "Write a heartfelt About Me (120+ chars)",
                    points: "+25%",
                  },
                  {
                    done: profile.vibes.length >= 3,
                    label: "Pick at least 3 vibe tags",
                    points: "+6%",
                  },
                  {
                    done: profile.helpWith.length >= 2,
                    label: "Select 2+ situations you can help with",
                    points: "+4%",
                  },
                  {
                    done: profile.availability.length > 0,
                    label: "Set your availability",
                    points: "+5%",
                  },
                  {
                    done: !!profile.nervousMessage.trim(),
                    label: "Add a calming nervous message",
                    points: "+4%",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-3 text-sm"
                  >
                    {item.done ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border-2 border-border shrink-0" />
                    )}
                    <span
                      className={cn(
                        item.done
                          ? "text-muted-foreground line-through"
                          : "text-foreground"
                      )}
                    >
                      {item.label}
                    </span>
                    {!item.done && (
                      <span className="text-xs text-primary font-bold ml-auto">
                        {item.points}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* ID verification badge */}
              <div className="mt-6 bg-emerald-50/50 dark:bg-emerald-900/10 border border-emerald-200/50 dark:border-emerald-800/30 rounded-2xl p-5 flex items-start gap-4">
                <BadgeCheck className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-foreground">
                    ID Verification
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {profile.idVerified
                      ? "Your identity is verified. People can see the trusted badge on your profile."
                      : "Verified profiles get 5× more trust. Submit your ID for a verification badge."}
                  </p>
                  {!profile.idVerified && (
                    <button className="mt-3 text-xs font-bold text-primary hover:underline">
                      Start verification →
                    </button>
                  )}
                </div>
              </div>
            </Section>

            {/* ── Bottom safe-space message ── */}
            <div className="text-center py-8">
              <p className="text-sm text-muted-foreground italic flex items-center justify-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-primary/40" />
                This is a safe space. Your profile is your story — not a
                resume.
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                &ldquo;Yeh meri listing nahi hai. Yeh mera digital version
                hai.&rdquo;
              </p>
            </div>
          </div>

          {/* RIGHT — Desktop live preview */}
          <div className="hidden lg:block w-[300px] xl:w-[340px] shrink-0 sticky top-36">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 px-1">
              Live Preview
            </p>
            <LivePreview profile={profile} warmth={warmth} />
          </div>
        </div>
      </div>
    </div>
  );
}
