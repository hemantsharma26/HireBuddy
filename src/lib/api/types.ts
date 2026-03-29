/* ──────────────────────────────────────────
   Auth API — Request & Response Types
   ────────────────────────────────────────── */

/* ── Register ── */

/** POST /api/v1/auth/register — Request Body */
export interface RegisterRequest {
  displayName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string; // "YYYY-MM-DD"
  password: string;
}

/** POST /api/v1/auth/register — Success Response */
export interface RegisterResponse {
  id?: string;
  displayName?: string;
  email?: string;
  message?: string;
  token?: string;
}

/* ── Login ── */

/** POST /api/v1/auth/login — Request Body */
export interface LoginRequest {
  email: string;
  password: string;
}

/** POST /api/v1/auth/login — Success Response */
export interface LoginResponse {
  success: boolean;
  message: string;
  token: string;
  user: {
    _id: string;
    displayName: string;
    phoneNumber: string;
    email: string;
    dateOfBirth: string;
    role: string;
    profilePicture: string | null;
    location?: {
      coordinates?: {
        type: string;
        coordinates: number[];
      };
    };
    availability: string;
    stats: {
      totalJobsPosted: number;
      totalJobsCompleted: number;
      totalJobsAccepted: number;
      averageRating: number;
      totalRatings: number;
    };
  };
}

/* ── OTP Login ── */

/** POST /api/v1/auth/send-otp — Request Body */
export interface SendOtpRequest {
  phoneNumber: string;
}

/** POST /api/v1/auth/send-otp — Success Response */
export interface SendOtpResponse {
  success: boolean;
  message: string;
}

/** POST /api/v1/auth/verify-otp — Request Body */
export interface VerifyOtpRequest {
  phoneNumber: string;
  otp: string;
}

/** POST /api/v1/auth/verify-otp — Success Response (same as LoginResponse) */
export type VerifyOtpResponse = LoginResponse;

/* ── Shared ── */

/** Generic API Error Response */
export interface ApiError {
  message: string;
  status?: number;
  errors?: Record<string, string>;
}
