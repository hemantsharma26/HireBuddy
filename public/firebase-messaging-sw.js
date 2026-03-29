// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/11.4.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/11.4.0/firebase-messaging-compat.js");

// TODO: Replace with your actual Firebase project configuration
firebase.initializeApp({
  apiKey: "YOUR_API_KEY",
  authDomain: "hirebuddy-dc7f9.firebaseapp.com",
  projectId: "hirebuddy-dc7f9",
  storageBucket: "hirebuddy-dc7f9.firebasestorage.app",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
});

const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log("[firebase-messaging-sw.js] Received background message ", payload);
  
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/favicon.ico", // Replace with your app icon
    data: payload.data
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
