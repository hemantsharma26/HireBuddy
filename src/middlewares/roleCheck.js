const { errorResponse } = require('../utils/responseHandler');

/**
 * Role-based access control middleware
 * @param {Array} allowedRoles - Array of allowed roles
 */
const roleCheck = (allowedRoles = []) => {
  return (req, res, next) => {
    if (!req.user) {
      return errorResponse(res, 
        { code: 'UNAUTHORIZED' }, 
        'Authentication required', 
        401
      );
    }
    
    if (!allowedRoles.includes(req.user.role)) {
      return errorResponse(res, 
        { code: 'FORBIDDEN' }, 
        'Insufficient permissions', 
        403
      );
    }
    
    next();
  };
};

/**
 * Permission check for support users
 * @param {String} permission - Permission to check
 */
const permissionCheck = (permission) => {
  return (req, res, next) => {
    if (!req.user) {
      return errorResponse(res, 
        { code: 'UNAUTHORIZED' }, 
        'Authentication required', 
        401
      );
    }
    
    // Admins have all permissions
    if (req.user.role === 'admin') {
      return next();
    }
    
    // Check support permissions
    if (req.user.role === 'support') {
      if (!req.user.supportPermissions || !req.user.supportPermissions[permission]) {
        return errorResponse(res, 
          { code: 'FORBIDDEN' }, 
          'Insufficient permissions', 
          403
        );
      }
      return next();
    }
    
    return errorResponse(res, 
      { code: 'FORBIDDEN' }, 
      'Insufficient permissions', 
      403
    );
  };
};

module.exports = { roleCheck, permissionCheck };
