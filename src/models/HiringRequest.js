const mongoose = require("mongoose");
const {
  JOB_CATEGORIES,
  JOB_TYPES,
  REQUEST_STATUSES,
  APPLICATION_STATUSES,
} = require("../config/constants");

const hiringRequestSchema = new mongoose.Schema(
  {
    // Requester Info
    requesterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Request Details
    title: {
      type: String,
      required: [true, "Title is required"],
      minlength: [5, "Title must be at least 5 characters"],
      maxlength: [100, "Title cannot exceed 100 characters"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      minlength: [10, "Description must be at least 10 characters"],
      maxlength: [1000, "Description cannot exceed 1000 characters"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: JOB_CATEGORIES,
    },

    // Job Type & Location
    jobType: {
      type: String,
      enum: JOB_TYPES,
      required: [true, "Job type is required"],
    },
    location: {
      city: {
        type: String,
        required: [true, "City is required"],
        trim: true,
      },
      state: {
        type: String,
        trim: true,
      },
      area: {
        type: String,
        required: [true, "Area is required"],
        trim: true,
      },
      fullAddress: {
        type: String,
        trim: true,
      },
      pincode: {
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

    // Compensation & Duration
    compensation: {
      type: String,
      required: [true, "Compensation is required"],
      maxlength: [100, "Compensation cannot exceed 100 characters"],
      trim: true,
    },
    duration: {
      type: String,
      maxlength: [200, "Duration cannot exceed 200 characters"],
      trim: true,
    },

    // Preferred vibes/personality traits
    vibes: {
      type: [String],
      default: [],
    },

    // Status
    status: {
      type: String,
      enum: REQUEST_STATUSES,
      default: "open",
    },
    workersNeeded: {
      type: Number,
      default: 1,
      min: [1, "At least 1 worker is needed"],
    },
    acceptedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    acceptedAt: Date,
    completedAt: Date,

    // Applicants
    applicants: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        appliedAt: {
          type: Date,
          default: Date.now,
        },
        status: {
          type: String,
          enum: APPLICATION_STATUSES,
          default: "pending",
        },
        message: {
          type: String,
          maxlength: 500,
        },
        bidAmount: {
          type: Number,
          required: [true, "Bid amount is required"],
        },
        availability: {
          type: String,
          enum: ["now", "scheduled"],
          default: "now",
        },
      },
    ],

    // Metadata
    viewCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Indexes
hiringRequestSchema.index({ requesterId: 1 });
hiringRequestSchema.index({ status: 1 });
hiringRequestSchema.index({ category: 1 });
hiringRequestSchema.index({ jobType: 1 });
hiringRequestSchema.index({ "location.city": 1, "location.area": 1 });
hiringRequestSchema.index({ "location.coordinates": "2dsphere" });
hiringRequestSchema.index({ createdAt: -1 });
hiringRequestSchema.index({ acceptedBy: 1 });

// Compound indexes for optimized browse queries
hiringRequestSchema.index({ status: 1, category: 1, createdAt: -1 });
hiringRequestSchema.index({ status: 1, jobType: 1, createdAt: -1 });
hiringRequestSchema.index({ status: 1, "location.city": 1, createdAt: -1 });

// Virtual for applicants count
hiringRequestSchema.virtual("applicantsCount").get(function () {
  return this.applicants ? this.applicants.length : 0;
});

// Method to add applicant
 hiringRequestSchema.methods.addApplicant = function (userId, data) {
  const { message = "", bidAmount, availability = "now" } = data;
  
  const existingApplicant = this.applicants.find(
    (app) => app.userId.toString() === userId.toString(),
  );

  if (existingApplicant) {
    throw new Error("You have already applied for this request");
  }

  this.applicants.push({
    userId,
    message,
    bidAmount,
    availability,
    appliedAt: new Date(),
    status: "pending",
  });

  return this.save();
};

// Method to accept applicant
 hiringRequestSchema.methods.acceptApplicant = function (applicantId) {
  const applicant = this.applicants.find(
    (app) => app.userId.toString() === applicantId.toString(),
  );

  if (!applicant) {
    throw new Error("Applicant not found");
  }

  if (applicant.status === "accepted") {
    throw new Error("Applicant already accepted");
  }

  // Update applicant status
  applicant.status = "accepted";

  // Add to acceptedBy array if not already there
  const isAlreadyAccepted = this.acceptedBy.some(id => id.equals(applicantId));
  if (!isAlreadyAccepted) {
    this.acceptedBy.push(applicantId);
  }

  this.acceptedAt = this.acceptedAt || new Date();

  // Check if we reached capacity
  if (this.acceptedBy.length >= this.workersNeeded) {
    this.status = "completed"; // Auto-close
    this.completedAt = new Date();
    
    // Reject other pending applicants
    this.applicants.forEach((app) => {
      if (app.status === "pending") {
        app.status = "rejected";
      }
    });
  } else {
    // Still open for more applicants, but we could optionally use a sub-status
    // For now, keep it 'open' so it shows in browseRequests
    this.status = "open"; 
  }

  return this.save();
};

// Method to complete request
hiringRequestSchema.methods.completeRequest = function () {
  this.status = "completed";
  this.completedAt = new Date();
  return this.save();
};

module.exports = mongoose.model("HiringRequest", hiringRequestSchema);
