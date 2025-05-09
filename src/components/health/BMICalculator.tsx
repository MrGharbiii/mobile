import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { useTheme } from "../../context/ThemeContext";

interface BMICalculatorProps {
	weight: number;
	height: number;
}

const BMICalculator: React.FC<BMICalculatorProps> = ({ weight, height }) => {
	const { theme } = useTheme();
	const heightInMeters = height / 100;
	const bmi = weight / (heightInMeters * heightInMeters);

	const getBMICategory = () => {
		if (bmi < 18.5) return "Underweight";
		if (bmi >= 18.5 && bmi < 25) return "Normal weight";
		if (bmi >= 25 && bmi < 30) return "Overweight";
		return "Obese";
	};

	return (
		<View style={[styles.container, { backgroundColor: theme.colors.card }]}>
			<Text style={[styles.title, { color: theme.colors.text }]}>
				BMI Calculator
			</Text>
			<View style={styles.row}>
				<Text style={[styles.label, { color: theme.colors.text }]}>
					Your BMI:
				</Text>
				<Text style={[styles.value, { color: theme.colors.primary }]}>
					{bmi.toFixed(1)}
				</Text>
			</View>
			<View style={styles.row}>
				<Text style={[styles.label, { color: theme.colors.text }]}>
					Category:
				</Text>
				<Text style={[styles.value, { color: theme.colors.primary }]}>
					{getBMICategory()}
				</Text>
			</View>
			<View style={styles.scaleContainer}>
				{["Underweight", "Normal", "Overweight", "Obese"].map((item) => (
					<View key={item} style={styles.scaleItem}>
						<View
							style={[
								styles.scaleIndicator,
								{
									backgroundColor:
										item === getBMICategory()
											? theme.colors.primary
											: theme.colors.border,
									width: `${item === "Underweight" ? 20 : item === "Normal" ? 30 : item === "Overweight" ? 25 : 25}%`,
								},
							]}
						/>
						<Text style={[styles.scaleText, { color: theme.colors.text }]}>
							{item}
						</Text>
					</View>
				))}
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
	row: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 8,
	},
	label: {
		fontSize: 16,
	},
	value: {
		fontSize: 16,
		fontWeight: "bold",
	},
	scaleContainer: {
		marginTop: 16,
	},
	scaleItem: {
		marginBottom: 8,
	},
	scaleIndicator: {
		height: 8,
		borderRadius: 4,
		marginBottom: 4,
	},
	scaleText: {
		fontSize: 12,
	},
});

export default BMICalculator;
