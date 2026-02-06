const axios = require('axios');
const config = require('../config');
const logger = require('../utils/logger');

/**
 * Generate 6-digit OTP
 */
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

/**
 * Send OTP via Twilio
 */
const sendOTPViaTwilio = async (phoneNumber, otp) => {
  try {
    const accountSid = config.otp.twilio.accountSid;
    const authToken = config.otp.twilio.authToken;
    const fromNumber = config.otp.twilio.phoneNumber;

    const client = require('twilio')(accountSid, authToken);

    await client.messages.create({
      body: `Your HireBuddy OTP is: ${otp}. Valid for ${config.otp.expiresIn / 60} minutes.`,
      from: fromNumber,
      to: `+91${phoneNumber}`
    });
    return true;
  } catch (error) {
    logger.error('Twilio error:', error);
    throw new Error('Failed to send OTP via Twilio');
  }
};

/**
 * Send OTP via MSG91
 */
const sendOTPViaMSG91 = async (phoneNumber, otp) => {
  const authKey = config.otp.msg91.authKey;
  const senderId = config.otp.msg91.senderId;
  const route = config.otp.msg91.route;

  const message = `Your HireBuddy OTP is: ${otp}. Valid for ${config.otp.expiresIn / 60} minutes.`;

  await axios.get('https://api.msg91.com/api/v5/flow/', {
    params: {
      authkey: authKey,
      sender: senderId,
      mobiles: `91${phoneNumber}`,
      message: encodeURIComponent(message),
      route
    }
  });
};

/**
 * Main send OTP function
 * Routes to appropriate SMS provider based on configuration
 */
const sendOTP = async (phoneNumber, otp) => {
  // In development mode, just log the OTP
  if (config.isDevelopment()) {
    logger.info(`📱 OTP for ${phoneNumber}: ${otp}`);
    return true;
  }

  // Use configured OTP service
  if (config.otp.service === 'msg91') {
    return await sendOTPViaMSG91(phoneNumber, otp);
  } else {
    return await sendOTPViaTwilio(phoneNumber, otp);
  }
};

module.exports = {
  generateOTP,
  sendOTP
};
