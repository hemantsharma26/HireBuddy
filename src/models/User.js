const mongoose = require('mongoose');
const { 
  USER_ROLES, 
  USER_STATUSES, 
  AVAILABILITY_STATUSES,
  MINIMUM_AGE 
} = require('../config/constants');

const userSchema = new mongoose.Schema({
  // Authentication
  phoneNumber: {
    type: String,
    required: [true, 'Phone number is required'],
    unique: true,
    match: [/^[6-9]\d{9}$/, 'Please provide a valid 10-digit phone number']
  },
  phoneVerified: {
    type: Boolean,
    default: false
  },
  email: {
    type: String,
    unique: true,
    sparse: true,
    lowercase: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please provide a valid email']
  },
  emailVerified: {
    type: Boolean,
    default: false
  },

  // Profile
  displayName: {
    type: String,
    required: [true, 'Display name is required'],
    minlength: [2, 'Display name must be at least 2 characters'],
    maxlength: [50, 'Display name cannot exceed 50 characters'],
    trim: true
  },
  age: {
    type: Number,
    required: [true, 'Age is required'],
    min: [MINIMUM_AGE, `You must be at least ${MINIMUM_AGE} years old`]
  },
  bio: {
    type: String,
    maxlength: [500, 'Bio cannot exceed 500 characters'],
    trim: true
  },
  profilePicture: {
    type: String,
    default: null
  },

  // Location
  location: {
    city: {
      type: String,
      required: [true, 'City is required'],
      trim: true
    },
    area: {
      type: String,
      required: [true, 'Area is required'],
      trim: true
    },
    coordinates: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point'
      },
      coordinates: {
        type: [Number],
        default: [0, 0]
      }
    }
  },

  // Availability
  availability: {
    type: String,
    enum: AVAILABILITY_STATUSES,
    default: 'available'
  },

  // Role & Permissions
  role: {
    type: String,
    enum: USER_ROLES,
    default: 'user'
  },
  supportPermissions: {
    canViewReports: {
      type: Boolean,
      default: false
    },
    canResolveReports: {
      type: Boolean,
      default: false
    },
    canBanUsers: {
      type: Boolean,
      default: false
    }
  },

  // Statistics
  stats: {
    totalJobsPosted: {
      type: Number,
      default: 0
    },
    totalJobsCompleted: {
      type: Number,
      default: 0
    },
    totalJobsAccepted: {
      type: Number,
      default: 0
    },
    averageRating: {
      type: Number,
      default: 0
    },
    totalRatings: {
      type: Number,
      default: 0
    }
  },

  // Account Status
  status: {
    type: String,
    enum: USER_STATUSES,
    default: 'active'
  },
  suspensionReason: String,
  suspensionExpiresAt: Date,

  // Timestamps
  lastLoginAt: Date
}, {
  timestamps: true
});

// Indexes
userSchema.index({ phoneNumber: 1 });
userSchema.index({ email: 1 });
userSchema.index({ 'location.city': 1, 'location.area': 1 });
userSchema.index({ 'location.coordinates': '2dsphere' });
userSchema.index({ role: 1 });
userSchema.index({ status: 1 });

// Virtual for public profile
userSchema.virtual('publicProfile').get(function() {
  return {
    _id: this._id,
    displayName: this.displayName,
    bio: this.bio,
    profilePicture: this.profilePicture,
    location: {
      city: this.location.city,
      area: this.location.area
    },
    availability: this.availability,
    stats: {
      averageRating: this.stats.averageRating,
      totalRatings: this.stats.totalRatings,
      totalJobsCompleted: this.stats.totalJobsCompleted
    },
    createdAt: this.createdAt
  };
});

// Method to check if user is banned or suspended
userSchema.methods.isActive = function() {
  if (this.status === 'banned') {
    return false;
  }
  if (this.status === 'suspended' && this.suspensionExpiresAt) {
    return new Date() > this.suspensionExpiresAt;
  }
  return this.status === 'active';
};

module.exports = mongoose.model('User', userSchema);
