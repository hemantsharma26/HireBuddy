"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { registerUser, type ApiError } from "@/lib/api";
import { FadeIn } from "@/components/ui/FadeIn";
import Link from "next/link";
import {
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  User,
  Mail,
  Phone,
  Calendar,
  Lock,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState<1 | 2>(1);
  const [loading, setLoading] = useState(false);

  const { setAuth } = useAuth();
  const router = useRouter();

  /* ── Validation ── */
  const validateStep1 = () => {
    if (!name.trim()) return "Please enter your full name.";
    if (!email.trim() || !email.includes("@"))
      return "Please enter a valid email address.";
    if (!phone.trim() || phone.length < 10)
      return "Please enter a valid 10-digit phone number.";
    if (!dob) return "Please enter your date of birth.";
    return "";
  };

  const validateStep2 = () => {
    if (password.length < 6) return "Password must be at least 6 characters.";
    if (password !== confirmPassword) return "Passwords do not match.";
    if (!agreed) return "Please agree to the Terms & Privacy Policy.";
    return "";
  };

  const handleNext = () => {
    const err = validateStep1();
    if (err) {
      setError(err);
      return;
    }
    setError("");
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validateStep2();
    if (err) {
      setError(err);
      return;
    }
    setError("");
    setLoading(true);

    try {
      const res = await registerUser({
        displayName: name.trim(),
        email: email.trim(),
        phoneNumber: phone.trim(),
        dateOfBirth: dob,
        password,
      });

      // Auto-login on successful registration
      setAuth(res.token || "registered", {
        id: res.id || "",
        name: res.displayName || name,
        email: res.email || email,
      });
      router.push("/");
    } catch (apiErr: unknown) {
      const typed = apiErr as ApiError;
      setError(typed.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /* ── Password strength ── */
  const getPasswordStrength = () => {
    if (password.length === 0) return { label: "", color: "", width: "0%" };
    if (password.length < 4)
      return { label: "Weak", color: "bg-red-400", width: "25%" };
    if (password.length < 6)
      return { label: "Fair", color: "bg-yellow-400", width: "50%" };
    if (password.length < 8)
      return { label: "Good", color: "bg-blue-400", width: "75%" };
    return { label: "Strong", color: "bg-green-500", width: "100%" };
  };

  const strength = getPasswordStrength();

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
              Create your account
            </h1>
            <p className="text-gray-500 text-sm">
              Join a community of real people helping each other.
            </p>
          </div>

          {/* Step Indicator */}
          <div className="flex items-center gap-3 mb-8">
            <div className="flex-1">
              <div
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  step >= 1 ? "bg-primary" : "bg-gray-200"
                )}
              />
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-2">
                Personal Info
              </p>
            </div>
            <div className="flex-1">
              <div
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  step >= 2 ? "bg-primary" : "bg-gray-200"
                )}
              />
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-2">
                Set Password
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* ═══════════════════════════════
                STEP 1: Personal Info
                ═══════════════════════════════ */}
            {step === 1 && (
              <div className="space-y-5">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your full name"
                      className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:border-primary focus:ring-0 outline-none transition-colors placeholder:text-gray-300"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:border-primary focus:ring-0 outline-none transition-colors placeholder:text-gray-300"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <div className="flex gap-2">
                    <div className="flex items-center px-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-sm font-bold text-gray-700 shrink-0">
                      +91
                    </div>
                    <div className="relative flex-1">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="tel"
                        maxLength={10}
                        value={phone}
                        onChange={(e) =>
                          setPhone(e.target.value.replace(/\D/g, ""))
                        }
                        placeholder="9876543210"
                        className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:border-primary focus:ring-0 outline-none transition-colors placeholder:text-gray-300"
                      />
                    </div>
                  </div>
                </div>

                {/* Date of Birth */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Date of Birth
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="date"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      max={new Date().toISOString().split("T")[0]}
                      className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:border-primary focus:ring-0 outline-none transition-colors text-gray-700 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                    />
                  </div>
                </div>

                {error && (
                  <p className="text-red-500 text-sm font-medium">{error}</p>
                )}

                <button
                  type="button"
                  onClick={handleNext}
                  className="w-full py-3.5 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
                >
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* ═══════════════════════════════
                STEP 2: Password
                ═══════════════════════════════ */}
            {step === 2 && (
              <div className="space-y-5">
                {/* Summary */}
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <div className="text-sm text-gray-600">
                    <p className="font-bold text-gray-900">{name}</p>
                    <p>
                      {email} · +91 {phone}
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setStep(1);
                        setError("");
                      }}
                      className="text-primary font-bold text-xs mt-1 hover:underline"
                    >
                      Edit details
                    </button>
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Create Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Minimum 6 characters"
                      className="w-full pl-11 pr-12 py-3 border-2 border-gray-200 rounded-xl text-sm focus:border-primary focus:ring-0 outline-none transition-colors placeholder:text-gray-300"
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

                  {/* Strength Bar */}
                  {password.length > 0 && (
                    <div className="mt-2">
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={cn(
                            "h-full rounded-full transition-all duration-300",
                            strength.color
                          )}
                          style={{ width: strength.width }}
                        />
                      </div>
                      <p className="text-xs text-gray-400 mt-1 text-right font-medium">
                        {strength.label}
                      </p>
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter your password"
                      className={cn(
                        "w-full pl-11 pr-4 py-3 border-2 rounded-xl text-sm focus:ring-0 outline-none transition-colors placeholder:text-gray-300",
                        confirmPassword && confirmPassword === password
                          ? "border-green-300 focus:border-green-400"
                          : "border-gray-200 focus:border-primary"
                      )}
                    />
                    {confirmPassword && confirmPassword === password && (
                      <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500" />
                    )}
                  </div>
                </div>

                {/* Terms */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-1 w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary cursor-pointer accent-primary"
                  />
                  <label
                    htmlFor="terms"
                    className="text-xs text-gray-500 leading-relaxed cursor-pointer"
                  >
                    I agree to HireBuddy&apos;s{" "}
                    <Link href="#" className="text-primary font-bold hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="#" className="text-primary font-bold hover:underline">
                      Privacy Policy
                    </Link>
                    .
                  </label>
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
                      Setting things up...
                    </>
                  ) : (
                    <>
                      Join the community
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            )}
          </form>

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
            Sign up with Google
          </button>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-primary font-bold hover:underline"
              >
                Log in
              </Link>
            </p>
          </div>

          {/* Trust */}
          <div className="flex flex-col items-center gap-2 mt-6">
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Your data is encrypted and never shared</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <Lock className="w-3.5 h-3.5" />
              <span>All buddies undergo ID verification</span>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
