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

const iconMap: Record<string, { active: keyof typeof Ionicons.glyphMap; inactive: keyof typeof Ionicons.glyphMap }> = {
	Dashboard: { active: "home", inactive: "home-outline" },
	Measurements: { active: "body", inactive: "body-outline" },
	Lifestyle: { active: "walk", inactive: "walk-outline" },
	Goals: { active: "trophy", inactive: "trophy-outline" },
	MedicalHistory: { active: "medkit", inactive: "medkit-outline" },
	Settings: { active: "settings", inactive: "settings-outline" },
};

const MainNavigator: React.FC = () => {
	const { theme } = useTheme();

	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color, size }) => {
					const iconName = focused ? iconMap[route.name].active : iconMap[route.name].inactive;
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
