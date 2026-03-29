"use client";

import { useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { loginUser, sendOtp, verifyOtp, type ApiError } from "@/lib/api";
import { FadeIn } from "@/components/ui/FadeIn";
import Link from "next/link";
import {
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Smartphone,
  Lock,
  Loader2,
} from "lucide-react";
import { Suspense } from "react";
import { cn } from "@/lib/utils";

type LoginMode = "otp" | "password";

function LoginForm() {
  const [mode, setMode] = useState<LoginMode>("otp");

  // Shared
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { setAuth } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  // Password mode
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // OTP mode
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [resendTimer, setResendTimer] = useState(0);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  /* ── OTP helpers ── */
  const handleSendOtp = async () => {
    if (!phone.trim() || phone.length < 10) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      await sendOtp({ phoneNumber: phone.trim() });
      setOtpSent(true);
      setResendTimer(30);
      const timer = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      // Focus first OTP box
      setTimeout(() => otpRefs.current[0]?.focus(), 100);
    } catch (err: unknown) {
      const typed = err as ApiError;
      setError(typed.message || "Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (idx: number, val: string) => {
    if (!/^\d*$/.test(val)) return;
    const newOtp = [...otp];
    newOtp[idx] = val.slice(-1);
    setOtp(newOtp);

    // Auto-focus next
    if (val && idx < 5) {
      otpRefs.current[idx + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (
    idx: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      otpRefs.current[idx - 1]?.focus();
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const code = otp.join("");
    if (code.length < 6) {
      setError("Please enter the complete 6-digit OTP.");
      return;
    }
    setLoading(true);

    try {
      const res = await verifyOtp({
        phoneNumber: phone.trim(),
        otp: code,
      });

      setAuth(res.token, {
        id: res.user._id,
        name: res.user.displayName,
        email: res.user.email,
        phone: res.user.phoneNumber,
        profilePicture: res.user.profilePicture,
        role: res.user.role,
      });
      router.push(redirect);
    } catch (err: unknown) {
      const typed = err as ApiError;
      setError(typed.message || "Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /* ── Password submit ── */
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password.");
      return;
    }
    setLoading(true);
    try {
      const res = await loginUser({ email: email.trim(), password });
      setAuth(res.token, {
        id: res.user._id,
        name: res.user.displayName,
        email: res.user.email,
        phone: res.user.phoneNumber,
        profilePicture: res.user.profilePicture,
        role: res.user.role,
      });
      router.push(redirect);
    } catch (err: unknown) {
      const typed = err as ApiError;
      setError(typed.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  /* ── Reset on mode switch ── */
  const switchMode = (m: LoginMode) => {
    setMode(m);
    setError("");
    setOtpSent(false);
    setOtp(["", "", "", "", "", ""]);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-12">
      <div className="w-full max-w-md px-6">
        <FadeIn>
          {/* Header */}
          <div className="text-center mb-8">
            <Link
              href="/"
              className="text-3xl font-extrabold text-primary tracking-tighter inline-block mb-5"
            >
              Hirebuddy
            </Link>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome back
            </h1>
            <p className="text-gray-500 text-sm">
              Log in to view profiles, book buddies, and more.
            </p>
          </div>

          {/* Mode Tabs */}
          <div className="flex bg-gray-100 rounded-xl p-1 mb-8">
            <button
              onClick={() => switchMode("otp")}
              className={cn(
                "flex-1 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2",
                mode === "otp"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              )}
            >
              <Smartphone className="w-4 h-4" />
              OTP Login
            </button>
            <button
              onClick={() => switchMode("password")}
              className={cn(
                "flex-1 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2",
                mode === "password"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              )}
            >
              <Lock className="w-4 h-4" />
              Password
            </button>
          </div>

          {/* ═══════════════════════════════
              OTP MODE
              ═══════════════════════════════ */}
          {mode === "otp" && (
            <form onSubmit={handleOtpSubmit} className="space-y-5">
              {/* Phone */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Phone number
                </label>
                <div className="flex gap-2">
                  <div className="flex items-center px-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-sm font-bold text-gray-700 shrink-0">
                    +91
                  </div>
                  <input
                    type="tel"
                    maxLength={10}
                    value={phone}
                    onChange={(e) =>
                      setPhone(e.target.value.replace(/\D/g, ""))
                    }
                    placeholder="9876543210"
                    disabled={otpSent}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:border-primary focus:ring-0 outline-none transition-colors placeholder:text-gray-300 disabled:bg-gray-50 disabled:text-gray-400"
                  />
                </div>
              </div>

              {!otpSent ? (
                <>
                  {error && (
                    <p className="text-red-500 text-sm font-medium">{error}</p>
                  )}
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={loading}
                    className="w-full py-3.5 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg shadow-primary/20 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send OTP
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </>
              ) : (
                <>
                  {/* OTP Input */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Enter 6-digit OTP
                    </label>
                    <p className="text-xs text-gray-400 mb-4">
                      Sent to +91 {phone}
                      <button
                        type="button"
                        onClick={() => {
                          setOtpSent(false);
                          setOtp(["", "", "", "", "", ""]);
                        }}
                        className="text-primary font-bold ml-2 hover:underline"
                      >
                        Change
                      </button>
                    </p>
                    <div className="flex gap-2 sm:gap-2.5 justify-between">
                      {otp.map((digit, idx) => (
                        <input
                          key={idx}
                          ref={(el) => {
                            otpRefs.current[idx] = el;
                          }}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={digit}
                          onChange={(e) =>
                            handleOtpChange(idx, e.target.value)
                          }
                          onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                          className="w-full aspect-square max-w-[40px] sm:max-w-[52px] text-center text-lg sm:text-xl font-bold border-2 border-gray-200 rounded-xl focus:border-primary focus:ring-0 outline-none transition-colors"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Resend */}
                  <div className="text-center">
                    {resendTimer > 0 ? (
                      <p className="text-xs text-gray-400">
                        Resend OTP in{" "}
                        <span className="font-bold text-gray-600">
                          {resendTimer}s
                        </span>
                      </p>
                    ) : (
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        disabled={loading}
                        className="text-sm text-primary font-bold hover:underline disabled:opacity-50"
                      >
                        Resend OTP
                      </button>
                    )}
                  </div>

                  {error && (
                    <p className="text-red-500 text-sm font-medium">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg shadow-primary/20 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      <>
                        Verify & Log in
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </>
              )}
            </form>
          )}

          {/* ═══════════════════════════════
              PASSWORD MODE
              ═══════════════════════════════ */}
          {mode === "password" && (
            <form onSubmit={handlePasswordSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Email address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:border-primary focus:ring-0 outline-none transition-colors placeholder:text-gray-300"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:border-primary focus:ring-0 outline-none transition-colors placeholder:text-gray-300 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                <div className="text-right mt-1.5">
                  <Link
                    href="#"
                    className="text-xs text-primary font-semibold hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>

              {error && (
                <p className="text-red-500 text-sm font-medium">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg shadow-primary/20 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Signing you in...
                  </>
                ) : (
                  <>
                    Welcome back
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-xs text-gray-400 font-medium">or</span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          {/* Google */}
          <button className="w-full py-3 border-2 border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-3">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </button>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-sm text-gray-500">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="text-primary font-bold hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>

          {/* Trust */}
          <div className="flex flex-col items-center gap-2 mt-6">
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Your privacy is always protected</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <Lock className="w-3.5 h-3.5" />
              <span>No personal data shared without your consent</span>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
