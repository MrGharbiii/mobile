import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { useTheme } from "../../context/ThemeContext";

interface ScreenProps {
	children: React.ReactNode;
	style?: ViewStyle;
}

export const Screen: React.FC<ScreenProps> = ({ children, style }) => {
	const { theme } = useTheme();

	return (
		<View style={[styles.container, { backgroundColor: theme.colors.background }, style]}>
			{children}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
