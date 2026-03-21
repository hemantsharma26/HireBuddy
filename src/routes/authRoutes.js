const express = require("express");
const router = express.Router();
const {
  sendOTPController,
  verifyOTPController,
  completeProfileController,
  registerController,
  loginWithPasswordController,
  refreshTokenController,
  logoutController,
  requestVerificationOTP,
  confirmVerificationOTP,
  submitIDVerification,
} = require("../controllers/authController");
const { auth } = require("../middlewares/auth");
const {
  validateSendOTP,
  validateVerifyOTP,
  validateCompleteProfile,
  validateRegister,
  validateLoginWithPassword,
} = require("../middlewares/validation");
const { otpLimiter, authLimiter } = require("../middlewares/rateLimit");

// ===== Token Management =====

/**
 * @swagger
 * /auth/refresh-token:
 *   post:
 *     summary: Refresh access token using refresh token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [refreshToken]
 *             properties:
 *               refreshToken: { type: string }
 *     responses:
 *       200:
 *         description: New tokens generated
 *       401:
 *         description: Invalid/expired refresh token
 */
router.post("/refresh-token", refreshTokenController);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout user (invalidates session)
 *     tags: [Auth]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Logout successful
 */
router.post("/logout", auth, logoutController);

// ===== Registration & Login =====

router.post("/register", validateRegister, registerController);
router.post("/login", authLimiter, validateLoginWithPassword, loginWithPasswordController);

// ===== OTP Flow =====

router.post("/send-otp", otpLimiter, validateSendOTP, sendOTPController);
router.post("/verify-otp", validateVerifyOTP, verifyOTPController);

router.post("/complete-profile", auth, validateCompleteProfile, completeProfileController);

// ===== Verification Flow (Logged-in Users) =====

router.get("/test-auth", (req, res) => res.json({ success: true, message: "Auth route reachable" }));

router.post("/request-verification-otp", auth, requestVerificationOTP);
router.post("/verify-verification-otp", auth, confirmVerificationOTP);
router.post("/submit-id-verification", auth, submitIDVerification);

module.exports = router;
