const express = require('express');
const router = express.Router();
const {
  getChats,
  getChatMessages,
  sendMessage,
  markChatAsRead
} = require('../controllers/chatController');
const { auth } = require('../middlewares/auth');
const { validateMessage } = require('../middlewares/validation');
const { chatLimiter } = require('../middlewares/rateLimit');

// Get all chats
router.get('/', auth, getChats);

// Get chat messages
router.get('/:chatId', auth, getChatMessages);

// Send message
router.post('/:chatId/messages', auth, chatLimiter, validateMessage, sendMessage);

// Mark chat as read
router.patch('/:chatId/read', auth, markChatAsRead);

module.exports = router;
