export interface LoginData {
    email: string;
    password: string;
  }
  
  export interface RegisterData {
    email: string;
    password: string;
  }
  
  export interface MeasurementsData {
    age: number;
    gender: string;
    height: number;
    currentWeight: number;
    targetWeight: number;
    // Add all other fields from your backend DTO
  }