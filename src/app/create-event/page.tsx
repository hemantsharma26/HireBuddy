"use client";

import { useState, useRef, type FormEvent, type ChangeEvent } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  Calendar,
  Clock,
  Heart,
  Image as ImageIcon,
  MapPin,
  Monitor,
  Shield,
  Sparkles,
  Upload,
  Users,
  X,
  Check,
  Copy,
  Share2,
  IndianRupee,
} from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { cn } from "@/lib/utils";

/* ═══════════════════════════════════════════════════
   Create Event — Invite people into a moment.
   ═══════════════════════════════════════════════════ */

const TOTAL_STEPS = 9;

const categories = [
  "Walk & Talk",
  "Coffee Meetup",
  "Emotional Support Circle",
  "Study Together",
  "Travel Buddy Meetup",
  "Hobby Meetup",
  "Virtual Hangout",
  "Other",
];

const platforms = ["Zoom", "Google Meet", "Discord", "Other"];

const durations = ["1 hour", "2 hours", "3 hours", "Flexible"];
const recurrenceOptions = ["None", "Weekly", "Monthly"];

const vibeTags = [
  "Chill",
  "Deep conversations",
  "No-judgment zone",
  "Fun & light",
  "Silent company",
  "Supportive space",
  "Beginner friendly",
];

/* ── Step indicator ── */
function StepBar({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "h-1.5 rounded-full transition-all duration-300",
            i + 1 === current
              ? "w-8 bg-primary"
              : i + 1 < current
              ? "w-4 bg-primary/40"
              : "w-4 bg-gray-200"
          )}
        />
      ))}
    </div>
  );
}

/* ── Shared field wrapper ── */
function Field({
  label,
  hint,
  required,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label}
        {required && <span className="text-primary ml-0.5">*</span>}
      </label>
      {children}
      {hint && <p className="text-xs text-gray-400 mt-1.5">{hint}</p>}
    </div>
  );
}

const inputClass =
  "w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all";
const selectClass =
  "w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all appearance-none";

/* ═══════════════════════════════════════════════════ */

function CreateEventForm() {
  const [step, setStep] = useState(1);
  const [published, setPublished] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  // Form state
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [eventType, setEventType] = useState<"in-person" | "virtual">(
    "in-person"
  );

  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [platform, setPlatform] = useState("");

  const [eventDate, setEventDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [duration, setDuration] = useState("");
  const [recurrence, setRecurrence] = useState("None");

  const [description, setDescription] = useState("");

  const [selectedVibes, setSelectedVibes] = useState<string[]>([]);

  const [maxParticipants, setMaxParticipants] = useState("");
  const [intimate, setIntimate] = useState(false);

  const [pricing, setPricing] = useState<"free" | "paid">("free");
  const [price, setPrice] = useState("");
  const [allowDonations, setAllowDonations] = useState(false);

  const [requireVerification, setRequireVerification] = useState(true);
  const [adultOnly, setAdultOnly] = useState(false);
  const [hostApproval, setHostApproval] = useState(false);

  const [coverPreview, setCoverPreview] = useState<string | null>(null);

  const toggleVibe = (v: string) =>
    setSelectedVibes((prev) =>
      prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]
    );

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setCoverPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const next = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  const prev = () => setStep((s) => Math.max(s - 1, 1));

  const handlePublish = (e: FormEvent) => {
    e.preventDefault();
    setPublished(true);
  };

  const copyLink = () => {
    navigator.clipboard.writeText("https://hirebuddy.app/events/new-event");
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  /* ── Success screen ── */
  if (published) {
    return (
      <FadeIn>
        <div className="max-w-lg mx-auto text-center py-20 md:py-28 px-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">
            Your event is live ✨
          </h1>
          <p className="text-gray-500 mb-10">
            People can now discover and join your event. Share it to reach more
            humans.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
            <button
              onClick={copyLink}
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-bold text-sm transition-all",
                linkCopied
                  ? "bg-primary/10 text-primary"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              )}
            >
              {linkCopied ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
              {linkCopied ? "Copied!" : "Copy Link"}
            </button>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(
                "Check out this event on HireBuddy! https://hirebuddy.app/events/new-event"
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full px-6 py-3.5 font-bold text-sm transition-all"
            >
              <Share2 className="w-4 h-4" />
              Share on WhatsApp
            </a>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/events"
              className="text-primary font-semibold text-sm hover:underline"
            >
              ← Back to Events
            </Link>
          </div>
        </div>
      </FadeIn>
    );
  }

  /* ── Step content ── */
  const renderStep = () => {
    switch (step) {
      /* ───────── STEP 1: Basic Info ───────── */
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                Basic Info
              </h3>
              <p className="text-sm text-gray-400">
                What&rsquo;s this event about?
              </p>
            </div>

            <Field label="Event Title" required>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Late Night Walk & Talk"
                className={inputClass}
              />
            </Field>

            <Field label="Category" required>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={cn(
                  selectClass,
                  category ? "text-gray-900" : "text-gray-400"
                )}
              >
                <option value="" disabled>
                  Choose a category
                </option>
                {categories.map((c) => (
                  <option key={c} value={c} className="text-gray-900">
                    {c}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Event Type" required>
              <div className="flex gap-3">
                {(
                  [
                    {
                      val: "in-person" as const,
                      label: "In-person",
                      icon: MapPin,
                    },
                    {
                      val: "virtual" as const,
                      label: "Virtual",
                      icon: Monitor,
                    },
                  ] as const
                ).map((opt) => (
                  <button
                    key={opt.val}
                    type="button"
                    onClick={() => setEventType(opt.val)}
                    className={cn(
                      "flex-1 flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border text-sm font-semibold transition-all",
                      eventType === opt.val
                        ? "bg-primary/10 border-primary/30 text-primary"
                        : "bg-gray-50 border-gray-200 text-gray-500 hover:border-gray-300"
                    )}
                  >
                    <opt.icon className="w-4 h-4" />
                    {opt.label}
                  </button>
                ))}
              </div>
            </Field>
          </div>
        );

      /* ───────── STEP 2: Location / Platform ───────── */
      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                {eventType === "in-person" ? "Location" : "Platform"}
              </h3>
              <p className="text-sm text-gray-400">
                {eventType === "in-person"
                  ? "Where will people meet?"
                  : "How will people connect?"}
              </p>
            </div>

            {eventType === "in-person" ? (
              <>
                <Field label="City" required>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Bangalore"
                    className={inputClass}
                  />
                </Field>
                <Field label="Area" hint="Helps people find the venue easily">
                  <input
                    type="text"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    placeholder="e.g. Koramangala, near Forum Mall"
                    className={inputClass}
                  />
                </Field>
              </>
            ) : (
              <Field label="Platform" required>
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  className={cn(
                    selectClass,
                    platform ? "text-gray-900" : "text-gray-400"
                  )}
                >
                  <option value="" disabled>
                    Choose a platform
                  </option>
                  {platforms.map((p) => (
                    <option key={p} value={p} className="text-gray-900">
                      {p}
                    </option>
                  ))}
                </select>
              </Field>
            )}
          </div>
        );

      /* ───────── STEP 3: Date & Time ───────── */
      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                Date &amp; Time
              </h3>
              <p className="text-sm text-gray-400">
                When is the gathering?
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Event Date" required>
                <input
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className={inputClass}
                />
              </Field>
              <Field label="Start Time" required>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className={inputClass}
                />
              </Field>
            </div>

            <Field label="Duration">
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className={cn(
                  selectClass,
                  duration ? "text-gray-900" : "text-gray-400"
                )}
              >
                <option value="" disabled>
                  How long will it last?
                </option>
                {durations.map((d) => (
                  <option key={d} value={d} className="text-gray-900">
                    {d}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Recurring" hint="Repeat this event automatically">
              <div className="flex gap-2">
                {recurrenceOptions.map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRecurrence(r)}
                    className={cn(
                      "px-4 py-2 rounded-full text-sm font-semibold border transition-all",
                      recurrence === r
                        ? "bg-primary/10 border-primary/30 text-primary"
                        : "bg-gray-50 border-gray-200 text-gray-500 hover:border-gray-300"
                    )}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </Field>
          </div>
        );

      /* ───────── STEP 4: Description ───────── */
      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                Description
              </h3>
              <p className="text-sm text-gray-400">
                Tell people what this event <em>feels</em> like.
              </p>
            </div>

            <Field
              label="Event Description"
              required
              hint="Who should join? What will happen? Is it chill, deep, fun?"
            >
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={6}
                placeholder="We'll meet at the lake, walk slowly, and talk about whatever's on our minds. No pressure. No agenda. Just presence."
                className={cn(inputClass, "resize-none")}
              />
            </Field>
          </div>
        );

      /* ───────── STEP 5: Vibe & Intent ───────── */
      case 5:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                Vibe &amp; Intent
              </h3>
              <p className="text-sm text-gray-400">
                What energy should people expect? Pick all that apply.
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {vibeTags.map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => toggleVibe(v)}
                  className={cn(
                    "px-4 py-2.5 rounded-full text-sm font-semibold border transition-all",
                    selectedVibes.includes(v)
                      ? "bg-primary/10 border-primary/30 text-primary"
                      : "bg-gray-50 border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  )}
                >
                  {selectedVibes.includes(v) && (
                    <Check className="w-3.5 h-3.5 inline mr-1.5 -mt-0.5" />
                  )}
                  {v}
                </button>
              ))}
            </div>

            <p className="text-xs text-gray-400">
              This helps people find events that match their mood.
            </p>
          </div>
        );

      /* ───────── STEP 6: Capacity ───────── */
      case 6:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                Capacity
              </h3>
              <p className="text-sm text-gray-400">
                How many people can join?
              </p>
            </div>

            <Field label="Max Participants">
              <input
                type="number"
                min={2}
                max={500}
                value={maxParticipants}
                onChange={(e) => setMaxParticipants(e.target.value)}
                placeholder="e.g. 10"
                className={inputClass}
              />
            </Field>

            <label className="flex items-center gap-3 cursor-pointer group">
              <div
                className={cn(
                  "w-10 h-6 rounded-full relative transition-colors",
                  intimate ? "bg-primary" : "bg-gray-200"
                )}
                onClick={() => setIntimate(!intimate)}
              >
                <div
                  className={cn(
                    "absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all",
                    intimate ? "left-[18px]" : "left-0.5"
                  )}
                />
              </div>
              <div>
                <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">
                  Keep it intimate
                </span>
                <p className="text-xs text-gray-400">
                  Limit to under 5 people for deeper connection
                </p>
              </div>
            </label>
          </div>
        );

      /* ───────── STEP 7: Pricing ───────── */
      case 7:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                Pricing
              </h3>
              <p className="text-sm text-gray-400">
                Connection should be accessible. Price it with heart.
              </p>
            </div>

            <div className="flex gap-3">
              {(
                [
                  { val: "free" as const, label: "Free Event", emoji: "🟢" },
                  { val: "paid" as const, label: "Paid Event", emoji: "🟡" },
                ] as const
              ).map((opt) => (
                <button
                  key={opt.val}
                  type="button"
                  onClick={() => setPricing(opt.val)}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border text-sm font-semibold transition-all",
                    pricing === opt.val
                      ? "bg-primary/10 border-primary/30 text-primary"
                      : "bg-gray-50 border-gray-200 text-gray-500 hover:border-gray-300"
                  )}
                >
                  <span>{opt.emoji}</span>
                  {opt.label}
                </button>
              ))}
            </div>

            {pricing === "paid" && (
              <FadeIn>
                <div className="space-y-4">
                  <Field
                    label="Price"
                    required
                    hint="Most community events are ₹99–₹499"
                  >
                    <div className="relative">
                      <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="number"
                        min={0}
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="199"
                        className={cn(inputClass, "pl-10")}
                      />
                    </div>
                  </Field>

                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div
                      className={cn(
                        "w-10 h-6 rounded-full relative transition-colors",
                        allowDonations ? "bg-primary" : "bg-gray-200"
                      )}
                      onClick={() => setAllowDonations(!allowDonations)}
                    >
                      <div
                        className={cn(
                          "absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all",
                          allowDonations ? "left-[18px]" : "left-0.5"
                        )}
                      />
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">
                        Allow buddy contributions
                      </span>
                      <p className="text-xs text-gray-400">
                        Let people contribute what they can (donation-style)
                      </p>
                    </div>
                  </label>
                </div>
              </FadeIn>
            )}
          </div>
        );

      /* ───────── STEP 8: Safety Settings ───────── */
      case 8:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                Safety Settings
              </h3>
              <p className="text-sm text-gray-400">
                Safety builds trust. Set your event boundaries.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  label: "Require profile verification",
                  desc: "Only verified users can join",
                  checked: requireVerification,
                  toggle: () =>
                    setRequireVerification(!requireVerification),
                },
                {
                  label: "Allow only 18+",
                  desc: "Restrict to adult participants",
                  checked: adultOnly,
                  toggle: () => setAdultOnly(!adultOnly),
                },
                {
                  label: "Host approval required",
                  desc: "Manually approve each attendee before they join",
                  checked: hostApproval,
                  toggle: () => setHostApproval(!hostApproval),
                },
              ].map((opt) => (
                <label
                  key={opt.label}
                  className="flex items-start gap-3 cursor-pointer group p-4 rounded-xl bg-gray-50 hover:bg-gray-100/80 transition-colors"
                >
                  <div
                    className={cn(
                      "mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-colors",
                      opt.checked
                        ? "bg-primary border-primary"
                        : "bg-white border-gray-300"
                    )}
                    onClick={opt.toggle}
                  >
                    {opt.checked && (
                      <Check className="w-3 h-3 text-white" />
                    )}
                  </div>
                  <div onClick={opt.toggle}>
                    <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">
                      {opt.label}
                    </span>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {opt.desc}
                    </p>
                  </div>
                </label>
              ))}
            </div>

            <div className="flex items-center gap-2 pt-2 text-xs text-gray-400">
              <Shield className="w-3.5 h-3.5 text-primary/60" />
              Your event is always protected by HireBuddy&rsquo;s
              community guidelines.
            </div>
          </div>
        );

      /* ───────── STEP 9: Cover Image ───────── */
      case 9:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                Cover Image
              </h3>
              <p className="text-sm text-gray-400">
                Warm, human images work best.
              </p>
            </div>

            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />

            {coverPreview ? (
              <div className="relative rounded-[1.25rem] overflow-hidden border border-gray-100">
                <img
                  src={coverPreview}
                  alt="Cover preview"
                  className="w-full aspect-[16/9] object-cover"
                />
                <button
                  type="button"
                  onClick={() => setCoverPreview(null)}
                  className="absolute top-3 right-3 w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="w-full flex flex-col items-center justify-center gap-3 py-16 border-2 border-dashed border-gray-200 rounded-[1.25rem] hover:border-primary/30 hover:bg-primary/5 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-gray-100 group-hover:bg-primary/10 flex items-center justify-center transition-colors">
                  <Upload className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-gray-600 group-hover:text-gray-900">
                    Click to upload or drag &amp; drop
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    PNG, JPG up to 5 MB
                  </p>
                </div>
              </button>
            )}

            <p className="text-xs text-gray-400 flex items-center gap-1.5">
              <ImageIcon className="w-3.5 h-3.5" />
              Tip: Photos of people, places, or warm tones get more RSVPs.
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen bg-white">
      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#312e81]">
        <div className="hidden sm:block absolute top-1/4 left-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full bg-purple-500/10 blur-[120px] pointer-events-none" />
        <div className="hidden sm:block absolute bottom-0 right-1/4 w-[250px] md:w-[400px] h-[250px] md:h-[400px] rounded-full bg-primary/5 blur-[100px] pointer-events-none" />

        <div className="container-custom relative pt-16 md:pt-24 pb-14 md:pb-20 text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-white/70 text-xs font-semibold mb-6 border border-white/10">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              Host an Event
            </div>
          </FadeIn>

          <FadeIn delay={0.05}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 tracking-tight leading-[1.1] max-w-3xl mx-auto">
              Create a space where people don&rsquo;t feel alone.
            </h1>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p className="text-lg md:text-xl text-white/60 max-w-xl mx-auto mb-4 leading-relaxed font-medium">
              Host a walk, a talk, a meetup, or a moment that brings
              people together.
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <p className="text-sm text-white/30 font-medium">
              You don&rsquo;t need to be perfect. Just be kind.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── FORM CARD ── */}
      <div className="container-custom py-10 md:py-16">
        <div className="max-w-2xl mx-auto">
          <FadeIn>
            <form
              onSubmit={handlePublish}
              className="bg-white border border-gray-100 rounded-[1.5rem] shadow-sm p-6 md:p-10"
            >
              {/* Progress bar */}
              <div className="flex items-center justify-between mb-8">
                <StepBar current={step} total={TOTAL_STEPS} />
                <span className="text-xs font-semibold text-gray-400">
                  Step {step} of {TOTAL_STEPS}
                </span>
              </div>

              {/* Divider */}
              <div className="h-px bg-gray-100 mb-8" />

              {/* Step content */}
              <div className="min-h-[280px]">{renderStep()}</div>

              {/* Divider */}
              <div className="h-px bg-gray-100 mt-8 mb-6" />

              {/* Navigation */}
              <div className="flex items-center justify-between gap-4">
                <div>
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={prev}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  {step === TOTAL_STEPS && (
                    <button
                      type="button"
                      className="px-5 py-2.5 rounded-full border border-gray-200 text-sm font-semibold text-gray-500 hover:border-gray-300 hover:text-gray-700 transition-all"
                    >
                      Save Draft
                    </button>
                  )}

                  {step < TOTAL_STEPS ? (
                    <button
                      type="button"
                      onClick={next}
                      className="inline-flex items-center gap-2 bg-[#FF6B6B] hover:bg-[#ff5252] text-white rounded-full px-7 py-3 font-bold text-sm transition-all hover:scale-105 active:scale-95 shadow-lg shadow-red-500/20"
                    >
                      Continue
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 bg-[#FF6B6B] hover:bg-[#ff5252] text-white rounded-full px-7 py-3 font-bold text-sm transition-all hover:scale-105 active:scale-95 shadow-lg shadow-red-500/20"
                    >
                      Make it happen
                      <Sparkles className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </form>
          </FadeIn>
        </div>
      </div>
    </main>
  );
}

/* ═══════════════════════════════════════════════════
   Page wrapper — login required
   ═══════════════════════════════════════════════════ */

export default function CreateEventPage() {
  return (
    <ProtectedRoute>
      <CreateEventForm />
    </ProtectedRoute>
  );
}
