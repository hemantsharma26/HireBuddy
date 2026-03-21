const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    // Participants
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],

    // Related Hiring Request
    requestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "HiringRequest",
      required: true,
    },

    // Last Message (for quick preview)
    lastMessage: {
      content: String,
      senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      sentAt: Date,
    },

    // Unread Counts
    unreadCount: {
      type: Map,
      of: Number,
      default: new Map(),
    },

    // Status
    isArchived: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// Indexes
chatSchema.index({ participants: 1 });
chatSchema.index({ requestId: 1 });
chatSchema.index({ updatedAt: -1 });

// Compound index for finding user chats sorted by recency
chatSchema.index({ participants: 1, updatedAt: -1 });

// Method to get other participant
chatSchema.methods.getOtherParticipant = function (userId) {
  return this.participants.find((p) => p.toString() !== userId.toString());
};

// Method to increment unread count
chatSchema.methods.incrementUnread = function (userId) {
  const currentCount = this.unreadCount.get(userId.toString()) || 0;
  this.unreadCount.set(userId.toString(), currentCount + 1);
  return this.save();
};

// Method to reset unread count
chatSchema.methods.resetUnread = function (userId) {
  this.unreadCount.set(userId.toString(), 0);
  return this.save();
};

module.exports = mongoose.model("Chat", chatSchema);
