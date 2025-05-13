import apiClient from './apiClient';
import type { AxiosResponse } from 'axios';
import type { MesuresDto } from '../types/health';

export const getMeasurements = (): Promise<AxiosResponse<MesuresDto>> => {
  return apiClient.get<MesuresDto>('/mesures', {
    headers: {
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache'
    }
  });
};

export const saveMeasurements = (data: MesuresDto): Promise<AxiosResponse<MesuresDto>> => {
  return apiClient.post<MesuresDto>('/mesures', data);
};

export const updateMeasurements = (data: Partial<MesuresDto>): Promise<AxiosResponse<MesuresDto>> => {
  return apiClient.patch<MesuresDto>('/mesures', data, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  });
};