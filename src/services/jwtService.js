const jwt = require('jsonwebtoken');
const config = require('../config');

/**
 * Generate temporary token for profile completion
 */
const generateTempToken = (phoneNumber) => {
  return jwt.sign(
    { phoneNumber, tempToken: true },
    config.jwt.secret,
    { expiresIn: config.jwt.tempTokenExpiresIn }
  );
};

/**
 * Generate full access token
 */
const generateAccessToken = (user) => {
  return jwt.sign(
    {
      userId: user._id,
      role: user.role,
      phoneNumber: user.phoneNumber
    },
    config.jwt.secret,
    { expiresIn: config.jwt.expiresIn }
  );
};

/**
 * Verify JWT token
 */
const verifyToken = (token) => {
  try {
    return jwt.verify(token, config.jwt.secret);
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};

/**
 * Decode token without verification (for debugging)
 */
const decodeToken = (token) => {
  return jwt.decode(token);
};

module.exports = {
  generateTempToken,
  generateAccessToken,
  verifyToken,
  decodeToken
};
