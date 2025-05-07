import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import DashboardScreen from "../../screens/health/DashboardScreen";
import MeasurementsFormScreen from "../../screens/health/MeasurementsFormScreen";
import { useTheme } from "../../context/ThemeContext";

const Tab = createBottomTabNavigator();

const MainNavigator: React.FC = () => {
	const { theme } = useTheme();

	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color, size }) => {
					let iconName;

					if (route.name === "Dashboard") {
						iconName = focused ? "home" : "home-outline";
					} else if (route.name === "Measurements") {
						iconName = focused ? "body" : "body-outline";
					}

					return <Ionicons name={iconName} size={size} color={color} />;
				},
				tabBarActiveTintColor: theme.colors.primary,
				tabBarInactiveTintColor: theme.colors.textSecondary,
				tabBarStyle: {
					backgroundColor: theme.colors.background,
				},
			})}
		>
			<Tab.Screen name="Dashboard" component={DashboardScreen} />
			<Tab.Screen name="Measurements" component={MeasurementsFormScreen} />
		</Tab.Navigator>
	);
};

export default MainNavigator;
