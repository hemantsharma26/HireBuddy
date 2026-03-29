import { SkeletonGrid } from "@/components/skeleton";

export default function GroupsLoading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero skeleton */}
      <div className="bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#312e81]">
        <div className="container-custom pt-16 md:pt-24 pb-14 md:pb-20 text-center">
          <div className="h-5 w-36 bg-white/10 rounded-full mx-auto mb-6 animate-shimmer" />
          <div className="h-12 w-80 max-w-full bg-white/10 rounded-xl mx-auto mb-4 animate-shimmer" />
          <div className="h-5 w-60 bg-white/10 rounded-lg mx-auto animate-shimmer" />
        </div>
      </div>

      {/* Grid skeleton */}
      <div className="container-custom py-10">
        <SkeletonGrid variant="card" count={6} />
      </div>
    </div>
  );
}
