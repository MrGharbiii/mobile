import { login, register } from '../api/auth';
import { storeToken, removeToken } from './storageService';

export const authenticate = async (email: string, password: string) => {
  const response = await login(email, password);
  await storeToken(response.data);
  return response.data;
};

export const registerUser = async (email: string, password: string) => {
  const response = await register(email, password);
  await storeToken(response.data);
  return response.data;
};

export const logoutUser = async () => {
  await removeToken();
};