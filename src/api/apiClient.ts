import axios from 'axios';
import { getToken, removeToken } from '../services/storageService';

// Configure to match your backend (localhost:5050)
const BASE_URL = 'http://192.168.1.7:5050/api';

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auto-attach JWT token from your Spring Security setup
apiClient.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Matches your JWTFilter
  }
  return config;
});

// Error handling for your Spring Boot responses
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
  if (error.response?.status === 401 || error.response?.status === 403) {
      // Handle unauthorized or forbidden responses
      if (!error.config?.url?.includes('/auth/validate')) {
        const token = await getToken();
        if (token) {
          try {
            // Try to validate the token
            await apiClient.get('/auth/validate');
          } catch (validationError) {
            await removeToken();
            const authError = new Error('Session expired. Please log in again.');
            authError.name = 'AuthError';
            throw authError;
          }
        }
      }

      // If this is a login error, customize the error message
      if (error.config?.url?.includes('/auth/login')) {
        const loginError = new Error(error.response?.data?.message || 'Invalid email or password');
        loginError.name = 'AuthError';
        throw loginError;
      }
    }

    // For network errors or other issues
    if (!error.response) {
      const networkError = new Error('Network error. Please check your connection.');
      networkError.name = 'NetworkError';
      throw networkError;
    }

    return Promise.reject(error);
  }
);

export default apiClient;