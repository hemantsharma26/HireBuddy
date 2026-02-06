const User = require('../models/User');
const HiringRequest = require('../models/HiringRequest');
const Report = require('../models/Report');
const commonService = require('./common.service');
const { ADMIN_MESSAGES, REPORT_MESSAGES } = require('../constants/responseMessages');
const logger = require('../utils/logger');

/**
 * Admin Service
 * Business logic for admin operations
 */
class AdminService {
  /**
   * Get platform statistics
   */
  async getPlatformStats() {
    logger.info('Fetching platform statistics');
    
    const [
      totalUsers,
      activeUsers,
      bannedUsers,
      totalRequests,
      completedJobs,
      pendingReports,
      ratedUsers
    ] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ status: 'active' }),
      User.countDocuments({ status: 'banned' }),
      HiringRequest.countDocuments(),
      HiringRequest.countDocuments({ status: 'completed' }),
      Report.countDocuments({ status: 'pending' }),
      User.find({ 'stats.totalRatings': { $gt: 0 } }).select('stats.averageRating').lean()
    ]);
    
    // Calculate average platform rating
    const avgRating = ratedUsers.length > 0
      ? ratedUsers.reduce((sum, u) => sum + u.stats.averageRating, 0) / ratedUsers.length
      : 0;
    
    logger.info('Platform stats retrieved');
    
    return {
      totalUsers,
      activeUsers,
      bannedUsers,
      totalRequests,
      completedJobs,
      pendingReports,
      averagePlatformRating: Math.round(avgRating * 10) / 10
    };
  }

  /**
   * Get all users with filters and pagination
   */
  async getAllUsers(filters, paginationParams) {
    logger.info('Fetching all users');
    
    const { status, role } = filters;
    
    // Build pagination
    const pagination = commonService.buildPagination(
      paginationParams.page,
      paginationParams.limit
    );
    
    // Build filter
    const filter = {};
    if (status) filter.status = status;
    if (role) filter.role = role;
    
    // Execute paginated query
    const result = await commonService.executePaginatedQuery(
      User,
      filter,
      {
        sort: { createdAt: -1 },
        select: '-supportPermissions'
      },
      pagination
    );
    
    logger.info(`Found ${result.pagination.total} users`);
    return result;
  }

  /**
   * Ban a user
   */
  async banUser(userId, reason) {
    logger.info(`Banning user: ${userId}`);
    
    const user = await commonService.getEntityOrFail(
      User,
      userId,
      ADMIN_MESSAGES.USER_NOT_FOUND
    );
    
    user.status = 'banned';
    user.suspensionReason = reason;
    await user.save();
    
    logger.info(`User banned: ${userId}`);
  }

  /**
   * Unban a user
   */
  async unbanUser(userId) {
    logger.info(`Unbanning user: ${userId}`);
    
    const user = await commonService.getEntityOrFail(
      User,
      userId,
      ADMIN_MESSAGES.USER_NOT_FOUND
    );
    
    user.status = 'active';
    user.suspensionReason = undefined;
    user.suspensionExpiresAt = undefined;
    await user.save();
    
    logger.info(`User unbanned: ${userId}`);
  }

  /**
   * Change user role
   */
  async changeUserRole(userId, role, permissions) {
    logger.info(`Changing role for user ${userId} to: ${role}`);
    
    const user = await commonService.getEntityOrFail(
      User,
      userId,
      ADMIN_MESSAGES.USER_NOT_FOUND
    );
    
    user.role = role;
    
    if (role === 'support' && permissions) {
      user.supportPermissions = permissions;
    }
    
    await user.save();
    
    logger.info(`User role updated: ${userId}`);
    return user;
  }

  /**
   * Get all reports with filters and pagination
   */
  async getAllReports(filters, paginationParams) {
    logger.info('Fetching all reports');
    
    const { status, priority } = filters;
    
    // Build pagination
    const pagination = commonService.buildPagination(
      paginationParams.page,
      paginationParams.limit
    );
    
    // Build filter
    const filter = {};
    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    
    // Execute paginated query
    const result = await commonService.executePaginatedQuery(
      Report,
      filter,
      {
        sort: { createdAt: -1 },
        populate: [
          { path: 'reporterId', select: 'displayName profilePicture' },
          { path: 'reportedUserId', select: 'displayName profilePicture' },
          { path: 'assignedTo', select: 'displayName' }
        ]
      },
      pagination
    );
    
    logger.info(`Found ${result.pagination.total} reports`);
    return result;
  }

  /**
   * Update a report
   */
  async updateReport(reportId, updateData) {
    const { status, priority, assignedTo, notes, userId } = updateData;
    
    logger.info(`Updating report: ${reportId}`);
    
    const report = await commonService.getEntityOrFail(
      Report,
      reportId,
      REPORT_MESSAGES.REPORT_NOT_FOUND
    );
    
    if (status) report.status = status;
    if (priority) report.priority = priority;
    if (assignedTo) report.assignedTo = assignedTo;
    if (notes) report.addNote(userId, notes);
    
    await report.save();
    
    logger.info(`Report updated: ${reportId}`);
    return report;
  }

  /**
   * Resolve a report
   */
  async resolveReport(reportId, userId, action, resolutionNotes) {
    logger.info(`Resolving report: ${reportId}`);
    
    const report = await commonService.getEntityOrFail(
      Report,
      reportId,
      REPORT_MESSAGES.REPORT_NOT_FOUND
    );
    
    // Resolve report (using model method)
    await report.resolve(userId, action, resolutionNotes);
    
    // Apply action if needed
    if (action === 'permanent_ban' && report.reportedUserId) {
      await User.findByIdAndUpdate(report.reportedUserId, {
        status: 'banned',
        suspensionReason: 'Reported and reviewed'
      });
      
      logger.info(`User banned as result of report: ${report.reportedUserId}`);
    }
    
    logger.info(`Report resolved: ${reportId}`);
  }
}

module.exports = new AdminService();
