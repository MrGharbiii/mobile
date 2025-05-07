import apiClient from './apiClient';

export const getMeasurements = () => {
  return apiClient.get('/mesures');
};

export const saveMeasurements = (data: any) => {
  return apiClient.post('/mesures', data);
};

export const updateMeasurements = (data: any) => {
  return apiClient.patch('/mesures', data);
};