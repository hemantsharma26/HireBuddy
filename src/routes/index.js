const express = require('express');
const router = express.Router();

// Import route modules
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const requestRoutes = require('./requestRoutes');
const chatRoutes = require('./chatRoutes');
const ratingRoutes = require('./ratingRoutes');
const reportRoutes = require('./reportRoutes');
const adminRoutes = require('./adminRoutes');
const categoryRoutes = require('./categoryRoutes');
const eventRoutes = require('./eventRoutes');
const discoveryRoutes = require('./discoveryRoutes');

// Mount routes
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/requests', requestRoutes);
router.use('/chats', chatRoutes);
router.use('/ratings', ratingRoutes);
router.use('/safety', reportRoutes); // /reports and /blocks
router.use('/admin', adminRoutes);
router.use('/categories', categoryRoutes);
router.use('/events', eventRoutes);
router.use('/discovery', discoveryRoutes);

// Health check
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'HireBuddy API is running',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
