import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { getMeasurements } from "../../api/health";
import StatsCard from "../../components/health/StatsCard";
import BMICalculator from "../../components/health/BMICalculator";
import { MesuresDto } from "../../types/health";

const DashboardScreen: React.FC = () => {
	const { theme } = useTheme();
	const [measurements, setMeasurements] = useState<MesuresDto | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const loadData = async () => {
			try {
				const response = await getMeasurements();
				setMeasurements(response.data);
				setError(null);
			} catch (error) {
				console.error("Error loading measurements:", error);
				setError("Failed to load measurements. Please try again.");
			} finally {
				setLoading(false);
			}
		};
		loadData();
	}, []);

	if (loading) {
		return (
			<View
				style={[styles.container, { backgroundColor: theme.colors.background }]}
			>
				<Text style={{ color: theme.colors.text }}>Loading...</Text>
			</View>
		);
	}

	if (error) {
		return (
			<View
				style={[styles.container, { backgroundColor: theme.colors.background }]}
			>
				<Text style={[styles.error, { color: theme.colors.notification }]}>{error}</Text>
			</View>
		);
	}

	if (!measurements) {
		return (
			<View
				style={[styles.container, { backgroundColor: theme.colors.background }]}
			>
				<Text style={{ color: theme.colors.text }}>No measurements found</Text>
			</View>
		);
	}

	return (
		<ScrollView
			style={[styles.container, { backgroundColor: theme.colors.background }]}
		>
			<Text style={[styles.title, { color: theme.colors.text }]}>
				Dashboard
			</Text>

			<StatsCard
				currentWeight={measurements.currentWeight}
				targetWeight={measurements.targetWeight}
				height={measurements.height}
			/>

			<BMICalculator
				weight={measurements.currentWeight}
				height={measurements.height}
			/>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 20,
	},
	error: {
		fontSize: 16,
		textAlign: "center",
		marginTop: 20,
	},
});

export default DashboardScreen;
