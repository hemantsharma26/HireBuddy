const express = require('express');
const router = express.Router();
const {
  submitReport,
  blockUser,
  getBlockedUsers,
  unblockUser
} = require('../controllers/reportController');
const { auth } = require('../middlewares/auth');
const { validateReport } = require('../middlewares/validation');

// Submit report
router.post('/reports', auth, validateReport, submitReport);

// Block user
router.post('/blocks', auth, blockUser);

// Get blocked users
router.get('/blocks', auth, getBlockedUsers);

// Unblock user
router.delete('/blocks/:userId', auth, unblockUser);

module.exports = router;
