import apiClient from './apiClient';

export const login = (email: string, password: string) => {
  return apiClient.post('/auth/login', { email, password });
};

export const register = (email: string, password: string) => {
  return apiClient.post('/auth/signup', { email, password });
};

export const inspectToken = (token: string) => {
  return apiClient.get('/auth/debug/token', {
    headers: { Authorization: `Bearer ${token}` }
  });
};