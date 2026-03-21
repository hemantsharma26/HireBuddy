const express = require("express");
const router = express.Router();
const {
  getStats,
  getAllUsers,
  banUser,
  unbanUser,
  changeUserRole,
  getAllReports,
  updateReport,
  resolveReport,
} = require("../controllers/adminController");
const { auth } = require("../middlewares/auth");
const { roleCheck } = require("../middlewares/roleCheck");

/**
 * @swagger
 * /admin/stats:
 *   get:
 *     summary: Get platform statistics
 *     tags: [Admin]
 *     security:
 *       - BearerAuth: []
 *     description: "**Role required:** admin"
 *     responses:
 *       200:
 *         description: Platform statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data:
 *                   type: object
 *                   properties:
 *                     stats:
 *                       type: object
 *                       properties:
 *                         totalUsers: { type: integer }
 *                         totalRequests: { type: integer }
 *                         activeRequests: { type: integer }
 *                         totalReports: { type: integer }
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden — admin role required
 */
router.get("/stats", auth, roleCheck(["admin"]), getStats);

/**
 * @swagger
 * /admin/users:
 *   get:
 *     summary: Get all users (paginated)
 *     tags: [Admin]
 *     security:
 *       - BearerAuth: []
 *     description: "**Role required:** admin"
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [active, suspended, banned, inactive]
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *           enum: [user, admin, support]
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Paginated list of users
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
 *                         users:
 *                           type: array
 *                           items: { $ref: '#/components/schemas/User' }
 *       403:
 *         description: Forbidden — admin role required
 */
router.get("/users", auth, roleCheck(["admin"]), getAllUsers);

/**
 * @swagger
 * /admin/users/{userId}/ban:
 *   patch:
 *     summary: Ban a user
 *     tags: [Admin]
 *     security:
 *       - BearerAuth: []
 *     description: "**Role required:** admin"
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reason:
 *                 type: string
 *                 example: Repeated policy violations
 *     responses:
 *       200:
 *         description: User banned
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       403:
 *         description: Forbidden — admin role required
 *       404:
 *         description: User not found
 */
router.patch("/users/:userId/ban", auth, roleCheck(["admin"]), banUser);

/**
 * @swagger
 * /admin/users/{userId}/unban:
 *   patch:
 *     summary: Unban a user
 *     tags: [Admin]
 *     security:
 *       - BearerAuth: []
 *     description: "**Role required:** admin"
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User unbanned
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       403:
 *         description: Forbidden — admin role required
 *       404:
 *         description: User not found
 */
router.patch("/users/:userId/unban", auth, roleCheck(["admin"]), unbanUser);

/**
 * @swagger
 * /admin/users/{userId}/role:
 *   patch:
 *     summary: Change a user's role
 *     tags: [Admin]
 *     security:
 *       - BearerAuth: []
 *     description: "**Role required:** admin"
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [role]
 *             properties:
 *               role:
 *                 type: string
 *                 enum: [user, admin, support]
 *                 example: support
 *               permissions:
 *                 type: array
 *                 items: { type: string }
 *                 example: [manage_reports, view_users]
 *     responses:
 *       200:
 *         description: Role updated
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
 *                     user: { $ref: '#/components/schemas/User' }
 *       403:
 *         description: Forbidden — admin role required
 */
router.patch("/users/:userId/role", auth, roleCheck(["admin"]), changeUserRole);

/**
 * @swagger
 * /admin/reports:
 *   get:
 *     summary: Get all reports (paginated)
 *     tags: [Admin]
 *     security:
 *       - BearerAuth: []
 *     description: "**Role required:** admin or support"
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, investigating, resolved, dismissed]
 *       - in: query
 *         name: priority
 *         schema:
 *           type: string
 *           enum: [low, medium, high, critical]
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Paginated list of reports
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
 *                         reports:
 *                           type: array
 *                           items: { $ref: '#/components/schemas/Report' }
 *       403:
 *         description: Forbidden — admin or support role required
 */
router.get("/reports", auth, roleCheck(["admin", "support"]), getAllReports);

/**
 * @swagger
 * /admin/reports/{reportId}:
 *   patch:
 *     summary: Update a report (status, priority, assignment, notes)
 *     tags: [Admin]
 *     security:
 *       - BearerAuth: []
 *     description: "**Role required:** admin or support"
 *     parameters:
 *       - in: path
 *         name: reportId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, investigating, resolved, dismissed]
 *               priority:
 *                 type: string
 *                 enum: [low, medium, high, critical]
 *               assignedTo:
 *                 type: string
 *                 description: User ID of the assigned support agent
 *               notes:
 *                 type: string
 *                 description: Investigation notes to add
 *     responses:
 *       200:
 *         description: Report updated
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
 *       403:
 *         description: Forbidden — admin or support role required
 */
router.patch(
  "/reports/:reportId",
  auth,
  roleCheck(["admin", "support"]),
  updateReport,
);

/**
 * @swagger
 * /admin/reports/{reportId}/resolve:
 *   post:
 *     summary: Resolve a report
 *     tags: [Admin]
 *     security:
 *       - BearerAuth: []
 *     description: "**Role required:** admin or support"
 *     parameters:
 *       - in: path
 *         name: reportId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [action]
 *             properties:
 *               action:
 *                 type: string
 *                 description: Resolution action taken
 *                 example: warning_issued
 *               resolutionNotes:
 *                 type: string
 *                 example: User was given a warning for inappropriate behavior
 *     responses:
 *       200:
 *         description: Report resolved
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       403:
 *         description: Forbidden — admin or support role required
 */
router.post(
  "/reports/:reportId/resolve",
  auth,
  roleCheck(["admin", "support"]),
  resolveReport,
);

/**
 * @swagger
 * /admin/profile-options:
 *   put:
 *     summary: Update dynamic profile configuration options
 *     tags: [Admin]
 *     security:
 *       - BearerAuth: []
 *     description: "**Role required:** admin"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               languages:
 *                 type: array
 *                 items: { type: string }
 *               vibes:
 *                 type: array
 *                 items: { type: string }
 *     responses:
 *       200:
 *         description: Profile options updated
 *       403:
 *         description: Forbidden — admin role required
 */
router.put(
  "/profile-options",
  auth,
  roleCheck(["admin"]),
  require("../controllers/adminController").updateProfileOptions
);

module.exports = router;
