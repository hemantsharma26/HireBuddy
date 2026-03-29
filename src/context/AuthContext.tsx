"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";

/* ──────────────────────────────────────────
   Auth Context — Token-based, localStorage
   ────────────────────────────────────────── */

const TOKEN_KEY = "hb_token";
const USER_KEY = "hb_user";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  profilePicture?: string | null;
  role?: string;
}

interface AuthContextType {
  /** Whether the user is authenticated */
  isLoggedIn: boolean;
  /** Whether the auth state has been loaded from storage */
  isReady: boolean;
  /** The current user (null if not logged in) */
  user: AuthUser | null;
  /** Auth token for API calls */
  token: string | null;
  /** Set auth state after successful login / register */
  setAuth: (token: string, user: AuthUser) => void;
  /** Clear auth state */
  logout: () => void;
  /** Redirect to login if not authenticated. Returns true if already logged in. */
  requireAuth: (returnUrl?: string) => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem(TOKEN_KEY);
      const storedUser = localStorage.getItem(USER_KEY);
      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    } catch {
      // storage unavailable
    }
    setIsReady(true);
  }, []);

  const setAuth = useCallback((newToken: string, newUser: AuthUser) => {
    setToken(newToken);
    setUser(newUser);
    try {
      localStorage.setItem(TOKEN_KEY, newToken);
      localStorage.setItem(USER_KEY, JSON.stringify(newUser));
    } catch {
      // storage unavailable
    }
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    try {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    } catch {
      // storage unavailable
    }
    router.push("/");
  }, [router]);

  const requireAuth = useCallback(
    (returnUrl?: string): boolean => {
      if (token) return true;
      const url = returnUrl
        ? `/login?redirect=${encodeURIComponent(returnUrl)}`
        : "/login";
      router.push(url);
      return false;
    },
    [token, router]
  );

  const isLoggedIn = !!token;

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, isReady, user, token, setAuth, logout, requireAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
