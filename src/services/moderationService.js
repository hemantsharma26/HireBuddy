const { checkBlockedContent } = require('../utils/validators');

/**
 * Content moderation service
 */

/**
 * Check if content contains blocked keywords
 */
const moderateContent = (text) => {
  const result = checkBlockedContent(text);
  
  if (result.isBlocked) {
    const error = new Error('Description contains prohibited content');
    error.code = 'BLOCKED_CONTENT';
    error.details = { flaggedWords: result.flaggedWords };
    throw error;
  }
  
  return true;
};

/**
 * Check multiple fields for blocked content
 */
const moderateMultipleFields = (fields) => {
  for (const [fieldName, fieldValue] of Object.entries(fields)) {
    const result = checkBlockedContent(fieldValue);
    
    if (result.isBlocked) {
      const error = new Error(`${fieldName} contains prohibited content`);
      error.code = 'BLOCKED_CONTENT';
      error.details = { 
        field: fieldName,
        flaggedWords: result.flaggedWords 
      };
      throw error;
    }
  }
  
  return true;
};

module.exports = {
  moderateContent,
  moderateMultipleFields
};
