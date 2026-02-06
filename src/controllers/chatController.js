const chatService = require('../services/chat.service');
const { successResponse, paginationResponse } = require('../utils/responseHandler');
const asyncHandler = require('../utils/asyncHandler');
const { HTTP_STATUS } = require('../constants/httpStatus');
const { CHAT_MESSAGES } = require('../constants/responseMessages');

/**
 * Get user's chats
 */
const getChats = asyncHandler(async (req, res) => {
  const chats = await chatService.getUserChats(req.userId);
  
  return successResponse(res, { chats });
});

/**
 * Get chat details with messages
 */
const getChatMessages = asyncHandler(async (req, res) => {
  const { chatId } = req.params;
  
  const result = await chatService.getChatWithMessages(
    chatId,
    req.userId,
    { page: req.query.page, limit: req.query.limit }
  );
  
  return paginationResponse(
    res,
    { chat: result.chat, messages: result.messages },
    result.pagination.page,
    result.pagination.limit,
    result.pagination.total
  );
});

/**
 * Send message
 */
const sendMessage = asyncHandler(async (req, res) => {
  const { chatId } = req.params;
  const { content } = req.body;
  
  const message = await chatService.sendMessage(chatId, req.userId, content);
  
  return successResponse(
    res,
    { message },
    CHAT_MESSAGES.MESSAGE_SENT,
    HTTP_STATUS.CREATED
  );
});

/**
 * Mark chat as read
 */
const markChatAsRead = asyncHandler(async (req, res) => {
  const { chatId } = req.params;
  
  await chatService.markChatAsRead(chatId, req.userId);
  
  return successResponse(res, {}, CHAT_MESSAGES.CHAT_MARKED_READ);
});

module.exports = {
  getChats,
  getChatMessages,
  sendMessage,
  markChatAsRead
};
