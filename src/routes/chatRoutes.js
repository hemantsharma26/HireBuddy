const express = require("express");
const router = express.Router();
const {
  getChats,
  getChatMessages,
  sendMessage,
  markChatAsRead,
} = require("../controllers/chatController");
const { auth } = require("../middlewares/auth");
const { validateMessage } = require("../middlewares/validation");
const { chatLimiter } = require("../middlewares/rateLimit");

/**
 * @swagger
 * /chats:
 *   get:
 *     summary: Get all chats for current user
 *     tags: [Chat]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's chats
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data:
 *                   type: object
 *                   properties:
 *                     chats:
 *                       type: array
 *                       items: { $ref: '#/components/schemas/Chat' }
 *       401:
 *         description: Unauthorized
 */
router.get("/", auth, getChats);

/**
 * @swagger
 * /chats/{chatId}:
 *   get:
 *     summary: Get chat messages
 *     tags: [Chat]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: chatId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *     responses:
 *       200:
 *         description: Chat details with paginated messages
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/PaginationResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: object
 *                       properties:
 *                         chat: { $ref: '#/components/schemas/Chat' }
 *                         messages:
 *                           type: array
 *                           items: { $ref: '#/components/schemas/Message' }
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Not a participant of this chat
 */
router.get("/:chatId", auth, getChatMessages);

/**
 * @swagger
 * /chats/{chatId}/messages:
 *   post:
 *     summary: Send a message in a chat
 *     tags: [Chat]
 *     security:
 *       - BearerAuth: []
 *     description: Rate limited per user
 *     parameters:
 *       - in: path
 *         name: chatId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [content]
 *             properties:
 *               content:
 *                 type: string
 *                 example: Hello! I'm interested in helping.
 *                 maxLength: 2000
 *     responses:
 *       201:
 *         description: Message sent
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string }
 *                 data:
 *                   type: object
 *                   properties:
 *                     message: { $ref: '#/components/schemas/Message' }
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Not a participant of this chat
 */
router.post(
  "/:chatId/messages",
  auth,
  chatLimiter,
  validateMessage,
  sendMessage,
);

/**
 * @swagger
 * /chats/{chatId}/read:
 *   patch:
 *     summary: Mark chat as read
 *     tags: [Chat]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: chatId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Chat marked as read
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       401:
 *         description: Unauthorized
 */
router.patch("/:chatId/read", auth, markChatAsRead);

module.exports = router;
