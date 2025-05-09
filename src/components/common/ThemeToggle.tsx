import React from "react";
import { Switch, View, StyleSheet } from "react-native";
import { useTheme } from "../../context/ThemeContext";

export const ThemeToggle: React.FC = () => {
	const { theme, toggleTheme, isDark } = useTheme();

	return (
		<View style={styles.container}>
			<Switch
				value={isDark}
				onValueChange={toggleTheme}
				trackColor={{
					false: theme.colors.border,
					true: theme.colors.primary,
				}}
				thumbColor={theme.colors.card}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 8,
	},
});
