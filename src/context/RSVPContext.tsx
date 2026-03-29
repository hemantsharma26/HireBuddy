"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useAuth } from "@/context/AuthContext";

/* ═══════════════════════════════════════════════════
   RSVP Context — Frontend-only RSVP management
   Persistence: localStorage  |  No API calls
   ═══════════════════════════════════════════════════ */

interface RSVPState {
  isGoing: boolean;
  attendees: number;
  loading: boolean;
}

interface RSVPContextType {
  /** Get RSVP state for an event */
  getState: (eventId: string) => RSVPState;
  /** Toggle RSVP — returns true if successful */
  toggleRSVP: (eventId: string) => Promise<boolean>;
  /** Whether user needs to log in (set true to show modal) */
  showLoginModal: boolean;
  setShowLoginModal: (v: boolean) => void;
}

const RSVPContext = createContext<RSVPContextType | null>(null);

/* ── localStorage keys ── */
const RSVP_KEY = "hirebuddy_rsvps"; // string[] of eventIds
const ATTENDEE_KEY = "hirebuddy_attendees"; // Record<string, number>

/** Load RSVP set from localStorage */
function loadRsvpSet(): Set<string> {
  try {
    const raw = localStorage.getItem(RSVP_KEY);
    const arr: string[] = raw ? JSON.parse(raw) : [];
    return new Set(arr);
  } catch {
    return new Set();
  }
}

/** Save RSVP set to localStorage */
function saveRsvpSet(set: Set<string>) {
  try {
    localStorage.setItem(RSVP_KEY, JSON.stringify([...set]));
  } catch {
    /* noop */
  }
}

/** Load persisted attendee counts */
function loadAttendees(): Record<string, number> {
  try {
    const raw = localStorage.getItem(ATTENDEE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

/** Save attendee counts */
function saveAttendees(map: Record<string, number>) {
  try {
    localStorage.setItem(ATTENDEE_KEY, JSON.stringify(map));
  } catch {
    /* noop */
  }
}

/** Fake network delay (500-800 ms) */
const fakeDelay = () =>
  new Promise<void>((r) => setTimeout(r, 500 + Math.random() * 300));

export function RSVPProvider({
  children,
  initialAttendees,
}: {
  children: ReactNode;
  /** Map of eventId → initial attendee count from static data */
  initialAttendees: Record<string, number>;
}) {
  const { isLoggedIn } = useAuth();

  // Core state
  const [rsvpMap, setRsvpMap] = useState<Record<string, boolean>>({});
  const [attendeeMap, setAttendeeMap] = useState<Record<string, number>>(
    initialAttendees
  );
  const [loadingMap, setLoadingMap] = useState<Record<string, boolean>>({});
  const [showLoginModal, setShowLoginModal] = useState(false);

  /* ── Hydrate from localStorage on mount ── */
  useEffect(() => {
    const rsvpSet = loadRsvpSet();
    const persistedAttendees = loadAttendees();

    // Build rsvpMap from set
    const map: Record<string, boolean> = {};
    rsvpSet.forEach((eid) => {
      map[eid] = true;
    });

    // Merge attendee counts: use persisted if available, else initial
    const merged = { ...initialAttendees };
    Object.entries(persistedAttendees).forEach(([eid, count]) => {
      if (initialAttendees[eid] !== undefined) {
        merged[eid] = count;
      }
    });

    if (isLoggedIn) {
      setRsvpMap(map);
    }
    setAttendeeMap(merged);
  }, [isLoggedIn]); // eslint-disable-line react-hooks/exhaustive-deps

  /* ── Cross-tab sync ── */
  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === RSVP_KEY && e.newValue) {
        try {
          const arr: string[] = JSON.parse(e.newValue);
          const map: Record<string, boolean> = {};
          arr.forEach((eid) => {
            map[eid] = true;
          });
          setRsvpMap(map);
        } catch {
          /* noop */
        }
      }
      if (e.key === ATTENDEE_KEY && e.newValue) {
        try {
          const counts: Record<string, number> = JSON.parse(e.newValue);
          setAttendeeMap((prev) => ({ ...prev, ...counts }));
        } catch {
          /* noop */
        }
      }
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  const getState = useCallback(
    (eventId: string): RSVPState => ({
      isGoing: rsvpMap[eventId] ?? false,
      attendees: attendeeMap[eventId] ?? 0,
      loading: loadingMap[eventId] ?? false,
    }),
    [rsvpMap, attendeeMap, loadingMap]
  );

  const toggleRSVP = useCallback(
    async (eventId: string): Promise<boolean> => {
      // Auth guard
      if (!isLoggedIn) {
        setShowLoginModal(true);
        return false;
      }

      // Prevent double-click
      if (loadingMap[eventId]) return false;

      const wasGoing = rsvpMap[eventId] ?? false;
      const newGoing = !wasGoing;

      // Optimistic update
      setRsvpMap((prev) => ({ ...prev, [eventId]: newGoing }));
      setAttendeeMap((prev) => {
        const updated = {
          ...prev,
          [eventId]: (prev[eventId] ?? 0) + (newGoing ? 1 : -1),
        };
        return updated;
      });
      setLoadingMap((prev) => ({ ...prev, [eventId]: true }));

      try {
        // Simulate network request
        await fakeDelay();

        // Persist RSVP set
        const rsvpSet = loadRsvpSet();
        if (newGoing) {
          rsvpSet.add(eventId);
        } else {
          rsvpSet.delete(eventId);
        }
        saveRsvpSet(rsvpSet);

        // Persist attendee counts
        setAttendeeMap((prev) => {
          saveAttendees(prev);
          return prev;
        });

        return true;
      } catch {
        // Rollback optimistic update
        setRsvpMap((prev) => ({ ...prev, [eventId]: wasGoing }));
        setAttendeeMap((prev) => ({
          ...prev,
          [eventId]: (prev[eventId] ?? 0) + (wasGoing ? 1 : -1),
        }));
        return false;
      } finally {
        setLoadingMap((prev) => ({ ...prev, [eventId]: false }));
      }
    },
    [isLoggedIn, rsvpMap, loadingMap]
  );

  const value = useMemo(
    () => ({ getState, toggleRSVP, showLoginModal, setShowLoginModal }),
    [getState, toggleRSVP, showLoginModal]
  );

  return <RSVPContext.Provider value={value}>{children}</RSVPContext.Provider>;
}

export function useRSVP() {
  const ctx = useContext(RSVPContext);
  if (!ctx) throw new Error("useRSVP must be used inside RSVPProvider");
  return ctx;
}
