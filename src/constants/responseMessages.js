/**
 * Response Messages
 * Centralized user-facing messages for all API responses
 * Makes the codebase i18n-ready and ensures consistency
 */

const AUTH_MESSAGES = {
  OTP_SENT: "OTP sent successfully",
  OTP_VERIFIED: "OTP verified successfully",
  LOGIN_SUCCESS: "Login successful",
  PROFILE_CREATED: "Profile created successfully",
  PROFILE_INCOMPLETE: "Please complete your profile",
  LOGOUT_SUCCESS: "Logout successful",
  INVALID_OTP: "Invalid or expired OTP",
  OTP_EXPIRED: "OTP has expired",
  NO_OTP_FOUND: "No OTP found for this phone number",
  INVALID_TOKEN: "Invalid or expired token",
  TOKEN_REQUIRED: "Authentication token required",
  UNAUTHORIZED: "Unauthorized access",
  REGISTRATION_SUCCESS: "Registration successful",
  EMAIL_ALREADY_EXISTS: "Email is already registered",
  PHONE_ALREADY_EXISTS: "Phone number is already registered",
  INVALID_CREDENTIALS: "Invalid email or password",
  PASSWORD_REQUIRED: "Password is required for this account",
};

const USER_MESSAGES = {
  PROFILE_UPDATED: "Profile updated successfully",
  AVAILABILITY_UPDATED: "Availability updated",
  USER_NOT_FOUND: "User not found",
  USER_BLOCKED: "User blocked successfully",
  USER_UNBLOCKED: "User unblocked successfully",
  CANNOT_BLOCK_SELF: "Cannot block yourself",
  ACCOUNT_SUSPENDED: "Your account has been suspended",
  ACCOUNT_BANNED: "Your account has been banned",
};

const REQUEST_MESSAGES = {
  REQUEST_CREATED: "Request created successfully",
  REQUEST_UPDATED: "Request updated successfully",
  REQUEST_NOT_FOUND: "Request not found",
  REQUEST_NOT_OPEN: "Request is not open",
  APPLICATION_SUBMITTED: "Application submitted",
  APPLICANT_ACCEPTED: "Applicant accepted",
  REQUEST_COMPLETED: "Request completed",
  CANNOT_APPLY_OWN: "Cannot apply to your own request",
  ALREADY_APPLIED: "You have already applied to this request",
  NOT_AUTHORIZED: "Not authorized",
};

const CHAT_MESSAGES = {
  MESSAGE_SENT: "Message sent",
  CHAT_NOT_FOUND: "Chat not found",
  CHAT_MARKED_READ: "Chat marked as read",
  NOT_PARTICIPANT: "You are not a participant in this chat",
};

const RATING_MESSAGES = {
  RATING_SUBMITTED: "Rating submitted",
  ALREADY_RATED: "Already rated this request",
  CAN_ONLY_RATE_COMPLETED: "Can only rate completed requests",
  NOT_PART_OF_TRANSACTION: "You are not part of this transaction",
};

const REPORT_MESSAGES = {
  REPORT_SUBMITTED: "Report submitted successfully",
  SOS_TRIGGERED: "SOS alert has been sent to our team",
  REPORT_UPDATED: "Report updated",
  REPORT_RESOLVED: "Report resolved",
  REPORT_NOT_FOUND: "Report not found",
  MUST_REPORT_USER_OR_REQUEST: "Must report either a user or request",
};

const ADMIN_MESSAGES = {
  USER_BANNED: "User banned successfully",
  USER_UNBANNED: "User unbanned successfully",
  ROLE_UPDATED: "User role updated successfully",
  STATS_RETRIEVED: "Statistics retrieved successfully",
};

const VALIDATION_MESSAGES = {
  VALIDATION_ERROR: "Validation error",
  INVALID_PHONE_NUMBER: "Invalid phone number format",
  INVALID_EMAIL: "Invalid email format",
  INVALID_AGE: "Age must be 18 or above",
  BLOCKED_CONTENT: "Content contains blocked keywords",
  REQUIRED_FIELD: "Required field is missing",
};

const GENERAL_MESSAGES = {
  SUCCESS: "Success",
  ERROR_OCCURRED: "Error occurred",
  NOT_FOUND: "Resource not found",
  SERVER_ERROR: "Internal server error",
  FORBIDDEN: "Forbidden",
  RATE_LIMIT_EXCEEDED: "Too many requests, please try again later",
};

module.exports = {
  AUTH_MESSAGES,
  USER_MESSAGES,
  REQUEST_MESSAGES,
  CHAT_MESSAGES,
  RATING_MESSAGES,
  REPORT_MESSAGES,
  ADMIN_MESSAGES,
  VALIDATION_MESSAGES,
  GENERAL_MESSAGES,
};
