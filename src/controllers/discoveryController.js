const discoveryService = require('../services/discovery.service');
const asyncHandler = require('../utils/asyncHandler');
const { successResponse } = require('../utils/responseHandler');

/**
 * Get all data for the Explore page
 */
const getExploreData = asyncHandler(async (req, res) => {
  const data = await discoveryService.getExploreData();
  return successResponse(res, { data });
});

/**
 * Get dynamic profile options for settings
 */
const getProfileOptions = asyncHandler(async (req, res) => {
  const data = await discoveryService.getProfileOptions();
  return successResponse(res, { data });
});

/**
 * Get recommended buddies
 */
const getRecommendedBuddies = asyncHandler(async (req, res) => {
  const limit = parseInt(req.query.limit, 10) || 5;
  const buddies = await discoveryService.getRecommendedBuddies(limit);
  return successResponse(res, { buddies });
});

module.exports = {
  getExploreData,
  getProfileOptions,
  getRecommendedBuddies
};
