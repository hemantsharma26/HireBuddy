/**
 * Async Handler Wrapper
 * Eliminates the need for try/catch blocks in async controllers
 * Automatically passes errors to Express error handler
 */

/**
 * Wraps async route handlers to catch errors
 * @param {Function} fn - Async function to wrap
 * @returns {Function} Express middleware function
 */
const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

module.exports = asyncHandler;
