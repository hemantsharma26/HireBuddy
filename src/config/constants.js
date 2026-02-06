// Blocked keywords for content moderation
const BLOCKED_KEYWORDS = [
  // Adult content
  'escort', 'call girl', 'massage', 'sensual', 'intimate', 'erotic',
  'sexual', 'sex', 'prostitution', 'adult services',
  
  // Illegal activities
  'drugs', 'weed', 'cocaine', 'heroin', 'marijuana', 'cannabis',
  'weapons', 'gun', 'pistol', 'ammunition', 'bomb',
  'fake documents', 'fake id', 'forged', 'counterfeit',
  'hack', 'hacking', 'crack', 'piracy',
  
  // Harmful content
  'suicide', 'self harm', 'kill', 'murder',
  
  // Scam indicators
  'guaranteed income', 'work from home guaranteed', 'easy money',
  'get rich quick', 'mlm', 'pyramid scheme'
];

// Job categories
const JOB_CATEGORIES = [
  'medicine_pickup',
  'household_help',
  'companionship',
  'safety_presence',
  'travel_companion',
  'homework_help',
  'general_help',
  'other'
];

// Job types
const JOB_TYPES = ['in-person', 'remote'];

// User roles
const USER_ROLES = ['user', 'support', 'admin'];

// User statuses
const USER_STATUSES = ['active', 'suspended', 'banned'];

// Availability statuses
const AVAILABILITY_STATUSES = ['available', 'busy'];

// Request statuses
const REQUEST_STATUSES = ['open', 'in-progress', 'completed', 'cancelled'];

// Application statuses
const APPLICATION_STATUSES = ['pending', 'accepted', 'rejected'];

// Report reasons
const REPORT_REASONS = [
  'inappropriate_content',
  'harassment',
  'spam',
  'safety_concern',
  'fraud',
  'other'
];

// Report statuses
const REPORT_STATUSES = ['pending', 'under_review', 'resolved', 'dismissed'];

// Report priorities
const REPORT_PRIORITIES = ['low', 'medium', 'high'];

// Resolution actions
const RESOLUTION_ACTIONS = ['no_action', 'warning', 'temporary_ban', 'permanent_ban'];

// Message types
const MESSAGE_TYPES = ['text', 'system'];

// Rating types
const RATING_TYPES = ['requester', 'helper'];

// OTP expiry (in seconds)
const OTP_EXPIRY_SECONDS = 300; // 5 minutes

// OTP length
const OTP_LENGTH = 6;

// Minimum age
const MINIMUM_AGE = 18;

// Pagination defaults
const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 100;

module.exports = {
  BLOCKED_KEYWORDS,
  JOB_CATEGORIES,
  JOB_TYPES,
  USER_ROLES,
  USER_STATUSES,
  AVAILABILITY_STATUSES,
  REQUEST_STATUSES,
  APPLICATION_STATUSES,
  REPORT_REASONS,
  REPORT_STATUSES,
  REPORT_PRIORITIES,
  RESOLUTION_ACTIONS,
  MESSAGE_TYPES,
  RATING_TYPES,
  OTP_EXPIRY_SECONDS,
  OTP_LENGTH,
  MINIMUM_AGE,
  DEFAULT_PAGE,
  DEFAULT_LIMIT,
  MAX_LIMIT
};
