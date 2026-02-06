const BlockedUser = require('../models/BlockedUser');
const { ForbiddenError, ValidationError } = require('../utils/errors');
const logger = require('../utils/logger');

/**
 * Permission Service
 * Centralized access control and authorization checks
 */
class PermissionService {
  /**
   * Ensure user owns the entity
   * @param {object} entity - Entity to check ownership
   * @param {string} userId - User ID attempting access
   * @param {string} ownerField - Field name containing owner ID
   * @throws {ForbiddenError} If user is not the owner
   */
  ensureOwnership(entity, userId, ownerField = 'requesterId') {
    const ownerId = entity[ownerField];
    
    if (!ownerId) {
      logger.error(`Entity missing owner field: ${ownerField}`);
      throw new Error(`Entity does not have owner field: ${ownerField}`);
    }
    
    if (ownerId.toString() !== userId.toString()) {
      logger.warn(`Ownership check failed. User: ${userId}, Owner: ${ownerId}`);
      throw new ForbiddenError('Not authorized to perform this action');
    }
    
    logger.debug(`Ownership verified for user: ${userId}`);
  }

  /**
   * Ensure user is participant in a chat/conversation
   * @param {object} entity - Entity with participants array
   * @param {string} userId - User ID to check
   * @param {string} participantsField - Field name containing participants
   * @throws {ForbiddenError} If user is not a participant
   */
  ensureParticipant(entity, userId, participantsField = 'participants') {
    const participants = entity[participantsField];
    
    if (!Array.isArray(participants)) {
      logger.error(`Entity missing participants field: ${participantsField}`);
      throw new Error(`Entity does not have participants field: ${participantsField}`);
    }
    
    const isParticipant = participants.some(
      p => p.toString() === userId.toString()
    );
    
    if (!isParticipant) {
      logger.warn(`Participant check failed for user: ${userId}`);
      throw new ForbiddenError('Not a participant in this conversation');
    }
    
    logger.debug(`Participant verified for user: ${userId}`);
  }

  /**
   * Ensure entity is in one of the allowed statuses
   * @param {object} entity - Entity with status field
   * @param {Array<string>} allowedStatuses - Allowed status values
   * @param {string} statusField - Field name containing status
   * @throws {ValidationError} If status is not allowed
   */
  ensureStatus(entity, allowedStatuses, statusField = 'status') {
    const currentStatus = entity[statusField];
    
    if (!currentStatus) {
      logger.error(`Entity missing status field: ${statusField}`);
      throw new Error(`Entity does not have status field: ${statusField}`);
    }
    
    if (!allowedStatuses.includes(currentStatus)) {
      logger.warn(
        `Status check failed. Current: ${currentStatus}, Allowed: ${allowedStatuses.join(', ')}`
      );
      throw new ValidationError(
        `Invalid status. Expected one of: ${allowedStatuses.join(', ')}`
      );
    }
    
    logger.debug(`Status check passed: ${currentStatus}`);
  }

  /**
   * Ensure user has not blocked target user
   * @param {string} userId - User ID
   * @param {string} targetUserId - Target user ID
   * @throws {ForbiddenError} If user is blocked
   */
  async ensureNotBlocked(userId, targetUserId) {
    logger.debug(`Checking if ${userId} blocked ${targetUserId}`);
    
    const blocked = await BlockedUser.findOne({
      blockerId: userId,
      blockedUserId: targetUserId
    });
    
    if (blocked) {
      logger.warn(`User ${targetUserId} is blocked by ${userId}`);
      throw new ForbiddenError('User is blocked');
    }
    
    logger.debug(`No block found between users`);
  }

  /**
   * Ensure users are not the same
   * @param {string} userId1 - First user ID
   * @param {string} userId2 - Second user ID
   * @param {string} message - Error message
   * @throws {ValidationError} If users are the same
   */
  ensureDifferentUsers(userId1, userId2, message = 'Cannot perform action on yourself') {
    if (userId1.toString() === userId2.toString()) {
      logger.warn(`Same user check failed: ${userId1}`);
      throw new ValidationError(message);
    }
    
    logger.debug(`Different users verified`);
  }

  /**
   * Ensure entity has not reached maximum allowed count
   * @param {number} currentCount - Current count
   * @param {number} maxCount - Maximum allowed
   * @param {string} message - Error message
   * @throws {ValidationError} If limit exceeded
   */
  ensureWithinLimit(currentCount, maxCount, message = 'Maximum limit reached') {
    if (currentCount >= maxCount) {
      logger.warn(`Limit check failed. Current: ${currentCount}, Max: ${maxCount}`);
      throw new ValidationError(message);
    }
    
    logger.debug(`Within limit: ${currentCount}/${maxCount}`);
  }

  /**
   * Check if user has already performed an action (generic duplicate check)
   * @param {Model} Model - Mongoose model to check
   * @param {object} filter - Filter criteria
   * @param {string} message - Error message
   * @throws {ConflictError} If action already performed
   */
  async ensureNotDuplicate(Model, filter, message = 'Action already performed') {
    logger.debug(`Checking for duplicate: ${JSON.stringify(filter)}`);
    
    const existing = await Model.findOne(filter);
    
    if (existing) {
      logger.warn(`Duplicate action detected`);
      const { ConflictError } = require('../utils/errors');
      throw new ConflictError(message);
    }
    
    logger.debug(`No duplicate found`);
  }
}

module.exports = new PermissionService();
