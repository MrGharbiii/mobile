import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { Screen } from "../../components/common";

const MedicalHistoryScreen: React.FC = () => {
	const { theme } = useTheme();

	// Example data - replace with actual data from API
	const medicalData = {
		allergies: ["Pollen", "Dust mites"],
		medications: ["Ibuprofen"],
		surgeries: [
			{ name: "Appendectomy", year: 2015 },
			{ name: "Knee Arthroscopy", year: 2020 },
		],
	};

	return (
		<Screen style={styles.container}>
			<Text style={[styles.title, { color: theme.colors.text }]}>
				Medical History
			</Text>

			<View style={[styles.card, { backgroundColor: theme.colors.card }]}>
				<Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
					Allergies
				</Text>
				{medicalData.allergies.map((allergy, index) => (
					<Text key={index} style={[styles.item, { color: theme.colors.text }]}>
						• {allergy}
					</Text>
				))}
			</View>

			<View style={[styles.card, { backgroundColor: theme.colors.card }]}>
				<Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
					Medications
				</Text>
				{medicalData.medications.map((med, index) => (
					<Text key={index} style={[styles.item, { color: theme.colors.text }]}>
						• {med}
					</Text>
				))}
			</View>

			<View style={[styles.card, { backgroundColor: theme.colors.card }]}>
				<Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
					Surgeries
				</Text>
				{medicalData.surgeries.map((surgery, index) => (
					<View key={index} style={styles.surgeryItem}>
						<Text style={[styles.item, { color: theme.colors.text }]}>
							• {surgery.name}
						</Text>
						<Text style={[styles.year, { color: theme.colors.textSecondary }]}>
							({surgery.year})
						</Text>
					</View>
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
	sectionTitle: {
		fontSize: 16,
		fontWeight: "600",
		marginBottom: 12,
	},
	item: {
		fontSize: 16,
		marginBottom: 8,
	},
	surgeryItem: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 8,
	},
	year: {
		fontSize: 14,
	},
});

export default MedicalHistoryScreen;
