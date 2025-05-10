// src/types/navigation.ts
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  Login: undefined;
  Register: undefined;
  Dashboard: undefined;
  Measurements: { id?: string };
  Lifestyle: undefined;
  Goals: undefined;
  MedicalHistory: undefined;
  Settings: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type MainTabParamList = {
  Dashboard: undefined;
  Measurements: { id?: string };
  Lifestyle: undefined;
  Goals: undefined;
  MedicalHistory: undefined;
  Settings: undefined;
};

export type RootNavigationProp = NativeStackNavigationProp<RootStackParamList>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type ThemeType = {
  dark: boolean;
  colors: {
    primary: string;
    background: string;
    card: string;
    text: string;
    border: string;
    notification: string;
    textSecondary: string;
  };
};