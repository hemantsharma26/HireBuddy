/**
 * API Client
 * Centralized Axios instance with interceptors
 * Handles: authentication, error handling, retry logic
 */

import axios from 'axios';
import toast from 'react-hot-toast';

// Create axios instance
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor - Add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors globally
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle different error scenarios
    if (error.response) {
      const { status, data } = error.response;
      
      switch (status) {
        case 401:
          // Unauthorized - clear auth and redirect to login
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          toast.error('Session expired. Please login again.');
          window.location.href = '/login';
          break;
          
        case 403:
          toast.error(data?.message || 'Access forbidden');
          break;
          
        case 404:
          // Don't show toast for 404, let component handle it
          break;
          
        case 429:
          toast.error('Too many requests. Please slow down.');
          break;
          
        case 500:
        case 502:
        case 503:
          toast.error('Server error. Please try again later.');
          break;
          
        default:
          // Show error message from API if available
          if (data?.message) {
            toast.error(data.message);
          }
      }
    } else if (error.request) {
      // Network error - no response received
      toast.error('Network error. Please check your connection.');
    } else {
      // Something else went wrong
      toast.error('An unexpected error occurred.');
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;
