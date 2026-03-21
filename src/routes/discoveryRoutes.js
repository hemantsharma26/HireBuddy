const express = require('express');
const router = express.Router();
const discoveryController = require('../controllers/discoveryController');

/**
 * @route   GET /api/v1/discovery
 * @desc    Get explore page data
 * @access  Public
 */
router.get('/', discoveryController.getExploreData);
/**
 * @route   GET /api/v1/discovery/profile-options
 * @desc    Get all dynamic options for User Profile
 * @access  Public
 */
router.get('/profile-options', discoveryController.getProfileOptions);

module.exports = router;
