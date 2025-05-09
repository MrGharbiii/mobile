import React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import { useTheme } from "../../context/ThemeContext";

interface ScreenProps {
	children: React.ReactNode;
	safeArea?: boolean;
	style?: any;
}

export const Screen: React.FC<ScreenProps> = ({
	children,
	safeArea = true,
	style,
}) => {
	const { theme } = useTheme();

	const Container = safeArea ? SafeAreaView : View;

	return (
		<Container
			style={[
				styles.container,
				{ backgroundColor: theme.colors.background },
				style,
			]}
		>
			{children}
		</Container>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
	},
});
