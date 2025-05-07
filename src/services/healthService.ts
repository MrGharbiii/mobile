import apiClient from '../api/apiClient';
import { MesuresDto } from '../types/health';

export const saveMeasurements = async (data: MesuresDto) => {
  try {
    const response = await apiClient.post('/mesures', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateMeasurements = async (data: MesuresDto) => {
  try {
    const response = await apiClient.patch('/mesures', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getMeasurements = async () => {
  try {
    const response = await apiClient.get('/mesures');
    return response.data;
  } catch (error) {
    throw error;
  }
};