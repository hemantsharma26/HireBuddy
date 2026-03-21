const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Event title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Event description is required'],
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
    },
    imageUrl: {
      type: String,
      default: null,
    },
    date: {
      type: Date,
      required: [true, 'Event date is required'],
    },
    time: {
      type: String,
      required: [true, 'Event time is required'], // e.g., "6:00 PM"
    },
    address: {
      type: String,
      required: [true, 'Event address is required'],
      trim: true,
      default: 'Address not specified',
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: {
        type: [Number],
        required: true,
        default: [0, 0],
      },
    },
    city: {
      type: String,
      trim: true,
    },
    host: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    attendees: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        status: {
          type: String,
          enum: ['pending', 'accepted', 'rejected'],
          default: 'pending',
        },
        requestedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    maxAttendees: {
      type: Number,
      default: 50,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    isFeatured: {
      type: Boolean,
      default: false,
    },
    category: {
      type: String,
      default: 'General',
    },
    status: {
      type: String,
      enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
      default: 'upcoming',
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual for attendee count
eventSchema.virtual('attendeeCount').get(function () {
  return this.attendees ? this.attendees.filter(a => a.status === 'accepted').length : 0;
});

// Index for geo-spatial queries
eventSchema.index({ location: '2dsphere' });
eventSchema.index({ title: 'text', description: 'text', address: 'text', city: 'text' });
eventSchema.index({ date: 1 });
eventSchema.index({ host: 1 });

// Pre-save hook to ensure required fields have defaults if missing (for legacy data)
eventSchema.pre('save', function (next) {
  if (!this.address) {
    this.address = 'Address not specified';
  }
  // If location or coordinates are missing/empty, provided defaults
  if (!this.location || !this.location.coordinates || !Array.isArray(this.location.coordinates) || this.location.coordinates.length === 0) {
    this.location = {
      type: 'Point',
      coordinates: [0, 0]
    };
  }
  next();
});

module.exports = mongoose.model('Event', eventSchema);
