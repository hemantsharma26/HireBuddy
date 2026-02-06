const Chat = require('../models/Chat');
const Message = require('../models/Message');
const commonService = require('./common.service');
const permissionService = require('./permission.service');
const { CHAT_MESSAGES } = require('../constants/responseMessages');
const logger = require('../utils/logger');

/**
 * Chat Service
 * Business logic for chat and messaging
 */
class ChatService {
  /**
   * Get all chats for a user
   */
  async getUserChats(userId) {
    logger.info(`Fetching chats for user: ${userId}`);
    
    const chats = await Chat.find({
      participants: userId
    })
      .populate('participants', 'displayName profilePicture')
      .populate('requestId', 'title')
      .sort({ updatedAt: -1 });
    
    // Format response with unread count for current user
    const formattedChats = chats.map(chat => {
      const chatObj = chat.toObject();
      return {
        ...chatObj,
        unreadCount: chat.unreadCount.get(userId.toString()) || 0
      };
    });
    
    logger.info(`Found ${chats.length} chats`);
    return formattedChats;
  }

  /**
   * Get chat details with paginated messages
   */
  async getChatWithMessages(chatId, userId, paginationParams) {
    logger.info(`Fetching chat ${chatId} with messages for user: ${userId}`);
    
    // Get chat with validation
    const chat = await commonService.getEntityOrFail(
      Chat,
      chatId,
      CHAT_MESSAGES.CHAT_NOT_FOUND,
      [
        { path: 'participants', select: 'displayName profilePicture' },
        { path: 'requestId', select: 'title status' }
      ]
    );
    
    // Ensure user is participant
    permissionService.ensureParticipant(chat, userId);
    
    // Build pagination (max 50 messages per page for chat)
    const pagination = commonService.buildPagination(
      paginationParams.page,
      paginationParams.limit,
      50
    );
    
    // Execute paginated message query
    const result = await commonService.executePaginatedQuery(
      Message,
      { chatId },
      {
        sort: { createdAt: -1 },
        select: null
      },
      pagination
    );
    
    // Reverse messages for chronological order (oldest first in UI)
    result.data.reverse();
    
    logger.info(`Retrieved ${result.data.length} messages`);
    
    return {
      chat,
      messages: result.data,
      pagination: result.pagination
    };
  }

  /**
   * Send a message in a chat
   */
  async sendMessage(chatId, userId, content) {
    logger.info(`User ${userId} sending message in chat: ${chatId}`);
    
    // Get chat
    const chat = await commonService.getEntityOrFail(
      Chat,
      chatId,
      CHAT_MESSAGES.CHAT_NOT_FOUND
    );
    
    // Ensure user is participant
    permissionService.ensureParticipant(chat, userId);
    
    // Create message
    const message = await Message.create({
      chatId,
      senderId: userId,
      content
    });
    
    // Update chat last message
    chat.lastMessage = {
      content,
      senderId: userId,
      sentAt: new Date()
    };
    
    // Increment unread count for other participant
    const otherParticipant = chat.getOtherParticipant(userId);
    await chat.incrementUnread(otherParticipant);
    
    logger.info(`Message sent: ${message._id}`);
    return message;
  }

  /**
   * Mark chat as read
   */
  async markChatAsRead(chatId, userId) {
    logger.info(`Marking chat ${chatId} as read for user: ${userId}`);
    
    // Get chat
    const chat = await commonService.getEntityOrFail(
      Chat,
      chatId,
      CHAT_MESSAGES.CHAT_NOT_FOUND
    );
    
    // Ensure user is participant (required to mark as read)
    permissionService.ensureParticipant(chat, userId);
    
    // Reset unread count
    await chat.resetUnread(userId);
    
    // Mark unread messages as read
    await Message.updateMany(
      { chatId, senderId: { $ne: userId }, isRead: false },
      { $set: { isRead: true, readAt: new Date() } }
    );
    
    logger.info(`Chat marked as read`);
  }
}

module.exports = new ChatService();
