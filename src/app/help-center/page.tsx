"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import {
  Search,
  ChevronRight,
  ChevronDown,
  MessageCircle,
  Mail,
  AlertTriangle,
  Clock,
  ArrowLeft,
  ArrowRight,
  X,
  Heart,
  BookOpen,
  Shield,
  Sparkles,
} from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { cn } from "@/lib/utils";
import { IconRenderer } from "@/components/ui/IconRenderer";
import {
  type HelpCategory,
  type HelpArticle,
  helpCategories,
  featuredArticles,
  searchArticles,
} from "@/data/helpCenter";

/* ═══════════════════════════════════════════════════
   Help Center — Premium Support Hub
   Brand-aligned: navy/purple hero, coral CTAs, warm tone
   ═══════════════════════════════════════════════════ */

/* ── Article reader view ── */
function ArticleView({
  article,
  onBack,
}: {
  article: HelpArticle;
  onBack: () => void;
}) {
  const category = helpCategories.find((c) => c.id === article.categoryId);

  return (
    <FadeIn>
      <div className="max-w-2xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-900 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Help Center
        </button>

        <div className="bg-white border border-gray-100 rounded-[1.25rem] p-6 md:p-10 shadow-sm">
          {/* Category badge */}
          {category && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-50 text-gray-500 text-xs font-medium mb-4">
              <IconRenderer name={category.iconName} className="w-3.5 h-3.5" />
              {category.title}
            </div>
          )}

          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 leading-tight">
            {article.title}
          </h1>
          <p className="text-base text-gray-500 mb-8 leading-relaxed">
            {article.preview}
          </p>

          <div className="space-y-4">
            {article.body.map((paragraph, i) => (
              <p
                key={i}
                className="text-sm md:text-base text-gray-700 leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Helpful? */}
          <div className="mt-10 pt-6 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-400 mb-3">Was this helpful?</p>
            <div className="flex items-center justify-center gap-3">
              <button className="px-4 py-2 rounded-full bg-gray-50 text-sm font-medium text-gray-700 hover:bg-primary/10 hover:text-primary transition-all">
                👍 Yes, thanks!
              </button>
              <button className="px-4 py-2 rounded-full bg-gray-50 text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-500 transition-all">
                👎 Not really
              </button>
            </div>
          </div>
        </div>

        {/* Still need help mini-CTA */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            Still need help?{" "}
            <a
              href="mailto:support@hirebuddy.app"
              className="text-primary font-semibold hover:underline"
            >
              Reach out to us
            </a>
          </p>
        </div>
      </div>
    </FadeIn>
  );
}

/* ── Search suggestions dropdown ── */
function SearchSuggestions({
  results,
  onSelect,
  query,
}: {
  results: HelpArticle[];
  onSelect: (a: HelpArticle) => void;
  query: string;
}) {
  if (!query.trim() || results.length === 0) return null;

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-2xl shadow-xl z-30 overflow-hidden max-h-80 overflow-y-auto">
      <div className="p-2">
        {results.slice(0, 6).map((article) => {
          const cat = helpCategories.find((c) => c.id === article.categoryId);
          return (
            <button
              key={article.id}
              onClick={() => onSelect(article)}
              className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors group"
            >
              <div className="flex items-start gap-3">
                <BookOpen className="w-4 h-4 text-gray-400 mt-0.5 shrink-0 group-hover:text-primary transition-colors" />
                <div>
                  <p className="text-sm font-semibold text-gray-900 group-hover:text-primary transition-colors">
                    {article.title}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5 line-clamp-1 flex items-center gap-1">
                    <IconRenderer name={cat?.iconName || "BookOpen"} className="w-3 h-3" /> {cat?.title} · {article.preview}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
      {results.length > 6 && (
        <div className="px-4 py-2.5 border-t border-gray-100 bg-gray-50/50">
          <p className="text-xs text-gray-400 text-center">
            {results.length} results found
          </p>
        </div>
      )}
    </div>
  );
}

/* ── Category card ── */
function CategoryCard({
  category,
  onArticleClick,
}: {
  category: HelpCategory;
  onArticleClick: (a: HelpArticle) => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white border border-gray-100 rounded-[1.25rem] overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-5 md:p-6 text-left"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-4">
            <div className="mt-1 bg-gray-50 p-2.5 rounded-xl border border-gray-100">
              <IconRenderer name={category.iconName} className="w-6 h-6 text-primary" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900">
                {category.title}
              </h3>
              <p className="text-sm text-gray-500 mt-0.5">
                {category.description}
              </p>
              <p className="text-xs text-gray-400 mt-1.5">
                {category.articles.length} articles
              </p>
            </div>
          </div>
          <ChevronDown
            className={cn(
              "w-5 h-5 text-gray-400 transition-transform shrink-0 mt-1",
              expanded && "rotate-180"
            )}
          />
        </div>
      </button>

      {/* Accordion articles */}
      {expanded && (
        <div className="px-5 md:px-6 pb-5 md:pb-6 pt-0">
          <div className="border-t border-gray-100 pt-4 space-y-1">
            {category.articles.map((article) => (
              <button
                key={article.id}
                onClick={() => onArticleClick(article)}
                className="w-full text-left flex items-center justify-between gap-3 px-3 py-3 rounded-xl hover:bg-gray-50 transition-colors group"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900 group-hover:text-primary transition-colors">
                    {article.title}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">
                    {article.preview}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300 shrink-0 group-hover:text-primary transition-colors" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Featured article card ── */
function FeaturedCard({
  article,
  onClick,
  delay,
}: {
  article: HelpArticle;
  onClick: () => void;
  delay: number;
}) {
  const cat = helpCategories.find((c) => c.id === article.categoryId);

  return (
    <FadeIn delay={delay}>
      <button
        onClick={onClick}
        className="w-full text-left bg-white border border-gray-100 rounded-[1.25rem] p-6 shadow-sm hover:shadow-md hover:border-gray-200 transition-all group"
      >
        <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-3">
          <IconRenderer name={cat?.iconName || "BookOpen"} className="w-3.5 h-3.5" />
          <span className="font-medium">{cat?.title}</span>
        </div>
        <h3 className="text-base font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
          {article.title}
        </h3>
        <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
          {article.preview}
        </p>
        <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-primary">
          Read more <ChevronRight className="w-3.5 h-3.5" />
        </div>
      </button>
    </FadeIn>
  );
}

/* ══════════════════════════════════════════════
   MAIN PAGE
   ══════════════════════════════════════════════ */
export default function HelpCenterPage() {
  const [search, setSearch] = useState("");
  const [activeArticle, setActiveArticle] = useState<HelpArticle | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const [activeMobileCategory, setActiveMobileCategory] = useState<
    string | null
  >(null);

  const searchResults = useMemo(() => searchArticles(search), [search]);

  // Close search dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Article view
  if (activeArticle) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container-custom py-10 md:py-16">
          <ArticleView
            article={activeArticle}
            onBack={() => setActiveArticle(null)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* ════════════════════════════════
         SECTION 1 — HERO (Navy → Purple gradient)
         ════════════════════════════════ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#312e81]">
        {/* Soft glow orbs */}
        <div className="hidden sm:block absolute top-1/4 left-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full bg-purple-500/10 blur-[120px] pointer-events-none" />
        <div className="hidden sm:block absolute bottom-0 right-1/4 w-[250px] md:w-[400px] h-[250px] md:h-[400px] rounded-full bg-primary/5 blur-[100px] pointer-events-none" />

        <div className="container-custom relative pt-16 md:pt-24 pb-14 md:pb-20 text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-white/70 text-xs font-semibold mb-6 border border-white/10">
              <Heart className="w-3.5 h-3.5 text-primary" />
              We&apos;ve got you
            </div>
          </FadeIn>

          <FadeIn delay={0.05}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 tracking-tight leading-[1.1]">
              How can we help you today?
            </h1>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p className="text-lg md:text-xl text-white/60 max-w-lg mx-auto mb-10 leading-relaxed font-medium">
              Real humans. Real support. You&apos;re not alone here.
            </p>
          </FadeIn>

          {/* Search bar — premium style matching homepage */}
          <FadeIn delay={0.15}>
            <div ref={searchRef} className="relative max-w-xl mx-auto">
              <div className="relative group">
                {/* Gradient glow behind search bar */}
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-purple-400/20 rounded-full blur opacity-50 group-hover:opacity-70 transition duration-500" />
                <div className="relative bg-white p-2 pl-6 rounded-full shadow-lg flex items-center transition-all focus-within:ring-2 focus-within:ring-primary/20">
                  <Search className="h-5 w-5 text-gray-400 mr-3 shrink-0" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setShowSuggestions(true);
                    }}
                    onFocus={() => setShowSuggestions(true)}
                    placeholder="Search help articles..."
                    className="flex-1 bg-transparent outline-none text-gray-900 placeholder:text-gray-400 h-10 md:h-12 text-base md:text-lg"
                  />
                  {search ? (
                    <button
                      onClick={() => {
                        setSearch("");
                        setShowSuggestions(false);
                      }}
                      className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  ) : (
                    <button className="bg-primary hover:bg-[#F03541] text-white rounded-full p-3 md:px-6 md:py-3 font-bold transition-transform active:scale-95 shadow-md">
                      <Search className="h-5 w-5 md:hidden" />
                      <span className="hidden md:inline">Find answers</span>
                    </button>
                  )}
                </div>
              </div>

              {showSuggestions && (
                <SearchSuggestions
                  results={searchResults}
                  query={search}
                  onSelect={(a) => {
                    setActiveArticle(a);
                    setShowSuggestions(false);
                    setSearch("");
                  }}
                />
              )}
              {/* No results */}
              {showSuggestions &&
                search.trim().length > 2 &&
                searchResults.length === 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-2xl shadow-xl z-30 p-6 text-center">
                    <p className="text-sm text-gray-500">
                      We couldn&apos;t find anything for &ldquo;{search}&rdquo;
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Try a simpler term or{" "}
                      <a
                        href="mailto:support@hirebuddy.app"
                        className="text-primary font-semibold hover:underline"
                      >
                        reach out to us directly
                      </a>
                    </p>
                  </div>
                )}
            </div>
          </FadeIn>

          {/* Trust row */}
          <FadeIn delay={0.25}>
            <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-sm text-white/40 font-medium">
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary/80" />
                18 guides available
              </span>
              <span className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-purple-400/80" />
                Trusted &amp; transparent
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-white/40" />
                24h response time
              </span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ════════════════════════════════
         MOBILE — Category chips
         ════════════════════════════════ */}
      <div className="md:hidden overflow-x-auto no-scrollbar border-b border-gray-100 bg-white">
        <div className="px-4 py-3">
          <div className="flex gap-2 min-w-max">
          {helpCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() =>
                setActiveMobileCategory(
                  activeMobileCategory === cat.id ? null : cat.id
                )
              }
              className={cn(
                "flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap border transition-all",
                activeMobileCategory === cat.id
                  ? "bg-primary/10 border-primary/30 text-primary"
                  : "bg-gray-50 border-gray-100 text-gray-500"
              )}
            >
              <IconRenderer name={cat.iconName} className="w-4 h-4" />
              {cat.title}
            </button>
          ))}
          </div>
        </div>
      </div>

      <div className="container-custom py-10 md:py-16 space-y-16 md:space-y-24">
        {/* ════════════════════════════════
           SECTION 2 — CATEGORIES GRID
           ════════════════════════════════ */}
        <section>
          <FadeIn>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 tracking-tight">
              Browse by topic
            </h2>
            <p className="text-gray-500 mb-8">
              Find answers organized the way you think.
            </p>
          </FadeIn>

          {/* Desktop: grid of category cards */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-5">
            {helpCategories.map((cat, i) => (
              <FadeIn key={cat.id} delay={i * 0.05}>
                <CategoryCard
                  category={cat}
                  onArticleClick={setActiveArticle}
                />
              </FadeIn>
            ))}
          </div>

          {/* Mobile: filtered by active chip, or show all as accordion */}
          <div className="md:hidden space-y-3">
            {(activeMobileCategory
              ? helpCategories.filter((c) => c.id === activeMobileCategory)
              : helpCategories
            ).map((cat) => (
              <CategoryCard
                key={cat.id}
                category={cat}
                onArticleClick={setActiveArticle}
              />
            ))}
          </div>
        </section>

        {/* ════════════════════════════════
           SECTION 3 — FEATURED ARTICLES
           ════════════════════════════════ */}
        <section>
          <FadeIn>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 tracking-tight">
              Most helpful guides
            </h2>
            <p className="text-sm text-gray-500 mb-8">
              Start here — these answer 90% of questions.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {featuredArticles.map((article, i) => (
              <FeaturedCard
                key={article.id}
                article={article}
                onClick={() => setActiveArticle(article)}
                delay={i * 0.05}
              />
            ))}
          </div>
        </section>

        {/* ════════════════════════════════
           SECTION 4 — CONTACT SUPPORT
           ════════════════════════════════ */}
        <section>
          <FadeIn>
            <div className="bg-white border border-gray-100 rounded-[1.5rem] p-8 md:p-12 shadow-sm">
              <div className="text-center mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 tracking-tight">
                  Still need help?
                </h2>
                <p className="text-gray-500 max-w-md mx-auto">
                  Let&apos;s figure this out together. Reach out — we&apos;re
                  human too.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 max-w-3xl mx-auto">
                {/* Chat */}
                <div className="bg-gray-50 rounded-2xl p-6 text-center hover:bg-gray-100/80 transition-colors group cursor-pointer">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-gray-100 flex items-center justify-center mx-auto mb-3 shadow-sm group-hover:border-primary/20 transition-colors">
                    <MessageCircle className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
                  </div>
                  <p className="text-sm font-bold text-gray-900 mb-1">
                    Chat with us
                  </p>
                  <p className="text-xs text-gray-400">Coming soon</p>
                </div>

                {/* Email */}
                <a
                  href="mailto:support@hirebuddy.app"
                  className="bg-gray-50 rounded-2xl p-6 text-center hover:bg-gray-100/80 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white border border-gray-100 flex items-center justify-center mx-auto mb-3 shadow-sm group-hover:border-primary/20 transition-colors">
                    <Mail className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
                  </div>
                  <p className="text-sm font-bold text-gray-900 mb-1">
                    Email support
                  </p>
                  <p className="text-xs text-primary font-medium">
                    support@hirebuddy.app
                  </p>
                </a>

                {/* Report */}
                <div className="bg-gray-50 rounded-2xl p-6 text-center hover:bg-gray-100/80 transition-colors group cursor-pointer">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-gray-100 flex items-center justify-center mx-auto mb-3 shadow-sm group-hover:border-red-100 transition-colors">
                    <AlertTriangle className="w-5 h-5 text-gray-400 group-hover:text-red-500 transition-colors" />
                  </div>
                  <p className="text-sm font-bold text-gray-900 mb-1">
                    Report an issue
                  </p>
                  <p className="text-xs text-gray-400">
                    We take this seriously
                  </p>
                </div>
              </div>

              {/* Response time badge */}
              <div className="flex items-center justify-center gap-2 mt-8">
                <Clock className="w-3.5 h-3.5 text-gray-400" />
                <p className="text-xs text-gray-400 font-medium">
                  Usually replies within 24 hours
                </p>
              </div>
            </div>
          </FadeIn>
        </section>

        {/* ════════════════════════════════
           SECTION 5 — COMMUNITY — Dark CTA banner
           ════════════════════════════════ */}
        <section>
          <FadeIn>
            <div className="relative bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 rounded-[1.5rem] px-6 py-10 md:px-12 md:py-14 text-center overflow-hidden">
              {/* Decorative glow */}
              <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 right-0 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

              <div className="relative z-10">
                <Shield className="w-8 h-8 text-primary/80 mx-auto mb-4" />
                <p className="text-lg md:text-xl text-white leading-relaxed font-medium max-w-lg mx-auto">
                  We built HireBuddy to feel safe and human.
                </p>
                <p className="text-lg md:text-xl text-white/60 leading-relaxed font-medium mt-2 max-w-lg mx-auto">
                  If something feels wrong, trust your instinct and report it.
                </p>
                <p className="text-lg md:text-xl text-primary font-bold mt-2">
                  We&apos;re always here.
                </p>

                <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center items-center">
                  <Link
                    href="/buddies"
                    className="inline-flex items-center gap-2 bg-[#FF6B6B] hover:bg-[#ff5252] text-white rounded-full px-8 py-4 font-bold text-base transition-all hover:scale-105 active:scale-95 shadow-xl shadow-red-500/20"
                  >
                    Find your buddy
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/security"
                    className="inline-flex items-center gap-2 text-white/50 hover:text-white font-semibold px-5 py-3 rounded-full transition-colors text-sm border border-white/10 hover:border-white/20"
                  >
                    <Shield className="w-4 h-4" />
                    Our safety promise
                  </Link>
                </div>

                <p className="mt-6 text-xs text-gray-500 italic">
                  You&apos;re safe here. This is a space built on trust.
                </p>
              </div>
            </div>
          </FadeIn>
        </section>
      </div>
    </div>
  );
}
