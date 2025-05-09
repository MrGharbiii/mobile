import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { useTheme } from "../../context/ThemeContext";

interface StatsCardProps {
	currentWeight: number;
	targetWeight: number;
	height: number;
}

const StatsCard: React.FC<StatsCardProps> = ({
	currentWeight,
	targetWeight,
	height,
}) => {
	const { theme } = useTheme();
	const weightDifference = currentWeight - targetWeight;
	const progressPercentage = (currentWeight / targetWeight) * 100;

	return (
		<View style={[styles.container, { backgroundColor: theme.colors.card }]}>
			<Text style={[styles.title, { color: theme.colors.text }]}>
				Health Stats
			</Text>

			<View style={styles.statsRow}>
				<View style={styles.statItem}>
					<Text style={[styles.statLabel, { color: theme.colors.text }]}>
						Current Weight
					</Text>
					<Text style={[styles.statValue, { color: theme.colors.primary }]}>
						{currentWeight} kg
					</Text>
				</View>

				<View style={styles.statItem}>
					<Text style={[styles.statLabel, { color: theme.colors.text }]}>
						Target Weight
					</Text>
					<Text style={[styles.statValue, { color: theme.colors.primary }]}>
						{targetWeight} kg
					</Text>
				</View>
			</View>

			<View style={styles.statsRow}>
				<View style={styles.statItem}>
					<Text style={[styles.statLabel, { color: theme.colors.text }]}>
						Height
					</Text>
					<Text style={[styles.statValue, { color: theme.colors.primary }]}>
						{height} cm
					</Text>
				</View>

				<View style={styles.statItem}>
					<Text style={[styles.statLabel, { color: theme.colors.text }]}>
						Difference
					</Text>
					<Text
						style={[
							styles.statValue,
							{
								color: weightDifference > 0 ? "#FF5252" : "#4CAF50",
							},
						]}
					>
						{Math.abs(weightDifference)} kg{" "}
						{weightDifference > 0 ? "above" : "below"}
					</Text>
				</View>
			</View>

			<View style={styles.progressContainer}>
				<Text style={[styles.progressLabel, { color: theme.colors.text }]}>
					Progress: {progressPercentage.toFixed(1)}%
				</Text>
				<View
					style={[styles.progressBar, { backgroundColor: theme.colors.border }]}
				>
					<View
						style={[
							styles.progressFill,
							{
								width: `${Math.min(100, progressPercentage)}%`,
								backgroundColor:
									progressPercentage >= 100 ? "#4CAF50" : theme.colors.primary,
							},
						]}
					/>
				</View>
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
		marginBottom: 16,
	},
	statsRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 16,
	},
	statItem: {
		flex: 1,
	},
	statLabel: {
		fontSize: 14,
		color: "#666",
		marginBottom: 4,
	},
	statValue: {
		fontSize: 16,
		fontWeight: "bold",
	},
	progressContainer: {
		marginTop: 8,
	},
	progressLabel: {
		fontSize: 14,
		marginBottom: 4,
	},
	progressBar: {
		height: 8,
		borderRadius: 4,
		overflow: "hidden",
	},
	progressFill: {
		height: "100%",
		borderRadius: 4,
	},
});

export default StatsCard;
