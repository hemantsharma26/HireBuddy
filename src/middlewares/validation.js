const { body, param, query, validationResult } = require("express-validator");
const { validationErrorResponse } = require("../utils/responseHandler");
const {
  JOB_CATEGORIES,
  JOB_TYPES,
  REPORT_REASONS,
  REPORT_PRIORITIES,
  MINIMUM_AGE,
} = require("../config/constants");

/**
 * Validation result handler
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return validationErrorResponse(
      res,
      errors.array().map((err) => err.msg),
    );
  }

  next();
};

/**
 * Auth validations
 */
const validateSendOTP = [
  body("phoneNumber")
    .matches(/^\d{10}$/)
    .withMessage("Please provide a valid 10-digit phone number"),
  validate,
];

const validateVerifyOTP = [
  body("phoneNumber")
    .matches(/^\d{10}$/)
    .withMessage("Please provide a valid 10-digit phone number"),
  body("otp").isLength({ min: 4, max: 4 }).withMessage("OTP must be 4 digits"),
  validate,
];

const validateCompleteProfile = [
  body("displayName")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Display name must be between 2 and 50 characters"),
  body("age")
    .isInt({ min: MINIMUM_AGE })
    .withMessage(`You must be at least ${MINIMUM_AGE} years old`),
  body("email")
    .optional()
    .isEmail()
    .normalizeEmail()
    .withMessage("Please provide a valid email"),
  body("bio")
    .optional()
    .isLength({ max: 500 })
    .withMessage("Bio cannot exceed 500 characters"),
  body("location.city").trim().notEmpty().withMessage("City is required"),
  body("location.area").trim().notEmpty().withMessage("Area is required"),
  validate,
];

/**
 * Registration validation
 */
const validateRegister = [
  body("displayName")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Display name must be between 2 and 50 characters"),
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Please provide a valid email"),
  body("phoneNumber")
    .matches(/^\d{10}$/)
    .withMessage("Please provide a valid 10-digit phone number"),
  body("dateOfBirth")
    .isISO8601()
    .withMessage("Please provide a valid date of birth (YYYY-MM-DD)")
    .custom((value) => {
      const dob = new Date(value);
      const today = new Date();
      let age = today.getFullYear() - dob.getFullYear();
      const monthDiff = today.getMonth() - dob.getMonth();
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < dob.getDate())
      ) {
        age--;
      }
      if (age < MINIMUM_AGE) {
        throw new Error(`You must be at least ${MINIMUM_AGE} years old`);
      }
      return true;
    }),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  validate,
];

/**
 * Login with password validation
 */
const validateLoginWithPassword = [
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Please provide a valid email"),
  body("password").notEmpty().withMessage("Password is required"),
  validate,
];

/**
 * Request validations
 */
const validateCreateRequest = [
  body("title")
    .trim()
    .isLength({ min: 5, max: 100 })
    .withMessage("Title must be between 5 and 100 characters"),
  body("description")
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage("Description must be between 10 and 1000 characters"),
  body("category").isIn(JOB_CATEGORIES).withMessage("Invalid category"),
  body("jobType")
    .isIn(JOB_TYPES)
    .withMessage("Job type must be either in-person or remote"),
  body("compensation")
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage("Compensation is required"),
  body("location.city").trim().notEmpty().withMessage("City is required"),
  body("location.area").trim().notEmpty().withMessage("Area is required"),
  body("workersNeeded")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Workers needed must be at least 1"),
  validate,
];

/**
 * Rating validations
 */
const validateRating = [
  body("requestId").isMongoId().withMessage("Invalid request ID"),
  body("ratedUserId").isMongoId().withMessage("Invalid user ID"),
  body("stars")
    .isInt({ min: 1, max: 5 })
    .withMessage("Rating must be between 1 and 5"),
  body("review")
    .optional()
    .isLength({ max: 500 })
    .withMessage("Review cannot exceed 500 characters"),
  body("ratingType")
    .isIn(["requester", "helper"])
    .withMessage("Invalid rating type"),
  validate,
];

/**
 * Report validations
 */
const validateReport = [
  body("reason").isIn(REPORT_REASONS).withMessage("Invalid report reason"),
  body("description")
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage("Description must be between 10 and 1000 characters"),
  body("priority")
    .optional()
    .isIn(REPORT_PRIORITIES)
    .withMessage("Invalid priority level"),
  validate,
];

/**
 * Message validations
 */
const validateMessage = [
  body("content")
    .trim()
    .isLength({ min: 1, max: 2000 })
    .withMessage("Message must be between 1 and 2000 characters"),
  validate,
];

/**
 * ID parameter validation
 */
const validateMongoId = [
  param("id").isMongoId().withMessage("Invalid ID format"),
  validate,
];

/**
 * Apply to request validation
 */
const validateApplyToRequest = [
  body("bidAmount")
    .isInt({ min: 1 })
    .withMessage("Bid amount must be a positive number"),
  body("availability")
    .optional()
    .isIn(["now", "scheduled"])
    .withMessage("Invalid availability type"),
  body("message")
    .optional()
    .isLength({ max: 500 })
    .withMessage("Message cannot exceed 500 characters"),
  validate,
];

module.exports = {
  validate,
  validateSendOTP,
  validateVerifyOTP,
  validateCompleteProfile,
  validateRegister,
  validateLoginWithPassword,
  validateCreateRequest,
  validateRating,
  validateReport,
  validateMessage,
  validateMongoId,
  validateApplyToRequest,
};
