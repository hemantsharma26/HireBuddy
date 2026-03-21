const express = require("express");
const router = express.Router();
const {
  createRequest,
  browseRequests,
  getRequest,
  applyToRequest,
  acceptApplicant,
  completeRequest,
  getMyRequests,
  getAcceptedJobs,
  updateRequest,
} = require("../controllers/requestController");
const { auth, optionalAuth } = require("../middlewares/auth");
const { validateCreateRequest, validateApplyToRequest } = require("../middlewares/validation");

/**
 * @swagger
 * /requests:
 *   get:
 *     summary: Browse hiring requests
 *     tags: [Requests]
 *     description: Publicly accessible. Supports filtering and pagination.
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category
 *       - in: query
 *         name: jobType
 *         schema:
 *           type: string
 *         description: Filter by job type
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *         description: Filter by city
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [open, in-progress, completed, cancelled]
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
 *         description: List of hiring requests
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
 *                         requests:
 *                           type: array
 *                           items: { $ref: '#/components/schemas/HiringRequest' }
 */
router.get("/", optionalAuth, browseRequests);

/**
 * @swagger
 * /requests/my/posted:
 *   get:
 *     summary: Get my posted requests
 *     tags: [Requests]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [open, in-progress, completed, cancelled]
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
 *         description: List of my posted requests
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
 *                         requests:
 *                           type: array
 *                           items: { $ref: '#/components/schemas/HiringRequest' }
 *       401:
 *         description: Unauthorized
 */
router.get("/my/posted", auth, getMyRequests);

/**
 * @swagger
 * /requests/my/accepted:
 *   get:
 *     summary: Get jobs I have accepted
 *     tags: [Requests]
 *     security:
 *       - BearerAuth: []
 *     parameters:
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
 *         description: List of accepted jobs
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
 *                         requests:
 *                           type: array
 *                           items: { $ref: '#/components/schemas/HiringRequest' }
 *       401:
 *         description: Unauthorized
 */
router.get("/my/accepted", auth, getAcceptedJobs);

/**
 * @swagger
 * /requests:
 *   post:
 *     summary: Create a new hiring request
 *     tags: [Requests]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, description, category, jobType, location, compensation]
 *             properties:
 *               title:
 *                 type: string
 *                 example: Need help with moving
 *                 minLength: 5
 *                 maxLength: 100
 *               description:
 *                 type: string
 *                 example: Need someone to help me move furniture to a new apartment
 *                 minLength: 10
 *                 maxLength: 1000
 *               category:
 *                 type: string
 *                 example: real_life_help
 *               jobType:
 *                 type: string
 *                 example: one-time
 *               location:
 *                 type: object
 *                 required: [city, area]
 *                 properties:
 *                   city: { type: string, example: Mumbai }
 *                   area: { type: string, example: Andheri }
 *                   coordinates:
 *                     type: object
 *                     properties:
 *                       type: { type: string, example: Point }
 *                       coordinates:
 *                         type: array
 *                         items: { type: number }
 *               compensation:
 *                 type: string
 *                 example: ₹500/hour
 *               duration:
 *                 type: string
 *                 example: 2-3 hours
 *     responses:
 *       201:
 *         description: Request created
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
 *                     request: { $ref: '#/components/schemas/HiringRequest' }
 *       401:
 *         description: Unauthorized
 *       422:
 *         description: Validation error
 */
router.post("/", auth, validateCreateRequest, createRequest);

/**
 * @swagger
 * /requests/{requestId}:
 *   get:
 *     summary: Get a single request by ID
 *     tags: [Requests]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: requestId
 *         required: true
 *         schema:
 *           type: string
 *         description: Hiring request ID
 *     responses:
 *       200:
 *         description: Request details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data:
 *                   type: object
 *                   properties:
 *                     request: { $ref: '#/components/schemas/HiringRequest' }
 *       404:
 *         description: Request not found
 */
router.get("/:requestId", auth, getRequest);

/**
 * @swagger
 * /requests/{requestId}/apply:
 *   post:
 *     summary: Apply to a hiring request
 *     tags: [Requests]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: requestId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: I am available and experienced in this work
 *                 maxLength: 500
 *     responses:
 *       200:
 *         description: Application submitted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Already applied or request not open
 */
router.post("/:requestId/apply", auth, validateApplyToRequest, applyToRequest);

/**
 * @swagger
 * /requests/{requestId}/applicants/{applicantId}/accept:
 *   patch:
 *     summary: Accept an applicant for a request
 *     tags: [Requests]
 *     security:
 *       - BearerAuth: []
 *     description: Only the request owner can accept applicants. Creates a chat between the two parties.
 *     parameters:
 *       - in: path
 *         name: requestId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: applicantId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID of the applicant to accept
 *     responses:
 *       200:
 *         description: Applicant accepted, chat created
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
 *                     chatId: { type: string, description: ID of the created chat }
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Not the request owner
 */
router.patch(
  "/:requestId/applicants/:applicantId/accept",
  auth,
  acceptApplicant,
);

/**
 * @swagger
 * /requests/{requestId}/complete:
 *   patch:
 *     summary: Mark a request as completed
 *     tags: [Requests]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: requestId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Request marked as completed
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
 *                     request: { $ref: '#/components/schemas/HiringRequest' }
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Not the request owner
 */
router.patch("/:requestId/complete", auth, completeRequest);

/**
 * @swagger
 * /requests/{requestId}:
 *   patch:
 *     summary: Update a hiring request
 *     tags: [Requests]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: requestId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/HiringRequest'
 *     responses:
 *       200:
 *         description: Request updated
 *       403:
 *         description: Not the owner
 */
router.patch("/:requestId", auth, updateRequest);

module.exports = router;
