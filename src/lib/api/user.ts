import { API_V1 } from "./config";
import type { ApiError } from "./types";

/**
 * Sync FCM token with the backend.
 * 
 * PUT /api/v1/users/me/fcm-token
 */
export async function syncFcmToken(token: string, authToken: string): Promise<boolean> {
  const res = await fetch(`${API_V1}/users/me/fcm-token`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify({ fcmToken: token }),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const error: ApiError = {
      message: body.message || `Failed to sync FCM token (${res.status})`,
      status: res.status,
    };
    console.error("FCM Sync Error:", error);
    return false;
  }

  return true;
}
