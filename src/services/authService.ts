import { login, register } from '../api/auth';
import { storeToken, removeToken } from './storageService';
import { AxiosError } from 'axios';

interface ErrorResponse {
  message: string;
}

export const authenticate = async (email: string, password: string): Promise<string> => {
  try {
    const response = await login({ email, password });
    await storeToken(response.data.token);
    return response.data.token;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    throw new Error(axiosError.response?.data?.message || 'Authentication failed');
  }
};

export const registerUser = async (email: string, password: string): Promise<string> => {
  try {
    const response = await register({ email, password });
    if (!response.data?.token) {
      throw new Error('Registration succeeded but no token received');
    }
    await storeToken(response.data.token);
    return response.data.token;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    throw new Error(axiosError.response?.data?.message || 'Registration failed');
  }
};

export const logoutUser = async (): Promise<void> => {
  try {
    await removeToken();
  } catch (error) {
    throw new Error('Failed to logout');
  }
};