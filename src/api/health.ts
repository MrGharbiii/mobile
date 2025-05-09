import apiClient from './apiClient';

// Exact replica of your MesuresDto
export interface MesuresData {
  age: number;
  gender: 'MALE' | 'FEMALE';
  height: number;
  currentWeight: number;
  targetWeight: number;
  avgSleepHours: number;
  activityLevel: 'SEDENTARY' | 'LIGHT' | 'MODERATE' | 'ACTIVE' | 'EXTREME';
  isSmoker: boolean;
  alcoholConsumption: 'NEVER' | 'OCCASIONALLY' | 'REGULARLY';
  foodPreferences: string[];
  natureOfWork: 'SEDENTARY' | 'PHYSICALLY_ACTIVE' | 'SHIFT_BASED' | 'FIELD_WORK';
  usualWakeUpTime?: string; // "HH:MM:SS"
  usualSleepTime?: string;  // "HH:MM:SS"
  napDuration?: 'NONE' | 'ONE_TO_TWO_HOURS' | 'TWO_TO_FOUR_HOURS' | 'MORE_THAN_FOUR_HOURS';
  waterIntakeLiters: number;
  stressLevel: 'LOW' | 'MODERATE' | 'HIGH';
  workoutRoutine: 'NONE' | 'LIGHT' | 'MODERATE' | 'INTENSE';
  workoutAverageHours: number;
  dailyTimeAvailabilityHours: number;
  primaryHealthGoal: 'WEIGHT_LOSS' | 'WEIGHT_GAIN' | 'HEALTH_MAINTENANCE';
  workoutPreferences: ('GYM' | 'HOME_WORKOUTS' | 'RUNNING' | 'YOGA' | 'CYCLING' | 'SWIMMING' | 'SPORTS')[];
  dietaryRestrictions: ('VEGAN' | 'VEGETARIAN' | 'GLUTEN_FREE' | 'DAIRY_FREE' | 'NUT_FREE' | 'HALAL' | 'KOSHER')[];
  allergies: string[];
  chronicConditions: string[];
  surgeries: {
    name: string;
    year: number;
  }[];
  medications: string[];
}

export const healthApi = {
  getMeasurements: () => apiClient.get<MesuresData>('/mesures'),
  saveMeasurements: (data: MesuresData) => apiClient.post<MesuresData>('/mesures', data),
  updateMeasurements: (data: Partial<MesuresData>) => apiClient.patch<MesuresData>('/mesures', data)
};