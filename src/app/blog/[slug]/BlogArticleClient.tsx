"use client";

import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import type { BlogArticle } from "@/data/blog";
import {
  ReadingProgressBar,
  ShareButtons,
  AuthorBlock,
  EmotionalCTA,
  RelatedPosts,
  ClapButton,
} from "@/components/blog";
import { FadeIn } from "@/components/ui/FadeIn";
import { getFullImageUrl } from "@/lib/utils";

interface Props {
  article: BlogArticle;
  related: BlogArticle[];
}

export function BlogArticleClient({ article, related }: Props) {
  const articleUrl =
    typeof window !== "undefined"
      ? window.location.href
      : `https://hirebuddy.app/blog/${article.slug}`;

  return (
    <main className="min-h-screen bg-white">
      <ReadingProgressBar />
      <ShareButtons title={article.title} url={articleUrl} />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 via-gray-50 to-white">
        {/* Subtle warm accent blob */}
        <div className="hidden sm:block absolute top-1/3 right-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full bg-primary/[0.03] blur-[120px] pointer-events-none" />

        <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-12 md:pt-20 pb-8 md:pb-12">
          <FadeIn>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600 font-medium transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
          </FadeIn>

          <FadeIn delay={0.05}>
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wide">
                {article.category}
              </span>
              {article.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-500 text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 className="text-3xl sm:text-4xl md:text-[2.75rem] lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-[1.15] mb-4">
              {article.title}
            </h1>
          </FadeIn>

          <FadeIn delay={0.15}>
            <p className="text-lg sm:text-xl text-gray-500 leading-relaxed mb-8 max-w-2xl font-medium">
              {article.subtitle}
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="flex items-center gap-4">
              <img
                src={getFullImageUrl(article.author.avatar)}
                alt={article.author.name}
                width={44}
                height={44}
                className="w-11 h-11 rounded-full object-cover ring-2 ring-white shadow-sm"
              />
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  {article.author.name}
                </p>
                <div className="flex items-center gap-3 text-xs text-gray-400 font-medium mt-0.5">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {article.date}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {article.readTime}
                  </span>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── COVER IMAGE ── */}
      <FadeIn delay={0.25}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-10 md:mb-14">
          <div className="relative aspect-[2/1] rounded-2xl overflow-hidden shadow-lg">
            <img
              src={getFullImageUrl(article.coverImage)}
              alt={article.coverImageAlt}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
          </div>
        </div>
      </FadeIn>

      {/* ── ARTICLE BODY ── */}
      <article
        id="blog-article"
        className="max-w-[720px] mx-auto px-4 sm:px-6 pb-4"
      >
        <div
          className="blog-prose"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Clap button */}
        <div className="mt-10 pt-6 border-t border-gray-100 flex items-center justify-between">
          <ClapButton slug={article.slug} />
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Tag className="w-3 h-3" />
            {article.tags.map((tag, i) => (
              <span key={tag}>
                {tag}
                {i < article.tags.length - 1 && ","}
              </span>
            ))}
          </div>
        </div>

        {/* Author block */}
        <AuthorBlock author={article.author} />

        {/* Emotional CTA */}
        <EmotionalCTA />
      </article>

      {/* ── RELATED POSTS ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-20 lg:pb-24">
        <RelatedPosts articles={related} />
      </div>

      {/* Mobile share bar spacer */}
      <div className="lg:hidden h-16" />
    </main>
  );
}
