import apiClient from './apiClient';

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
}

export const login = (data: LoginData): Promise<AuthResponse> => {
  return apiClient.post('/auth/login', data);
};

export const register = (data: RegisterData): Promise<AuthResponse> => {
  return apiClient.post('/auth/signup', data);
};

export const validateToken = (token: string): Promise<{ valid: boolean }> => {
  return apiClient.get('/auth/validate', {
    headers: { Authorization: `Bearer ${token}` }
  });
};