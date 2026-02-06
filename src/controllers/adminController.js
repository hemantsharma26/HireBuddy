const adminService = require('../services/admin.service');
const { successResponse, paginationResponse } = require('../utils/responseHandler');
const asyncHandler = require('../utils/asyncHandler');
const { ADMIN_MESSAGES, REPORT_MESSAGES } = require('../constants/responseMessages');

/**
 * Get platform statistics
 */
const getStats = asyncHandler(async (req, res) => {
  const stats = await adminService.getPlatformStats();
  
  return successResponse(res, { stats });
});

/**
 * Get all users
 */
const getAllUsers = asyncHandler(async (req, res) => {
  const { status, role } = req.query;
  
  const result = await adminService.getAllUsers(
    { status, role },
    { page: req.query.page, limit: req.query.limit }
  );
  
  return paginationResponse(
    res,
    { users: result.data },
    result.pagination.page,
    result.pagination.limit,
    result.pagination.total
  );
});

/**
 * Ban user
 */
const banUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { reason } = req.body;
  
  await adminService.banUser(userId, reason);
  
  return successResponse(res, {}, ADMIN_MESSAGES.USER_BANNED);
});

/**
 * Unban user
 */
const unbanUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  
  await adminService.unbanUser(userId);
  
  return successResponse(res, {}, ADMIN_MESSAGES.USER_UNBANNED);
});

/**
 * Change user role
 */
const changeUserRole = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { role, permissions } = req.body;
  
  const user = await adminService.changeUserRole(userId, role, permissions);
  
  return successResponse(res, { user }, ADMIN_MESSAGES.ROLE_UPDATED);
});

/**
 * Get all reports
 */
const getAllReports = asyncHandler(async (req, res) => {
  const { status, priority } = req.query;
  
  const result = await adminService.getAllReports(
    { status, priority },
    { page: req.query.page, limit: req.query.limit }
  );
  
  return paginationResponse(
    res,
    { reports: result.data },
    result.pagination.page,
    result.pagination.limit,
    result.pagination.total
  );
});

/**
 * Update report
 */
const updateReport = asyncHandler(async (req, res) => {
  const { reportId } = req.params;
  const { status, priority, assignedTo, notes } = req.body;
  
  const report = await adminService.updateReport(reportId, {
    status,
    priority,
    assignedTo,
    notes,
    userId: req.userId
  });
  
  return successResponse(res, { report }, REPORT_MESSAGES.REPORT_UPDATED);
});

/**
 * Resolve report
 */
const resolveReport = asyncHandler(async (req, res) => {
  const { reportId } = req.params;
  const { action, resolutionNotes } = req.body;
  
  await adminService.resolveReport(reportId, req.userId, action, resolutionNotes);
  
  return successResponse(res, {}, REPORT_MESSAGES.REPORT_RESOLVED);
});

module.exports = {
  getStats,
  getAllUsers,
  banUser,
  unbanUser,
  changeUserRole,
  getAllReports,
  updateReport,
  resolveReport
};
