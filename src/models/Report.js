const mongoose = require('mongoose');
const { REPORT_REASONS, REPORT_STATUSES, REPORT_PRIORITIES, RESOLUTION_ACTIONS } = require('../config/constants');

const reportSchema = new mongoose.Schema({
  // Reporter Info
  reporterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },

  // Reported User/Content
  reportedUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    index: true
  },
  reportedRequestId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'HiringRequest'
  },

  // Report Details
  reason: {
    type: String,
    enum: REPORT_REASONS,
    required: [true, 'Report reason is required']
  },
  description: {
    type: String,
    required: [true, 'Report description is required'],
    maxlength: [1000, 'Description cannot exceed 1000 characters'],
    trim: true
  },

  // Status & Resolution
  status: {
    type: String,
    enum: REPORT_STATUSES,
    default: 'pending',
    index: true
  },
  priority: {
    type: String,
    enum: REPORT_PRIORITIES,
    default: 'medium',
    index: true
  },

  // Assigned Support
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    index: true
  },

  // Investigation Notes
  notes: [{
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    content: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],

  // Resolution
  resolution: {
    action: {
      type: String,
      enum: RESOLUTION_ACTIONS
    },
    resolvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    resolvedAt: Date,
    resolutionNotes: String
  }
}, {
  timestamps: true
});

// Indexes
reportSchema.index({ reporterId: 1 });
reportSchema.index({ reportedUserId: 1 });
reportSchema.index({ status: 1 });
reportSchema.index({ priority: 1 });
reportSchema.index({ assignedTo: 1 });
reportSchema.index({ createdAt: -1 });

// Method to add investigation note
reportSchema.methods.addNote = function(authorId, content) {
  this.notes.push({
    authorId,
    content,
    createdAt: new Date()
  });
  return this.save();
};

// Method to resolve report
reportSchema.methods.resolve = function(resolvedBy, action, resolutionNotes) {
  this.status = 'resolved';
  this.resolution = {
    action,
    resolvedBy,
    resolvedAt: new Date(),
    resolutionNotes
  };
  return this.save();
};

module.exports = mongoose.model('Report', reportSchema);
