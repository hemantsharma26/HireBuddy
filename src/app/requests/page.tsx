"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Clock,
  MessageCircle,
  Send,
  Shield,
  Heart,
  ChevronLeft,
  Filter,
  Users,
  X,
  MapPin,
} from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { EmptyState } from "@/components/feature/EmptyState";
import { IconRenderer } from "@/components/ui/IconRenderer";
import { cn, getFullImageUrl } from "@/lib/utils";
import {
  sampleRequests,
  urgencyLabels,
  emotionalCategories,
  type SupportRequest,
  type UrgencyLevel,
} from "@/data/requests";

/* ═══════════════════════════════════════════
   Open Requests — Buddy-facing marketplace
   ═══════════════════════════════════════════ */

export default function RequestsPage() {
  const [filter, setFilter] = useState("All");

  const categories = [
    "All",
    ...new Set(sampleRequests.map((r) => r.category)),
  ];

  const filteredRequests =
    filter === "All"
      ? sampleRequests
      : sampleRequests.filter((r) => r.category === filter);

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
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2 leading-tight">
                  People who need support right now
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                  Real situations from real people. Read through, feel the
                  connection, and offer your support.
                </p>
                <p className="mt-2 text-sm text-muted-foreground italic flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5" />
                  This is a safe space. You are not alone.
                </p>
              </div>

              <div className="flex items-center gap-2 text-sm font-medium text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full w-fit border border-emerald-100 shrink-0">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                {sampleRequests.length} open requests
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      <div className="container-custom py-6 md:py-8">
        {/* Category filter pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Filter className="w-4 h-4 text-muted-foreground mt-2 mr-1" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-semibold border transition-all",
                filter === cat
                  ? "bg-foreground text-background border-foreground"
                  : "bg-card border-border text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {cat === "All" ? "All Requests" : cat}
            </button>
          ))}
        </div>

        {/* Request cards */}
        <div className="space-y-4">
          {filteredRequests.map((request, i) => (
            <FadeIn key={request.id} delay={i * 0.04}>
              <RequestCard request={request} />
            </FadeIn>
          ))}
        </div>

        {filteredRequests.length === 0 && (
          <EmptyState variant="requests" />
        )}

        {/* Bottom CTA */}
        <FadeIn delay={0.3}>
          <div className="mt-12 bg-card border border-border rounded-2xl p-6 md:p-8 text-center">
            <Heart className="w-8 h-8 text-rose-400 mx-auto mb-3" />
            <h3 className="text-xl font-bold text-foreground mb-2">
              Need support yourself?
            </h3>
            <p className="text-muted-foreground text-sm mb-5 max-w-md mx-auto">
              Post your situation and let verified buddies come to you with
              support offers. It&apos;s safe, private, and judgment-free.
            </p>
            <Link
              href="/post-request"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold px-7 py-3.5 rounded-2xl shadow-lg transition-all active:scale-[0.97]"
            >
              <Send className="w-4 h-4" />
              Post Your Situation
            </Link>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   Request Card
   ═══════════════════════════════════════════ */

/* ═══════════════════════════════════════════
   Request Card
   ═══════════════════════════════════════════ */

function RequestCard({ request }: { request: SupportRequest }) {
  const [showForm, setShowForm] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const router = useRouter();
  const urgency = urgencyLabels[request.urgency as UrgencyLevel];

  // Mock mapping names to buddy IDs for demo
  const getBuddyId = (name: string) => {
    const mapping: Record<string, number> = {
      "Aryan": 1,
      "Priya": 7,
      "Rahul": 6,
      "Meera": 11,
      "Vikash": 15
    };
    return mapping[name] || 1;
  };

  const handleToggleForm = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSent) return;
    setShowForm(!showForm);
  };

  const handleProfileClick = () => {
    if (request.anonymous) return;
    router.push(`/buddies/${getBuddyId(request.postedBy)}`);
  };

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-soft transition-all duration-300">
      <div className="p-5 md:p-6">
        {/* Top row: avatar + meta */}
        <div className="flex items-start gap-3 mb-4">
          <div 
            onClick={handleProfileClick}
            className={cn(
              "shrink-0 transition-transform active:scale-95",
              !request.anonymous && "cursor-pointer hover:opacity-80"
            )}
          >
            {request.anonymous ? (
              <div className="w-10 h-10 rounded-full bg-violet-50 border border-violet-100 flex items-center justify-center">
                <Shield className="w-4 h-4 text-violet-400" />
              </div>
            ) : (
              <img
                src={getFullImageUrl(request.avatar)}
                alt={request.postedBy}
                className="w-10 h-10 rounded-full object-cover bg-muted border border-border"
                loading="lazy"
              />
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span 
                onClick={handleProfileClick}
                className={cn(
                  "font-bold text-foreground text-sm transition-colors",
                  !request.anonymous && "cursor-pointer hover:text-primary hover:underline underline-offset-2"
                )}
              >
                {request.postedBy}
              </span>
              {request.anonymous && (
                <span className="text-[10px] font-bold text-violet-600 bg-violet-50 px-2 py-0.5 rounded-full border border-violet-100 uppercase tracking-wider">
                  Anonymous
                </span>
              )}
              <span className="text-xs text-muted-foreground">
                · {request.postedAt}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2 mt-1">
              {/* Category */}
              <span className="text-xs font-semibold text-foreground bg-section px-2.5 py-1 rounded-lg border border-border flex items-center gap-1.5 w-fit">
                {emotionalCategories.find((c) => c.label === request.category)?.iconName && (
                  <IconRenderer 
                    name={emotionalCategories.find((c) => c.label === request.category)!.iconName} 
                    className="w-3.5 h-3.5" 
                    strokeWidth={2}
                  />
                )}
                {request.category}
              </span>
              {/* Urgency */}
              <span
                className={cn(
                  "text-xs font-bold px-2.5 py-1 rounded-lg border flex items-center gap-1.5 w-fit",
                  urgency.color
                )}
              >
                <IconRenderer name={urgency.iconName} className="w-3.5 h-3.5" strokeWidth={2.5} />
                {urgency.label}
              </span>
            </div>
          </div>
        </div>

        {/* Situation text */}
        <p className="text-foreground text-[15px] leading-relaxed mb-4 pl-0 md:pl-[52px]">
          &ldquo;{request.situation}&rdquo;
        </p>

        {/* Bottom row: details + CTA */}
        <div className="flex flex-wrap items-center justify-between gap-3 pl-0 md:pl-[52px]">
          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            {request.budget && (
              <span className="bg-section px-2.5 py-1 rounded-lg border border-border font-medium font-sans flex items-center gap-1">
                <IconRenderer name="Banknote" className="w-3 h-3 text-muted-foreground" />
                {request.budget}
              </span>
            )}
            {request.duration && (
              <span className="bg-section px-2.5 py-1 rounded-lg border border-border font-medium">
                <Clock className="w-3 h-3 inline mr-1" />
                {request.duration}
              </span>
            )}
            <span className="bg-section px-2.5 py-1 rounded-lg border border-border font-medium flex items-center gap-1">
              <IconRenderer name="Languages" className="w-3 h-3 text-muted-foreground" />
              {request.language}
            </span>
            {request.offersReceived > 0 && (
              <span className="text-emerald-600 font-semibold flex items-center gap-1">
                <Users className="w-3 h-3" />
                {request.offersReceived} offers
              </span>
            )}
          </div>

          <button
            onClick={handleToggleForm}
            className={cn(
              "inline-flex items-center gap-2 font-bold px-5 py-2.5 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-[0.97] text-sm shrink-0",
              showForm || isSent
                ? "bg-muted text-muted-foreground"
                : "bg-primary hover:bg-primary/90 text-white"
            )}
            disabled={isSent}
          >
            {isSent ? (
              <>
                <Shield className="w-3.5 h-3.5" />
                Offer Sent
              </>
            ) : showForm ? (
              <>
                <X className="w-3.5 h-3.5" />
                Cancel
              </>
            ) : (
              <>
                <MessageCircle className="w-3.5 h-3.5" />
                Send Offer
              </>
            )}
          </button>
        </div>
      </div>

      {/* Inline Offer Form */}
      <div
        className={cn(
          "transition-all duration-300 ease-in-out border-t border-border bg-section/50",
          showForm ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        )}
      >
        <div className="p-5 md:p-8">
          <OfferForm
            request={request}
            onSuccess={() => {
              setIsSent(true);
              setShowForm(false);
            }}
            onCancel={() => setShowForm(false)}
          />
        </div>
      </div>

      {/* Success State */}
      {isSent && (
        <div className="bg-emerald-50 border-t border-emerald-100 p-4 text-center">
          <p className="text-sm font-medium text-emerald-700 flex items-center justify-center gap-2">
            <Heart className="w-4 h-4 fill-emerald-600/10" />
            Your support offer was sent!
          </p>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════
   Integrated Offer Form
   ═══════════════════════════════════════════ */

function OfferForm({
  request,
  onSuccess,
  onCancel,
}: {
  request: SupportRequest;
  onSuccess: () => void;
  onCancel: () => void;
}) {
  const [message, setMessage] = useState("");
  const [price, setPrice] = useState("");
  const [availability, setAvailability] = useState<"now" | "schedule">("now");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSend = () => {
    if (!message.trim()) return;
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      onSuccess();
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-lg font-bold text-foreground">
          Send your support offer
        </h4>
        <button
          onClick={onCancel}
          className="p-1.5 hover:bg-muted rounded-full transition-colors md:hidden"
        >
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      <div className="space-y-5">
        {/* Message */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">
            Your intro message
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Hi, I'd love to help. I've been through something similar and I know how it feels..."
            rows={4}
            className="w-full bg-card border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 resize-none text-sm leading-relaxed"
          />
          <p className="mt-1.5 text-xs text-muted-foreground">
            Be warm, be real. That&apos;s what matters here.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Price */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Your offer price
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
                ₹
              </span>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="500"
                className="w-full bg-card border border-border rounded-xl pl-8 pr-4 py-3 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 text-sm font-sans"
              />
            </div>
            {request.budget && (
              <p className="mt-1.5 text-xs text-muted-foreground">
                Their budget: {request.budget}
              </p>
            )}
          </div>

          {/* Availability */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Your availability
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setAvailability("now")}
                className={cn(
                  "px-3 py-2.5 rounded-xl border text-[13px] font-semibold transition-all",
                  availability === "now"
                    ? "bg-emerald-50 border-emerald-200 text-emerald-700 ring-1 ring-emerald-200"
                    : "bg-card border-border text-muted-foreground hover:bg-muted"
                )}
              >
                Available Now
              </button>
              <button
                onClick={() => setAvailability("schedule")}
                className={cn(
                  "px-3 py-2.5 rounded-xl border text-[13px] font-semibold transition-all",
                  availability === "schedule"
                    ? "bg-blue-50 border-blue-200 text-blue-700 ring-1 ring-blue-200"
                    : "bg-card border-border text-muted-foreground hover:bg-muted"
                )}
              >
                Schedule
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={handleSend}
            disabled={!message.trim() || isSubmitting}
            className={cn(
              "flex-1 inline-flex items-center justify-center gap-2 font-bold py-3.5 rounded-2xl shadow-lg transition-all active:scale-[0.97] text-sm",
              message.trim() && !isSubmitting
                ? "bg-primary hover:bg-primary/90 text-white hover:shadow-xl"
                : "bg-muted text-muted-foreground cursor-not-allowed shadow-none"
            )}
          >
            {isSubmitting ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            Send Support Offer
          </button>
          
          <button
            onClick={onCancel}
            className="px-6 py-3.5 rounded-2xl border border-border text-sm font-bold text-muted-foreground hover:bg-muted transition-colors"
          >
            Cancel
          </button>
        </div>

        <p className="text-[11px] text-muted-foreground text-center italic flex items-center justify-center gap-1.5">
          <Shield className="w-3 h-3" />
          This is a safe space. Your offer will be private between you and
          the person.
        </p>
      </div>
    </div>
  );
}
