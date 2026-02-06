const mongoose = require('mongoose');
const { RATING_TYPES } = require('../config/constants');

const ratingSchema = new mongoose.Schema({
  // Request Reference
  requestId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'HiringRequest',
    required: true,
    index: true
  },

  // Rater & Rated User
  raterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  ratedUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },

  // Rating
  stars: {
    type: Number,
    required: [true, 'Rating is required'],
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot exceed 5']
  },
  review: {
    type: String,
    maxlength: [500, 'Review cannot exceed 500 characters'],
    trim: true
  },

  // Metadata
  ratingType: {
    type: String,
    enum: RATING_TYPES,
    required: true
  }
}, {
  timestamps: true
});

// Indexes
ratingSchema.index({ requestId: 1 });
ratingSchema.index({ raterId: 1 });
ratingSchema.index({ ratedUserId: 1 });
ratingSchema.index({ createdAt: -1 });

// Compound index to prevent duplicate ratings
ratingSchema.index({ requestId: 1, raterId: 1 }, { unique: true });

module.exports = mongoose.model('Rating', ratingSchema);
