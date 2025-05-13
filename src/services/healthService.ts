// src/services/healthService.ts
import type { MesuresDto } from '../types/health';
import type { AxiosError } from 'axios';
import * as healthApi from '../api/health';

interface ErrorResponse {
  message: string;
}

export const getMeasurements = async (): Promise<MesuresDto | null> => {
  try {
    const response = await healthApi.getMeasurements();
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    if (axiosError.response?.status === 404) {
      // No measurements found for user - return null to trigger initial form
      return null;
    }
    console.error('Error getting measurements:', axiosError.response?.data);
    throw new Error(axiosError.response?.data?.message || 'Failed to get measurements');
  }
};

export const updateMeasurements = async (data: Partial<MesuresDto>): Promise<MesuresDto> => {
  try {
    const response = await healthApi.updateMeasurements(data);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;    console.error('Error updating measurements:', axiosError.response?.data);if (axiosError.response?.status === 401 || axiosError.response?.status === 403) {
      const error = new Error(
        axiosError.response?.status === 401
          ? 'Please log in again to update your measurements'
          : 'You do not have permission to update measurements'
      );
      error.name = 'AuthError';
      throw error;
    }
    if (axiosError.response?.status === 400) {
      throw new Error(axiosError.response.data?.message || 'Invalid measurement values provided');
    }
    throw new Error(axiosError.response?.data?.message || `Failed to update measurements: ${axiosError.message}`);
  }
};