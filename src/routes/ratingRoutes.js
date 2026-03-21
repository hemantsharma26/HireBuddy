const express = require("express");
const router = express.Router();
const { submitRating } = require("../controllers/ratingController");
const { auth } = require("../middlewares/auth");
const { validateRating } = require("../middlewares/validation");

/**
 * @swagger
 * /ratings:
 *   post:
 *     summary: Submit a rating for a completed request
 *     tags: [Ratings]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [requestId, ratedUserId, stars, ratingType]
 *             properties:
 *               requestId:
 *                 type: string
 *                 description: ID of the completed hiring request
 *               ratedUserId:
 *                 type: string
 *                 description: ID of the user being rated
 *               stars:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *                 example: 4
 *               review:
 *                 type: string
 *                 example: Great work, very professional!
 *                 maxLength: 500
 *               ratingType:
 *                 type: string
 *                 description: Type of rating (e.g. requester_to_worker, worker_to_requester)
 *     responses:
 *       201:
 *         description: Rating submitted
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
 *                     rating: { $ref: '#/components/schemas/Rating' }
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Already rated or request not completed
 */
router.post("/", auth, validateRating, submitRating);

module.exports = router;
