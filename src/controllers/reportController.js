const reportService = require('../services/report.service');
const { successResponse } = require('../utils/responseHandler');
const asyncHandler = require('../utils/asyncHandler');
const { HTTP_STATUS } = require('../constants/httpStatus');
const { REPORT_MESSAGES } = require('../constants/responseMessages');

/**
 * Submit report
 */
const submitReport = asyncHandler(async (req, res) => {
  const report = await reportService.submitReport(req.userId, req.body);
  
  return successResponse(
    res,
    { report },
    REPORT_MESSAGES.REPORT_SUBMITTED,
    HTTP_STATUS.CREATED
  );
});

/**
 * Block user
 */
const blockUser = asyncHandler(async (req, res) => {
  const { blockedUserId, reason } = req.body;
  
  await reportService.blockUser(req.userId, blockedUserId, reason);
  
  return successResponse(res, {}, REPORT_MESSAGES.USER_BLOCKED);
});

/**
 * Get blocked users
 */
const getBlockedUsers = asyncHandler(async (req, res) => {
  const blockedUsers = await reportService.getBlockedUsers(req.userId);
  
  return successResponse(res, { blockedUsers });
});

/**
 * Unblock user
 */
const unblockUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  
  await reportService.unblockUser(req.userId, userId);
  
  return successResponse(res, {}, REPORT_MESSAGES.USER_UNBLOCKED);
});

module.exports = {
  submitReport,
  blockUser,
  getBlockedUsers,
  unblockUser
};
