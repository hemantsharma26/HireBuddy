const mongoose = require('mongoose');

const vibeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Vibe name is required'],
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Vibe slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

vibeSchema.index({ isActive: 1, order: 1, name: 1 });

module.exports = mongoose.model('Vibe', vibeSchema);
