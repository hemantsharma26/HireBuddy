const mongoose = require("mongoose");

const savedRequestSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    requestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "HiringRequest",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// Compound index to ensure a user can only save a request once and for fast lookups
savedRequestSchema.index({ userId: 1, requestId: 1 }, { unique: true });
savedRequestSchema.index({ requestId: 1 });

module.exports = mongoose.model("SavedRequest", savedRequestSchema);
