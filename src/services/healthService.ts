import apiClient from '../api/apiClient';
import { MesuresDto } from '../types/health';
import { AxiosError } from 'axios';

interface ErrorResponse {
  message: string;
}



export const saveMeasurements = async (data: any): Promise<MesuresDto> => {
  try {
    // Transform the data structure to match backend expectations
    const payload = {
      basicInfo: {
        age: Number(data.basicInfo.age),
        gender: data.basicInfo.gender,
        height: Number(data.basicInfo.height),
        currentWeight: Number(data.basicInfo.currentWeight),
        targetWeight: Number(data.basicInfo.targetWeight),
      },
      lifeStyleInfo: {
        activityLevel: data.lifeStyleInfo.activityLevel,
        alcoholConsumption: data.lifeStyleInfo.alcoholConsumption,
        avgSleepHours: Number(data.lifeStyleInfo.avgSleepHours),
        stressLevel: data.lifeStyleInfo.stressLevel,
        workoutRoutine: data.lifeStyleInfo.workoutRoutine,
      },
      goalsPreferences: {
        primaryHealthGoal: data.goalsPreferences.primaryHealthGoal,
      },
      medicalHistory: {
        allergies: [],
        chronicConditions: [],
        surgeries: [],
        medications: []
      }
    };

    console.log("Payload being sent:", payload);

    // Convert string numbers to actual numbers
    payload.basicInfo.age = Number(payload.basicInfo.age);
    payload.basicInfo.height = Number(payload.basicInfo.height);
    payload.basicInfo.currentWeight = Number(payload.basicInfo.currentWeight);
    payload.basicInfo.targetWeight = Number(payload.basicInfo.targetWeight);
    payload.lifeStyleInfo.avgSleepHours = Number(payload.lifeStyleInfo.avgSleepHours);

    const response = await apiClient.post<MesuresDto>('/mesures', payload);
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