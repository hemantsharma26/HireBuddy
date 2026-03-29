"use client";

import { useState, useEffect } from "react";
import { Twitter, Facebook, Linkedin, Link2, Check, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ShareButtonsProps {
  title: string;
  url: string;
}

function ShareBtn({
  icon: Icon,
  label,
  onClick,
  className,
}: {
  icon: React.ElementType;
  label: string;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      title={label}
      className={cn(
        "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95",
        "bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700",
        className
      )}
    >
      <Icon className="w-4 h-4" />
    </button>
  );
}

/**
 * Sticky share buttons — vertical on desktop (left side), horizontal bar on mobile (bottom).
 * Only visible while the article body is in view.
 */
export function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const article = document.getElementById("blog-article");
      if (!article) return;

      const rect = article.getBoundingClientRect();
      const windowH = window.innerHeight;

      // Show when article top is above viewport center and bottom is still below viewport top + 100
      const show = rect.top < windowH * 0.5 && rect.bottom > 100;
      setVisible(show);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  function copyLink() {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const shares = [
    {
      icon: Twitter,
      label: "Share on X (Twitter)",
      onClick: () =>
        window.open(
          `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
          "_blank"
        ),
    },
    {
      icon: Facebook,
      label: "Share on Facebook",
      onClick: () =>
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
          "_blank"
        ),
    },
    {
      icon: Linkedin,
      label: "Share on LinkedIn",
      onClick: () =>
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
          "_blank"
        ),
    },
    {
      icon: MessageCircle,
      label: "Share on WhatsApp",
      onClick: () =>
        window.open(
          `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
          "_blank"
        ),
    },
    {
      icon: copied ? Check : Link2,
      label: copied ? "Copied!" : "Copy link",
      onClick: copyLink,
      className: copied ? "bg-green-100 text-green-600 hover:bg-green-100" : undefined,
    },
  ];

  return (
    <>
      {/* Desktop — sticky left column, only visible during article reading */}
      <div
        className={cn(
          "hidden xl:flex fixed left-6 2xl:left-10 top-1/2 -translate-y-1/2 z-40 flex-col gap-3 transition-all duration-300",
          visible
            ? "opacity-100 translate-x-0"
            : "opacity-0 -translate-x-4 pointer-events-none"
        )}
      >
        {shares.map((s) => (
          <ShareBtn key={s.label} {...s} />
        ))}
      </div>

      {/* Mobile / Tablet — bottom bar */}
      <div
        className={cn(
          "xl:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-t border-gray-100 px-4 py-3 transition-all duration-300",
          visible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-full pointer-events-none"
        )}
      >
        <div className="flex items-center justify-center gap-4">
          {shares.map((s) => (
            <ShareBtn key={s.label} {...s} />
          ))}
        </div>
      </div>
    </>
  );
}
