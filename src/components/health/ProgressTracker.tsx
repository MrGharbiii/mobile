import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { useTheme } from "../../context/ThemeContext";

interface ProgressTrackerProps {
	current: number;
	target: number;
	unit: string;
	label: string;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({
	current,
	target,
	unit,
	label,
}) => {
	const { theme } = useTheme();
	const percentage = Math.min(100, (current / target) * 100);

	return (
		<View style={[styles.container, { backgroundColor: theme.colors.card }]}>
			<Text style={[styles.title, { color: theme.colors.text }]}>{label}</Text>
			<View style={styles.progressContainer}>
				<View style={styles.progressLabels}>
					<Text style={[styles.progressText, { color: theme.colors.text }]}>
						{current} {unit}
					</Text>
					<Text style={[styles.progressText, { color: theme.colors.text }]}>
						{target} {unit}
					</Text>
				</View>
				<View
					style={[styles.progressBar, { backgroundColor: theme.colors.border }]}
				>
					<View
						style={[
							styles.progressFill,
							{
								width: `${percentage}%`,
								backgroundColor:
									percentage >= 100 ? "#4CAF50" : theme.colors.primary,
							},
						]}
					/>
				</View>
				<Text style={[styles.progressPercentage, { color: theme.colors.text }]}>
					{percentage.toFixed(1)}% of target
				</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 16,
		borderRadius: 8,
		marginVertical: 8,
		elevation: 2,
	},
	title: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 12,
	},
	progressContainer: {
		marginBottom: 8,
	},
	progressLabels: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 4,
	},
	progressText: {
		fontSize: 14,
	},
	progressBar: {
		height: 10,
		borderRadius: 5,
		overflow: "hidden",
	},
	progressFill: {
		height: "100%",
		borderRadius: 5,
	},
	progressPercentage: {
		marginTop: 4,
		fontSize: 12,
		textAlign: "right",
	},
});

export default ProgressTracker;
