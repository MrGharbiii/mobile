// src/types/auth.ts
export interface AuthResponse {
    token: string;
  }
  
  export interface UserCredentials {
    email: string;
    password: string;
  }
  
  export interface AuthContextType {
    token: string | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
  }