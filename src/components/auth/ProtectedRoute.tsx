"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

/* ──────────────────────────────────────────
   ProtectedRoute — Gate component
   ────────────────────────────────────────── */

interface ProtectedRouteProps {
  children: React.ReactNode;
  /** Optional custom redirect, defaults to /login */
  redirectTo?: string;
}

/**
 * Wrap any page content with this component to enforce authentication.
 *
 * While auth is hydrating from localStorage it shows a loading state.
 * Once hydrated, if no token is present it redirects to /login with
 * the current path as the `redirect` query param.
 */
export function ProtectedRoute({
  children,
  redirectTo = "/login",
}: ProtectedRouteProps) {
  const { isLoggedIn, isReady } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isReady && !isLoggedIn) {
      router.push(`${redirectTo}?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [isReady, isLoggedIn, router, redirectTo, pathname]);

  // Still loading auth from localStorage
  if (!isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-gray-200 border-t-primary rounded-full animate-spin" />
          <p className="text-sm text-gray-400 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  // Not authenticated — redirect in progress
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-sm text-gray-400 font-medium">
          Redirecting to login...
        </p>
      </div>
    );
  }

  // Authenticated — render children
  return <>{children}</>;
}
