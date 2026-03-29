import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { API_BASE_URL } from "./api/config";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Returns the full URL for an image. 
 * If it's a relative path (starts with /), it prefixes with API_BASE_URL.
 * If it's already an absolute URL (starts with http or data:), it returns as-is.
 */
export function getFullImageUrl(path: string | null | undefined): string | undefined {
  if (!path) return undefined;
  if (path.startsWith("http") || path.startsWith("data:")) {
    return path;
  }
  // Ensure we don't have double slashes
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${cleanPath}`;
}
