"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Globe, User, LogOut, ChevronDown, Sun, Moon, Pencil, Menu, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/hooks/useTheme";
import { cn, getFullImageUrl } from "@/lib/utils";

const navLinks = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/buddies", label: "Find Buddy" },
  { href: "/post-request", label: "Post Situation" },
  { href: "/requests", label: "Open Requests" },
  { href: "/explore", label: "Explore" },
  { href: "/events", label: "Event" },
];

export function Navbar() {
  const { isLoggedIn, isReady, user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Get initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/80 border-b border-black/5 shadow-sm h-16 md:h-20 transition-all duration-300">
      <div className="container-custom h-full flex items-center justify-between gap-4">
        {/* Left: Brand */}
        <Link href="/" className="flex items-center shrink-0">
          <span className="text-2xl md:text-3xl font-extrabold text-primary tracking-tighter">
            Hirebuddy
          </span>
        </Link>

        {/* Center: Navigation Links — Desktop only */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-bold transition-all whitespace-nowrap relative group py-2",
                  isActive 
                    ? "text-primary px-1" 
                    : "text-gray-500 hover:text-gray-900"
                )}
              >
                {link.label}
                {/* Active Indicator Line */}
                <span className={cn(
                  "absolute bottom-0 left-0 w-full h-0.5 bg-primary transform origin-left transition-transform duration-300 rounded-full",
                  isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100 opacity-30"
                )} />
              </Link>
            );
          })}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3 md:gap-6 shrink-0">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="flex items-center justify-center w-9 h-9 rounded-full border border-border bg-background hover:bg-muted text-foreground transition-all"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>

          <button className="hidden lg:flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-primary transition-colors">
            <Globe className="h-4 w-4" />
            English
          </button>

          {/* ── Auth State ── */}
          {!isReady ? (
            /* Loading shimmer while hydrating */
            <div className="w-24 h-9 bg-gray-100 rounded-xl animate-pulse" />
          ) : isLoggedIn && user ? (
            /* ── Logged In: Profile Dropdown ── */
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2.5 pl-1 pr-3 py-1 rounded-full border-2 border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-all"
              >
                {/* Avatar */}
                {user.profilePicture ? (
                  <img
                    src={getFullImageUrl(user.profilePicture)}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                    {getInitials(user.name)}
                  </div>
                )}
                <span className="hidden sm:block text-sm font-bold text-gray-700 max-w-[100px] truncate">
                  {user.name.split(" ")[0]}
                </span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-gray-400 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl border border-gray-100 shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  {/* User Info */}
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-bold text-gray-900 truncate">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-400 truncate mt-0.5">
                      {user.email}
                    </p>
                  </div>

                  {/* Menu Items */}
                  <div className="py-1">
                    <Link
                      href="/profile"
                      onClick={() => setDropdownOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-4 py-2.5 text-sm font-bold transition-colors",
                        pathname === "/profile" ? "text-primary bg-primary/5" : "text-gray-700 hover:bg-gray-50 hover:text-primary"
                      )}
                    >
                      <User className="w-4 h-4" />
                      My Profile
                    </Link>
                    <Link
                      href="/edit-profile"
                      onClick={() => setDropdownOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-4 py-2.5 text-sm font-bold transition-colors",
                        pathname === "/edit-profile" ? "text-primary bg-primary/5" : "text-gray-700 hover:bg-gray-50 hover:text-primary"
                      )}
                    >
                      <Pencil className="w-4 h-4" />
                      Edit Profile
                    </Link>
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        logout();
                      }}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      Log out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* ── Not Logged In: Login / Signup ── */
            <>
              <Link
                href="/login"
                className={cn(
                  "hidden sm:block text-sm font-bold transition-colors",
                  pathname === "/login" ? "text-primary" : "text-gray-700 hover:text-primary"
                )}
              >
                Log in
              </Link>

              <Link
                href="/signup"
                className={cn(
                  "rounded-xl px-4 sm:px-5 py-2 sm:py-2.5 text-sm font-bold transition-all shadow-sm active:scale-95",
                  pathname === "/signup" 
                  ? "bg-primary text-white" 
                  : "bg-gray-900 text-white hover:bg-gray-800"
                )}
              >
                Sign up
              </Link>
            </>
          )}

          {/* Hamburger — Mobile only */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl hover:bg-gray-100 transition-colors"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* ── Mobile Drawer ── */}
      {mobileOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="container-custom py-4 space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center px-4 py-3 text-base font-bold rounded-xl transition-colors",
                    isActive 
                      ? "text-primary bg-primary/5" 
                      : "text-gray-700 hover:text-primary hover:bg-gray-50"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}

            {/* Login link for mobile — visible when not logged in */}
            {!isLoggedIn && (
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className={cn(
                   "flex items-center px-4 py-3 text-base font-bold rounded-xl transition-colors sm:hidden",
                   pathname === "/login" ? "text-primary bg-primary/5" : "text-gray-700 hover:text-primary hover:bg-gray-50"
                )}
              >
                Log in
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
