import type { BlogAuthor } from "@/data/blog";
import { getFullImageUrl } from "@/lib/utils";

interface AuthorBlockProps {
  author: BlogAuthor;
}

/**
 * Author card shown at the bottom of each article — builds founder/writer brand.
 */
export function AuthorBlock({ author }: AuthorBlockProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 p-6 sm:p-8 bg-gray-50 rounded-2xl border border-gray-100 mt-12">
      <div className="shrink-0">
        <img
          src={getFullImageUrl(author.avatar)}
          alt={author.name}
          width={72}
          height={72}
          className="w-[72px] h-[72px] rounded-full object-cover ring-2 ring-white shadow-md"
        />
      </div>
      <div className="text-center sm:text-left">
        <p className="text-xs font-bold text-primary uppercase tracking-wide mb-1">
          Written by
        </p>
        <h3 className="text-lg font-bold text-gray-900 mb-0.5">
          {author.name}
        </h3>
        <p className="text-sm text-gray-500 mb-2">{author.role}</p>
        <p className="text-sm text-gray-600 leading-relaxed max-w-lg">
          {author.bio}
        </p>
      </div>
    </div>
  );
}
