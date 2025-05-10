import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AuthNavigator from "./AuthNavigator";
import MainNavigator from "./MainNavigator";
import { useAuth } from "../../context/AuthContext";
import { Loading } from "../common/Loading";

const Stack = createStackNavigator();

const RootNavigator: React.FC = () => {
	const { token, isLoading } = useAuth();

	if (isLoading) {
		return <Loading />;
	}

	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{ headerShown: false }}>
				{token ? (
					<Stack.Screen name="Main" component={MainNavigator} />
				) : (
					<Stack.Screen name="Auth" component={AuthNavigator} />
				)}
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default RootNavigator;
