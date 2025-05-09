import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { Screen } from "../../components/common";
import {
	ActivityLevel,
	AlcoholConsumption,
	StressLevel,
	WorkoutRoutine,
} from "../../constants/enumMappings";

const LifestyleScreen: React.FC = () => {
	const { theme } = useTheme();

	// Example data - replace with actual data from API
	const lifestyleData = {
		activityLevel: ActivityLevel.MODERATE,
		alcoholConsumption: AlcoholConsumption.OCCASIONALLY,
		stressLevel: StressLevel.MODERATE,
		workoutRoutine: WorkoutRoutine.MODERATE,
		avgSleepHours: 7.5,
	};

	return (
		<Screen style={styles.container}>
			<Text style={[styles.title, { color: theme.colors.text }]}>
				Lifestyle
			</Text>

			<View style={[styles.card, { backgroundColor: theme.colors.card }]}>
				<Text style={[styles.label, { color: theme.colors.text }]}>
					Activity Level
				</Text>
				<Text style={[styles.value, { color: theme.colors.primary }]}>
					{ActivityLevel[lifestyleData.activityLevel]}
				</Text>
			</View>

			<View style={[styles.card, { backgroundColor: theme.colors.card }]}>
				<Text style={[styles.label, { color: theme.colors.text }]}>
					Alcohol Consumption
				</Text>
				<Text style={[styles.value, { color: theme.colors.primary }]}>
					{AlcoholConsumption[lifestyleData.alcoholConsumption]}
				</Text>
			</View>

			<View style={[styles.card, { backgroundColor: theme.colors.card }]}>
				<Text style={[styles.label, { color: theme.colors.text }]}>
					Stress Level
				</Text>
				<Text style={[styles.value, { color: theme.colors.primary }]}>
					{StressLevel[lifestyleData.stressLevel]}
				</Text>
			</View>

			<View style={[styles.card, { backgroundColor: theme.colors.card }]}>
				<Text style={[styles.label, { color: theme.colors.text }]}>
					Average Sleep
				</Text>
				<Text style={[styles.value, { color: theme.colors.primary }]}>
					{lifestyleData.avgSleepHours} hours/night
				</Text>
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

export default LifestyleScreen;
