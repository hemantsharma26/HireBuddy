const { body } = require('express-validator');

const signupValidator = [
  body('displayName').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('phoneNumber').isLength({ min: 10, max: 10 }).withMessage('10-digit phone number is required'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
  body('dateOfBirth').isISO8601().withMessage('Valid date of birth is required'),
];

const loginValidator = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

const verifyOtpValidator = [
  body('phoneNumber').isLength({ min: 10, max: 10 }).withMessage('Valid phone number is required'),
  body('otp').isLength({ min: 4, max: 4 }).withMessage('4-digit OTP is required'),
];

module.exports = {
  signupValidator,
  loginValidator,
  verifyOtpValidator,
};
