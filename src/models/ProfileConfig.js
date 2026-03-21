const mongoose = require('mongoose');

const profileConfigSchema = new mongoose.Schema(
  {
    isSingleton: {
      type: Boolean,
      default: true,
      unique: true,
    },
    ageRanges: {
      type: [String],
      default: [],
    },
    pronouns: {
      type: [String],
      default: [],
    },
    languages: {
      type: [String],
      default: [],
    },
    vibes: {
      type: [String],
      default: [],
    },
    helpSituations: {
      type: [String],
      default: [],
    },
    availabilitySlots: [
      {
        label: String,
        subtitle: String,
        icon: String,
      },
    ],
    comfortSettings: {
      type: [String],
      default: [],
    },
    trustLayerFields: [
      {
        id: String,
        label: String,
        subtitle: String,
        points: Number,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('ProfileConfig', profileConfigSchema);
