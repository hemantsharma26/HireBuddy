const mongoose = require('mongoose');

const blockedUserSchema = new mongoose.Schema({
  blockerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  blockedUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  reason: {
    type: String,
    maxlength: 500,
    trim: true
  }
}, {
  timestamps: true
});

// Compound unique index
blockedUserSchema.index({ blockerId: 1, blockedUserId: 1 }, { unique: true });
blockedUserSchema.index({ blockedUserId: 1 });

module.exports = mongoose.model('BlockedUser', blockedUserSchema);
