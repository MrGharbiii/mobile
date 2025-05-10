import axios from 'axios';
import { getToken } from '../services/storageService';

// Configure to match your backend (localhost:5050)
const BASE_URL = 'http://192.168.0.185:5050/api';

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
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized like your Spring Security
      console.error('Authentication error');
    }
    return Promise.reject(error);
  }
);

export default apiClient;