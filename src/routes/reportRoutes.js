const express = require("express");
const router = express.Router();
const {
  submitReport,
  blockUser,
  getBlockedUsers,
  unblockUser,
  getMyReports,
} = require("../controllers/reportController");
const { auth } = require("../middlewares/auth");
const { validateReport } = require("../middlewares/validation");

/**
 * @swagger
 * /safety/reports:
 *   post:
 *     summary: Submit a report against a user or request
 *     tags: [Reports]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [reason, description]
 *             properties:
 *               reportedUserId:
 *                 type: string
 *                 description: ID of the user being reported
 *               reportedRequestId:
 *                 type: string
 *                 description: ID of the request being reported
 *               reason:
 *                 type: string
 *                 description: Reason for report
 *                 example: harassment
 *               description:
 *                 type: string
 *                 example: The user was sending inappropriate messages
 *                 maxLength: 1000
 *     responses:
 *       201:
 *         description: Report submitted
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
 *                     report: { $ref: '#/components/schemas/Report' }
 *       401:
 *         description: Unauthorized
 */
router.post("/reports", auth, validateReport, submitReport);

/**
 * @swagger
 * /safety/reports:
 *   get:
 *     summary: Get user's report history
 *     tags: [Reports]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of reports
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data:
 *                   type: object
 *                   properties:
 *                     reports:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Report'
 *       401:
 *         description: Unauthorized
 */
router.get("/reports", auth, getMyReports);

/**
 * @swagger
 * /safety/blocks:
 *   post:
 *     summary: Block a user
 *     tags: [Reports]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [blockedUserId]
 *             properties:
 *               blockedUserId:
 *                 type: string
 *                 description: ID of the user to block
 *               reason:
 *                 type: string
 *                 example: Spamming
 *                 maxLength: 500
 *     responses:
 *       200:
 *         description: User blocked
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       401:
 *         description: Unauthorized
 */
router.post("/blocks", auth, blockUser);

/**
 * @swagger
 * /safety/blocks:
 *   get:
 *     summary: Get list of blocked users
 *     tags: [Reports]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of blocked users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data:
 *                   type: object
 *                   properties:
 *                     blockedUsers:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id: { type: string }
 *                           blockedUserId: { type: string }
 *                           reason: { type: string }
 *                           createdAt: { type: string, format: date-time }
 *       401:
 *         description: Unauthorized
 */
router.get("/blocks", auth, getBlockedUsers);

/**
 * @swagger
 * /safety/blocks/{userId}:
 *   delete:
 *     summary: Unblock a user
 *     tags: [Reports]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user to unblock
 *     responses:
 *       200:
 *         description: User unblocked
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Block not found
 */
router.delete("/blocks/:userId", auth, unblockUser);

module.exports = router;
