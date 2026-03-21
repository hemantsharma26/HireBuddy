const eventService = require('../services/event.service');
const asyncHandler = require('../utils/asyncHandler');
const { successResponse, paginationResponse } = require('../utils/responseHandler');

/**
 * Get all events
 */
exports.getEvents = asyncHandler(async (req, res) => {
  const result = await eventService.getEvents(req.query);
  
  return paginationResponse(
    res,
    result.data,
    result.pagination.page,
    result.pagination.limit,
    result.pagination.total
  );
});

/**
 * Get event by ID
 */
exports.getEventById = asyncHandler(async (req, res) => {
  const event = await eventService.getEventById(req.params.id);
  
  return successResponse(res, { event });
});

/**
 * Create a new event
 */
exports.createEvent = asyncHandler(async (req, res) => {
  console.log('📬 NEW EVENT REQUEST RECEIVED:', req.body.title);
  const event = await eventService.createEvent(req.body, req.user._id, req.file);
  console.log('✅ EVENT CREATED IN DATABASE:', event._id);
  
  return successResponse(res, { event }, 'Event created successfully', 201);
});

/**
 * Toggle RSVP for an event
 */
exports.toggleRsvp = asyncHandler(async (req, res) => {
  const event = await eventService.toggleRsvp(req.params.id, req.user._id);
  
  return successResponse(res, { event }, 'RSVP updated successfully');
});

/**
 * Get events hosted by the current user
 */
exports.getMyEvents = asyncHandler(async (req, res) => {
  const events = await eventService.getMyEvents(req.user._id);
  
  return successResponse(res, { events }, 'Hosted events fetched successfully');
});

/**
 * Get events the current user is attending
 */
exports.getMyRsvps = asyncHandler(async (req, res) => {
  const events = await eventService.getMyRsvps(req.user._id);
  
  return successResponse(res, { events }, 'RSVPd events fetched successfully');
});

/**
 * Update attendee status (Accept/Reject)
 */
exports.updateAttendeeStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const event = await eventService.updateAttendeeStatus(
    req.params.id, 
    req.params.userId, 
    status, 
    req.user._id
  );
  
  return successResponse(res, { event }, `Attendee ${status} successfully`);
});
