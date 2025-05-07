import React from "react";
import {
	TouchableOpacity,
	Text,
	ActivityIndicator,
	StyleSheet,
} from "react-native";
import { useTheme } from "../../context/ThemeContext";

interface ButtonProps {
	title: string;
	onPress: () => void;
	loading?: boolean;
	style?: object;
}

const Button: React.FC<ButtonProps> = ({
	title,
	onPress,
	loading = false,
	style = {},
}) => {
	const { theme } = useTheme();

	return (
		<TouchableOpacity
			style={[styles.button, { backgroundColor: theme.colors.primary }, style]}
			onPress={onPress}
			disabled={loading}
		>
			{loading ? (
				<ActivityIndicator color="white" />
			) : (
				<Text style={styles.text}>{title}</Text>
			)}
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		padding: 15,
		borderRadius: 8,
		alignItems: "center",
		marginVertical: 10,
	},
	text: {
		color: "white",
		fontWeight: "bold",
		fontSize: 16,
	},
});

export default Button;
