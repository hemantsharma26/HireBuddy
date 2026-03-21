const Category = require('../models/Category');
const asyncHandler = require('../utils/asyncHandler');
const { successResponse } = require('../utils/responseHandler');

/**
 * Get all active categories
 */
const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({ isActive: true }).sort({ order: 1, name: 1 });
  return successResponse(res, { categories });
});

module.exports = {
  getCategories
};
