const mongoose = require('mongoose');
const { MESSAGE_TYPES } = require('../config/constants');

const messageSchema = new mongoose.Schema({
  chatId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chat',
    required: true,
    index: true
  },

  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },

  content: {
    type: String,
    required: [true, 'Message content is required'],
    maxlength: [2000, 'Message cannot exceed 2000 characters'],
    trim: true
  },

  messageType: {
    type: String,
    enum: MESSAGE_TYPES,
    default: 'text'
  },

  isRead: {
    type: Boolean,
    default: false
  },
  readAt: Date
}, {
  timestamps: true
});

// Indexes
messageSchema.index({ chatId: 1, createdAt: -1 });
messageSchema.index({ senderId: 1 });

// Compound index for finding unread messages efficiently
messageSchema.index({ chatId: 1, senderId: 1, isRead: 1 });

// Method to mark as read
messageSchema.methods.markAsRead = function() {
  this.isRead = true;
  this.readAt = new Date();
  return this.save();
};

module.exports = mongoose.model('Message', messageSchema);
