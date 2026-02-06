import api from './api';

export const requestService = {
  // Browse requests with filters
  browseRequests: async (filters = {}) => {
    const response = await api.get('/requests', { params: filters });
    return response.data;
  },

  // Get single request by ID
  getRequestById: async (id) => {
    const response = await api.get(`/requests/${id}`);
    return response.data;
  },

  // Create new request
  createRequest: async (data) => {
    const response = await api.post('/requests', data);
    return response.data;
  },

  // Update request
  updateRequest: async (id, data) => {
    const response = await api.put(`/requests/${id}`, data);
    return response.data;
  },

  // Delete/cancel request
  deleteRequest: async (id) => {
    const response = await api.delete(`/requests/${id}`);
    return response.data;
  },

  // Apply to a request
  applyToRequest: async (id, message) => {
    const response = await api.post(`/requests/${id}/apply`, { message });
    return response.data;
  },

  // Accept an applicant
  acceptApplicant: async (requestId, applicantId) => {
    const response = await api.patch(`/requests/${requestId}/applicants/${applicantId}/accept`);
    return response.data;
  },

  // Reject an applicant
  rejectApplicant: async (requestId, applicantId) => {
    const response = await api.patch(`/requests/${requestId}/applicants/${applicantId}/reject`);
    return response.data;
  },

  // Complete request
  completeRequest: async (id) => {
    const response = await api.patch(`/requests/${id}/complete`);
    return response.data;
  },

  // Get user's posted requests
  getMyPostedRequests: async (filters = {}) => {
    const response = await api.get('/requests/my/posted', { params: filters });
    return response.data;
  },

  // Get requests user has accepted
  getMyAcceptedRequests: async (filters = {}) => {
    const response = await api.get('/requests/my/accepted', { params: filters });
    return response.data;
  }
};
