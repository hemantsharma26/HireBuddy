const { HTTP_STATUS } = require('../constants/httpStatus');
const { errorResponse } = require('../utils/responseHandler');
const { AUTH_MESSAGES } = require('../constants/responseMessages');

/**
 * RBAC Middleware
 * Restricts access to routes based on user roles
 * @param {...String} roles - Allowed roles for the route
 */
const restrictTo = (...roles) => {
  return (req, res, next) => {
    // Roles are checked after the protect (JWT verification) middleware
    if (!req.user || !roles.includes(req.user.role)) {
      return errorResponse(
        res,
        { code: 'FORBIDDEN' },
        AUTH_MESSAGES.UNAUTHORIZED,
        HTTP_STATUS.FORBIDDEN
      );
    }
    next();
  };
};

module.exports = { restrictTo };
