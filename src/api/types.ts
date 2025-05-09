// Replicate all Java enums
export const Gender = {
    MALE: 'MALE',
    FEMALE: 'FEMALE'
  } as const;
  
  export const ActivityLevel = {
    SEDENTARY: 'SEDENTARY',
    LIGHT: 'LIGHT',
    MODERATE: 'MODERATE',
    ACTIVE: 'ACTIVE',
    EXTREME: 'EXTREME'
  } as const;
  
  export const AlcoholConsumption = {
    NEVER: 'NEVER',
    OCCASIONALLY: 'OCCASIONALLY',
    REGULARLY: 'REGULARLY'
  } as const;
  
  export const NatureOfWork = {
    SEDENTARY: 'SEDENTARY',
    PHYSICALLY_ACTIVE: 'PHYSICALLY_ACTIVE',
    SHIFT_BASED: 'SHIFT_BASED',
    FIELD_WORK: 'FIELD_WORK'
  } as const;
  
  export const NapDuration = {
    NONE: 'NONE',
    ONE_TO_TWO_HOURS: 'ONE_TO_TWO_HOURS',
    TWO_TO_FOUR_HOURS: 'TWO_TO_FOUR_HOURS',
    MORE_THAN_FOUR_HOURS: 'MORE_THAN_FOUR_HOURS'
  } as const;
  
  export const StressLevel = {
    LOW: 'LOW',
    MODERATE: 'MODERATE',
    HIGH: 'HIGH'
  } as const;
  
  export const WorkoutRoutine = {
    NONE: 'NONE',
    LIGHT: 'LIGHT',
    MODERATE: 'MODERATE',
    INTENSE: 'INTENSE'
  } as const;
  
  export const HealthGoal = {
    WEIGHT_LOSS: 'WEIGHT_LOSS',
    WEIGHT_GAIN: 'WEIGHT_GAIN',
    HEALTH_MAINTENANCE: 'HEALTH_MAINTENANCE'
  } as const;
  
  export const WorkoutPreference = {
    GYM: 'GYM',
    HOME_WORKOUTS: 'HOME_WORKOUTS',
    RUNNING: 'RUNNING',
    YOGA: 'YOGA',
    CYCLING: 'CYCLING',
    SWIMMING: 'SWIMMING',
    SPORTS: 'SPORTS'
  } as const;
  
  export const DietaryRestriction = {
    VEGAN: 'VEGAN',
    VEGETARIAN: 'VEGETARIAN',
    GLUTEN_FREE: 'GLUTEN_FREE',
    DAIRY_FREE: 'DAIRY_FREE',
    NUT_FREE: 'NUT_FREE',
    HALAL: 'HALAL',
    KOSHER: 'KOSHER'
  } as const;
  
  // Matches Surgery.java
  export interface Surgery {
    name: string;
    year: number;
  }
  
  // Response type for paginated endpoints
  export interface PaginatedResponse<T> {
    content: T[];
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    last: boolean;
  }