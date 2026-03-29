export default function BackgroundBlobs({ intensity = "medium" }: { intensity?: "strong" | "medium" | "light" }) {
  const opacity =
    intensity === "strong"
      ? "opacity-20"
      : intensity === "light"
      ? "opacity-10"
      : "opacity-15";

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Left blob */}
      <div
        className={`absolute -left-32 top-10 h-72 w-72 rounded-[40px] bg-purple-200 blur-3xl ${opacity}`}
      />

      {/* Right blob */}
      <div
        className={`absolute -right-32 bottom-10 h-72 w-72 rounded-[40px] bg-pink-200 blur-3xl ${opacity}`}
      />
    </div>
  );
}
