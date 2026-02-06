/**
 * Requests API Service
 * All request-related API calls
 * ONLY called by custom hooks, NEVER directly by components
 */

import apiClient from '../../../services/apiClient';

export const requestApi = {
  /**
   * Browse requests with optional filters
   */
  browse: async (filters = {}) => {
    const response = await apiClient.get('/requests', { params: filters });
    return response.data;
  },

  /**
   * Get single request by ID
   */
  getById: async (id) => {
    const response = await apiClient.get(`/requests/${id}`);
    return response.data;
  },

  /**
   * Create new hiring request
   */
  create: async (data) => {
    const response = await apiClient.post('/requests', data);
    return response.data;
  },

  /**
   * Update existing request
   */
  update: async (id, data) => {
    const response = await apiClient.put(`/requests/${id}`, data);
    return response.data;
  },

  /**
   * Delete/cancel request
   */
  delete: async (id) => {
    const response = await apiClient.delete(`/requests/${id}`);
    return response.data;
  },

  /**
   * Apply to a request
   */
  apply: async (id, message) => {
    const response = await apiClient.post(`/requests/${id}/apply`, { message });
    return response.data;
  },

  /**
   * Accept an applicant (request owner only)
   */
  acceptApplicant: async (requestId, applicantId) => {
    const response = await apiClient.patch(
      `/requests/${requestId}/applicants/${applicantId}/accept`
    );
    return response.data;
  },

  /**
   * Reject an applicant (request owner only)
   */
  rejectApplicant: async (requestId, applicantId) => {
    const response = await apiClient.patch(
      `/requests/${requestId}/applicants/${applicantId}/reject`
    );
    return response.data;
  },

  /**
   * Mark request as complete
   */
  complete: async (id) => {
    const response = await apiClient.patch(`/requests/${id}/complete`);
    return response.data;
  },

  /**
   * Get user's posted requests
   */
  getMyPosted: async (filters = {}) => {
    const response = await apiClient.get('/requests/my/posted', { params: filters });
    return response.data;
  },

  /**
   * Get requests user has accepted
   */
  getMyAccepted: async (filters = {}) => {
    const response = await apiClient.get('/requests/my/accepted', { params: filters });
    return response.data;
  }
};

export default requestApi;
