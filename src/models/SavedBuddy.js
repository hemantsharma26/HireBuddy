const mongoose = require('mongoose');

const savedBuddySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  buddyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Compound index to ensure uniqueness and fast lookups
savedBuddySchema.index({ userId: 1, buddyId: 1 }, { unique: true });

module.exports = mongoose.model('SavedBuddy', savedBuddySchema);
