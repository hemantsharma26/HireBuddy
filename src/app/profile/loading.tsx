import { SkeletonProfile } from "@/components/skeleton";

export default function ProfileLoading() {
  return (
    <div className="min-h-screen bg-section">
      <SkeletonProfile />
    </div>
  );
}
