"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { SkeletonProfile } from "@/components/skeleton";
import {
  User,
  Pencil,
  MapPin,
  BadgeCheck,
  Video,
  Phone,
  MessageSquare,
  Music,
  Heart,
  Quote,
  MessageCircle,
  Shield,
  Lock,
  Mail,
  Smartphone,
  CalendarDays,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  Clock,
  X,
  RefreshCw,
  ChevronRight,
} from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { IconRenderer } from "@/components/ui/IconRenderer";
import { cn, getFullImageUrl } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import {
  type UserProfile,
  emptyProfile,
  vibeTags,
  helpCategories,
  availabilityOptions,
  calculateWarmth,
  warmthLabel,
} from "@/data/profileEditor";

/* ═══════════════════════════════════════════════════════════
   /profile — Identity Hub: Warmth + Trust
   Left = Public Profile Preview
   Right = Private Account Controls
   ═══════════════════════════════════════════════════════════ */

const STORAGE_KEY = "hb_profile_draft";

// ── Toast component ──
function Toast({
  message,
  type = "success",
  onDismiss,
}: {
  message: string;
  type?: "success" | "error";
  onDismiss: () => void;
}) {
  useEffect(() => {
    const t = setTimeout(onDismiss, 4000);
    return () => clearTimeout(t);
  }, [onDismiss]);

  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 z-[100] flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-lg border text-sm font-medium animate-in slide-in-from-bottom-4 fade-in duration-300",
        type === "success"
          ? "bg-emerald-50 border-emerald-200 text-emerald-800"
          : "bg-rose-50 border-rose-200 text-rose-800"
      )}
    >
      {type === "success" ? (
        <CheckCircle2 className="w-4 h-4 shrink-0" />
      ) : (
        <AlertCircle className="w-4 h-4 shrink-0" />
      )}
      {message}
      <button
        onClick={onDismiss}
        className="ml-2 opacity-60 hover:opacity-100 transition-opacity"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

// ── Password strength meter ──
function PasswordStrength({ password }: { password: string }) {
  const getStrength = (pw: string) => {
    let score = 0;
    if (pw.length >= 8) score++;
    if (pw.length >= 12) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    return score;
  };

  const strength = getStrength(password);
  const labels = ["", "Weak", "Fair", "Good", "Strong", "Very strong"];
  const colors = [
    "bg-border",
    "bg-rose-400",
    "bg-amber-400",
    "bg-yellow-400",
    "bg-emerald-400",
    "bg-emerald-500",
  ];

  if (!password) return null;

  return (
    <div className="mt-2">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className={cn(
              "h-1 flex-1 rounded-full transition-all duration-300",
              i <= strength ? colors[strength] : "bg-border"
            )}
          />
        ))}
      </div>
      <p
        className={cn(
          "text-[11px] mt-1 font-medium",
          strength <= 1
            ? "text-rose-500"
            : strength <= 2
              ? "text-amber-500"
              : "text-emerald-500"
        )}
      >
        {labels[strength]}
      </p>
    </div>
  );
}

// ── OTP Input ──
function OtpInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, char: string) => {
    if (!/^[0-9]?$/.test(char)) return;
    const arr = value.split("");
    arr[index] = char;
    const newVal = arr.join("").slice(0, 6);
    onChange(newVal);
    if (char && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex gap-1.5 sm:gap-2 justify-center">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <input
          key={i}
          ref={(el) => { inputRefs.current[i] = el; }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[i] || ""}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          className="w-10 sm:w-11 h-12 sm:h-13 text-center text-base sm:text-lg font-bold bg-muted border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
        />
      ))}
    </div>
  );
}

// ── Countdown timer hook ──
function useCountdown(initialSeconds: number) {
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const start = useCallback(() => {
    setSeconds(initialSeconds);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [initialSeconds]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return { seconds, start, isActive: seconds > 0 };
}

/* ══════════════════════════════════════════════
   PUBLIC PROFILE PREVIEW — Left Side
   ══════════════════════════════════════════════ */
function ProfilePreview({
  profile,
  warmth,
  user,
}: {
  profile: UserProfile;
  warmth: number;
  user: { name: string; email: string; phone?: string } | null;
}) {
  const wl = warmthLabel(warmth);
  const displayName = profile.displayName || user?.name || "Your Name";
  const isEmpty =
    !profile.photoUrl &&
    !profile.aboutMe.trim() &&
    profile.vibes.length === 0;

  return (
    <div className="space-y-6">
      {/* ── Hero card ── */}
      <FadeIn>
        <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-soft">
          {/* Cover gradient */}
          <div className="h-28 bg-gradient-to-br from-primary/10 via-secondary/5 to-primary/5 relative">
            <div className="absolute -bottom-12 left-6">
              <div className="w-24 h-24 rounded-3xl bg-muted border-4 border-card overflow-hidden flex items-center justify-center shadow-soft">
                {profile.photoUrl ? (
                  <img
                    src={getFullImageUrl(profile.photoUrl)}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-10 h-10 text-muted-foreground" />
                )}
              </div>
            </div>
          </div>

          <div className="pt-16 px-6 pb-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                  {displayName}
                  {profile.idVerified && (
                    <BadgeCheck className="w-5 h-5 text-emerald-500" />
                  )}
                </h2>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1 flex-wrap">
                  {profile.city && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {profile.city}
                    </span>
                  )}
                  {profile.ageRange && (
                    <>
                      <span>·</span>
                      <span>{profile.ageRange}</span>
                    </>
                  )}
                  {profile.pronouns && (
                    <>
                      <span>·</span>
                      <span>{profile.pronouns}</span>
                    </>
                  )}
                </div>
              </div>
              <Link
                href="/edit-profile"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-foreground text-card text-sm font-bold hover:opacity-90 transition-all shrink-0"
              >
                <Pencil className="w-3.5 h-3.5" />
                Edit
              </Link>
            </div>

            {/* Warmth meter */}
            <div className="mt-5 bg-muted rounded-2xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-muted-foreground">
                  Profile warmth
                </span>
                <span className={cn("text-sm font-bold", wl.color)}>
                  {warmth}% — {wl.text}
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-border overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-primary transition-all duration-700"
                  style={{ width: `${warmth}%` }}
                />
              </div>
              {warmth < 70 && (
                <p className="text-[11px] text-muted-foreground mt-2">
                  Profiles above 70% warmth get 3× more connections.{" "}
                  <Link
                    href="/edit-profile"
                    className="text-primary font-bold hover:underline"
                  >
                    Keep building →
                  </Link>
                </p>
              )}
            </div>
          </div>
        </div>
      </FadeIn>

      {/* ── Empty state ── */}
      {isEmpty && (
        <FadeIn delay={0.1}>
          <div className="bg-card border border-dashed border-border rounded-3xl p-8 text-center">
            <Heart className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-foreground mb-1">
              Your story starts here
            </h3>
            <p className="text-sm text-muted-foreground mb-5 max-w-sm mx-auto">
              Tell people who you are, what you vibe with, and how you can be
              there for someone. This is your space.
            </p>
            <Link
              href="/edit-profile"
              className="inline-flex items-center gap-2 bg-primary text-white font-bold px-6 py-3 rounded-2xl hover:bg-primary/90 transition-all"
            >
              <Pencil className="w-4 h-4" />
              Start building your profile
            </Link>
          </div>
        </FadeIn>
      )}

      {/* ── Vibe tags ── */}
      {profile.vibes.length > 0 && (
        <FadeIn delay={0.1}>
          <div className="bg-card border border-border rounded-3xl p-6 shadow-soft">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">
              Vibe
            </h3>
            <div className="flex flex-wrap gap-2">
              {profile.vibes.map((v) => {
                const tag = vibeTags.find((t) => t.label === v);
                return (
                  <span
                    key={v}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/8 text-primary text-sm font-medium"
                  >
                    {tag?.iconName ? (
                      <IconRenderer name={tag.iconName} className="w-3.5 h-3.5" />
                    ) : null}
                    {v}
                  </span>
                );
              })}
            </div>
          </div>
        </FadeIn>
      )}

      {/* ── About me ── */}
      {profile.aboutMe.trim() && (
        <FadeIn delay={0.15}>
          <div className="bg-card border border-border rounded-3xl p-6 shadow-soft">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">
              About
            </h3>
            <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">
              {profile.aboutMe}
            </p>
          </div>
        </FadeIn>
      )}

      {/* ── What I can help with ── */}
      {profile.helpWith.length > 0 && (
        <FadeIn delay={0.2}>
          <div className="bg-card border border-border rounded-3xl p-6 shadow-soft">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">
              What I can help with
            </h3>
            <div className="flex flex-wrap gap-2">
              {profile.helpWith.map((h) => {
                const cat = helpCategories.find((c) => c.label === h);
                return (
                  <span
                    key={h}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted text-foreground text-sm font-medium"
                  >
                    {cat?.iconName ? (
                      <IconRenderer name={cat.iconName} className="w-3.5 h-3.5" />
                    ) : null}
                    {h}
                  </span>
                );
              })}
            </div>
          </div>
        </FadeIn>
      )}

      {/* ── Availability ── */}
      {profile.availability.length > 0 && (
        <FadeIn delay={0.25}>
          <div className="bg-card border border-border rounded-3xl p-6 shadow-soft">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">
              When I&apos;m around
            </h3>
            <div className="flex flex-wrap gap-2">
              {profile.availability.map((a) => {
                const opt = availabilityOptions.find((o) => o.label === a);
                return (
                  <span
                    key={a}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-muted text-sm font-medium text-foreground"
                  >
                    <span>
                      {opt?.iconName && (
                        <IconRenderer name={opt.iconName} className="w-4 h-4" />
                      )}
                    </span>{" "}
                    {a}
                  </span>
                );
              })}
            </div>
          </div>
        </FadeIn>
      )}

      {/* ── Comfort settings ── */}
      {(profile.comfortVideo !== null ||
        profile.comfortVoice !== null ||
        profile.comfortChatOnly !== null) && (
        <FadeIn delay={0.3}>
          <div className="bg-card border border-border rounded-3xl p-6 shadow-soft">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">
              Comfort zone
            </h3>
            <div className="flex flex-wrap gap-3">
              {profile.comfortVideo === true && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-sm font-medium border border-emerald-200/50">
                  <Video className="w-3.5 h-3.5" /> Video OK
                </span>
              )}
              {profile.comfortVideo === false && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted text-muted-foreground text-sm font-medium">
                  <Video className="w-3.5 h-3.5" /> No video
                </span>
              )}
              {profile.comfortVoice === true && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-sm font-medium border border-emerald-200/50">
                  <Phone className="w-3.5 h-3.5" /> Voice OK
                </span>
              )}
              {profile.comfortVoice === false && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted text-muted-foreground text-sm font-medium">
                  <Phone className="w-3.5 h-3.5" /> No voice
                </span>
              )}
              {profile.comfortChatOnly === true && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-sm font-medium border border-emerald-200/50">
                  <MessageSquare className="w-3.5 h-3.5" /> Chat friendly
                </span>
              )}
            </div>
          </div>
        </FadeIn>
      )}

      {/* ── Support appreciation ── */}
      {(profile.sessionRangeMin > 0 || profile.sessionRangeMax > 0) && (
        <FadeIn delay={0.35}>
          <div className="bg-card border border-border rounded-3xl p-6 shadow-soft text-center">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
              Support Appreciation
            </h3>
            <p className="text-2xl font-bold text-foreground">
              ₹{profile.sessionRangeMin || "–"} — ₹
              {profile.sessionRangeMax || "–"}
            </p>
            <p className="text-xs text-muted-foreground mt-1">per session</p>
            <div className="flex items-center justify-center gap-3 mt-3">
              {profile.freeFirst5Min && (
                <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                  First 5 min free 💛
                </span>
              )}
              {profile.openToLowBudget && (
                <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                  Open to all budgets
                </span>
              )}
            </div>
          </div>
        </FadeIn>
      )}

      {/* ── Personal touches ── */}
      {(profile.favoriteQuote.trim() ||
        profile.oneTrulyCareAbout.trim() ||
        profile.songThatDefinesYou.trim() ||
        profile.nervousMessage.trim()) && (
        <FadeIn delay={0.4}>
          <div className="bg-card border border-border rounded-3xl p-6 shadow-soft space-y-5">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Personal touches
            </h3>

            {profile.favoriteQuote.trim() && (
              <div className="border-l-2 border-primary/30 pl-4">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                  <Quote className="w-3 h-3" /> Favorite quote
                </div>
                <p className="text-sm text-foreground italic leading-relaxed">
                  &ldquo;{profile.favoriteQuote}&rdquo;
                </p>
              </div>
            )}

            {profile.oneTrulyCareAbout.trim() && (
              <div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                  <Heart className="w-3 h-3" /> One thing I truly care about
                </div>
                <p className="text-sm text-foreground leading-relaxed">
                  {profile.oneTrulyCareAbout}
                </p>
              </div>
            )}

            {profile.songThatDefinesYou.trim() && (
              <div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                  <Music className="w-3 h-3" /> A song that defines me
                </div>
                <p className="text-sm text-foreground leading-relaxed">
                  🎵 {profile.songThatDefinesYou}
                </p>
              </div>
            )}

            {profile.nervousMessage.trim() && (
              <div className="bg-amber-50/60 dark:bg-amber-900/10 rounded-2xl p-4">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1.5 font-bold">
                  <MessageCircle className="w-3 h-3" /> If you&apos;re nervous
                  to talk
                </div>
                <p className="text-sm text-foreground leading-relaxed">
                  {profile.nervousMessage}
                </p>
              </div>
            )}
          </div>
        </FadeIn>
      )}

      {/* ── Languages ── */}
      {profile.languages.length > 0 && (
        <FadeIn delay={0.45}>
          <div className="bg-card border border-border rounded-3xl p-6 shadow-soft">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
              Languages
            </h3>
            <p className="text-sm text-foreground">
              🗣️ {profile.languages.join(" · ")}
            </p>
          </div>
        </FadeIn>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════
   ACCOUNT SETTINGS — Right Side
   ══════════════════════════════════════════════ */

// ── Account card wrapper ──
function AccountCard({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-card border border-border rounded-3xl p-6 shadow-soft">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center text-muted-foreground">
          <Icon className="w-4 h-4" />
        </div>
        <h3 className="text-base font-bold text-foreground">{title}</h3>
      </div>
      {children}
    </div>
  );
}

// ── Change Password Block ──
function ChangePasswordBlock({
  onToast,
}: {
  onToast: (msg: string, type: "success" | "error") => void;
}) {
  const [current, setCurrent] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!current.trim()) errs.current = "Please enter your current password";
    if (newPw.length < 8) errs.newPw = "At least 8 characters needed";
    if (newPw !== confirm) errs.confirm = "Passwords don't match";
    if (current === newPw && current)
      errs.newPw = "New password must be different";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setCurrent("");
    setNewPw("");
    setConfirm("");
    setErrors({});
    onToast("Password updated successfully 🔐", "success");
  };

  return (
    <AccountCard icon={Lock} title="Change Password">
      <div className="space-y-4">
        {/* Current */}
        <div>
          <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5">
            Current password
          </label>
          <div className="relative">
            <input
              type={showCurrent ? "text" : "password"}
              value={current}
              onChange={(e) => {
                setCurrent(e.target.value);
                setErrors((p) => ({ ...p, current: "" }));
              }}
              placeholder="Enter current password"
              className={cn(
                "w-full bg-muted border rounded-xl px-4 py-3 pr-10 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all",
                errors.current
                  ? "border-rose-400 focus:border-rose-400"
                  : "border-border focus:border-primary/40"
              )}
            />
            <button
              type="button"
              onClick={() => setShowCurrent(!showCurrent)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showCurrent ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          {errors.current && (
            <p className="text-xs text-rose-500 mt-1">{errors.current}</p>
          )}
        </div>

        {/* New */}
        <div>
          <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5">
            New password
          </label>
          <div className="relative">
            <input
              type={showNew ? "text" : "password"}
              value={newPw}
              onChange={(e) => {
                setNewPw(e.target.value);
                setErrors((p) => ({ ...p, newPw: "" }));
              }}
              placeholder="Min 8 characters"
              className={cn(
                "w-full bg-muted border rounded-xl px-4 py-3 pr-10 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all",
                errors.newPw
                  ? "border-rose-400 focus:border-rose-400"
                  : "border-border focus:border-primary/40"
              )}
            />
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showNew ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          {errors.newPw && (
            <p className="text-xs text-rose-500 mt-1">{errors.newPw}</p>
          )}
          <PasswordStrength password={newPw} />
        </div>

        {/* Confirm */}
        <div>
          <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5">
            Confirm new password
          </label>
          <input
            type="password"
            value={confirm}
            onChange={(e) => {
              setConfirm(e.target.value);
              setErrors((p) => ({ ...p, confirm: "" }));
            }}
            placeholder="Re-enter new password"
            className={cn(
              "w-full bg-muted border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all",
              errors.confirm
                ? "border-rose-400 focus:border-rose-400"
                : "border-border focus:border-primary/40"
            )}
          />
          {errors.confirm && (
            <p className="text-xs text-rose-500 mt-1">{errors.confirm}</p>
          )}
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-foreground text-card font-bold py-3 rounded-xl hover:opacity-90 transition-all disabled:opacity-50"
        >
          {loading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              Updating...
            </>
          ) : (
            "Update Password"
          )}
        </button>
      </div>
    </AccountCard>
  );
}

// ── OTP Verification Block (reusable for email & phone) ──
function OtpChangeBlock({
  type,
  icon: Icon,
  title,
  currentValue,
  placeholder,
  inputType,
  onToast,
}: {
  type: "email" | "phone";
  icon: React.ElementType;
  title: string;
  currentValue: string;
  placeholder: string;
  inputType: string;
  onToast: (msg: string, type: "success" | "error") => void;
}) {
  const [step, setStep] = useState<"input" | "otp" | "done">("input");
  const [newValue, setNewValue] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const countdown = useCountdown(30);

  const handleSendOtp = async () => {
    if (!newValue.trim()) {
      setError(
        type === "email"
          ? "Please enter a valid email"
          : "Please enter a valid phone number"
      );
      return;
    }
    setError("");
    setLoading(true);
    // Simulate API
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setStep("otp");
    countdown.start();
  };

  const handleVerifyOtp = async () => {
    if (otp.length < 6) {
      setError("Enter all 6 digits");
      return;
    }
    setError("");
    setLoading(true);
    // Simulate API
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);

    // Simulate: if OTP is "000000", treat as invalid for demo
    if (otp === "000000") {
      setError("That code doesn't look right. Try again?");
      return;
    }

    setStep("done");
    onToast(
      type === "email"
        ? "Email updated — you're all set ✨"
        : "Phone number updated — you're all set ✨",
      "success"
    );
  };

  const handleResend = () => {
    if (countdown.isActive) return;
    countdown.start();
    // Simulate resend
  };

  const reset = () => {
    setStep("input");
    setNewValue("");
    setOtp("");
    setError("");
  };

  return (
    <AccountCard icon={Icon} title={title}>
      {/* Current value */}
      <div className="bg-muted rounded-xl px-4 py-3 mb-4 flex items-center justify-between">
        <div>
          <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider">
            Current {type}
          </p>
          <p className="text-sm font-semibold text-foreground mt-0.5">
            {currentValue || "Not set"}
          </p>
        </div>
        {step === "done" && (
          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
        )}
      </div>

      {/* Step 1: Input */}
      {step === "input" && (
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5">
              New {type}
            </label>
            <input
              type={inputType}
              value={newValue}
              onChange={(e) => {
                setNewValue(e.target.value);
                setError("");
              }}
              placeholder={placeholder}
              className={cn(
                "w-full bg-muted border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all",
                error
                  ? "border-rose-400"
                  : "border-border focus:border-primary/40"
              )}
            />
            {error && (
              <p className="text-xs text-rose-500 mt-1">{error}</p>
            )}
          </div>
          <button
            onClick={handleSendOtp}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-foreground text-card font-bold py-3 rounded-xl hover:opacity-90 transition-all disabled:opacity-50"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                Send verification code
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      )}

      {/* Step 2: OTP */}
      {step === "otp" && (
        <div className="space-y-4">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              We sent a 6-digit code to
            </p>
            <p className="text-sm font-bold text-foreground mt-0.5">
              {newValue}
            </p>
          </div>

          <OtpInput value={otp} onChange={setOtp} />

          {error && (
            <p className="text-xs text-rose-500 text-center">{error}</p>
          )}

          <button
            onClick={handleVerifyOtp}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-foreground text-card font-bold py-3 rounded-xl hover:opacity-90 transition-all disabled:opacity-50"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Verifying...
              </>
            ) : (
              "Verify & Update"
            )}
          </button>

          <div className="flex items-center justify-between text-xs">
            <button
              onClick={reset}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Change {type}
            </button>
            <button
              onClick={handleResend}
              disabled={countdown.isActive}
              className={cn(
                "font-medium transition-colors",
                countdown.isActive
                  ? "text-muted-foreground cursor-not-allowed"
                  : "text-primary hover:underline"
              )}
            >
              {countdown.isActive
                ? `Resend in ${countdown.seconds}s`
                : "Resend code"}
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Done */}
      {step === "done" && (
        <div className="text-center py-2">
          <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-3">
            <CheckCircle2 className="w-6 h-6 text-emerald-500" />
          </div>
          <p className="text-sm font-semibold text-foreground">
            {type === "email" ? "Email" : "Phone number"} updated!
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Your new {type} is now active on your account.
          </p>
          <button
            onClick={reset}
            className="mt-4 text-xs font-bold text-primary hover:underline"
          >
            Change again
          </button>
        </div>
      )}
    </AccountCard>
  );
}

// ── Account Meta ──
function AccountMeta({
  user,
  profile,
}: {
  user: { name: string; email: string; phone?: string } | null;
  profile: UserProfile;
}) {
  // Mock dates
  const createdDate = "January 15, 2026";
  const lastPasswordChange = "February 10, 2026";

  return (
    <AccountCard icon={CalendarDays} title="Account Info">
      <div className="space-y-4">
        <div className="flex items-center justify-between py-2 border-b border-border">
          <span className="text-sm text-muted-foreground">
            Account created
          </span>
          <span className="text-sm font-medium text-foreground">
            {createdDate}
          </span>
        </div>
        <div className="flex items-center justify-between py-2 border-b border-border">
          <span className="text-sm text-muted-foreground">
            Last password change
          </span>
          <span className="text-sm font-medium text-foreground">
            {lastPasswordChange}
          </span>
        </div>

        {/* Verification badges */}
        <div className="pt-2">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">
            Verification Status
          </p>
          <div className="space-y-2.5">
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "w-7 h-7 rounded-lg flex items-center justify-center",
                  user?.email
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-muted text-muted-foreground"
                )}
              >
                <Mail className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">
                  Email
                </p>
              </div>
              {user?.email ? (
                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                </span>
              ) : (
                <span className="text-xs text-muted-foreground">
                  Not verified
                </span>
              )}
            </div>

            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "w-7 h-7 rounded-lg flex items-center justify-center",
                  user?.phone
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-muted text-muted-foreground"
                )}
              >
                <Smartphone className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">
                  Phone
                </p>
              </div>
              {user?.phone ? (
                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                </span>
              ) : (
                <span className="text-xs text-muted-foreground">
                  Not verified
                </span>
              )}
            </div>

            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "w-7 h-7 rounded-lg flex items-center justify-center",
                  profile.idVerified
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-muted text-muted-foreground"
                )}
              >
                <BadgeCheck className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">
                  Government ID
                </p>
              </div>
              {profile.idVerified ? (
                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                </span>
              ) : (
                <span className="text-xs text-amber-500 font-medium">
                  Pending
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </AccountCard>
  );
}

/* ══════════════════════════════════════════════
   MAIN PROFILE PAGE
   ══════════════════════════════════════════════ */
export default function ProfilePage() {
  const { user, isReady } = useAuth();
  const [profile, setProfile] = useState<UserProfile>(emptyProfile);
  const [hydrated, setHydrated] = useState(false);
  const [activeTab, setActiveTab] = useState<"profile" | "security">("profile");
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  // Load profile from localStorage (synced with edit-profile)
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Partial<UserProfile>;
        setProfile((prev) => ({ ...prev, ...parsed }));
      }
    } catch {
      // corrupted — start fresh
    }
    setHydrated(true);
  }, []);

  const handleToast = useCallback(
    (message: string, type: "success" | "error") => {
      setToast({ message, type });
    },
    []
  );

  const warmth = calculateWarmth(profile);

  if (!hydrated || !isReady) {
    return (
      <div className="min-h-screen bg-section">
        <SkeletonProfile />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-section">
      {/* ── Header ── */}
      <div className="bg-card border-b border-border">
        <div className="container-custom py-6">
          <FadeIn>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              Your Space
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Your identity hub — who you are and how people see you.
            </p>
          </FadeIn>
        </div>
      </div>

      {/* ── Mobile tab switcher ── */}
      <div className="lg:hidden sticky top-20 z-40 bg-card/90 backdrop-blur-lg border-b border-border">
        <div className="container-custom flex">
          <button
            onClick={() => setActiveTab("profile")}
            className={cn(
              "flex-1 py-3 text-sm font-bold text-center border-b-2 transition-colors",
              activeTab === "profile"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab("security")}
            className={cn(
              "flex-1 py-3 text-sm font-bold text-center border-b-2 transition-colors",
              activeTab === "security"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            Security
          </button>
        </div>
      </div>

      {/* ── Main layout ── */}
      <div className="container-custom py-8">
        <div className="flex gap-8 items-start">
          {/* LEFT — Profile Preview */}
          <div
            className={cn(
              "flex-1 min-w-0 max-w-2xl",
              activeTab !== "profile" && "hidden lg:block"
            )}
          >
            <ProfilePreview profile={profile} warmth={warmth} user={user} />
          </div>

          {/* RIGHT — Account & Security */}
          <div
            className={cn(
              "w-full lg:w-[400px] shrink-0 space-y-6",
              activeTab !== "security" && "hidden lg:block"
            )}
          >
            <FadeIn>
              <div className="flex items-center gap-3 mb-1">
                <Shield className="w-5 h-5 text-muted-foreground" />
                <h2 className="text-lg font-bold text-foreground">
                  Account & Security
                </h2>
              </div>
              <p className="text-xs text-muted-foreground mb-6">
                This section is private and only visible to you.
              </p>
            </FadeIn>

            <FadeIn delay={0.05}>
              <ChangePasswordBlock onToast={handleToast} />
            </FadeIn>

            <FadeIn delay={0.1}>
              <OtpChangeBlock
                type="email"
                icon={Mail}
                title="Change Email"
                currentValue={user?.email || ""}
                placeholder="new@example.com"
                inputType="email"
                onToast={handleToast}
              />
            </FadeIn>

            <FadeIn delay={0.15}>
              <OtpChangeBlock
                type="phone"
                icon={Smartphone}
                title="Change Phone Number"
                currentValue={user?.phone || "Not set"}
                placeholder="+91 98765 43210"
                inputType="tel"
                onToast={handleToast}
              />
            </FadeIn>

            <FadeIn delay={0.2}>
              <AccountMeta user={user} profile={profile} />
            </FadeIn>

            {/* Safe space footer */}
            <div className="text-center pt-4 pb-2">
              <p className="text-xs text-muted-foreground italic">
                Your data is yours. We handle it with care. 🤍
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onDismiss={() => setToast(null)}
        />
      )}
    </div>
  );
}
