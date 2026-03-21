const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

/**
 * @route   GET /api/v1/categories
 * @desc    Get all active categories
 * @access  Public
 */
router.get('/', categoryController.getCategories);

module.exports = router;
