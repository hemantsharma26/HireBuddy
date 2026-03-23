const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      required: [true, "Category slug is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    icon: {
      type: String,
      required: [true, "Icon name (e.g., from Lucide) is required"],
    },
    color: {
      type: String,
      default: "#FFD700", // Default gold/yellow
    },
    image: {
      type: String,
      required: false,
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
  },
);

categorySchema.index({ isActive: 1, order: 1 });

module.exports = mongoose.model("Category", categorySchema);
