import { initializeApp, getApps, getApp } from "firebase/app";
import { getMessaging, Messaging } from "firebase/messaging";

// TODO: Replace with your actual Firebase project configuration from the Firebase Console
// Settings -> Your apps -> Web apps -> Firebase SDK snippet -> Config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "hirebuddy-dc7f9.firebaseapp.com",
  projectId: "hirebuddy-dc7f9",
  storageBucket: "hirebuddy-dc7f9.firebasestorage.app",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

let messaging: Messaging | null = null;

// Messaging is only available in the browser (client-side)
if (typeof window !== "undefined") {
  try {
    messaging = getMessaging(app);
  } catch (err) {
    console.error("Firebase Messaging failed to initialize:", err);
  }
}

export { app, messaging };
export default app;
