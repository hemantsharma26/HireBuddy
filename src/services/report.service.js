const Report = require('../models/Report');
const BlockedUser = require('../models/BlockedUser');
const commonService = require('./common.service');
const permissionService = require('./permission.service');
const { REPORT_MESSAGES } = require('../constants/responseMessages');
const { ValidationError } = require('../utils/errors');
const logger = require('../utils/logger');

/**
 * Report Service
 * Business logic for reporting and blocking
 */
class ReportService {
  /**
   * Submit a report
   */
  async submitReport(userId, reportData) {
    const { reportedUserId, reportedRequestId, reason, description, priority } = reportData;
    
    logger.info(`User ${userId} submitting report`);
    
    // Validate: must report either user or request, unless it's a general support ticket or issue
    const isTargetRequired = !['technical_issue', 'sos', 'other', 'verification_issue', 'billing_issue', 'safety_concern'].includes(reason);
    if (isTargetRequired && !reportedUserId && !reportedRequestId) {
      throw new ValidationError(REPORT_MESSAGES.MUST_REPORT_USER_OR_REQUEST);
    }
    
    // Create report
    const report = await Report.create({
      reporterId: userId,
      reportedUserId,
      reportedRequestId,
      reason,
      description,
      priority: priority || 'medium'
    });
    
    logger.info(`Report created: ${report._id}`);
    return report;
  }

  /**
   * Block a user
   */
  async blockUser(blockerId, blockedUserId, reason) {
    logger.info(`User ${blockerId} blocking user ${blockedUserId}`);
    
    // Ensure user is not blocking themselves
    permissionService.ensureDifferentUsers(
      blockerId,
      blockedUserId,
      REPORT_MESSAGES.CANNOT_BLOCK_SELF
    );
    
    // Create block record (unique index prevents duplicates)
    await BlockedUser.create({
      blockerId,
      blockedUserId,
      reason
    });
    
    logger.info(`User blocked successfully`);
  }

  /**
   * Get blocked users for a user
   */
  async getBlockedUsers(userId) {
    logger.info(`Fetching blocked users for user: ${userId}`);
    
    const blockedUsers = await BlockedUser.find({ blockerId: userId })
      .populate('blockedUserId', 'displayName profilePicture')
      .sort({ createdAt: -1 })
      .lean();
    
    logger.info(`Found ${blockedUsers.length} blocked users`);
    return blockedUsers;
  }

  /**
   * Unblock a user
   */
  async unblockUser(blockerId, blockedUserId) {
    logger.info(`User ${blockerId} unblocking user ${blockedUserId}`);
    
    await BlockedUser.findOneAndDelete({
      blockerId,
      blockedUserId
    });
    
    logger.info(`User unblocked successfully`);
  }

  /**
   * Get report history for a user
   */
  async getMyReports(userId) {
    logger.info(`Fetching report history for user: ${userId}`);
    
    const reports = await Report.find({ reporterId: userId })
      .populate('reportedUserId', 'displayName profilePicture')
      .populate('reportedRequestId', 'title category')
      .populate('assignedTo', 'displayName')
      .populate('resolution.resolvedBy', 'displayName')
      .sort({ createdAt: -1 })
      .lean();
    
    logger.info(`Found ${reports.length} reports for user ${userId}`);
    return reports;
  }
}

module.exports = new ReportService();
