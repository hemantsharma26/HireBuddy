const express = require('express');
const eventController = require('../controllers/eventController');
const { auth } = require('../middlewares/auth');
const router = express.Router();
const upload = require('../utils/multer');

// Public routes (though we might want to protect them for consistency)
// Public routes
router.get('/', eventController.getEvents);

// Protected routes (Specific first)
router.get('/my/hosted', auth, eventController.getMyEvents);
router.get('/my/rsvps', auth, eventController.getMyRsvps);

// Generic ID route last
router.get('/:id', eventController.getEventById);

router.use(auth);
router.post('/', upload.single('image'), eventController.createEvent);
router.post('/:id/rsvp', eventController.toggleRsvp);
router.patch('/:id/attendees/:userId', eventController.updateAttendeeStatus);

module.exports = router;
