"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";
import { X, CheckCircle2, AlertCircle, Info } from "lucide-react";

/* ═══════════════════════════════════════════════════
   Toast — Lightweight notification system
   ═══════════════════════════════════════════════════ */

type ToastType = "success" | "error" | "info";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  toast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, type: ToastType = "success") => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const remove = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toast: addToast }}>
      {children}

      {/* Toast container */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-2 items-center pointer-events-none">
        {toasts.map((t) => {
          const Icon =
            t.type === "success"
              ? CheckCircle2
              : t.type === "error"
              ? AlertCircle
              : Info;
          return (
            <div
              key={t.id}
              className={cn(
                "pointer-events-auto flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl border backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-300 max-w-sm",
                t.type === "success" &&
                  "bg-white border-gray-100 text-gray-900",
                t.type === "error" &&
                  "bg-red-50 border-red-100 text-red-700",
                t.type === "info" &&
                  "bg-white border-gray-100 text-gray-900"
              )}
            >
              <Icon
                className={cn(
                  "w-5 h-5 shrink-0",
                  t.type === "success" && "text-primary",
                  t.type === "error" && "text-red-500",
                  t.type === "info" && "text-blue-500"
                )}
              />
              <span className="text-sm font-medium leading-snug flex-1">
                {t.message}
              </span>
              <button
                onClick={() => remove(t.id)}
                className="shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside ToastProvider");
  return ctx;
}
