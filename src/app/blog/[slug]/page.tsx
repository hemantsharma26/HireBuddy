import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  blogArticles,
  getArticleBySlug,
  getRelatedArticles,
  getAllSlugs,
} from "@/data/blog";
import { BlogArticleClient } from "@/app/blog/[slug]/BlogArticleClient";

/* ─── Static params for ISR / static generation ─── */

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

/* ─── Dynamic SEO metadata ─── */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "Article Not Found | HireBuddy Blog" };

  const ogUrl = `https://hirebuddy.app/blog/${article.slug}`;

  return {
    title: `${article.title} | HireBuddy Blog`,
    description: article.excerpt,
    keywords: article.tags.join(", "),
    authors: [{ name: article.author.name }],
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: ogUrl,
      siteName: "HireBuddy",
      type: "article",
      publishedTime: article.publishedAt,
      authors: [article.author.name],
      tags: article.tags,
      images: [
        {
          url: article.coverImage,
          width: 1200,
          height: 630,
          alt: article.coverImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: [article.coverImage],
    },
  };
}

/* ─── Page component ─── */

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const related = getRelatedArticles(article);

  // Structured data (JSON-LD Article schema)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    image: article.coverImage,
    datePublished: article.publishedAt,
    author: {
      "@type": "Person",
      name: article.author.name,
      jobTitle: article.author.role,
    },
    publisher: {
      "@type": "Organization",
      name: "HireBuddy",
      url: "https://hirebuddy.app",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://hirebuddy.app/blog/${article.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogArticleClient article={article} related={related} />
    </>
  );
}
