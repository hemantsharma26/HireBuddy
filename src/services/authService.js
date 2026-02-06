import api from './api';

export const authService = {
  // Send OTP to phone number
  sendOTP: async (phoneNumber) => {
    const response = await api.post('/auth/send-otp', { phoneNumber });
    return response.data;
  },

  // Verify OTP and login/signup
  verifyOTP: async (phoneNumber, otp) => {
    const response = await api.post('/auth/verify-otp', { phoneNumber, otp });
    return response.data;
  },

  // Complete profile for new users
  completeProfile: async (profileData) => {
    const response = await api.post('/auth/complete-profile', profileData);
    return response.data;
  },

  // Logout
  logout: async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      // Continue with local logout even if API call fails
      console.error('Logout error:', error);
    }
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};
