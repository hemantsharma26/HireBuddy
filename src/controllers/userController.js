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
 * Upload profile avatar
 */
const uploadAvatar = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No image file provided' });
  }

  const avatarUrl = await userService.uploadAvatar(req.userId, req.file.filename);

  return successResponse(res, { avatarUrl }, 'Profile picture updated successfully');
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

/**
 * Toggle saved request
 */
const toggleSavedRequest = asyncHandler(async (req, res) => {
  const { requestId } = req.params;
  const savedRequests = await userService.toggleSavedRequest(req.userId, requestId);

  return successResponse(res, { savedRequests }, 'Toggled saved request');
});

/**
 * Get saved requests
 */
const getSavedRequests = asyncHandler(async (req, res) => {
  const savedRequests = await userService.getSavedRequests(req.userId);
  return successResponse(res, { requests: savedRequests });
});

/**
 * Toggle saved buddy
 */
const toggleSavedBuddy = asyncHandler(async (req, res) => {
  const { buddyId } = req.params;
  const result = await userService.toggleSavedBuddy(req.userId, buddyId);

  return successResponse(res, result, 'Toggled saved buddy status');
});

/**
 * Get saved buddies
 */
const getSavedBuddies = asyncHandler(async (req, res) => {
  const buddies = await userService.getSavedBuddies(req.userId);
  return successResponse(res, { buddies });
});

/**
 * Get buddies (other users)
 */
const getBuddies = asyncHandler(async (req, res) => {
  // Parse vibes from comma-separated string
  const vibes = req.query.vibes
    ? req.query.vibes.split(',').map(v => v.trim()).filter(Boolean)
    : [];

  const result = await userService.getBuddies(
    req.userId,
    {
      page: req.query.page,
      limit: req.query.limit,
      search: req.query.search,
      category: req.query.category,
      minPrice: req.query.minPrice,
      maxPrice: req.query.maxPrice,
      sort: req.query.sort,
      vibes
    }
  );

  return paginationResponse(
    res,
    { buddies: result.data },
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
  getUserRatings,
  toggleSavedRequest,
  getSavedRequests,
  getBuddies,
  toggleSavedBuddy,
  getSavedBuddies,
  uploadAvatar
};
