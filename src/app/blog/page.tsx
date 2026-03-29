"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  ArrowRight,
  BookOpen,
  Clock,
  X,
  ChevronRight,
} from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { cn, getFullImageUrl } from "@/lib/utils";
import { blogPosts, blogCategories, type BlogPost } from "@/data/company";

/* ═══════════════════════════════════════════════════
   Blog — Stories, thoughts, and human truths.
   ═══════════════════════════════════════════════════ */

function FeaturedCard({ post }: { post: BlogPost }) {
  return (
    <FadeIn>
      <Link
        href={`/blog/${post.id}`}
        className="group block bg-white border border-gray-100 rounded-[1.5rem] overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
      >
        <div className="grid md:grid-cols-2">
          <div className="relative aspect-[16/10] md:aspect-auto overflow-hidden">
            <img
              src={getFullImageUrl(post.image)} alt={post.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-primary/90 text-white text-[11px] font-bold uppercase tracking-wide">
              Featured
            </span>
          </div>
          <div className="p-7 md:p-10 flex flex-col justify-center">
            <span className="text-xs font-bold text-primary uppercase tracking-wide mb-3">
              {post.category}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-primary transition-colors">
              {post.title}
            </h2>
            <p className="text-gray-500 leading-relaxed mb-5 line-clamp-2">
              {post.excerpt}
            </p>
            <div className="flex items-center gap-4 text-xs text-gray-400 font-medium">
              <span>{post.author}</span>
              <span>·</span>
              <span>{post.date}</span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {post.readTime}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </FadeIn>
  );
}

function BlogCard({ post, delay }: { post: BlogPost; delay: number }) {
  return (
    <FadeIn delay={delay}>
      <Link
        href={`/blog/${post.id}`}
        className="group block bg-white border border-gray-100 rounded-[1.25rem] overflow-hidden shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-300 h-full"
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={getFullImageUrl(post.image)} alt={post.title}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
        </div>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[11px] font-bold text-primary uppercase tracking-wide">
              {post.category}
            </span>
            <span className="text-[11px] text-gray-300">·</span>
            <span className="text-[11px] text-gray-400 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {post.readTime}
            </span>
          </div>
          <h3 className="text-base font-bold text-gray-900 mb-2 leading-snug group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h3>
          <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-4">
            {post.excerpt}
          </p>
          <div className="flex items-center justify-between text-xs text-gray-400 font-medium">
            <span>{post.author}</span>
            <span>{post.date}</span>
          </div>
        </div>
      </Link>
    </FadeIn>
  );
}

export default function BlogPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const featured = blogPosts.find((p) => p.featured);

  const filtered = useMemo(() => {
    return blogPosts
      .filter((p) => !p.featured)
      .filter((p) => category === "All" || p.category === category)
      .filter((p) => {
        if (!search.trim()) return true;
        const q = search.toLowerCase();
        return (
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.author.toLowerCase().includes(q)
        );
      });
  }, [search, category]);

  return (
    <main className="min-h-screen bg-white">
      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#312e81]">
        <div className="hidden sm:block absolute top-1/4 left-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full bg-purple-500/10 blur-[120px] pointer-events-none" />
        <div className="hidden sm:block absolute bottom-0 right-1/4 w-[250px] md:w-[400px] h-[250px] md:h-[400px] rounded-full bg-primary/5 blur-[100px] pointer-events-none" />

        <div className="container-custom relative pt-16 md:pt-24 pb-14 md:pb-20 text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-white/70 text-xs font-semibold mb-6 border border-white/10">
              <BookOpen className="w-3.5 h-3.5 text-primary" />
              Blog
            </div>
          </FadeIn>

          <FadeIn delay={0.05}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 tracking-tight leading-[1.1]">
              Stories, thoughts, and human truths.
            </h1>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p className="text-lg md:text-xl text-white/60 max-w-xl mx-auto mb-10 leading-relaxed font-medium">
              Ideas about loneliness, connection, and modern life.
            </p>
          </FadeIn>

          {/* Search bar */}
          <FadeIn delay={0.15}>
            <div className="relative max-w-xl mx-auto">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-purple-400/20 rounded-full blur opacity-50 group-hover:opacity-70 transition duration-500" />
                <div className="relative bg-white p-2 pl-6 rounded-full shadow-lg flex items-center transition-all focus-within:ring-2 focus-within:ring-primary/20">
                  <Search className="h-5 w-5 text-gray-400 mr-3 shrink-0" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search articles..."
                    className="flex-1 bg-transparent outline-none text-gray-900 placeholder:text-gray-400 h-10 md:h-12 text-base md:text-lg"
                  />
                  {search ? (
                    <button
                      onClick={() => setSearch("")}
                      className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  ) : (
                    <button className="bg-primary hover:bg-[#F03541] text-white rounded-full p-3 md:px-6 md:py-3 font-bold transition-transform active:scale-95 shadow-md">
                      <Search className="h-5 w-5 md:hidden" />
                      <span className="hidden md:inline">Search</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="container-custom py-10 md:py-16 space-y-12 md:space-y-20">
        {/* ── Category chips ── */}
        <div className="sticky top-20 z-30 bg-white/80 backdrop-blur-md py-4 -mx-4 px-4 md:-mx-0 md:px-0">
          <FadeIn>
            <div className="flex gap-2 overflow-x-auto no-scrollbar">
              {blogCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-semibold border whitespace-nowrap transition-all duration-200",
                    category === cat
                      ? "bg-primary/10 border-primary/30 text-primary"
                      : "bg-white border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </FadeIn>
        </div>

        {/* ── Featured article ── */}
        {featured && !search && category === "All" && (
          <FeaturedCard post={featured} />
        )}

        {/* ── Grid ── */}
        <section>
          <FadeIn>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 tracking-tight">
              {category === "All" ? "Latest Articles" : category}
            </h2>
            <p className="text-gray-500 mb-8">
              {filtered.length} article{filtered.length !== 1 ? "s" : ""}
            </p>
          </FadeIn>

          {filtered.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((post, i) => (
                <BlogCard key={post.id} post={post} delay={i * 0.04} />
              ))}
            </div>
          ) : (
            <FadeIn>
              <div className="text-center py-16">
                <BookOpen className="w-10 h-10 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 font-medium">
                  No articles found.
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  Try a different search or category.
                </p>
              </div>
            </FadeIn>
          )}
        </section>

        {/* ── CTA ── */}
        <section>
          <FadeIn>
            <div className="relative bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 rounded-[1.5rem] px-6 py-10 md:px-12 md:py-14 text-center overflow-hidden">
              <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 right-0 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
              <div className="relative z-10">
                <BookOpen className="w-8 h-8 text-primary/80 mx-auto mb-4" />
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight">
                  Have a story to share?
                </h2>
                <p className="text-white/50 max-w-md mx-auto mb-8">
                  We&rsquo;re always looking for honest, human voices. Write for
                  us and reach thousands.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-[#FF6B6B] hover:bg-[#ff5252] text-white rounded-full px-8 py-4 font-bold text-base transition-all hover:scale-105 active:scale-95 shadow-xl shadow-red-500/20"
                  >
                    Pitch a Story
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-2 text-white/50 hover:text-white font-semibold px-5 py-3 rounded-full transition-colors text-sm border border-white/10 hover:border-white/20"
                  >
                    About HireBuddy
                  </Link>
                </div>
              </div>
            </div>
          </FadeIn>
        </section>
      </div>
    </main>
  );
}
