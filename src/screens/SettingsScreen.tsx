import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { Button, Screen, ThemeToggle } from "../components/common";

const SettingsScreen: React.FC = () => {
	const { logout } = useAuth();
	const { theme } = useTheme();

	return (
		<Screen style={styles.container}>
			<Text style={[styles.title, { color: theme.colors.text }]}>Settings</Text>

			<View style={styles.section}>
				<Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
					Appearance
				</Text>
				<ThemeToggle />
			</View>

			<View style={styles.section}>
				<Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
					Account
				</Text>
				<Button title="Logout" onPress={logout} variant="danger" fullWidth />
			</View>
		</Screen>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 20,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 30,
	},
	section: {
		marginBottom: 30,
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: "600",
		marginBottom: 15,
	},
});

export default SettingsScreen;
