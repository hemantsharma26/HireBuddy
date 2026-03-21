/**
 * Environment Variable Reader
 * CRITICAL: This is the ONLY file that directly accesses process.env
 * All other parts of the application MUST use the config module
 */

require("dotenv").config();

const env = {
  // Server Configuration
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 8080,

  // Database
  MONGODB_URI: process.env.MONGODB_URI,

  // JWT
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "7d",
  TEMP_TOKEN_EXPIRES_IN: process.env.TEMP_TOKEN_EXPIRES_IN || "15m",

  // OTP Service
  OTP_SERVICE: process.env.OTP_SERVICE || "twilio", // 'twilio' or 'msg91'
  OTP_EXPIRES_IN: process.env.OTP_EXPIRES_IN || 300, // seconds

  // Twilio
  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
  TWILIO_PHONE_NUMBER: process.env.TWILIO_PHONE_NUMBER,

  // MSG91
  MSG91_AUTH_KEY: process.env.MSG91_AUTH_KEY,
  MSG91_SENDER_ID: process.env.MSG91_SENDER_ID,
  MSG91_ROUTE: process.env.MSG91_ROUTE || "4",

  // Rate Limiting
  RATE_LIMIT_WINDOW_MS: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 900000, // 15 minutes
  RATE_LIMIT_MAX_REQUESTS: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  OTP_RATE_LIMIT_WINDOW_MS:
    parseInt(process.env.OTP_RATE_LIMIT_WINDOW_MS) || 3600000, // 1 hour
  OTP_RATE_LIMIT_MAX_REQUESTS:
    parseInt(process.env.OTP_RATE_LIMIT_MAX_REQUESTS) || 5,
  CHAT_RATE_LIMIT_WINDOW_MS:
    parseInt(process.env.CHAT_RATE_LIMIT_WINDOW_MS) || 60000, // 1 minute
  CHAT_RATE_LIMIT_MAX_REQUESTS:
    parseInt(process.env.CHAT_RATE_LIMIT_MAX_REQUESTS) || 50,

  // Admin
  ADMIN_PHONE: process.env.ADMIN_PHONE,

  // CORS
  CORS_ORIGIN: process.env.CORS_ORIGIN || "*",

  // Logging
  LOG_LEVEL: process.env.LOG_LEVEL || "info",

  // Email Configuration (Nodemailer)
  EMAIL_SERVICE: process.env.EMAIL_SERVICE || "gmail",
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS,
};

module.exports = env;
