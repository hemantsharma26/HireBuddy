const express = require('express');
const router = express.Router();
const {
  createRequest,
  browseRequests,
  getRequest,
  applyToRequest,
  acceptApplicant,
  completeRequest,
  getMyRequests,
  getAcceptedJobs
} = require('../controllers/requestController');
const { auth } = require('../middlewares/auth');
const { validateCreateRequest } = require('../middlewares/validation');

// Browse requests (Publicly accessible)
router.get('/', browseRequests);

// Get my posted requests
router.get('/my/posted', auth, getMyRequests);

// Get accepted jobs
router.get('/my/accepted', auth, getAcceptedJobs);

// Create request
router.post('/', auth, validateCreateRequest, createRequest);

// Get single request
router.get('/:requestId', auth, getRequest);

// Apply to request
router.post('/:requestId/apply', auth, applyToRequest);

// Accept applicant
router.patch('/:requestId/applicants/:applicantId/accept', auth, acceptApplicant);

// Complete request
router.patch('/:requestId/complete', auth, completeRequest);

module.exports = router;
