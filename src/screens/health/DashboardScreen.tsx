// src/screens/health/DashboardScreen.tsx
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { getMeasurements } from "../../services/healthService";
import StatsCard from "../../components/health/StatsCard";
import BMICalculator from "../../components/health/BMICalculator";

const DashboardScreen: React.FC = () => {
	const { theme } = useTheme();
	interface Measurements {
		basicInfo: {
			currentWeight: number;
			targetWeight: number;
			height: number;
		};
	}

	const [measurements, setMeasurements] = useState<Measurements | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const loadMeasurements = React.useCallback(async () => {
		try {
			setLoading(true);
			const data = await getMeasurements();
			setMeasurements(data);
			setError(null);
		} catch (error) {
			console.error("Error loading measurements:", error);
			setError("Failed to load measurements. Please try again.");
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		const fetchMeasurements = async () => {
			await loadMeasurements();
		};
		fetchMeasurements();
	}, [loadMeasurements]);

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
				<Text style={[styles.error, { color: theme.colors.notification }]}>
					{error}
				</Text>
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
			<View style={styles.header}>
				<Text style={[styles.title, { color: theme.colors.text }]}>
					Dashboard
				</Text>
			</View>

			<StatsCard
				currentWeight={measurements.basicInfo.currentWeight}
				targetWeight={measurements.basicInfo.targetWeight}
				height={measurements.basicInfo.height}
			/>

			<BMICalculator
				weight={measurements.basicInfo.currentWeight}
				height={measurements.basicInfo.height}
			/>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 20,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
	},
	error: {
		fontSize: 16,
		textAlign: "center",
		marginTop: 20,
	},
});

export default DashboardScreen;
