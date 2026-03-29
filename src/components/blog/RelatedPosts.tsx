import Link from "next/link";
import { Clock } from "lucide-react";
import type { BlogArticle } from "@/data/blog";
import { getFullImageUrl } from "@/lib/utils";

interface RelatedPostsProps {
  articles: BlogArticle[];
}

/**
 * Grid of related blog posts — shown below the CTA.
 * Responsive: 1 col on mobile, 3 on desktop.
 */
export function RelatedPosts({ articles }: RelatedPostsProps) {
  if (!articles.length) return null;

  return (
    <section className="my-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-8 tracking-tight">
        Keep Reading
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.slice(0, 3).map((article) => (
          <Link
            key={article.slug}
            href={`/blog/${article.slug}`}
            className="group block bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-md hover:border-gray-200 transition-all duration-300"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src={getFullImageUrl(article.coverImage)}
                alt={article.coverImageAlt}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2 mb-2.5">
                <span className="text-[11px] font-bold text-primary uppercase tracking-wide">
                  {article.category}
                </span>
                <span className="text-[11px] text-gray-300">·</span>
                <span className="text-[11px] text-gray-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {article.readTime}
                </span>
              </div>
              <h3 className="text-base font-bold text-gray-900 leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2">
                {article.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
                {article.excerpt}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
