import api from './api';

export const authService = {
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      // Handle different error types
      if (error.code === 'ECONNABORTED') {
        throw new Error('Request timeout. The server is taking too long to respond. Please check if the backend is running.');
      } else if (error.code === 'ERR_NETWORK' || error.message.includes('Network Error')) {
        throw new Error('Cannot connect to server. Please ensure the backend is running on http://localhost:8080');
      } else if (error.response) {
        // Server responded with error status
        const errorMessage = error.response.data?.message ||
                            error.response.data?.error ||
                            'Invalid email or password';
        throw new Error(errorMessage);
      } else if (error.request) {
        // Request was made but no response received
        throw new Error('No response from server. Please check if the backend is running on http://localhost:8080');
      } else {
        // Something else happened
        throw new Error(error.message || 'An error occurred during login');
      }
    }
  },

  register: async (data) => {
    try {
      const response = await api.post('/auth/register', data);
      return response.data;
    } catch (error) {
      // Handle different error types
      if (error.code === 'ECONNABORTED') {
        throw new Error('Request timeout. The server is taking too long to respond. Please check if the backend is running.');
      } else if (error.code === 'ERR_NETWORK' || error.message.includes('Network Error')) {
        throw new Error('Cannot connect to server. Please ensure the backend is running on http://localhost:8080');
      } else if (error.response) {
        // Server responded with error status
        const errorMessage = error.response.data?.error ||
                            error.response.data?.message ||
                            (typeof error.response.data === 'string' ? error.response.data : 'Registration failed');
        throw new Error(errorMessage);
      } else if (error.request) {
        // Request was made but no response received
        throw new Error('No response from server. Please check if the backend is running on http://localhost:8080');
      } else {
        // Something else happened
        throw new Error(error.message || 'An error occurred during registration');
      }
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
};