"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonTap } from "@/lib/motion";
import { forwardRef, type ReactNode, type ButtonHTMLAttributes } from "react";

/* ═══════════════════════════════════════════════════
   Smart Button — Press animation + loading + glow
   Drop-in replacement for <button> with premium feel
   ═══════════════════════════════════════════════════ */

interface SmartButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  children?: ReactNode;
}

const variantStyles = {
  primary:
    "bg-[#FF6B6B] hover:bg-[#ff5252] text-white shadow-lg shadow-red-500/20 btn-glow",
  secondary:
    "bg-gray-900 hover:bg-gray-800 text-white",
  ghost:
    "bg-transparent hover:bg-gray-100 text-gray-700 border border-gray-200",
  danger:
    "bg-red-600 hover:bg-red-700 text-white",
};

const sizeStyles = {
  sm: "h-9 px-4 text-xs rounded-full",
  md: "h-11 px-6 text-sm rounded-full",
  lg: "h-12 px-8 text-base rounded-full",
};

export const SmartButton = forwardRef<HTMLButtonElement, SmartButtonProps>(
  function SmartButton(
    {
      children,
      loading = false,
      variant = "primary",
      size = "md",
      disabled,
      className,
      ...props
    },
    ref
  ) {
    return (
      <motion.button
        ref={ref}
        whileTap={!disabled && !loading ? buttonTap : undefined}
        disabled={disabled || loading}
        className={cn(
          "relative inline-flex items-center justify-center gap-2 font-bold transition-all",
          variantStyles[variant],
          sizeStyles[size],
          (disabled || loading) && "opacity-50 cursor-not-allowed pointer-events-none",
          className
        )}
        {...(props as Record<string, unknown>)}
      >
        {loading && (
          <Loader2 className="w-4 h-4 animate-spin absolute" />
        )}
        <span className={cn(loading && "invisible")}>{children}</span>
      </motion.button>
    );
  }
);
