const express = require("express");
const router = express.Router();
const {
  getMyProfile,
  updateProfile,
  updateAvailability,
  getUserProfile,
  getUserRatings,
  toggleSavedRequest,
  getSavedRequests,
  getBuddies,
  toggleSavedBuddy,
  getSavedBuddies,
  uploadAvatar: uploadAvatarController
} = require("../controllers/userController");
const { auth, optionalAuth } = require("../middlewares/auth");
const uploadAvatarMiddleware = require("../utils/uploadAvatar");

/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: Get current user profile
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Current user profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data:
 *                   type: object
 *                   properties:
 *                     user: { $ref: '#/components/schemas/User' }
 *       401:
 *         description: Unauthorized
 */
/**
 * @swagger
 * /users:
 *   get:
 *     summary: List and search buddies (other users)
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search keyword (name, bio, city, area)
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
 *         description: List of buddies with pagination
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
 *                         buddies:
 *                           type: array
 *                           items: { $ref: '#/components/schemas/User' }
 */
router.get("/", optionalAuth, getBuddies);

router.get("/me", auth, getMyProfile);

/**
 * @swagger
 * /users/me:
 *   put:
 *     summary: Update current user profile
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               displayName:
 *                 type: string
 *                 example: John Updated
 *               bio:
 *                 type: string
 *                 example: Updated bio text
 *               email:
 *                 type: string
 *                 format: email
 *               location:
 *                 type: object
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
 *                         example: [72.8777, 19.0760]
 *               skills:
 *                 type: array
 *                 items: { type: string }
 *                 example: [cooking, driving]
 *     responses:
 *       200:
 *         description: Profile updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string, example: Profile updated successfully }
 *                 data:
 *                   type: object
 *                   properties:
 *                     user: { $ref: '#/components/schemas/User' }
 *       401:
 *         description: Unauthorized
 */
router.put("/me", auth, updateProfile);

/**
 * @swagger
 * /users/me/avatar:
 *   post:
 *     summary: Upload user profile avatar
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               avatar:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Avatar uploaded successfully
 *       400:
 *         description: Bad request (e.g., file too large or wrong type)
 *       401:
 *         description: Unauthorized
 */
router.post("/me/avatar", auth, uploadAvatarMiddleware.single('avatar'), uploadAvatarController);

/**
 * @swagger
 * /users/me/availability:
 *   patch:
 *     summary: Update availability status
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [availability]
 *             properties:
 *               availability:
 *                 type: object
 *                 properties:
 *                   isAvailable:
 *                     type: boolean
 *                     example: true
 *                   schedule:
 *                     type: object
 *                     description: Weekly schedule
 *     responses:
 *       200:
 *         description: Availability updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       401:
 *         description: Unauthorized
 */
router.patch("/me/availability", auth, updateAvailability);

/**
 * @swagger
 * /users/{userId}:
 *   get:
 *     summary: Get public user profile by ID
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User public profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data:
 *                   type: object
 *                   properties:
 *                     user: { $ref: '#/components/schemas/User' }
 *       404:
 *         description: User not found
 */
router.get("/:userId", optionalAuth, getUserProfile);

/**
 * @swagger
 * /users/{userId}/ratings:
 *   get:
 *     summary: Get ratings for a user
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
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
 *         description: User ratings with stats
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
 *                         ratings:
 *                           type: array
 *                           items: { $ref: '#/components/schemas/Rating' }
 *                         stats:
 *                           type: object
 *                           properties:
 *                             average: { type: number }
 *                             count: { type: integer }
 */
router.get("/:userId/ratings", optionalAuth, getUserRatings);

/**
 * @swagger
 * /users/me/saved:
 *   get:
 *     summary: Get current user's saved requests
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of saved requests
 *       401:
 *         description: Unauthorized
 */
router.get("/me/saved", auth, getSavedRequests);

/**
 * @swagger
 * /users/me/saved/{requestId}:
 *   post:
 *     summary: Toggle saved status for a request
 *     tags: [Users]
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
 *         description: Saved status toggled
 *       401:
 *         description: Unauthorized
 */
router.post("/me/saved/:requestId", auth, toggleSavedRequest);

/**
 * @swagger
 * /users/me/saved-buddies:
 *   get:
 *     summary: Get current user's saved buddies
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of saved buddies
 */
router.get("/me/saved-buddies", auth, getSavedBuddies);

/**
 * @swagger
 * /users/me/saved-buddies/{buddyId}:
 *   post:
 *     summary: Toggle saved status for a buddy
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: buddyId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Saved status toggled
 */
router.post("/me/saved-buddies/:buddyId", auth, toggleSavedBuddy);

module.exports = router;
