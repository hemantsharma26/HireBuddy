"use client";

import { cn } from "@/lib/utils";

/* ═══════════════════════════════════════════════════
   Activity Indicator — "Last active", "Joined", etc.
   ═══════════════════════════════════════════════════ */

interface ActivityIndicatorProps {
  /** e.g. "2h ago", "Just now", "5 mins ago" */
  lastActive?: string;
  /** e.g. 48 */
  completedHangouts?: number;
  /** e.g. "2024" */
  joinedYear?: string;
  /** e.g. "10 mins" */
  responseTime?: string;
  layout?: "inline" | "stack";
  className?: string;
}

export function ActivityIndicator({
  lastActive,
  completedHangouts,
  joinedYear,
  responseTime,
  layout = "inline",
  className,
}: ActivityIndicatorProps) {
  const items: { label: string; value: string }[] = [];

  if (lastActive) items.push({ label: "Active", value: lastActive });
  if (completedHangouts !== undefined)
    items.push({ label: "Hangouts", value: `${completedHangouts}` });
  if (joinedYear) items.push({ label: "Joined", value: joinedYear });
  if (responseTime)
    items.push({ label: "Responds in", value: responseTime });

  if (items.length === 0) return null;

  return (
    <div
      className={cn(
        layout === "inline"
          ? "flex flex-wrap items-center gap-3"
          : "flex flex-col gap-1.5",
        className
      )}
    >
      {items.map((item) => (
        <span
          key={item.label}
          className="inline-flex items-center gap-1 text-xs text-gray-400"
        >
          <span className="font-medium text-gray-600">{item.value}</span>
          <span className="text-gray-300">·</span>
          <span>{item.label}</span>
        </span>
      ))}
    </div>
  );
}
