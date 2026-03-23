const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const {
  USER_ROLES,
  USER_STATUSES,
  AVAILABILITY_STATUSES,
  MINIMUM_AGE,
} = require("../config/constants");

const userSchema = new mongoose.Schema(
  {
    // Authentication
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
      unique: true,
      match: [/^\d{10}$/, "Please provide a valid 10-digit phone number"],
    },
    phoneVerified: {
      type: Boolean,
      default: false,
    },
    email: {
      type: String,
      unique: true,
      sparse: true,
      lowercase: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please provide a valid email"],
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      minlength: [6, "Password must be at least 6 characters"],
      select: false, // Don't return password in queries by default
    },

    // Profile
    displayName: {
      type: String,
      required: [true, "Display name is required"],
      minlength: [2, "Display name must be at least 2 characters"],
      maxlength: [50, "Display name cannot exceed 50 characters"],
      trim: true,
    },
    dateOfBirth: {
      type: Date,
    },
    age: {
      type: Number,
      min: [MINIMUM_AGE, `You must be at least ${MINIMUM_AGE} years old`],
    },
    bio: {
      type: String,
      maxlength: [500, "Bio cannot exceed 500 characters"],
      trim: true,
    },
    profilePicture: {
      type: String,
      default: null,
    },
    category: {
      type: String,
      trim: true,
      default: "Other"
    },

    // Location
    location: {
      city: {
        type: String,
        trim: true,
      },
      area: {
        type: String,
        trim: true,
      },
      coordinates: {
        type: {
          type: String,
          enum: ["Point"],
          default: "Point",
        },
        coordinates: {
          type: [Number],
          default: [0, 0],
        },
      },
    },

    // Availability
    availability: {
      type: String,
      enum: AVAILABILITY_STATUSES,
      default: "available",
    },

    // Extended profile fields
    tagline: {
      type: String,
      maxlength: [200, "Tagline cannot exceed 200 characters"],
      trim: true,
    },
    district: { type: String, trim: true },
    state: { type: String, trim: true },
    pincode: { type: String, trim: true },
    ageRange: { type: String, trim: true },
    pronouns: { type: String, trim: true },
    languages: { type: [String], default: [] },
    helpSituations: { type: [String], default: [] },
    availabilitySlots: { type: [String], default: [] },
    comfortSettings: {
      type: Map,
      of: Boolean,
      default: {},
    },
    budgetFrom: { type: Number, default: 100 },
    budgetTo: { type: Number, default: 500 },
    freeFirst5Min: { type: Boolean, default: false },
    openToLowBudget: { type: Boolean, default: false },
    favoriteQuote: { type: String, trim: true },
    careAbout: { type: String, trim: true },
    definingSong: { type: String, trim: true },
    nervousMessage: { type: String, trim: true },
    profileWarmth: { type: Number, default: 0 },

    // Settings
    settings: {
      notifications: {
        push: { type: Boolean, default: true },
        email: { type: Boolean, default: true },
        sms: { type: Boolean, default: false }
      },
      privacy: {
        profileVisibility: { type: Boolean, default: true },
        onlineStatus: { type: Boolean, default: true }
      }
    },
    blockedUsers: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],

    // Verification
    verification: {
      emailVerifiedAt: Date,
      phoneVerifiedAt: Date,
      idVerification: {
        status: { 
          type: String, 
          enum: ['unverified', 'pending', 'verified', 'rejected'],
          default: 'unverified'
        },
        type: {
          type: String,
          enum: ['pan', 'bank', 'aadhaar', null],
          default: null
        },
        details: {
          type: Map,
          of: String,
          default: {}
        },
        verifiedAt: Date
      }
    },

    // Role & Permissions
    role: {
      type: String,
      enum: USER_ROLES,
      default: "user",
    },
    supportPermissions: {
      canViewReports: {
        type: Boolean,
        default: false,
      },
      canResolveReports: {
        type: Boolean,
        default: false,
      },
      canBanUsers: {
        type: Boolean,
        default: false,
      },
    },

    // Statistics
    stats: {
      totalJobsPosted: {
        type: Number,
        default: 0,
      },
      totalJobsCompleted: {
        type: Number,
        default: 0,
      },
      totalJobsAccepted: {
        type: Number,
        default: 0,
      },
      averageRating: {
        type: Number,
        default: 0,
      },
      totalRatings: {
        type: Number,
        default: 0,
      },
    },

    // Account Status
    status: {
      type: String,
      enum: USER_STATUSES,
      default: "active",
    },
    suspensionReason: String,
    suspensionExpiresAt: Date,

    // Token management
    tokenVersion: {
      type: Number,
      default: 0,
    },

    // Vibes / personality tags
    vibes: {
      type: [String],
      default: [],
    },

    // Timestamps
    lastLoginAt: Date,
  },
  {
    timestamps: true,
  },
);

// Indexes
userSchema.index({ "location.city": 1, "location.area": 1 });
userSchema.index({ "location.coordinates": "2dsphere" });
userSchema.index({ role: 1 });
userSchema.index({ status: 1 });
userSchema.index({ vibes: 1 });
userSchema.index({ category: 1 });

// Virtual for public profile
userSchema.virtual("publicProfile").get(function () {
  return {
    _id: this._id,
    displayName: this.displayName,
    bio: this.bio,
    age: this.age,
    profilePicture: this.profilePicture,
    location: {
      city: this.location.city,
      area: this.location.area,
    },
    category: this.category,
    ratePerHour: this.ratePerHour,
    availability: this.availability,
    stats: {
      averageRating: this.stats.averageRating,
      totalRatings: this.stats.totalRatings,
      totalJobsCompleted: this.stats.totalJobsCompleted,
    },
    createdAt: this.createdAt,
  };
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password") || !this.password) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Method to check if user is banned or suspended
userSchema.methods.isActive = function () {
  if (this.status === "banned") {
    return false;
  }
  if (this.status === "suspended" && this.suspensionExpiresAt) {
    return new Date() > this.suspensionExpiresAt;
  }
  return this.status === "active";
};

module.exports = mongoose.model("User", userSchema);
