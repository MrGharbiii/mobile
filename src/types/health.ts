// src/types/health.ts
import type {
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
  
  export interface BasicInfo {
    age: number;
    gender: typeof Gender[keyof typeof Gender];
    height: number;
    currentWeight: number;
    targetWeight: number;
}

export interface LifeStyleInfo {
    avgSleepHours: number;
    activityLevel: typeof ActivityLevel[keyof typeof ActivityLevel];
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
    smoker: boolean;
}

export interface GoalsPreferences {
    primaryHealthGoal: typeof HealthGoal[keyof typeof HealthGoal];
    workoutPreferences: Array<typeof WorkoutPreference[keyof typeof WorkoutPreference]>;
    dietaryRestrictions: Array<typeof DietaryRestriction[keyof typeof DietaryRestriction]>;
}

export interface MedicalHistory {
    allergies: string[];
    chronicConditions: string[];
    surgeries: Surgery[];
    medications: string[];
}

export interface MesuresDto {
    basicInfo: BasicInfo;
    lifeStyleInfo: LifeStyleInfo;
    goalsPreferences: GoalsPreferences;
    medicalHistory: MedicalHistory;
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