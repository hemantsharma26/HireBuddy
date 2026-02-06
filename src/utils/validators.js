const { BLOCKED_KEYWORDS } = require('../config/constants');

/**
 * Validate phone number (Indian format)
 */
const isValidPhoneNumber = (phone) => {
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone);
};

/**
 * Validate email
 */
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Check for blocked keywords in text
 */
const checkBlockedContent = (text) => {
  const lowerText = text.toLowerCase();
  const flaggedWords = BLOCKED_KEYWORDS.filter(word => 
    lowerText.includes(word.toLowerCase())
  );
  
  if (flaggedWords.length > 0) {
    return {
      isBlocked: true,
      flaggedWords
    };
  }
  
  return {
    isBlocked: false,
    flaggedWords: []
  };
};

/**
 * Sanitize user input
 */
const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  // Remove potential XSS attacks
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .trim();
};

/**
 * Validate age
 */
const isValidAge = (age, minAge = 18) => {
  return Number.isInteger(age) && age >= minAge && age <= 120;
};

/**
 * Validate coordinates
 */
const isValidCoordinates = (coordinates) => {
  if (!Array.isArray(coordinates) || coordinates.length !== 2) {
    return false;
  }
  
  const [longitude, latitude] = coordinates;
  return (
    typeof longitude === 'number' &&
    typeof latitude === 'number' &&
    longitude >= -180 &&
    longitude <= 180 &&
    latitude >= -90 &&
    latitude <= 90
  );
};

module.exports = {
  isValidPhoneNumber,
  isValidEmail,
  checkBlockedContent,
  sanitizeInput,
  isValidAge,
  isValidCoordinates
};
