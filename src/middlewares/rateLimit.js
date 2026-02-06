const rateLimit = require('express-rate-limit');

/**
 * General API rate limiter
 */
const generalLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  message: {
    success: false,
    error: 'Too many requests, please try again later',
    code: 'RATE_LIMIT'
  },
  standardHeaders: true,
  legacyHeaders: false
});

/**
 * OTP request rate limiter
 */
const otpLimiter = rateLimit({
  windowMs: parseInt(process.env.OTP_RATE_LIMIT_WINDOW_MS) || 60 * 60 * 1000, // 1 hour
  max: parseInt(process.env.OTP_RATE_LIMIT_MAX_REQUESTS) || 5,
  message: {
    success: false,
    error: 'Too many OTP requests, please try again after an hour',
    code: 'RATE_LIMIT'
  },
  keyGenerator: (req) => {
    return req.body.phoneNumber || req.ip;
  },
  standardHeaders: true,
  legacyHeaders: false
});

/**
 * Chat message rate limiter
 */
const chatLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 50,
  message: {
    success: false,
    error: 'Too many messages, please slow down',
    code: 'RATE_LIMIT'
  },
  standardHeaders: true,
  legacyHeaders: false
});

module.exports = {
  generalLimiter,
  otpLimiter,
  chatLimiter
};
