import React from "react";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "./src/context/ThemeContext";
import { AuthProvider } from "./src/context/AuthContext";
import RootNavigator from "./src/components/navigation/RootNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
	return (
		<SafeAreaProvider>
			<ThemeProvider>
				<AuthProvider>
					<StatusBar style="auto" />
					<RootNavigator />
				</AuthProvider>
			</ThemeProvider>
		</SafeAreaProvider>
	);
}
