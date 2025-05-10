import apiClient from './apiClient';
import { AxiosResponse } from 'axios';
import { MesuresDto } from '../types/health';

export const getMeasurements = (): Promise<AxiosResponse<MesuresDto>> => {
  return apiClient.get<MesuresDto>('/mesures');
};

export const saveMeasurements = (data: MesuresDto): Promise<AxiosResponse<MesuresDto>> => {
  return apiClient.post<MesuresDto>('/mesures', data);
};

export const updateMeasurements = (data: Partial<MesuresDto>): Promise<AxiosResponse<MesuresDto>> => {
  return apiClient.patch<MesuresDto>('/mesures', data);
};