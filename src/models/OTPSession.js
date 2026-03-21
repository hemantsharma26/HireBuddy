const mongoose = require("mongoose");
const { OTP_EXPIRY_SECONDS } = require("../config/constants");

const otpSessionSchema = new mongoose.Schema(
  {
    phoneNumber: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
    },
    otp: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
      default: () => new Date(Date.now() + 300 * 1000), // Default to 5 mins
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// TTL Index - automatically delete documents after expiry
otpSessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
otpSessionSchema.index({ phoneNumber: 1 });
otpSessionSchema.index({ email: 1 });

// Method to verify OTP
otpSessionSchema.methods.verify = function (inputOtp) {
  if (this.verified) {
    throw new Error("OTP already verified");
  }

  if (new Date() > this.expiresAt) {
    throw new Error("OTP has expired");
  }

  if (this.otp !== inputOtp) {
    throw new Error("Invalid OTP");
  }

  this.verified = true;
  return this.save();
};

module.exports = mongoose.model("OTPSession", otpSessionSchema);
