// src/types/health.ts
import {
    ActivityLevel,
    AlcoholConsumption,
    DietaryRestriction,
    Gender,
    HealthGoal,
    NapDuration,
    NatureOfWork,
    StressLevel,
    WorkoutPreference,
    WorkoutRoutine
  } from "../constants/enumMappings";
  
  export interface MesuresDto {
    age: number;
    gender: typeof Gender[keyof typeof Gender];
    height: number;
    currentWeight: number;
    targetWeight: number;
    avgSleepHours: number;
    activityLevel: typeof ActivityLevel[keyof typeof ActivityLevel];
    isSmoker: boolean;
    alcoholConsumption: typeof AlcoholConsumption[keyof typeof AlcoholConsumption];
    foodPreferences: string[];
    natureOfWork: typeof NatureOfWork[keyof typeof NatureOfWork];
    usualWakeUpTime?: string;
    usualSleepTime?: string;
    napDuration?: typeof NapDuration[keyof typeof NapDuration];
    waterIntakeLiters: number;
    stressLevel: typeof StressLevel[keyof typeof StressLevel];
    workoutRoutine: typeof WorkoutRoutine[keyof typeof WorkoutRoutine];
    workoutAverageHours: number;
    dailyTimeAvailabilityHours: number;
    primaryHealthGoal: typeof HealthGoal[keyof typeof HealthGoal];
    workoutPreferences: Array<typeof WorkoutPreference[keyof typeof WorkoutPreference]>;
    dietaryRestrictions: Array<typeof DietaryRestriction[keyof typeof DietaryRestriction]>;
    allergies: string[];
    chronicConditions: string[];
    surgeries: Surgery[];
    medications: string[];
  }
  
  export interface Surgery {
    name: string;
    year: number;
  }
  
  export interface PaginatedResponse<T> {
    content: T[];
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    last: boolean;
  }