const BlockedUser = require('../models/BlockedUser');
const { NotFoundError } = require('../utils/errors');
const logger = require('../utils/logger');
const { DEFAULT_PAGE, DEFAULT_LIMIT } = require('../config/constants');

/**
 * Common Service
 * Reusable CRUD operations and helper methods
 */
class CommonService {
  /**
   * Get entity by ID or throw NotFoundError
   * @param {Model} Model - Mongoose model
   * @param {string} id - Entity ID
   * @param {string} errorMessage - Custom error message
   * @param {object} populateOptions - Optional population config
   * @returns {Promise<Document>}
   */
  async getEntityOrFail(Model, id, errorMessage, populateOptions = null) {
    logger.debug(`Fetching ${Model.modelName} with ID: ${id}`);
    
    let query = Model.findById(id);
    
    if (populateOptions) {
      if (Array.isArray(populateOptions)) {
        populateOptions.forEach(opt => query = query.populate(opt));
      } else {
        query = query.populate(populateOptions);
      }
    }
    
    const entity = await query;
    
    if (!entity) {
      logger.warn(`${Model.modelName} not found: ${id}`);
      throw new NotFoundError(errorMessage || `${Model.modelName} not found`);
    }
    
    return entity;
  }

  /**
   * Build pagination parameters
   * @param {number} page - Page number from query
   * @param {number} limit - Limit from query
   * @param {number} maxLimit - Maximum allowed limit
   * @returns {object} Normalized pagination params
   */
  buildPagination(page, limit, maxLimit = 100) {
    const normalizedPage = Math.max(parseInt(page) || DEFAULT_PAGE, 1);
    const normalizedLimit = Math.min(parseInt(limit) || DEFAULT_LIMIT, maxLimit);
    
    return {
      page: normalizedPage,
      limit: normalizedLimit,
      skip: (normalizedPage - 1) * normalizedLimit
    };
  }

  /**
   * Apply pagination to query
   * @param {Query} query - Mongoose query
   * @param {object} pagination - Pagination params
   * @returns {Query} Paginated query
   */
  paginateQuery(query, pagination) {
    return query
      .skip(pagination.skip)
      .limit(pagination.limit);
  }

  /**
   * Build filter object from allowed filters
   * @param {object} baseFilter - Base filter to start with
   * @param {object} allowedFilters - Map of query param to filter field
   * @param {object} queryParams - Actual query parameters
   * @returns {object} Complete filter object
   */
  buildFilterQuery(baseFilter, allowedFilters, queryParams) {
    const filter = { ...baseFilter };
    
    Object.entries(allowedFilters).forEach(([paramName, filterField]) => {
      if (queryParams[paramName] !== undefined && queryParams[paramName] !== null) {
        filter[filterField] = queryParams[paramName];
      }
    });
    
    return filter;
  }

  /**
   * Get blocked user IDs for a user
   * @param {string} userId - User ID
   * @returns {Promise<Array>} Array of blocked user IDs
   */
  async getBlockedUserIds(userId) {
    logger.debug(`Fetching blocked users for: ${userId}`);
    
    const blockedUsers = await BlockedUser.find({ blockerId: userId })
      .select('blockedUserId')
      .lean();
    
    return blockedUsers.map(b => b.blockedUserId);
  }

  /**
   * Format pagination response data
   * @param {Array} data - Data array
   * @param {number} total - Total count
   * @param {object} pagination - Pagination params
   * @returns {object} Formatted response
   */
  formatPaginatedResponse(data, total, pagination) {
    return {
      data,
      pagination: {
        page: pagination.page,
        limit: pagination.limit,
        total,
        totalPages: Math.ceil(total / pagination.limit),
        hasMore: pagination.page * pagination.limit < total
      }
    };
  }

  /**
   * Execute a paginated query and return formatted result
   * @param {Model} Model - Mongoose model
   * @param {object} filter - Query filter
   * @param {object} options - Query options (sort, populate, select)
   * @param {object} pagination - Pagination params
   * @returns {Promise<object>} Paginated result
   */
  async executePaginatedQuery(Model, filter, options = {}, pagination) {
    logger.debug(`Executing paginated query on ${Model.modelName}`);
    
    const { sort = { createdAt: -1 }, populate, select } = options;
    
    // Get total count (skip total count for $near queries if needed, or use a separate query without $near)
    // NOTE: countDocuments doesn't support $near. We'll use a copy of filter without $near for counting.
    const countFilter = { ...filter };
    delete countFilter['location.coordinates'];
    const total = await Model.countDocuments(countFilter);
    
    // Build and execute query
    let queryOptions = { ...filter };
    let query = Model.find(queryOptions)
      .skip(pagination.skip)
      .limit(pagination.limit);
    
    if (Object.keys(sort).length > 0) {
      query = query.sort(sort);
    }
    
    if (populate) {
      if (Array.isArray(populate)) {
        populate.forEach(p => query = query.populate(p));
      } else {
        query = query.populate(populate);
      }
    }
    
    if (select) {
      query = query.select(select);
    }
    
    const data = await query;
    
    return this.formatPaginatedResponse(data, total, pagination);
  }
}

module.exports = new CommonService();
