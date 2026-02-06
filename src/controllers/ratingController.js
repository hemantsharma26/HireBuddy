const ratingService = require('../services/rating.service');
const { successResponse } = require('../utils/responseHandler');
const asyncHandler = require('../utils/asyncHandler');
const { HTTP_STATUS } = require('../constants/httpStatus');
const { RATING_MESSAGES } = require('../constants/responseMessages');

/**
 * Submit rating
 */
const submitRating = asyncHandler(async (req, res) => {
  const rating = await ratingService.submitRating(req.userId, req.body);
  
  return successResponse(
    res,
    { rating },
    RATING_MESSAGES.RATING_SUBMITTED,
    HTTP_STATUS.CREATED
  );
});

module.exports = {
  submitRating
};
