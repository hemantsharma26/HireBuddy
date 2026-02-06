const Rating = require('../models/Rating');
const User = require('../models/User');
const HiringRequest = require('../models/HiringRequest');
const commonService = require('./common.service');
const permissionService = require('./permission.service');
const { RATING_MESSAGES, REQUEST_MESSAGES } = require('../constants/responseMessages');
const { ValidationError, ForbiddenError } = require('../utils/errors');
const logger = require('../utils/logger');

/**
 * Rating Service
 * Business logic for rating system
 */
class RatingService {
  /**
   * Submit a rating for a completed request
   */
  async submitRating(userId, ratingData) {
    const { requestId, ratedUserId, stars, review, ratingType } = ratingData;
    
    logger.info(`User ${userId} submitting rating for request ${requestId}`);
    
    // Get and validate request
    const request = await commonService.getEntityOrFail(
      HiringRequest,
      requestId,
      REQUEST_MESSAGES.REQUEST_NOT_FOUND
    );
    
    // Ensure request is completed
    permissionService.ensureStatus(request, ['completed']);
    
    // Verify user is part of this transaction
    const isRequester = request.requesterId.toString() === userId.toString();
    const isHelper = request.acceptedBy && request.acceptedBy.toString() === userId.toString();
    
    if (!isRequester && !isHelper) {
      throw new ForbiddenError(RATING_MESSAGES.NOT_AUTHORIZED_TO_RATE);
    }
    
    // Check for duplicate rating
    const existingRating = await Rating.findOne({ requestId, raterId: userId });
    if (existingRating) {
      throw new ValidationError(RATING_MESSAGES.ALREADY_RATED);
    }
    
    // Create rating
    const rating = await Rating.create({
      requestId,
      raterId: userId,
      ratedUserId,
      stars,
      review,
      ratingType
    });
    
    // Update user rating stats
    await this._updateUserRatingStats(ratedUserId, stars);
    
    logger.info(`Rating created: ${rating._id}`);
    return rating;
  }

  /**
   * Update user's rating statistics
   * @private
   */
  async _updateUserRatingStats(userId, newStars) {
    const user = await User.findById(userId);
    
    const totalRatings = user.stats.totalRatings + 1;
    const newAverage = ((user.stats.averageRating * user.stats.totalRatings) + newStars) / totalRatings;
    
    user.stats.totalRatings = totalRatings;
    user.stats.averageRating = Math.round(newAverage * 10) / 10;
    
    await user.save();
    
    logger.info(`Updated rating stats for user ${userId}: ${user.stats.averageRating} (${totalRatings} ratings)`);
  }
}

module.exports = new RatingService();
