import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Text, Alert } from "react-native";
import { useForm } from "react-hook-form";
import { Button, Input, Screen } from "../../components/common";
import { Picker } from "@react-native-picker/picker";
import {
	saveMeasurements,
	getMeasurements,
} from "../../services/healthService";
import { MesuresDto } from "../../types/health";
import {
	ActivityLevel,
	AlcoholConsumption,
	DietaryRestriction,
	Gender,
	HealthGoal,
	NapDuration,
	NatureOfWork,
	StressLevel,
	WorkoutPreference,
	WorkoutRoutine,
} from "../../constants/enumMappings";

const MeasurementsFormScreen = () => {
	const {
		control,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<MesuresDto>();
	const [isLoading, setIsLoading] = useState(false);
	const [existingData, setExistingData] = useState<MesuresDto | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const loadData = async () => {
			try {
				const data = await getMeasurements();
				if (data) {
					setExistingData(data);
					// Set form values from existing data
					Object.entries(data).forEach(([key, value]) => {
						if (key in data) {
							setValue(key as keyof MesuresDto, value as MesuresDto[keyof MesuresDto]);
						}
					});
				}
				setError(null);
			} catch (error) {
				console.error("Error loading measurements:", error);
				setError("Failed to load measurements. Please try again.");
			}
		};
		loadData();
	}, []);

	const onSubmit = async (data: MesuresDto) => {
		setIsLoading(true);
		setError(null);
		try {
			await saveMeasurements(data);
			Alert.alert("Success", "Measurements saved successfully!");
		} catch (error) {
			console.error("Error saving measurements:", error);
			setError("Failed to save measurements. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Screen>
			<ScrollView contentContainerStyle={styles.container}>
				{error && <Text style={styles.error}>{error}</Text>}
				
				<Text style={styles.sectionTitle}>Basic Information</Text>

				<Input
					control={control}
					name="age"
					label="Age"
					keyboardType="numeric"
					rules={{
						required: "Age is required",
						min: { value: 12, message: "Minimum age is 12" },
						max: { value: 120, message: "Maximum age is 120" },
					}}
					error={errors.age}
				/>

				<View style={styles.pickerContainer}>
					<Text style={styles.label}>Gender</Text>
					<Picker
						selectedValue={existingData?.gender}
						onValueChange={(value: string) => setValue("gender", value as "MALE" | "FEMALE")}
						style={styles.picker}
					>
						{Object.entries(Gender).map(([key, value]) => (
							<Picker.Item key={key} label={value} value={key} />
						))}
					</Picker>
				</View>

				<Input
					control={control}
					name="height"
					label="Height (cm)"
					keyboardType="numeric"
					rules={{
						required: "Height is required",
						min: { value: 100, message: "Minimum height is 100cm" },
					}}
					error={errors.height}
				/>

				<Input
					control={control}
					name="currentWeight"
					label="Current Weight (kg)"
					keyboardType="numeric"
					rules={{
						required: "Current weight is required",
						min: { value: 30, message: "Minimum weight is 30kg" },
					}}
					error={errors.currentWeight}
				/>

				<Input
					control={control}
					name="targetWeight"
					label="Target Weight (kg)"
					keyboardType="numeric"
					rules={{
						required: "Target weight is required",
						min: { value: 30, message: "Minimum weight is 30kg" },
					}}
					error={errors.targetWeight}
				/>

				<Text style={styles.sectionTitle}>Lifestyle Information</Text>

				{/* Add more form fields for lifestyle, goals, and medical history */}

				<View style={styles.submitButton}>
					<Button
						title={existingData ? "Update Measurements" : "Save Measurements"}
						onPress={handleSubmit(onSubmit)}
						loading={isLoading}
					/>
				</View>
			</ScrollView>
		</Screen>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 20,
		paddingBottom: 40,
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: "bold",
		marginTop: 20,
		marginBottom: 10,
	},
	pickerContainer: {
		marginBottom: 15,
	},
	label: {
		marginBottom: 5,
		fontSize: 16,
	},
	picker: {
		backgroundColor: "#f5f5f5",
		borderRadius: 5,
	},
	submitButton: {
		marginTop: 30,
	},
	error: {
		color: "red",
		marginBottom: 10,
		textAlign: "center",
	},
});

export default MeasurementsFormScreen;
