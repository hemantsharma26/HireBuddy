const axios = require('axios');
const config = require('../config');
const logger = require('../utils/logger');

const { OTP_LENGTH } = require('../config/constants');

/**
 * Generate dynamic digit OTP
 */
const generateOTP = () => {
  const min = Math.pow(10, OTP_LENGTH - 1);
  const max = Math.pow(10, OTP_LENGTH) - 1 - min;
  return Math.floor(min + Math.random() * max).toString();
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
 * Send OTP via Email
 */
const sendEmailOTP = async (email, otp) => {
  // In development mode, just log the OTP
  if (config.isDevelopment()) {
    logger.info(`📧 OTP for ${email}: ${otp}`);
    return true;
  }

  try {
    const nodemailer = require('nodemailer');
    
    // Create transporter (Example using Gmail/SMTP - should be in config)
    const transporter = nodemailer.createTransport({
      service: config.email.service,
      auth: {
        user: config.email.user,
        pass: config.email.pass
      }
    });

    const mailOptions = {
      from: `"HireBuddy Verification" <${config.email.user}>`,
      to: email,
      subject: 'Your HireBuddy Verification Code',
      text: `Your HireBuddy verification code is: ${otp}. It will expire in ${config.otp.expiresIn / 60} minutes.`
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    logger.error('Nodemailer error:', error);
    // Don't throw in production if you want to fail gracefully, but here we want to know
    throw new Error('Failed to send verification email');
  }
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
  sendOTP,
  sendEmailOTP
};
