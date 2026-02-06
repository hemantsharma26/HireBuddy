const User = require('../models/User');
const Rating = require('../models/Rating');
const commonService = require('./common.service');
const { USER_MESSAGES } = require('../constants/responseMessages');
const logger = require('../utils/logger');
const mongoose = require('mongoose');

/**
 * User Service
 * Business logic for user management and profiles
 */
class UserService {
  /**
   * Update user profile
   */
  async updateProfile(userId, profileData) {
    logger.info(`Updating profile for user: ${userId}`);
    
    const { displayName, bio, email, profilePicture, location } = profileData;
    
    // Build update object with only provided fields
    const updateFields = {};
    if (displayName) updateFields.displayName = displayName;
    if (bio !== undefined) updateFields.bio = bio;
    if (email) updateFields.email = email;
    if (profilePicture !== undefined) updateFields.profilePicture = profilePicture;
    if (location) updateFields.location = location;
    
    // Update user
    const user = await User.findByIdAndUpdate(
      userId,
      { $set: updateFields },
      { new: true, runValidators: true }
    ).lean();
    
    logger.info(`Profile updated for user: ${userId}`);
    return user;
  }

  /**
   * Update availability status
   */
  async updateAvailability(userId, availability) {
    logger.info(`Updating availability for user ${userId} to: ${availability}`);
    
    const user = await User.findByIdAndUpdate(
      userId,
      { $set: { availability } },
      { new: true, runValidators: true }
    ).select('availability').lean();
    
    return user.availability;
  }

  /**
   * Get public user profile
   */
  async getUserProfile(userId) {
    logger.info(`Fetching public profile for user: ${userId}`);
    
    const user = await commonService.getEntityOrFail(
      User,
      userId,
      USER_MESSAGES.USER_NOT_FOUND
    );
    
    // Return public profile virtual
    return user.publicProfile;
  }

  /**
   * Get user ratings with pagination and statistics
   */
  async getUserRatings(userId, paginationParams) {
    logger.info(`Fetching ratings for user: ${userId}`);
    
    // Verify user exists
    const user = await commonService.getEntityOrFail(
      User,
      userId,
      USER_MESSAGES.USER_NOT_FOUND
    );
    
    // Build pagination
    const pagination = commonService.buildPagination(
      paginationParams.page,
      paginationParams.limit
    );
    
    // Execute paginated ratings query
    const result = await commonService.executePaginatedQuery(
      Rating,
      { ratedUserId: userId },
      {
        sort: { createdAt: -1 },
        populate: { path: 'raterId', select: 'displayName profilePicture' }
      },
      pagination
    );
    
    // Calculate rating distribution using aggregation
    const distribution = await Rating.aggregate([
      { $match: { ratedUserId: mongoose.Types.ObjectId(userId) } },
      { $group: { _id: '$stars', count: { $sum: 1 } } }
    ]);
    
    // Format distribution
    const dist = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    distribution.forEach(d => { 
      dist[d._id] = d.count; 
    });
    
    logger.info(`Retrieved ${result.data.length} ratings`);
    
    return {
      ratings: result.data,
      stats: {
        averageRating: user.stats.averageRating,
        totalRatings: user.stats.totalRatings,
        distribution: dist
      },
      pagination: result.pagination
    };
  }
}

module.exports = new UserService();
