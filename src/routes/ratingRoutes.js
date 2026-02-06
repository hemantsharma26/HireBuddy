const express = require('express');
const router = express.Router();
const { submitRating } = require('../controllers/ratingController');
const { auth } = require('../middlewares/auth');
const { validateRating } = require('../middlewares/validation');

// Submit rating
router.post('/', auth, validateRating, submitRating);

module.exports = router;
