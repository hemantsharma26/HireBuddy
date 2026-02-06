const express = require('express');
const router = express.Router();
const {
  getMyProfile,
  updateProfile,
  updateAvailability,
  getUserProfile,
  getUserRatings
} = require('../controllers/userController');
const { auth } = require('../middlewares/auth');

// Get current user profile
router.get('/me', auth, getMyProfile);

// Update profile
router.put('/me', auth, updateProfile);

// Update availability
router.patch('/me/availability', auth, updateAvailability);

// Get user profile by ID
router.get('/:userId', auth, getUserProfile);

// Get user ratings
router.get('/:userId/ratings', auth, getUserRatings);

module.exports = router;
