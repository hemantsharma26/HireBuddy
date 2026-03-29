import { API_V1 } from "./config";
import type {
  RegisterRequest,
  RegisterResponse,
  LoginRequest,
  LoginResponse,
  SendOtpRequest,
  SendOtpResponse,
  VerifyOtpRequest,
  VerifyOtpResponse,
  ApiError,
} from "./types";

/* ──────────────────────────────────────────
   Auth Service — API calls for auth flows
   ────────────────────────────────────────── */

/**
 * Register a new user.
 *
 * POST /api/v1/auth/register
 */
export async function registerUser(
  data: RegisterRequest,
): Promise<RegisterResponse> {
  const res = await fetch(`${API_V1}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const body = await res.json().catch(() => ({}));

  if (!res.ok) {
    const error: ApiError = {
      message: body.message || `Registration failed (${res.status})`,
      status: res.status,
      errors: body.errors,
    };
    throw error;
  }

  return body as RegisterResponse;
}

/**
 * Log in with email + password.
 *
 * POST /api/v1/auth/login
 */
export async function loginUser(data: LoginRequest): Promise<LoginResponse> {
  const res = await fetch(`${API_V1}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const body = await res.json().catch(() => ({}));

  if (!res.ok) {
    const error: ApiError = {
      message: body.message || `Login failed (${res.status})`,
      status: res.status,
      errors: body.errors,
    };
    throw error;
  }

  return body as LoginResponse;
}

/**
 * Send OTP to a phone number.
 *
 * POST /api/v1/auth/send-otp
 */
export async function sendOtp(data: SendOtpRequest): Promise<SendOtpResponse> {
  const res = await fetch(`${API_V1}/auth/send-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const body = await res.json().catch(() => ({}));

  if (!res.ok) {
    const error: ApiError = {
      message: body.message || `Failed to send OTP (${res.status})`,
      status: res.status,
      errors: body.errors,
    };
    throw error;
  }

  return body as SendOtpResponse;
}

/**
 * Verify OTP and log in.
 *
 * POST /api/v1/auth/verify-otp
 */
export async function verifyOtp(
  data: VerifyOtpRequest,
): Promise<VerifyOtpResponse> {
  const res = await fetch(`${API_V1}/auth/verify-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const body = await res.json().catch(() => ({}));

  if (!res.ok) {
    const error: ApiError = {
      message: body.message || `OTP verification failed (${res.status})`,
      status: res.status,
      errors: body.errors,
    };
    throw error;
  }

  return body as VerifyOtpResponse;
}
