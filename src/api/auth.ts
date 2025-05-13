import apiClient from './apiClient';
import type { AxiosResponse } from 'axios';

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

export const login = (data: LoginData): Promise<AxiosResponse<AuthResponse>> => {
  return apiClient.post<AuthResponse>('/auth/login', data);
};

export const register = (data: RegisterData): Promise<AxiosResponse<AuthResponse>> => {
  return apiClient.post<AuthResponse>('/auth/signup', data);
};

export const validateToken = (token: string): Promise<AxiosResponse<{ valid: boolean }>> => {
  return apiClient.get<{ valid: boolean }>('/auth/validate', {
    headers: { Authorization: `Bearer ${token}` }
  });
};