const express = require('express');
const router = express.Router();
const {
  getStats,
  getAllUsers,
  banUser,
  unbanUser,
  changeUserRole,
  getAllReports,
  updateReport,
  resolveReport
} = require('../controllers/adminController');
const { auth } = require('../middlewares/auth');
const { roleCheck } = require('../middlewares/roleCheck');

// Platform statistics
router.get('/stats', auth, roleCheck(['admin']), getStats);

// User management
router.get('/users', auth, roleCheck(['admin']), getAllUsers);
router.patch('/users/:userId/ban', auth, roleCheck(['admin']), banUser);
router.patch('/users/:userId/unban', auth, roleCheck(['admin']), unbanUser);
router.patch('/users/:userId/role', auth, roleCheck(['admin']), changeUserRole);

// Report management
router.get('/reports', auth, roleCheck(['admin', 'support']), getAllReports);
router.patch('/reports/:reportId', auth, roleCheck(['admin', 'support']), updateReport);
router.post('/reports/:reportId/resolve', auth, roleCheck(['admin', 'support']), resolveReport);

module.exports = router;
