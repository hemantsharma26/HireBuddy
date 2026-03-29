import { cn } from "@/lib/utils";

/* ═══════════════════════════════════════════════════
   Skeleton Primitives — Universal shimmer loading
   Soft gray gradient, rounded, 1.4s loop
   ═══════════════════════════════════════════════════ */

/** Base shimmer block — pass w/h/rounded via className */
export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-shimmer rounded-lg bg-gradient-to-r from-gray-100 via-gray-200/70 to-gray-100 bg-[length:200%_100%]",
        className
      )}
    />
  );
}

/* ── Prebuilt Skeleton Shapes ── */

export function SkeletonAvatar({
  size = "md",
  className,
}: {
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const sizeMap = { sm: "w-8 h-8", md: "w-10 h-10", lg: "w-14 h-14" };
  return <Skeleton className={cn("rounded-full shrink-0", sizeMap[size], className)} />;
}

export function SkeletonText({
  lines = 3,
  className,
}: {
  lines?: number;
  className?: string;
}) {
  return (
    <div className={cn("space-y-2.5", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn("h-3.5 rounded-md", i === lines - 1 ? "w-3/4" : "w-full")}
        />
      ))}
    </div>
  );
}

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-[1.25rem] border border-gray-100 bg-white p-5 space-y-4",
        className
      )}
    >
      {/* Image area */}
      <Skeleton className="w-full h-40 rounded-xl" />
      {/* Title */}
      <Skeleton className="h-5 w-3/4 rounded-md" />
      {/* Subtitle */}
      <Skeleton className="h-3.5 w-1/2 rounded-md" />
      {/* Body text */}
      <SkeletonText lines={2} />
      {/* Action row */}
      <div className="flex items-center justify-between pt-1">
        <SkeletonAvatar size="sm" />
        <Skeleton className="h-8 w-20 rounded-full" />
      </div>
    </div>
  );
}

export function SkeletonBuddyCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-gray-100 bg-white overflow-hidden flex flex-col",
        className
      )}
    >
      <Skeleton className="w-full aspect-[4/3] rounded-none" />
      <div className="p-5 space-y-3">
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-28 rounded-md" />
          <Skeleton className="h-4 w-4 rounded-full" />
        </div>
        <Skeleton className="h-3 w-20 rounded-md" />
        <SkeletonText lines={2} />
        <div className="flex items-center justify-between pt-2">
          <Skeleton className="h-4 w-16 rounded-md" />
          <Skeleton className="h-10 w-28 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonEventCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-[1.25rem] border border-gray-100 bg-white overflow-hidden",
        className
      )}
    >
      <Skeleton className="w-full h-36 sm:h-44 rounded-none" />
      <div className="p-5 space-y-3">
        <Skeleton className="h-3 w-16 rounded-md" />
        <Skeleton className="h-5 w-3/4 rounded-md" />
        <SkeletonText lines={2} />
        <div className="flex items-center justify-between pt-2">
          <div className="flex -space-x-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <SkeletonAvatar key={i} size="sm" />
            ))}
          </div>
          <Skeleton className="h-9 w-20 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonList({
  count = 4,
  className,
}: {
  count?: number;
  className?: string;
}) {
  return (
    <div className={cn("space-y-3", className)}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 p-3">
          <SkeletonAvatar size="md" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-1/3 rounded-md" />
            <Skeleton className="h-3 w-2/3 rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function SkeletonProfile({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-6", className)}>
      {/* Hero area */}
      <div className="flex items-center gap-5">
        <SkeletonAvatar size="lg" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-6 w-40 rounded-md" />
          <Skeleton className="h-3.5 w-28 rounded-md" />
        </div>
      </div>
      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-16 rounded-xl" />
        ))}
      </div>
      {/* Bio */}
      <SkeletonText lines={4} />
      {/* Gallery */}
      <div className="grid grid-cols-2 gap-3">
        <Skeleton className="h-32 rounded-xl" />
        <Skeleton className="h-32 rounded-xl" />
      </div>
    </div>
  );
}

/** Grid of skeleton cards for list pages */
export function SkeletonGrid({
  count = 6,
  variant = "card",
  className,
}: {
  count?: number;
  variant?: "card" | "buddy" | "event";
  className?: string;
}) {
  const Card =
    variant === "buddy"
      ? SkeletonBuddyCard
      : variant === "event"
        ? SkeletonEventCard
        : SkeletonCard;

  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
        className
      )}
    >
      {Array.from({ length: count }).map((_, i) => (
        <Card key={i} />
      ))}
    </div>
  );
}
