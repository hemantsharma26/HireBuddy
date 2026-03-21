const HiringRequest = require('../models/HiringRequest');
const Chat = require('../models/Chat');
const User = require('../models/User');
const commonService = require('./common.service');
const permissionService = require('./permission.service');
const { moderateContent } = require('./moderationService');
const { REQUEST_MESSAGES } = require('../constants/responseMessages');
const { ValidationError } = require('../utils/errors');
const logger = require('../utils/logger');

/**
 * Request Service
 * Business logic for hiring requests
 */
class RequestService {
  /**
   * Create a new hiring request
   */
  async createRequest(userId, requestData) {
    const { title, description, category, jobType, location, compensation, duration, workersNeeded, vibes } = requestData;
    
    logger.info(`Creating request for user: ${userId}`);
    
    // Moderate content
    moderateContent(title);
    moderateContent(description);
    
    // Create request
    const request = await HiringRequest.create({
      requesterId: userId,
      title,
      description,
      category,
      jobType,
      location,
      compensation,
      duration,
      workersNeeded,
      vibes: vibes || []
    });
    
    // Populate requester details
    await request.populate('requesterId', 'displayName profilePicture stats');
    
    logger.info(`Request created: ${request._id}`);
    return request;
  }

  /**
   * Update an existing hiring request
   */
  async updateRequest(requestId, userId, updateData) {
    const { title, description, category, jobType, location, compensation, duration } = updateData;
    
    logger.info(`Updating request: ${requestId} for user: ${userId}`);
    
    // Get request
    const request = await commonService.getEntityOrFail(
      HiringRequest,
      requestId,
      REQUEST_MESSAGES.REQUEST_NOT_FOUND
    );
    
    // Ensure ownership
    permissionService.ensureOwnership(request, userId);
    
    // Ensure status is open (cannot edit accepted/completed jobs)
    permissionService.ensureStatus(request, ['open']);
    
    // Moderate content if changed
    if (title) moderateContent(title);
    if (description) moderateContent(description);
    
    // Update fields
    if (title) request.title = title;
    if (description) request.description = description;
    if (category) request.category = category;
    if (jobType) request.jobType = jobType;
    if (location) request.location = location;
    if (compensation) request.compensation = compensation;
    if (duration !== undefined) request.duration = duration;
    if (workersNeeded !== undefined) request.workersNeeded = workersNeeded;
    
    await request.save();
    
    logger.info(`Request updated: ${request._id}`);
    return request;
  }

  /**
   * Browse hiring requests with filters
   */
  async browseRequests(filters, userId, paginationParams) {
    logger.info(`Browsing requests for user: ${userId}`);
    
    const { category, jobType, city, area, status = 'open', search, name, compensation, budget, title: titleFilter } = filters;
    
    // Build pagination
    const pagination = commonService.buildPagination(
      paginationParams.page,
      paginationParams.limit,
      100
    );
    
    // Build filter query
    const filter = commonService.buildFilterQuery(
      { status: 'open' },
      {
        category: 'category',
        jobType: 'jobType',
        city: 'location.city',
        area: 'location.area'
      },
      { category, jobType, city, area }
    );
    
    // Advanced Filters
    if (name) {
      const User = require('../models/User');
      const users = await User.find({ 
        displayName: { $regex: name, $options: 'i' } 
      }).select('_id');
      const userIds = users.map(u => u._id);
      
      if (filter.requesterId) {
        // If already has requesterId filter (e.g. excluding self), combine with $in
        const existingFilter = filter.requesterId;
        filter.requesterId = { ...existingFilter, $in: userIds };
      } else {
        filter.requesterId = { $in: userIds };
      }
    }

    if (titleFilter) {
      filter.title = { $regex: titleFilter, $options: 'i' };
    }

    if (compensation || budget) {
      const budgetValue = compensation || budget;
      filter.compensation = { $regex: budgetValue, $options: 'i' };
    }

    // Text search (Global)
    if (search) {
      const User = require('../models/User');
      const matchedUsers = await User.find({ 
        displayName: { $regex: search, $options: 'i' } 
      }).select('_id');
      const matchedUserIds = matchedUsers.map(u => u._id);

      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
        { compensation: { $regex: search, $options: 'i' } },
        { requesterId: { $in: matchedUserIds } }
      ];
    }

    // Add geolocation filter if coordinates provided
    const { lat, lng } = filters;
    let sort = { createdAt: -1 };

    if (lat && lng) {
      filter['location.coordinates'] = {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(lng), parseFloat(lat)]
          },
          // Optional: max distance in meters
          // $maxDistance: 50000 
        }
      };
      // MongoDB sorts by distance automatically with $near
      sort = {}; 
    } else {
      // Default sort by latest
      sort = { createdAt: -1 };
    }
    
    // Exclude blocked users and own requests (if user is logged in)
    if (userId) {
      const blockedIds = await commonService.getBlockedUserIds(userId);
      const excludeIds = [...blockedIds, userId];
      
      if (filter.requesterId) {
        // Correctly merge with existing $in from the 'name' filter
        filter.requesterId.$nin = excludeIds;
      } else {
        filter.requesterId = { $nin: excludeIds };
      }
    }
    
    // Execute paginated query
    const result = await commonService.executePaginatedQuery(
      HiringRequest,
      filter,
      {
        sort,
        populate: { path: 'requesterId', select: 'displayName profilePicture stats' }
      },
      pagination
    );
    
    // Transform data: hide applicants, show count only
    result.data = result.data.map(req => {
      const reqObj = req.toObject ? req.toObject() : req;
      return {
        ...reqObj,
        applicantsCount: reqObj.applicants?.length || 0,
        applicants: undefined
      };
    });
    
    logger.info(`Found ${result.pagination.total} requests`);
    return result;
  }

  /**
   * Get single request by ID
   */
  async getRequestById(requestId) {
    logger.info(`Fetching request: ${requestId}`);
    
    const request = await commonService.getEntityOrFail(
      HiringRequest,
      requestId,
      REQUEST_MESSAGES.REQUEST_NOT_FOUND,
      [
        { path: 'requesterId', select: 'displayName profilePicture bio stats' },
        { path: 'applicants.userId', select: 'displayName profilePicture stats' }
      ]
    );
    
    // Increment view count
    request.viewCount += 1;
    await request.save();
    
    return request;
  }

  /**
   * Apply to a hiring request
   */
  async applyToRequest(requestId, userId, message, bidAmount, availability) {
    logger.info(`User ${userId} applying to request: ${requestId}`);
    
    // Get request
    const request = await commonService.getEntityOrFail(
      HiringRequest,
      requestId,
      REQUEST_MESSAGES.REQUEST_NOT_FOUND
    );
    
    // Validate request is open
    permissionService.ensureStatus(request, ['open']);
    
    // Ensure user is not the requester
    permissionService.ensureDifferentUsers(
      request.requesterId,
      userId,
      REQUEST_MESSAGES.CANNOT_APPLY_OWN
    );
    
    // Bid validation (±50% of original budget)
    const budget = parseFloat(request.compensation.replace(/[^0-9.]/g, ''));
    if (!isNaN(budget) && budget > 0) {
      const min = budget * 0.5;
      const max = budget * 1.5;
      if (bidAmount < min || bidAmount > max) {
        throw new Error(`Bid must be between ₹${min.toFixed(0)} and ₹${max.toFixed(0)} based on the budget.`);
      }
    }

    // Apply (model method handles duplicate check)
    await request.addApplicant(userId, { message, bidAmount, availability });
    
    logger.info(`Application submitted successfully`);
    return request;
  }

  /**
   * Accept an applicant
   */
  async acceptApplicant(requestId, applicantId, requesterId) {
    logger.info(`Accepting applicant ${applicantId} for request: ${requestId}`);
    
    // Get request
    const request = await commonService.getEntityOrFail(
      HiringRequest,
      requestId,
      REQUEST_MESSAGES.REQUEST_NOT_FOUND
    );
    
    // Ensure requester owns the request
    permissionService.ensureOwnership(request, requesterId);
    
    // Accept applicant (model method handles validation)
    await request.acceptApplicant(applicantId);
    
    // Create chat
    const chat = await Chat.create({
      participants: [requesterId, applicantId],
      requestId
    });
    
    logger.info(`Applicant accepted, chat created: ${chat._id}`);
    return { request, chatId: chat._id };
  }

  /**
   * Complete a request
   */
  async completeRequest(requestId, userId) {
    logger.info(`Completing request: ${requestId}`);
    
    // Get request
    const request = await commonService.getEntityOrFail(
      HiringRequest,
      requestId,
      REQUEST_MESSAGES.REQUEST_NOT_FOUND
    );
    
    // Ensure ownership
    permissionService.ensureOwnership(request, userId);
    
    // Complete request (model method handles status validation)
    await request.completeRequest();
    
    // Update user stats
    await Promise.all([
      User.findByIdAndUpdate(
        request.requesterId,
        { $inc: { 'stats.totalJobsCompleted': 1 } }
      ),
      User.findByIdAndUpdate(
        request.acceptedBy,
        { $inc: { 'stats.totalJobsCompleted': 1 } }
      )
    ]);
    
    logger.info(`Request completed successfully`);
    return request;
  }

  /**
   * Get user's posted requests
   */
  async getMyRequests(userId, filters, paginationParams) {
    logger.info(`Fetching requests for user: ${userId}`);
    
    const pagination = commonService.buildPagination(
      paginationParams.page,
      paginationParams.limit
    );
    
    const filter = { requesterId: userId };
    if (filters.status) {
      filter.status = filters.status;
    }
    
    const result = await commonService.executePaginatedQuery(
      HiringRequest,
      filter,
      {
        sort: { createdAt: -1 },
        populate: { path: 'acceptedBy', select: 'displayName profilePicture' }
      },
      pagination
    );
    
    logger.info(`Found ${result.pagination.total} requests for user`);
    return result;
  }

  /**
   * Get user's accepted jobs
   */
  async getAcceptedJobs(userId, paginationParams) {
    logger.info(`Fetching accepted jobs for user: ${userId}`);
    
    const pagination = commonService.buildPagination(
      paginationParams.page,
      paginationParams.limit
    );
    
    const result = await commonService.executePaginatedQuery(
      HiringRequest,
      { acceptedBy: userId },
      {
        sort: { acceptedAt: -1 },
        populate: { path: 'requesterId', select: 'displayName profilePicture' }
      },
      pagination
    );
    
    logger.info(`Found ${result.pagination.total} accepted jobs`);
    return result;
  }
}

module.exports = new RequestService();
