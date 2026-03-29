"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { events, type Event } from "@/data/explore";

/* ═══════════════════════════════════════════════════
   useUserRsvps — Standalone hook for reading RSVP data
   Reads from localStorage key "hirebuddy_rsvps"
   Works outside of RSVPProvider (read-only)
   ═══════════════════════════════════════════════════ */

const RSVP_KEY = "hirebuddy_rsvps";

function loadRsvpIds(): string[] {
  try {
    const raw = localStorage.getItem(RSVP_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function useUserRsvps() {
  const [rsvpIds, setRsvpIds] = useState<string[]>([]);

  /* ── Hydrate on mount ── */
  useEffect(() => {
    setRsvpIds(loadRsvpIds());
  }, []);

  /* ── Cross-tab sync ── */
  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === RSVP_KEY) {
        setRsvpIds(loadRsvpIds());
      }
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  /** Re-read from localStorage (useful after RSVP toggle on same page) */
  const refresh = useCallback(() => {
    setRsvpIds(loadRsvpIds());
  }, []);

  /** Check if user is going to a specific event */
  const isGoing = useCallback(
    (eventId: string) => rsvpIds.includes(eventId),
    [rsvpIds]
  );

  /** All events the user has RSVP'd to (from static dataset) */
  const rsvpEvents: Event[] = useMemo(
    () => events.filter((e) => rsvpIds.includes(e.id)),
    [rsvpIds]
  );

  return {
    rsvpIds,
    rsvpEvents,
    isGoing,
    count: rsvpIds.length,
    refresh,
  };
}
