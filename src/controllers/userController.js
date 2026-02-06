const userService = require('../services/user.service');
const { successResponse, paginationResponse } = require('../utils/responseHandler');
const asyncHandler = require('../utils/asyncHandler');
const { USER_MESSAGES } = require('../constants/responseMessages');

/**
 * Get current user profile
 */
const getMyProfile = asyncHandler(async (req, res) => {
  return successResponse(res, { user: req.user });
});

/**
 * Update user profile
 */
const updateProfile = asyncHandler(async (req, res) => {
  const user = await userService.updateProfile(req.userId, req.body);
  
  return successResponse(res, { user }, USER_MESSAGES.PROFILE_UPDATED);
});

/**
 * Update availability status
 */
const updateAvailability = asyncHandler(async (req, res) => {
  const { availability } = req.body;
  
  const updatedAvailability = await userService.updateAvailability(req.userId, availability);
  
  return successResponse(
    res,
    { availability: updatedAvailability },
    USER_MESSAGES.AVAILABILITY_UPDATED
  );
});

/**
 * Get public user profile
 */
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await userService.getUserProfile(req.params.userId);
  
  return successResponse(res, { user });
});

/**
 * Get user ratings
 */
const getUserRatings = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  
  const result = await userService.getUserRatings(
    userId,
    { page: req.query.page, limit: req.query.limit }
  );
  
  return paginationResponse(
    res,
    {
      ratings: result.ratings,
      stats: result.stats
    },
    result.pagination.page,
    result.pagination.limit,
    result.pagination.total
  );
});

module.exports = {
  getMyProfile,
  updateProfile,
  updateAvailability,
  getUserProfile,
  getUserRatings
};
