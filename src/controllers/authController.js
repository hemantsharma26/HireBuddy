const User = require('../models/User');
const OTPSession = require('../models/OTPSession');
const { generateOTP, sendOTP } = require('../services/otpService');
const { generateTempToken, generateAccessToken } = require('../services/jwtService');
const { successResponse, errorResponse } = require('../utils/responseHandler');
const asyncHandler = require('../utils/asyncHandler');
const logger = require('../utils/logger');
const { HTTP_STATUS } = require('../constants/httpStatus');
const { ERROR_CODES } = require('../constants/errorCodes');
const { AUTH_MESSAGES, VALIDATION_MESSAGES } = require('../constants/responseMessages');
const config = require('../config');

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
    otp
  });
  
  // Send OTP
  await sendOTP(phoneNumber, otp);
  
  logger.info(`OTP sent to ${phoneNumber}`);
  
  return successResponse(
    res,
    { expiresIn: config.otp.expiresIn },
    AUTH_MESSAGES.OTP_SENT,
    HTTP_STATUS.OK
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
    verified: false
  }).sort({ createdAt: -1 });
  
  if (!otpSession) {
    return errorResponse(
      res,
      { code: ERROR_CODES.VALIDATION_ERROR },
      AUTH_MESSAGES.NO_OTP_FOUND,
      HTTP_STATUS.BAD_REQUEST
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
      HTTP_STATUS.BAD_REQUEST
    );
  }
  
  // Check if user exists
  const existingUser = await User.findOne({ phoneNumber });
  
  if (existingUser) {
    // Update last login
    existingUser.lastLoginAt = new Date();
    await existingUser.save();
    
    // Generate access token
    const token = generateAccessToken(existingUser);
    
    return successResponse(
      res,
      {
        isNewUser: false,
        token,
        user: {
          _id: existingUser._id,
          displayName: existingUser.displayName,
          phoneNumber: existingUser.phoneNumber,
          email: existingUser.email,
          role: existingUser.role,
          profilePicture: existingUser.profilePicture,
          location: existingUser.location,
          availability: existingUser.availability,
          stats: existingUser.stats
        }
      },
      AUTH_MESSAGES.LOGIN_SUCCESS,
      HTTP_STATUS.OK
    );
  } else {
    // New user - generate temp token for profile completion
    const tempToken = generateTempToken(phoneNumber);
    
    return successResponse(
      res,
      {
        isNewUser: true,
        tempToken
      },
      AUTH_MESSAGES.PROFILE_INCOMPLETE,
      HTTP_STATUS.OK
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
      HTTP_STATUS.UNAUTHORIZED
    );
  }
  
  const { phoneNumber } = req;
  const { displayName, age, email, bio, location, profilePicture } = req.body;
  
  // Create new user
  const user = await User.create({
    phoneNumber,
    phoneVerified: true,
    displayName,
    age,
    email,
    bio,
    location,
    profilePicture,
    lastLoginAt: new Date()
  });
  
  // Generate full access token
  const token = generateAccessToken(user);
  
  logger.info(`New user created: ${user._id}`);
  
  return successResponse(
    res,
    {
      token,
      user: {
        _id: user._id,
        displayName: user.displayName,
        phoneNumber: user.phoneNumber,
        email: user.email,
        role: user.role,
        profilePicture: user.profilePicture,
        location: user.location,
        stats: user.stats
      }
    },
    AUTH_MESSAGES.PROFILE_CREATED,
    HTTP_STATUS.CREATED
  );
});

module.exports = {
  sendOTPController,
  verifyOTPController,
  completeProfileController
};
