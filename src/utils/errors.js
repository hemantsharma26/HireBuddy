const { HTTP_STATUS } = require('../constants/httpStatus');
const { ERROR_CODES } = require('../constants/errorCodes');

/**
 * Base Application Error
 * All custom errors extend this class
 */
class AppError extends Error {
  constructor(message, statusCode, errorCode) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * 404 Not Found Error
 */
class NotFoundError extends AppError {
  constructor(message = 'Resource not found') {
    super(message, HTTP_STATUS.NOT_FOUND, ERROR_CODES.NOT_FOUND);
  }
}

/**
 * 403 Forbidden Error
 */
class ForbiddenError extends AppError {
  constructor(message = 'Forbidden') {
    super(message, HTTP_STATUS.FORBIDDEN, ERROR_CODES.FORBIDDEN);
  }
}

/**
 * 400 Validation Error
 */
class ValidationError extends AppError {
  constructor(message = 'Validation failed') {
    super(message, HTTP_STATUS.BAD_REQUEST, ERROR_CODES.VALIDATION_ERROR);
  }
}

/**
 * 409 Conflict Error
 */
class ConflictError extends AppError {
  constructor(message = 'Resource conflict') {
    super(message, HTTP_STATUS.CONFLICT, ERROR_CODES.RESOURCE_CONFLICT);
  }
}

/**
 * 401 Unauthorized Error
 */
class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized') {
    super(message, HTTP_STATUS.UNAUTHORIZED, ERROR_CODES.UNAUTHORIZED);
  }
}

module.exports = {
  AppError,
  NotFoundError,
  ForbiddenError,
  ValidationError,
  ConflictError,
  UnauthorizedError
};
