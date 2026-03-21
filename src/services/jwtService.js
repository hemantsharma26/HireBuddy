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
 * Generate refresh token
 */
const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      userId: user._id,
      version: user.tokenVersion || 0 // For token revocation
    },
    config.jwt.secret, // Should ideally be a different secret in production
    { expiresIn: '7d' } // Long lived
  );
};

/**
 * Verify JWT token
 */
const verifyToken = (token) => {
  try {
    return jwt.verify(token, config.jwt.secret);
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw new Error('TOKEN_EXPIRED');
    }
    throw new Error('INVALID_TOKEN');
  }
};

module.exports = {
  generateTempToken,
  generateAccessToken,
  generateRefreshToken,
  verifyToken
};
