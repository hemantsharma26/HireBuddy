const User = require('../models/User');
const SavedRequest = require('../models/SavedRequest');
const SavedBuddy = require('../models/SavedBuddy');
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
   * Upload user avatar
   */
  async uploadAvatar(userId, filename) {
    logger.info(`Updating avatar for user: ${userId}`);
    const avatarUrl = `/uploads/avatars/${filename}`;

    await User.findByIdAndUpdate(
      userId,
      { $set: { profilePicture: avatarUrl } },
      { runValidators: true }
    );

    return avatarUrl;
  }

  /**
   * Update user profile
   */
  async updateProfile(userId, profileData) {
    logger.info(`Updating profile for user: ${userId}`);

    // Whitelist of allowed fields
    const allowedFields = [
      'displayName', 'bio', 'email', 'profilePicture', 'location',
      'tagline', 'district', 'state', 'pincode', 'ageRange', 'pronouns',
      'languages', 'vibes', 'helpSituations', 'availabilitySlots',
      'comfortSettings', 'budgetFrom', 'budgetTo', 'freeFirst5Min',
      'openToLowBudget', 'favoriteQuote', 'careAbout', 'definingSong',
      'nervousMessage', 'profileWarmth', 'settings', 'blockedUsers'
    ];

    // Build update object with only provided & allowed fields
    const updateFields = {};
    for (const field of allowedFields) {
      if (profileData[field] !== undefined) {
        updateFields[field] = profileData[field];
      }
    }

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

  /**
   * Toggle saved status for a buddy (other user)
   */
  async toggleSavedBuddy(userId, buddyId) {
    const existing = await SavedBuddy.findOne({ userId, buddyId });

    if (existing) {
      await SavedBuddy.deleteOne({ _id: existing._id });
      return { saved: false };
    } else {
      await SavedBuddy.create({ userId, buddyId });
      return { saved: true };
    }
  }

  /**
   * Get user's saved buddies
   */
  async getSavedBuddies(userId) {
    const savedRecords = await SavedBuddy.find({ userId })
      .populate({
        path: 'buddyId',
        select: 'displayName bio profilePicture location stats availability vibes createdAt'
      })
      .sort({ createdAt: -1 });

    // Extract populated buddy objects and filter out any null results
    return savedRecords
      .filter(record => record.buddyId)
      .map(record => record.buddyId);
  }

  /**
   * Toggle saved request
   */
  async toggleSavedRequest(userId, requestId) {
    const existing = await SavedRequest.findOne({ userId, requestId });

    if (existing) {
      await SavedRequest.deleteOne({ userId, requestId });
      return { saved: false };
    } else {
      await SavedRequest.create({ userId, requestId });
      return { saved: true };
    }
  }

  /**
   * Get user's saved requests
   */
  async getSavedRequests(userId) {
    // Migration logic: check if user still has savedRequests in their document
    const user = await User.findById(userId).select('savedRequests');
    if (user && user.savedRequests && user.savedRequests.length > 0) {
      logger.info(`Migrating saved requests for user: ${userId}`);
      for (const reqId of user.savedRequests) {
        await SavedRequest.findOneAndUpdate(
          { userId, requestId: reqId },
          { userId, requestId: reqId },
          { upsert: true }
        );
      }
      // Clear the array in User model
      user.savedRequests = [];
      await user.save();
    }

    const savedRecords = await SavedRequest.find({ userId })
      .populate({
        path: 'requestId',
        populate: { path: 'requesterId', select: 'displayName profilePicture stats' }
      })
      .sort({ createdAt: -1 });

    // Filter out any null/invalid requests and return the request objects
    return savedRecords
      .filter(record => record.requestId)
      .map(record => record.requestId);
  }

  /**
   * Get buddies (other users) with search and pagination
   */
  async getBuddies(userId, queryParams) {
    logger.info(`Fetching buddies for user ${userId} with search: ${queryParams.search}`);

    const { page, limit, search, vibes, category, minPrice, maxPrice, sort } = queryParams;
    const pagination = commonService.buildPagination(page, limit);

    // Build query
    const query = {
      role: 'user', // Back to user role
      status: 'active',
      category: { $exists: true, $ne: 'Other' } // Only show users who offering help
    };

    if (userId) {
      query._id = { $ne: userId }; // Exclude current user if logged in
    }

    if (search) {
      const searchRegex = new RegExp(search, 'i');
      query.$or = [
        { displayName: searchRegex },
        { bio: searchRegex },
        { 'location.city': searchRegex },
        { 'location.area': searchRegex }
      ];
    }

    // Filter by vibes (find users matching ANY of the selected vibes)
    if (vibes && vibes.length > 0) {
      query.vibes = { $in: vibes };
    }

    // Filter by category
    if (category && category !== "All Needs") {
      query.category = category;
    }

    // Filter by price range
    if (minPrice !== undefined || maxPrice !== undefined) {
      query.ratePerHour = {};
      if (minPrice !== undefined) query.ratePerHour.$gte = Number(minPrice);
      if (maxPrice !== undefined) query.ratePerHour.$lte = Number(maxPrice);
    }

    // Determine Sort
    let sortCriteria = { availability: 1, 'stats.averageRating': -1, createdAt: -1 };
    if (sort) {
      switch (sort) {
        case 'trust':
          sortCriteria = { 'stats.averageRating': -1, 'stats.totalRatings': -1 };
          break;
        case 'available':
          sortCriteria = { availability: 1, lastLoginAt: -1 };
          break;
        case 'budget':
          sortCriteria = { ratePerHour: 1 };
          break;
        case 'newest':
          sortCriteria = { createdAt: -1 };
          break;
      }
    }

    const result = await commonService.executePaginatedQuery(
      User,
      query,
      {
        sort: sortCriteria,
        select: 'displayName bio profilePicture location stats availability vibes createdAt category ratePerHour tagline'
      },
      pagination
    );

    return result;
  }
}

module.exports = new UserService();
