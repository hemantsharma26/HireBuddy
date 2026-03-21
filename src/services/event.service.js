const Event = require('../models/Event');
const commonService = require('./common.service');
const { ValidationError, UnauthorizedError, NotFoundError } = require('../utils/errors');
const logger = require('../utils/logger');

class EventService {
  /**
   * Get all events with filtering and pagination
   */
  async getEvents(queryParams) {
    const { 
      page, 
      limit, 
      category, 
      search, 
      city, 
      featured,
      hostId
    } = queryParams;

    const pagination = commonService.buildPagination(page, limit);
    
    // Build filter
    let query = {};
    
    if (category) query.category = category;
    if (city) query.city = new RegExp(city, 'i');
    if (featured === 'true') query.isFeatured = true;
    if (hostId) query.host = hostId;

    if (search) {
      query.$or = [
        { title: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') },
        { address: new RegExp(search, 'i') }
      ];
    }

    const result = await commonService.executePaginatedQuery(
      Event,
      query,
      {
        sort: { date: 1, createdAt: -1 },
        populate: { path: 'host', select: 'displayName profilePicture' }
      },
      pagination
    );

    return result;
  }

  /**
   * Get event by ID
   */
  async getEventById(id) {
    return await commonService.getEntityOrFail(
      Event,
      id,
      'Event not found',
      [
        { path: 'host', select: 'displayName profilePicture phoneNumber' },
        { path: 'attendees.user', select: 'displayName profilePicture phoneNumber' }
      ]
    );
  }

  /**
   * Create a new event
   */
  async createEvent(eventData, userId, file) {
    logger.debug(`Creating new event by user: ${userId}`);
    
    // address might be in eventData directly or inside location if sent that way
    const { coordinates, location, address, ...rest } = eventData;
    
    let processedCoordinates = [0, 0];
    if (coordinates) {
      processedCoordinates = typeof coordinates === 'string' 
        ? JSON.parse(coordinates) 
        : coordinates;
    }

    const eventAddress = address || (typeof location === 'string' ? location : rest.address);

    const event = await Event.create({
      ...rest,
      address: eventAddress,
      host: userId,
      imageUrl: file ? `/uploads/events/${file.filename}` : undefined,
      location: {
        type: 'Point',
        coordinates: processedCoordinates
      }
    });
    
    return event;
  }

  /**
   * Toggle RSVP for an event
   */
  async toggleRsvp(eventId, userId) {
    if (!userId) throw new ValidationError('User identification failed');
    
    logger.info(`Toggle RSVP for event ${eventId} by user ${userId}`);
    const event = await Event.findById(eventId);
    if (!event) throw new NotFoundError('Event not found');
    
    // Check if user is already an attendee (any status)
    const userIdStr = userId.toString();
    const attendeeIndex = event.attendees.findIndex(
      (a) => a.user && a.user.toString() === userIdStr
    );

    if (attendeeIndex > -1) {
      // Remove attendee (Cancel RSVP)
      return await Event.findByIdAndUpdate(
        eventId,
        { $pull: { attendees: { user: userId } } },
        { new: true, runValidators: false }
      ).populate([
        { path: 'host', select: 'displayName profilePicture' },
        { path: 'attendees.user', select: 'displayName profilePicture' }
      ]);
    } else {
      // Check max attendees
      const acceptedCount = event.attendees.filter(a => a.status === 'accepted').length;
      if (acceptedCount >= event.maxAttendees) {
        throw new ValidationError('Event is at maximum capacity');
      }
      
      // Add attendee as pending
      return await Event.findByIdAndUpdate(
        eventId,
        { 
          $push: { 
            attendees: { 
              user: userId, 
              status: 'pending',
              requestedAt: new Date()
            } 
          } 
        },
        { new: true, runValidators: false }
      ).populate([
        { path: 'host', select: 'displayName profilePicture' },
        { path: 'attendees.user', select: 'displayName profilePicture' }
      ]);
    }
  }

  /**
   * Update status of an attendee (Accept/Reject)
   */
  async updateAttendeeStatus(eventId, attendeeUserId, status, hostId) {
    const event = await Event.findById(eventId);
    if (!event) throw new NotFoundError('Event not found');

    // Verify host
    if (event.host.toString() !== hostId.toString()) {
      throw new UnauthorizedError('Only the host can manage attendees');
    }

    const attendee = event.attendees.find(
      (a) => a.user && a.user.toString() === attendeeUserId.toString()
    );

    if (!attendee) {
      throw new ValidationError('Attendee not found for this event');
    }

    attendee.status = status;
    await event.save();
    
    return event;
  }

  /**
   * Get events hosted by a user
   */
  async getMyEvents(userId) {
    return await Event.find({ host: userId })
      .sort({ date: 1 })
      .populate('host', 'displayName profilePicture');
  }

  /**
   * Get events that a user has RSVP'd to
   */
  async getMyRsvps(userId) {
    return await Event.find({ 'attendees.user': userId })
      .sort({ date: 1 })
      .populate('host', 'displayName profilePicture');
  }
}

module.exports = new EventService();
