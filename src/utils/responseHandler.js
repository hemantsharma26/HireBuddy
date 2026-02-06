/**
 * Response Handler Utilities
 * Standardized response functions for consistent API responses
 * Now uses centralized constants for status codes and messages
 */

const { HTTP_STATUS } = require('../constants/httpStatus');
const { ERROR_CODES } = require('../constants/errorCodes');
const { VALIDATION_MESSAGES, GENERAL_MESSAGES } = require('../constants/responseMessages');

/**
 * Success response
 */
const successResponse = (res, data = {}, message = GENERAL_MESSAGES.SUCCESS, statusCode = HTTP_STATUS.OK) => {
  return res.status(statusCode).json({
    success: true,
    message,
    ...data
  });
};

/**
 * Error response
 */
const errorResponse = (res, error = {}, message = GENERAL_MESSAGES.ERROR_OCCURRED, statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR) => {
  return res.status(statusCode).json({
    success: false,
    error: message,
    code: error.code || ERROR_CODES.SERVER_ERROR
  });
};

/**
 * Validation error response
 */
const validationErrorResponse = (res, errors) => {
  return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({
    success: false,
    error: VALIDATION_MESSAGES.VALIDATION_ERROR,
    code: ERROR_CODES.VALIDATION_ERROR,
    errors
  });
};

/**
 * Paginated response
 */
const paginationResponse = (res, data, page, limit, total) => {
  return res.status(HTTP_STATUS.OK).json({
    success: true,
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasMore: page * limit < total
    }
  });
};

module.exports = {
  successResponse,
  errorResponse,
  validationErrorResponse,
  paginationResponse
};
