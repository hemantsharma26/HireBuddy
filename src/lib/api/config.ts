/** Base URL for backend API */
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";
export const API_V1 = `${API_BASE_URL}/api/v1`;
