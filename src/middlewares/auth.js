const { verifyToken } = require('../services/jwtService');
const User = require('../models/User');
const { errorResponse } = require('../utils/responseHandler');

/**
 * Authentication middleware
 * Verifies JWT token and attaches user to request
 */
const auth = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return errorResponse(res, 
        { code: 'UNAUTHORIZED' }, 
        'No authorization token provided', 
        401
      );
    }
    
    const token = authHeader.substring(7);
    
    // Verify token
    const decoded = verifyToken(token);
    
    // Check if temp token (only for profile completion)
    if (decoded.temp) {
      req.tempToken = true;
      req.phoneNumber = decoded.phoneNumber;
      return next();
    }
    
    // Find user
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return errorResponse(res, 
        { code: 'UNAUTHORIZED' }, 
        'User not found', 
        401
      );
    }
    
    // Check if user is banned or suspended
    if (!user.isActive()) {
      return errorResponse(res, 
        { code: 'USER_BANNED' }, 
        user.status === 'banned' 
          ? 'Your account has been banned' 
          : 'Your account is suspended', 
        403
      );
    }
    
    // Attach user to request
    req.user = user;
    req.userId = user._id;
    
    next();
  } catch (error) {
    return errorResponse(res, 
      { code: 'UNAUTHORIZED' }, 
      'Invalid or expired token', 
      401
    );
  }
};

/**
 * Optional auth middleware
 * Attaches user if token is valid, but doesn't require authentication
 */
const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next();
    }
    
    const token = authHeader.substring(7);
    const decoded = verifyToken(token);
    
    if (!decoded.temp) {
      const user = await User.findById(decoded.userId);
      if (user && user.isActive()) {
        req.user = user;
        req.userId = user._id;
      }
    }
    
    next();
  } catch (error) {
    // If token is invalid, just continue without user
    next();
  }
};

module.exports = { auth, optionalAuth };
