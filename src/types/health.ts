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
    gender: Gender;
    height: number;
    currentWeight: number;
    targetWeight: number;
    avgSleepHours: number;
    activityLevel: ActivityLevel;
    isSmoker: boolean;
    alcoholConsumption: AlcoholConsumption;
    foodPreferences: string[];
    natureOfWork: NatureOfWork;
    usualWakeUpTime?: string;
    usualSleepTime?: string;
    napDuration?: NapDuration;
    waterIntakeLiters: number;
    stressLevel: StressLevel;
    workoutRoutine: WorkoutRoutine;
    workoutAverageHours: number;
    dailyTimeAvailabilityHours: number;
    primaryHealthGoal: HealthGoal;
    workoutPreferences: WorkoutPreference[];
    dietaryRestrictions: DietaryRestriction[];
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