/**
 * Configuration Module
 * Validates environment variables and exports structured config object
 * Fails fast if required configuration is missing
 */

const env = require('./env');
const logger = require('../utils/logger');

/**
 * Validates required environment variables
 * Throws error if any critical config is missing
 */
const validateConfig = () => {
  const required = {
    MONGODB_URI: env.MONGODB_URI,
    JWT_SECRET: env.JWT_SECRET
  };

  const missing = Object.entries(required)
    .filter(([key, value]) => !value)
    .map(([key]) => key);

  if (missing.length > 0) {
    const errorMsg = `Missing required environment variables: ${missing.join(', ')}`;
    logger.error(errorMsg);
    throw new Error(errorMsg);
  }

  // Validate JWT secret strength (minimum 32 characters for production)
  if (env.NODE_ENV === 'production' && env.JWT_SECRET.length < 32) {
    const errorMsg = 'JWT_SECRET must be at least 32 characters in production';
    logger.error(errorMsg);
    throw new Error(errorMsg);
  }

  // Validate OTP service configuration
  if (env.OTP_SERVICE === 'twilio') {
    if (!env.TWILIO_ACCOUNT_SID || !env.TWILIO_AUTH_TOKEN || !env.TWILIO_PHONE_NUMBER) {
      logger.warn('Twilio configuration incomplete. OTP service may not work.');
    }
  } else if (env.OTP_SERVICE === 'msg91') {
    if (!env.MSG91_AUTH_KEY || !env.MSG91_SENDER_ID) {
      logger.warn('MSG91 configuration incomplete. OTP service may not work.');
    }
  }

  logger.info('✅ Configuration validated successfully');
};

// Run validation on module load
validateConfig();

/**
 * Structured configuration object
 * This is what the rest of the application imports
 */
const config = {
  env: env.NODE_ENV,
  port: env.PORT,
  
  database: {
    uri: env.MONGODB_URI
  },
  
  jwt: {
    secret: env.JWT_SECRET,
    expiresIn: env.JWT_EXPIRES_IN,
    tempTokenExpiresIn: env.TEMP_TOKEN_EXPIRES_IN
  },
  
  otp: {
    service: env.OTP_SERVICE,
    expiresIn: env.OTP_EXPIRES_IN,
    twilio: {
      accountSid: env.TWILIO_ACCOUNT_SID,
      authToken: env.TWILIO_AUTH_TOKEN,
      phoneNumber: env.TWILIO_PHONE_NUMBER
    },
    msg91: {
      authKey: env.MSG91_AUTH_KEY,
      senderId: env.MSG91_SENDER_ID,
      route: env.MSG91_ROUTE
    }
  },
  
  rateLimit: {
    general: {
      windowMs: env.RATE_LIMIT_WINDOW_MS,
      maxRequests: env.RATE_LIMIT_MAX_REQUESTS
    },
    otp: {
      windowMs: env.OTP_RATE_LIMIT_WINDOW_MS,
      maxRequests: env.OTP_RATE_LIMIT_MAX_REQUESTS
    },
    chat: {
      windowMs: env.CHAT_RATE_LIMIT_WINDOW_MS,
      maxRequests: env.CHAT_RATE_LIMIT_MAX_REQUESTS
    }
  },
  
  admin: {
    phoneNumber: env.ADMIN_PHONE
  },
  
  cors: {
    origin: env.CORS_ORIGIN
  },
  
  logging: {
    level: env.LOG_LEVEL
  },

  email: {
    service: env.EMAIL_SERVICE,
    user: env.EMAIL_USER,
    pass: env.EMAIL_PASS
  },
  
  // Helper functions
  isDevelopment: () => env.NODE_ENV === 'development',
  isProduction: () => env.NODE_ENV === 'production',
  isTest: () => env.NODE_ENV === 'test'
};

module.exports = config;
