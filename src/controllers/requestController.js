const requestService = require('../services/request.service');
const { successResponse, paginationResponse } = require('../utils/responseHandler');
const asyncHandler = require('../utils/asyncHandler');
const { HTTP_STATUS } = require('../constants/httpStatus');
const { REQUEST_MESSAGES } = require('../constants/responseMessages');

/**
 * Create hiring request
 */
const createRequest = asyncHandler(async (req, res) => {
  const request = await requestService.createRequest(req.userId, req.body);
  
  return successResponse(
    res,
    { request },
    REQUEST_MESSAGES.REQUEST_CREATED,
    HTTP_STATUS.CREATED
  );
});

/**
 * Browse hiring requests
 */
const browseRequests = asyncHandler(async (req, res) => {
  const result = await requestService.browseRequests(
    req.query,
    req.userId,
    { page: req.query.page, limit: req.query.limit }
  );
  
  return paginationResponse(
    res,
    { requests: result.data },
    result.pagination.page,
    result.pagination.limit,
    result.pagination.total
  );
});

/**
 * Get single request
 */
const getRequest = asyncHandler(async (req, res) => {
  const request = await requestService.getRequestById(req.params.requestId);
  
  return successResponse(res, { request });
});

/**
 * Apply to request
 */
const applyToRequest = asyncHandler(async (req, res) => {
  const { requestId } = req.params;
  const { message, bidAmount, availability } = req.body;
  
  await requestService.applyToRequest(requestId, req.userId, message, bidAmount, availability);
  
  return successResponse(res, {}, REQUEST_MESSAGES.APPLICATION_SUBMITTED);
});

/**
 * Accept applicant
 */
const acceptApplicant = asyncHandler(async (req, res) => {
  const { requestId, applicantId } = req.params;
  
  const result = await requestService.acceptApplicant(requestId, applicantId, req.userId);
  
  return successResponse(
    res,
    { chatId: result.chatId },
    REQUEST_MESSAGES.APPLICANT_ACCEPTED
  );
});

/**
 * Complete request
 */
const completeRequest = asyncHandler(async (req, res) => {
  const request = await requestService.completeRequest(req.params.requestId, req.userId);
  
  return successResponse(
    res,
    { request },
    REQUEST_MESSAGES.REQUEST_COMPLETED
  );
});

/**
 * Get my posted requests
 */
const getMyRequests = asyncHandler(async (req, res) => {
  const result = await requestService.getMyRequests(
    req.userId,
    { status: req.query.status },
    { page: req.query.page, limit: req.query.limit }
  );
  
  return paginationResponse(
    res,
    { requests: result.data },
    result.pagination.page,
    result.pagination.limit,
    result.pagination.total
  );
});

/**
 * Get accepted jobs
 */
const getAcceptedJobs = asyncHandler(async (req, res) => {
  const result = await requestService.getAcceptedJobs(
    req.userId,
    { page: req.query.page, limit: req.query.limit }
  );
  
  return paginationResponse(
    res,
    { requests: result.data },
    result.pagination.page,
    result.pagination.limit,
    result.pagination.total
  );
});

/**
 * Update hiring request
 */
const updateRequest = asyncHandler(async (req, res) => {
  const { requestId } = req.params;
  const request = await requestService.updateRequest(requestId, req.userId, req.body);
  
  return successResponse(
    res,
    { request },
    REQUEST_MESSAGES.REQUEST_UPDATED
  );
});

module.exports = {
  createRequest,
  browseRequests,
  getRequest,
  applyToRequest,
  acceptApplicant,
  completeRequest,
  getMyRequests,
  getAcceptedJobs,
  updateRequest
};
