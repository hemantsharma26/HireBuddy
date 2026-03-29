"use client";

import { useEffect, useCallback } from "react";
import { getToken, onMessage } from "firebase/messaging";
import { messaging } from "../lib/firebase";
import { useAuth } from "../context/AuthContext";
import { syncFcmToken } from "../lib/api/user";

// TODO: Replace with your actual VAPID key from Firebase Console
// Project Settings -> Cloud Messaging -> Web Push certificates -> Key pair
const VAPID_KEY = "YOUR_VAPID_KEY";

export default function FirebaseTokenManager() {
  const { isLoggedIn, token: authToken } = useAuth();

  const handleSyncToken = useCallback(async () => {
    if (!messaging || !isLoggedIn || !authToken) return;

    try {
      // 1. Request permission
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        console.warn("Notification permission not granted");
        return;
      }

      // 2. Get token
      const currentToken = await getToken(messaging, {
        vapidKey: VAPID_KEY,
      });

      if (currentToken) {
        console.log("FCM Token obtained:", currentToken);
        // 3. Sync with backend
        const success = await syncFcmToken(currentToken, authToken);
        if (success) {
          console.info("FCM Token synced with backend successfully");
        }
      } else {
        console.warn("No registration token available. Request permission to generate one.");
      }
    } catch (err) {
      console.error("An error occurred while retrieving token:", err);
    }
  }, [isLoggedIn, authToken]);

  useEffect(() => {
    if (isLoggedIn) {
      handleSyncToken();
    }
  }, [isLoggedIn, handleSyncToken]);

  useEffect(() => {
    if (messaging) {
      const unsubscribe = onMessage(messaging, (payload) => {
        console.log("Message received in foreground: ", payload);
        // Custom logic to show in-app notification if needed
        if (payload.notification) {
          // You could use a toast library here
          alert(`${payload.notification.title}\n${payload.notification.body}`);
        }
      });
      return () => unsubscribe();
    }
  }, []);

  return null; // This component doesn't render anything
}
