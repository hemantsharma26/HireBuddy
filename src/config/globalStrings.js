/**
 * Global String Literals
 * Centralized strings for the entire application as requested.
 */

const SYSTEM_STRINGS = {
  APP_NAME: "HireBuddy",
  API_VERSION: "1.0.0",
  MONGODB_CONNECTED: "✅ MongoDB connected successfully",
  MONGODB_FAILED: "❌ MongoDB connection failed",
  SERVER_START: "🚀 Server is running on port",
  AUTH_HEADER: "Authorization",
  BEARER_PREFIX: "Bearer ",
};

const DATABASE_STRINGS = {
  USER_COLLECTION: "users",
  OTP_COLLECTION: "otpsessions",
  CHAT_COLLECTION: "chats",
  MESSAGE_COLLECTION: "messages",
  REQUEST_COLLECTION: "hiringrequests",
  BLOCK_COLLECTION: "blockedusers",
  RATING_COLLECTION: "ratings",
  REPORT_COLLECTION: "reports",
};

const AUTH_ALERTS = {
  OTP_SENT_SUCCESS: "OTP sent successfully to your number",
  OTP_VERIFY_SUCCESS: "Phone number verified successfully",
  LOGIN_SUCCESS: "Welcome back to HireBuddy",
  REGISTER_SUCCESS: "Account created successfully",
  INVALID_OTP: "The OTP entered is incorrect or has expired",
  USER_NOT_FOUND: "No account found with this information",
  SESSION_EXPIRED: "Your session has expired. Please login again",
};

module.exports = {
  SYSTEM_STRINGS,
  DATABASE_STRINGS,
  AUTH_ALERTS,
};
