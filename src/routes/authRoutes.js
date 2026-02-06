const express = require('express');
const router = express.Router();
const { sendOTPController, verifyOTPController, completeProfileController } = require('../controllers/authController');
const { auth } = require('../middlewares/auth');
const { validateSendOTP, validateVerifyOTP, validateCompleteProfile } = require('../middlewares/validation');
const { otpLimiter } = require('../middlewares/rateLimit');

// Send OTP
router.post('/send-otp', otpLimiter, validateSendOTP, sendOTPController);

// Verify OTP
router.post('/verify-otp', validateVerifyOTP, verifyOTPController);

// Complete profile (requires temp token)
router.post('/complete-profile', auth, validateCompleteProfile, completeProfileController);

module.exports = router;
