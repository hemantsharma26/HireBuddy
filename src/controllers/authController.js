const User = require("../models/User");
const OTPSession = require("../models/OTPSession");
const { generateOTP, sendOTP } = require("../services/otpService");
const {
  generateTempToken,
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
} = require("../services/jwtService");
const { successResponse, errorResponse } = require("../utils/responseHandler");
const asyncHandler = require("../utils/asyncHandler");
const logger = require("../utils/logger");
const { HTTP_STATUS } = require("../constants/httpStatus");
const { ERROR_CODES } = require("../constants/errorCodes");
const {
  AUTH_MESSAGES,
  VALIDATION_MESSAGES,
} = require("../constants/responseMessages");
const config = require("../config");

/**
 * Send OTP to phone number
 */
const sendOTPController = asyncHandler(async (req, res) => {
  const { phoneNumber } = req.body;

  // Generate OTP
  const otp = generateOTP();

  // Save OTP session
  await OTPSession.create({
    phoneNumber,
    otp,
  });

  // Send OTP
  await sendOTP(phoneNumber, otp);

  logger.info(`OTP sent to ${phoneNumber}`);

  return successResponse(
    res,
    { expiresIn: config.otp.expiresIn },
    AUTH_MESSAGES.OTP_SENT,
    HTTP_STATUS.OK,
  );
});

/**
 * Verify OTP and login/signup
 */
const verifyOTPController = asyncHandler(async (req, res) => {
  const { phoneNumber, otp } = req.body;

  // Find OTP session
  const otpSession = await OTPSession.findOne({
    phoneNumber,
    verified: false,
  }).sort({ createdAt: -1 });

  if (!otpSession) {
    return errorResponse(
      res,
      { code: ERROR_CODES.VALIDATION_ERROR },
      AUTH_MESSAGES.NO_OTP_FOUND,
      HTTP_STATUS.BAD_REQUEST,
    );
  }

  // Verify OTP
  try {
    await otpSession.verify(otp);
  } catch (error) {
    return errorResponse(
      res,
      { code: ERROR_CODES.VALIDATION_ERROR },
      error.message,
      HTTP_STATUS.BAD_REQUEST,
    );
  }

  // Check if user exists
  const existingUser = await User.findOne({ phoneNumber });

  if (existingUser) {
    // Update last login
    existingUser.lastLoginAt = new Date();
    await existingUser.save();

    // Generate access & refresh tokens
    const accessToken = generateAccessToken(existingUser);
    const refreshToken = generateRefreshToken(existingUser);

    return successResponse(
      res,
      {
        isNewUser: false,
        accessToken,
        refreshToken,
        user: {
          _id: existingUser._id,
          displayName: existingUser.displayName,
          phoneNumber: existingUser.phoneNumber,
          email: existingUser.email,
          role: existingUser.role,
          profilePicture: existingUser.profilePicture,
          location: existingUser.location,
          availability: existingUser.availability,
          stats: existingUser.stats,
        },
      },
      AUTH_MESSAGES.LOGIN_SUCCESS,
      HTTP_STATUS.OK,
    );
  } else {
    // New user - generate temp token for profile completion
    const tempToken = generateTempToken(phoneNumber);

    return successResponse(
      res,
      {
        isNewUser: true,
        tempToken,
      },
      AUTH_MESSAGES.PROFILE_INCOMPLETE,
      HTTP_STATUS.OK,
    );
  }
});

/**
 * Complete profile after OTP verification
 */
const completeProfileController = asyncHandler(async (req, res) => {
  // Check if temp token
  if (!req.tempToken) {
    return errorResponse(
      res,
      { code: ERROR_CODES.UNAUTHORIZED },
      AUTH_MESSAGES.INVALID_TOKEN,
      HTTP_STATUS.UNAUTHORIZED,
    );
  }

  const { phoneNumber } = req;
  const { displayName, dateOfBirth, age: providedAge, email, bio, location, profilePicture } = req.body;

  let age = providedAge;
  let dob = dateOfBirth ? new Date(dateOfBirth) : null;

  if (dob && !age) {
    const today = new Date();
    age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
  }

  // Create new user
  const user = await User.create({
    phoneNumber,
    phoneVerified: true,
    displayName,
    dateOfBirth: dob,
    age,
    email,
    bio,
    location,
    profilePicture,
    lastLoginAt: new Date(),
  });

  // Generate access & refresh tokens
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  logger.info(`New user created: ${user._id}`);

  return successResponse(
    res,
    {
      accessToken,
      refreshToken,
      user: {
        _id: user._id,
        displayName: user.displayName,
        phoneNumber: user.phoneNumber,
        email: user.email,
        role: user.role,
        profilePicture: user.profilePicture,
        location: user.location,
        stats: user.stats,
      },
    },
    AUTH_MESSAGES.PROFILE_CREATED,
    HTTP_STATUS.CREATED,
  );
});

/**
 * Register new user with email & password
 */
const registerController = asyncHandler(async (req, res) => {
  const { displayName, email, phoneNumber, dateOfBirth, password } = req.body;

  // Check if email already exists
  const existingEmail = await User.findOne({ email });
  if (existingEmail) {
    return errorResponse(
      res,
      { code: ERROR_CODES.ALREADY_EXISTS },
      AUTH_MESSAGES.EMAIL_ALREADY_EXISTS,
      HTTP_STATUS.CONFLICT,
    );
  }

  // Check if phone number already exists
  const existingPhone = await User.findOne({ phoneNumber });
  if (existingPhone) {
    return errorResponse(
      res,
      { code: ERROR_CODES.ALREADY_EXISTS },
      AUTH_MESSAGES.PHONE_ALREADY_EXISTS,
      HTTP_STATUS.CONFLICT,
    );
  }

  // Calculate age from date of birth
  const dob = new Date(dateOfBirth);
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--;
  }

  // Create user
  const user = await User.create({
    displayName,
    email,
    phoneNumber,
    dateOfBirth: dob,
    age,
    password,
    lastLoginAt: new Date(),
  });

  // Generate access & refresh tokens
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  logger.info(`New user registered: ${user._id}`);

  return successResponse(
    res,
    {
      accessToken,
      refreshToken,
      user: {
        _id: user._id,
        displayName: user.displayName,
        phoneNumber: user.phoneNumber,
        email: user.email,
        dateOfBirth: user.dateOfBirth,
        role: user.role,
        stats: user.stats,
      },
    },
    AUTH_MESSAGES.REGISTRATION_SUCCESS,
    HTTP_STATUS.CREATED,
  );
});

/**
 * Login with email & password
 */
const loginWithPasswordController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Find user by email and include password field
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return errorResponse(
      res,
      { code: ERROR_CODES.UNAUTHORIZED },
      AUTH_MESSAGES.INVALID_CREDENTIALS,
      HTTP_STATUS.UNAUTHORIZED,
    );
  }

  // Check if user has a password set
  if (!user.password) {
    return errorResponse(
      res,
      { code: ERROR_CODES.UNAUTHORIZED },
      AUTH_MESSAGES.INVALID_CREDENTIALS,
      HTTP_STATUS.UNAUTHORIZED,
    );
  }

  // Compare password
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return errorResponse(
      res,
      { code: ERROR_CODES.UNAUTHORIZED },
      AUTH_MESSAGES.INVALID_CREDENTIALS,
      HTTP_STATUS.UNAUTHORIZED,
    );
  }

  // Check if user is active
  if (!user.isActive()) {
    return errorResponse(
      res,
      { code: ERROR_CODES.ACCOUNT_BANNED },
      user.status === "banned"
        ? "Your account has been banned"
        : "Your account is suspended",
      HTTP_STATUS.FORBIDDEN,
    );
  }

  // Update last login
  user.lastLoginAt = new Date();
  await user.save();

  // Generate access & refresh tokens
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  return successResponse(
    res,
    {
      accessToken,
      refreshToken,
      user: {
        _id: user._id,
        displayName: user.displayName,
        phoneNumber: user.phoneNumber,
        email: user.email,
        dateOfBirth: user.dateOfBirth,
        role: user.role,
        profilePicture: user.profilePicture,
        location: user.location,
        availability: user.availability,
        stats: user.stats,
      },
    },
    AUTH_MESSAGES.LOGIN_SUCCESS,
    HTTP_STATUS.OK,
  );
});



/**
 * Refresh Access Token
 */
const refreshTokenController = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return errorResponse(
      res,
      { code: ERROR_CODES.UNAUTHORIZED },
      AUTH_MESSAGES.TOKEN_REQUIRED,
      HTTP_STATUS.UNAUTHORIZED,
    );
  }

  try {
    const decoded = verifyToken(refreshToken);
    const user = await User.findById(decoded.userId);

    if (!user || user.status !== "active") {
      return errorResponse(
        res,
        { code: ERROR_CODES.UNAUTHORIZED },
        AUTH_MESSAGES.INVALID_TOKEN,
        HTTP_STATUS.UNAUTHORIZED,
      );
    }

    // Check token version for rotation/revocation
    if (decoded.version !== (user.tokenVersion || 0)) {
       return errorResponse(
        res,
        { code: ERROR_CODES.FORBIDDEN },
        "Token has been revoked",
        HTTP_STATUS.FORBIDDEN,
      );
    }

    const accessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    return successResponse(
      res,
      { accessToken, refreshToken: newRefreshToken },
      "Token refreshed",
      HTTP_STATUS.OK,
    );
  } catch (error) {
    return errorResponse(
      res,
      { code: ERROR_CODES.UNAUTHORIZED },
      AUTH_MESSAGES.INVALID_TOKEN,
      HTTP_STATUS.UNAUTHORIZED,
    );
  }
});

/**
 * Logout
 */
const logoutController = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.tokenVersion = (user.tokenVersion || 0) + 1; // Revoke all existing refresh tokens
    await user.save();
  }

  return successResponse(
    res,
    null,
    AUTH_MESSAGES.LOGOUT_SUCCESS,
    HTTP_STATUS.OK,
  );
});

/**
 * Request OTP for Email or Phone Verification (Logged in users)
 */
const requestVerificationOTP = asyncHandler(async (req, res) => {
  const { type, value } = req.body; // type: 'email' or 'phone', value: the actual email/phone
  const userId = req.user._id;

  if (!['email', 'phone'].includes(type)) {
    return errorResponse(res, { code: ERROR_CODES.VALIDATION_ERROR }, "Invalid verification type", HTTP_STATUS.BAD_REQUEST);
  }

  const otp = generateOTP();

  if (type === 'email') {
    const { sendEmailOTP } = require("../services/otpService");
    await OTPSession.create({ email: value, otp });
    await sendEmailOTP(value, otp);
  } else {
    await OTPSession.create({ phoneNumber: value, otp });
    await sendOTP(value, otp);
  }

  logger.info(`Verification OTP sent via ${type} to ${value} for user ${userId}`);

  return successResponse(res, null, `Verification code sent to your ${type}`);
});

/**
 * Confirm OTP for Email or Phone Verification
 */
const confirmVerificationOTP = asyncHandler(async (req, res) => {
  const { type, value, otp } = req.body;
  const userId = req.user._id;

  const query = type === 'email' ? { email: value, verified: false } : { phoneNumber: value, verified: false };
  const otpSession = await OTPSession.findOne(query).sort({ createdAt: -1 });

  if (!otpSession) {
    return errorResponse(res, { code: ERROR_CODES.VALIDATION_ERROR }, "No active verification session found", HTTP_STATUS.BAD_REQUEST);
  }

  try {
    await otpSession.verify(otp);
  } catch (error) {
    return errorResponse(res, { code: ERROR_CODES.VALIDATION_ERROR }, error.message, HTTP_STATUS.BAD_REQUEST);
  }

  // Update user verification status
  const update = {};
  if (type === 'email') {
    update.emailVerified = true;
    update['verification.emailVerifiedAt'] = new Date();
  } else {
    update.phoneVerified = true;
    update['verification.phoneVerifiedAt'] = new Date();
  }

  const user = await User.findByIdAndUpdate(userId, { $set: update }, { new: true });

  return successResponse(res, { user }, `${type.charAt(0).toUpperCase() + type.slice(1)} verified successfully`);
});

/**
 * Submit Government ID Verification
 */
const submitIDVerification = asyncHandler(async (req, res) => {
  const { type, details } = req.body; // type: 'pan', 'bank', 'aadhaar'
  const userId = req.user._id;

  if (!['pan', 'bank', 'aadhaar'].includes(type)) {
     return errorResponse(res, { code: ERROR_CODES.VALIDATION_ERROR }, "Invalid ID type", HTTP_STATUS.BAD_REQUEST);
  }

  const user = await User.findByIdAndUpdate(userId, {
    $set: {
      'verification.idVerification.status': 'pending',
      'verification.idVerification.type': type,
      'verification.idVerification.details': details,
    }
  }, { new: true });

  logger.info(`ID verification (${type}) submitted by user ${userId}`);

  return successResponse(res, { user }, "ID verification submitted successfully. Our team will review it soon.");
});

module.exports = {
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
};
