const logger = require('../utils/logger');
const { errorResponse } = require('../utils/responseHandler');

/**
 * Global error handler middleware
 */
const errorHandler = (err, req, res, next) => {
  logger.error('Error:', {
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method
  });
  
  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      code: 'VALIDATION_ERROR',
      details: errors
    });
  }
  
  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    return res.status(409).json({
      success: false,
      error: `${field} already exists`,
      code: 'DUPLICATE_ERROR'
    });
  }
  
  // Mongoose cast error
  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      error: 'Invalid ID format',
      code: 'VALIDATION_ERROR'
    });
  }
  
  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      error: 'Invalid token',
      code: 'UNAUTHORIZED'
    });
  }
  
  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      error: 'Token expired',
      code: 'UNAUTHORIZED'
    });
  }
  
  // Custom errors with code
  if (err.code) {
    const statusCode = 
      err.code === 'UNAUTHORIZED' ? 401 :
      err.code === 'FORBIDDEN' ? 403 :
      err.code === 'NOT_FOUND' ? 404 :
      err.code === 'BLOCKED_CONTENT' ? 400 :
      400;
    
    return errorResponse(res, err, err.message, statusCode);
  }
  
  // Default server error
  return res.status(500).json({
    success: false,
    error: 'Internal server error',
    code: 'SERVER_ERROR',
    ...(process.env.NODE_ENV === 'development' && { details: err.message })
  });
};

module.exports = errorHandler;
