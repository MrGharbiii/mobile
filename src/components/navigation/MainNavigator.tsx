// src/components/navigation/MainNavigator.tsx
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";
import DashboardScreen from "../../screens/health/DashboardScreen";
import MeasurementsFormScreen from "../../screens/health/MeasurementsFormScreen";
import LifestyleScreen from "../../screens/health/LifestyleScreen";
import GoalsScreen from "../../screens/health/GoalsScreen";
import MedicalHistoryScreen from "../../screens/health/MedicalHistoryScreen";
import SettingsScreen from "../../screens/SettingsScreen";

const Tab = createBottomTabNavigator();

const iconMap: Record<string, string> = {
	Dashboard: "home",
	Measurements: "body",
	Lifestyle: "walk",
	Goals: "ribbon",
	MedicalHistory: "medkit",
	Settings: "settings",
};

const MainNavigator: React.FC = () => {
	const { theme } = useTheme();

	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color, size }) => {
					const iconName = `${iconMap[route.name]}${focused ? "" : "-outline"}`;
					return <Ionicons name={iconName} size={size} color={color} />;
				},
				tabBarActiveTintColor: theme.colors.primary,
				tabBarInactiveTintColor: theme.colors.textSecondary,
				tabBarStyle: {
					backgroundColor: theme.colors.background,
					borderTopColor: theme.colors.border,
				},
				headerStyle: {
					backgroundColor: theme.colors.background,
				},
				headerTintColor: theme.colors.text,
			})}
		>
			<Tab.Screen name="Dashboard" component={DashboardScreen} />
			<Tab.Screen name="Measurements" component={MeasurementsFormScreen} />
			<Tab.Screen name="Lifestyle" component={LifestyleScreen} />
			<Tab.Screen name="Goals" component={GoalsScreen} />
			<Tab.Screen name="MedicalHistory" component={MedicalHistoryScreen} />
			<Tab.Screen name="Settings" component={SettingsScreen} />
		</Tab.Navigator>
	);
};

export default MainNavigator;
