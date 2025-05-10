import apiClient from '../api/apiClient';
import { MesuresDto } from '../types/health';
import { AxiosError } from 'axios';

interface ErrorResponse {
  message: string;
}

export const saveMeasurements = async (data: MesuresDto): Promise<MesuresDto> => {
  try {
    const response = await apiClient.post<MesuresDto>('/mesures', data);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    throw new Error(axiosError.response?.data?.message || 'Failed to save measurements');
  }
};

export const updateMeasurements = async (data: Partial<MesuresDto>): Promise<MesuresDto> => {
  try {
    const response = await apiClient.patch<MesuresDto>('/mesures', data);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    throw new Error(axiosError.response?.data?.message || 'Failed to update measurements');
  }
};

export const getMeasurements = async (): Promise<MesuresDto> => {
  try {
    const response = await apiClient.get<MesuresDto>('/mesures');
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    throw new Error(axiosError.response?.data?.message || 'Failed to get measurements');
  }
};