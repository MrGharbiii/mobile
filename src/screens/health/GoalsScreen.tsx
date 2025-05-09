import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { Screen } from "../../components/common";
import {
	HealthGoal,
	WorkoutPreference,
	DietaryRestriction,
} from "../../constants/enumMappings";

const GoalsScreen: React.FC = () => {
	const { theme } = useTheme();

	// Example data - replace with actual data from API
	const goalsData = {
		primaryGoal: HealthGoal.WEIGHT_LOSS,
		workoutPreferences: [WorkoutPreference.GYM, WorkoutPreference.YOGA],
		dietaryRestrictions: [DietaryRestriction.GLUTEN_FREE],
	};

	return (
		<Screen style={styles.container}>
			<Text style={[styles.title, { color: theme.colors.text }]}>
				Health Goals
			</Text>

			<View style={[styles.card, { backgroundColor: theme.colors.card }]}>
				<Text style={[styles.label, { color: theme.colors.text }]}>
					Primary Goal
				</Text>
				<Text style={[styles.value, { color: theme.colors.primary }]}>
					{HealthGoal[goalsData.primaryGoal]}
				</Text>
			</View>

			<View style={[styles.card, { backgroundColor: theme.colors.card }]}>
				<Text style={[styles.label, { color: theme.colors.text }]}>
					Workout Preferences
				</Text>
				{goalsData.workoutPreferences.map((pref, index) => (
					<Text
						key={index}
						style={[styles.value, { color: theme.colors.text }]}
					>
						• {WorkoutPreference[pref]}
					</Text>
				))}
			</View>

			<View style={[styles.card, { backgroundColor: theme.colors.card }]}>
				<Text style={[styles.label, { color: theme.colors.text }]}>
					Dietary Restrictions
				</Text>
				{goalsData.dietaryRestrictions.map((restriction, index) => (
					<Text
						key={index}
						style={[styles.value, { color: theme.colors.text }]}
					>
						• {DietaryRestriction[restriction]}
					</Text>
				))}
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
		marginBottom: 20,
	},
	card: {
		padding: 16,
		borderRadius: 8,
		marginBottom: 16,
	},
	label: {
		fontSize: 16,
		marginBottom: 8,
	},
	value: {
		fontSize: 16,
	},
});

export default GoalsScreen;
