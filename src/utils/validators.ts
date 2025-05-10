// src/utils/validators.ts
import { MesuresDto } from '../types/health';

export const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };
  
  export const validatePassword = (password: string) => {
    return password.length >= 8;
  };
  
  export const validateMeasurements = (data: MesuresDto) => {
    const errors: Record<string, string> = {};
  
    if (!data.age || data.age < 12 || data.age > 120) {
      errors.age = 'Age must be between 12 and 120';
    }
  
    if (!data.height || data.height < 100) {
      errors.height = 'Height must be at least 100cm';
    }
  
    if (!data.currentWeight || data.currentWeight < 30) {
      errors.currentWeight = 'Weight must be at least 30kg';
    }
  
    if (!data.targetWeight || data.targetWeight < 30) {
      errors.targetWeight = 'Target weight must be at least 30kg';
    }
  
    if (data.currentWeight < data.targetWeight && data.primaryHealthGoal === 'WEIGHT_LOSS') {
      errors.targetWeight = 'Target weight should be lower than current weight for weight loss';
    }
  
    return Object.keys(errors).length > 0 ? errors : null;
  };
  
  export const validateConfirmPassword = (password: string, confirmPassword: string) => {
    return password === confirmPassword;
  };
  
  export const formatValidationError = (field: string) => {
    const messages: Record<string, string> = {
      email: 'Invalid email address',
      password: 'Password must be at least 8 characters',
      confirmPassword: 'Passwords do not match',
      age: 'Invalid age (12-120)',
      height: 'Invalid height (≥100cm)',
      currentWeight: 'Invalid weight (≥30kg)',
      targetWeight: 'Invalid target weight (≥30kg)'
    };
  
    return messages[field] || 'Invalid value';
  };