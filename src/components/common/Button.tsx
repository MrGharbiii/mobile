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
	variant?: "primary" | "secondary" | "danger";
	loading?: boolean;
	disabled?: boolean;
	fullWidth?: boolean;
	icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
	title,
	onPress,
	variant = "primary",
	loading = false,
	disabled = false,
	fullWidth = false,
	icon,
}) => {
	const { theme } = useTheme();

	const getVariantStyle = () => {
		switch (variant) {
			case "secondary":
				return {
					backgroundColor: theme.colors.card,
					borderColor: theme.colors.border,
					borderWidth: 1,
				};
			case "danger":
				return { backgroundColor: theme.colors.notification };
			default:
				return { backgroundColor: theme.colors.primary };
		}
	};

	return (
		<TouchableOpacity
			style={[
				styles.button,
				getVariantStyle(),
				fullWidth && styles.fullWidth,
				disabled && styles.disabled,
			]}
			onPress={onPress}
			disabled={disabled || loading}
			activeOpacity={0.8}
		>
			{loading ? (
				<ActivityIndicator color="white" />
			) : (
				<>
					{icon && <View style={styles.iconContainer}>{icon}</View>}
					<Text
						style={[
							styles.text,
							{ color: variant === "secondary" ? theme.colors.text : "white" },
						]}
					>
						{title}
					</Text>
				</>
			)}
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		paddingVertical: 12,
		paddingHorizontal: 24,
		borderRadius: 8,
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "row",
		minHeight: 50,
	},
	fullWidth: {
		width: "100%",
	},
	disabled: {
		opacity: 0.6,
	},
	text: {
		fontSize: 16,
		fontWeight: "600",
	},
	iconContainer: {
		marginRight: 8,
	},
});
