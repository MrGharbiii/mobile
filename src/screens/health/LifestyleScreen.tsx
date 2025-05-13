import type React from "react";
import { useState, useEffect, useCallback } from "react";
import {
	View,
	StyleSheet,
	Text,
	ScrollView,
	Switch,
	TextInput,
	Alert,
	TouchableOpacity,
} from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import { Screen, Button, Input } from "../../components/common";
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
import {
	getMeasurements,
	updateMeasurements,
} from "../../services/healthService";
import { validateToken } from "../../api/auth";
import { Picker } from "@react-native-picker/picker";
import { useForm, Controller } from "react-hook-form";
import DateTimePicker from "@react-native-community/datetimepicker";
import type {
	BasicInfo,
	LifeStyleInfo,
	GoalsPreferences,
	MedicalHistory,
	MesuresDto,
	Surgery,
} from "../../types/health";

const LifestyleScreen: React.FC = () => {
	const { theme } = useTheme();
	const { token, logout } = useAuth();
	const [loading, setLoading] = useState(false);
	const [inputText, setInputText] = useState("");
	const { control, handleSubmit, setValue, watch } = useForm<MesuresDto>({
		defaultValues: {
			basicInfo: {
				age: 25,
				gender: Gender.MALE,
				height: 170,
				currentWeight: 70,
				targetWeight: 65,
			},
			lifeStyleInfo: {
				avgSleepHours: 7,
				activityLevel: ActivityLevel.MODERATE,
				alcoholConsumption: AlcoholConsumption.OCCASIONALLY,
				foodPreferences: [],
				natureOfWork: NatureOfWork.SEDENTARY,
				usualWakeUpTime: "07:00",
				usualSleepTime: "23:00",
				napDuration: NapDuration.NONE,
				waterIntakeLiters: 2,
				stressLevel: StressLevel.LOW,
				workoutRoutine: WorkoutRoutine.MODERATE,
				workoutAverageHours: 1,
				dailyTimeAvailabilityHours: 2,
				smoker: false,
			},
			goalsPreferences: {
				primaryHealthGoal: HealthGoal.HEALTH_MAINTENANCE,
				workoutPreferences: [],
				dietaryRestrictions: [],
			},
			medicalHistory: {
				allergies: [],
				chronicConditions: [],
				surgeries: [],
				medications: [],
			},
		},
	});
	const loadCurrentData = useCallback(async () => {
		try {
			setLoading(true);
			console.log("Loading data with token:", token);
			const data = await getMeasurements();
			console.log("Received data:", JSON.stringify(data, null, 2));
			if (data) {
				// Set the nested objects
				setValue("basicInfo", data.basicInfo);
				setValue("lifeStyleInfo", data.lifeStyleInfo);
				setValue("goalsPreferences", data.goalsPreferences);
				setValue("medicalHistory", data.medicalHistory);
			}
		} catch (error) {
			console.error("Error loading data:", error);

			// Check if it's an authentication error
			if (
				error instanceof Error &&
				(error.name === "AuthError" ||
					[401, 403].includes((error as any).response?.status))
			) {
				Alert.alert(
					"Authentication Error",
					"Your session has expired or is invalid. Please log in again.",
					[{ text: "OK", onPress: () => logout() }],
				);
				return;
			}

			// Check for network errors
			if (error instanceof Error && error.name === "NetworkError") {
				Alert.alert(
					"Connection Error",
					"Unable to connect to the server. Please check your internet connection.",
				);
				return;
			}

			// Handle other errors
			Alert.alert(
				"Error",
				"Failed to load your health data. Please try again later.",
			);
		} finally {
			setLoading(false);
		}
	}, [setValue, logout, token]);

	useEffect(() => {
		if (!token) {
			logout();
			return;
		}

		const validateAndLoad = async () => {
			try {
				// First validate the token with proper auth header
				const validationResponse = await validateToken(token);
				if (!validationResponse.data.valid) {
					throw new Error("Invalid token");
				}
				// If validation succeeds, load the data
				await loadCurrentData();
			} catch (error) {
				console.error("Token validation failed:", error);
				Alert.alert(
					"Session Expired",
					"Your session has expired. Please log in again.",
					[{ text: "OK", onPress: () => logout() }],
				);
			}
		};

		validateAndLoad();
	}, [token, logout, loadCurrentData]);
	const onSubmit = async (data: MesuresDto) => {
		try {
			setLoading(true);
			console.log("Submitting with token:", token);
			console.log("Submitting data:", JSON.stringify(data, null, 2));
			// Data is already in the correct nested structure since we're using the proper form fields
			await updateMeasurements(data);
			console.log("Update successful");
			Alert.alert(
				"Success",
				"Your health information has been updated successfully",
			);
		} catch (error) {
			console.error("Error updating health data:", error);

			// Check if it's an authentication error
			if (
				error instanceof Error &&
				(error.name === "AuthError" ||
					(error as { response?: { status: number } }).response?.status === 403)
			) {
				Alert.alert(
					"Authentication Error",
					"Your session has expired or is invalid. Please log in again.",
					[{ text: "OK", onPress: () => logout() }],
				);
				return;
			}

			// Handle other errors
			Alert.alert(
				"Error",
				"Failed to update your health information. Please try again.",
			);
		} finally {
			setLoading(false);
		}
	};

	const renderSection = (title: string, children: React.ReactNode) => (
		<View style={[styles.section, { backgroundColor: theme.colors.card }]}>
			<Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
				{title}
			</Text>
			{children}
		</View>
	);

	return (
		<Screen>
			<ScrollView style={styles.container}>
				<Text style={[styles.title, { color: theme.colors.text }]}>
					Health Profile
				</Text>
				{renderSection(
					"Basic Information",
					<>
						<Input
							control={control}
							name="basicInfo.age"
							label="Age"
							keyboardType="numeric"
							rules={{ required: true, min: 18, max: 120 }}
						/>

						<View style={styles.pickerContainer}>
							<Text style={[styles.label, { color: theme.colors.text }]}>
								Gender
							</Text>
							<Picker
								selectedValue={watch("basicInfo.gender")}
								onValueChange={(value) => setValue("basicInfo.gender", value)}
								style={{ color: theme.colors.text }}
							>
								{Object.entries(Gender).map(([key, label]) => (
									<Picker.Item key={key} label={label} value={key} />
								))}
							</Picker>
						</View>

						<Input
							control={control}
							name="basicInfo.height"
							label="Height (cm)"
							keyboardType="numeric"
							rules={{ required: true, min: 100, max: 250 }}
						/>
					</>,
				)}
				{renderSection(
					"Weight Goals",
					<>
						<Input
							control={control}
							name="basicInfo.currentWeight"
							label="Current Weight (kg)"
							keyboardType="numeric"
							rules={{ required: true, min: 30, max: 300 }}
						/>

						<Input
							control={control}
							name="basicInfo.targetWeight"
							label="Target Weight (kg)"
							keyboardType="numeric"
							rules={{ required: true, min: 30, max: 300 }}
						/>
					</>,
				)}
				{renderSection(
					"Sleep & Rest",
					<>
						<Input
							control={control}
							name="lifeStyleInfo.avgSleepHours"
							label="Average Sleep Hours"
							keyboardType="numeric"
							rules={{ required: true, min: 0, max: 24 }}
						/>

						<View style={styles.pickerContainer}>
							<Text style={[styles.label, { color: theme.colors.text }]}>
								Nap Duration
							</Text>
							<Picker
								selectedValue={watch("lifeStyleInfo.napDuration")}
								onValueChange={(value) =>
									setValue("lifeStyleInfo.napDuration", value)
								}
								style={{ color: theme.colors.text }}
							>
								{Object.entries(NapDuration).map(([key, label]) => (
									<Picker.Item key={key} label={label} value={key} />
								))}
							</Picker>
						</View>
					</>,
				)}
				{renderSection(
					"Lifestyle",
					<>
						<View style={styles.pickerContainer}>
							<Text style={[styles.label, { color: theme.colors.text }]}>
								Activity Level
							</Text>
							<Picker
								selectedValue={watch("lifeStyleInfo.activityLevel")}
								onValueChange={(value) =>
									setValue("lifeStyleInfo.activityLevel", value)
								}
								style={{ color: theme.colors.text }}
							>
								{Object.entries(ActivityLevel).map(([key, label]) => (
									<Picker.Item key={key} label={label} value={key} />
								))}
							</Picker>
						</View>

						<View style={styles.switchContainer}>
							<Text style={[styles.label, { color: theme.colors.text }]}>
								Smoker
							</Text>
							<Switch
								value={watch("lifeStyleInfo.smoker")}
								onValueChange={(value) =>
									setValue("lifeStyleInfo.smoker", value)
								}
							/>
						</View>

						<View style={styles.pickerContainer}>
							<Text style={[styles.label, { color: theme.colors.text }]}>
								Alcohol Consumption
							</Text>
							<Picker
								selectedValue={watch("lifeStyleInfo.alcoholConsumption")}
								onValueChange={(value) =>
									setValue("lifeStyleInfo.alcoholConsumption", value)
								}
								style={{ color: theme.colors.text }}
							>
								{Object.entries(AlcoholConsumption).map(([key, label]) => (
									<Picker.Item key={key} label={label} value={key} />
								))}
							</Picker>
						</View>
					</>,
				)}
				{renderSection(
					"Food Preferences",
					<View>
						<Text style={[styles.label, { color: theme.colors.text }]}>
							Food Preferences
						</Text>
						<View style={styles.chipContainer}>
							{" "}
							{watch("lifeStyleInfo.foodPreferences")?.map((item: string) => (
								<TouchableOpacity
									key={`food-pref-${item}`}
									style={[styles.chip, { backgroundColor: theme.colors.card }]}
									onPress={() => {
										const currentPrefs =
											watch("lifeStyleInfo.foodPreferences") || [];
										setValue(
											"lifeStyleInfo.foodPreferences",
											currentPrefs.filter((pref: string) => pref !== item),
										);
									}}
								>
									<Text style={[styles.chipText, { color: theme.colors.text }]}>
										{item}
										<Text
											style={[styles.chipText, { color: theme.colors.text }]}
										>
											{" "}
											×{" "}
										</Text>
									</Text>
								</TouchableOpacity>
							)) || []}
						</View>
						<View style={styles.inputRow}>
							<TextInput
								style={[
									styles.input,
									{
										color: theme.colors.text,
										borderColor: theme.colors.border,
										flex: 1,
										marginRight: 10,
									},
								]}
								placeholder="Add food preference..."
								placeholderTextColor={theme.colors.textSecondary}
								value={inputText}
								onChangeText={setInputText}
								onSubmitEditing={() => {
									const newPreference = inputText.trim();
									if (
										newPreference &&
										!(watch("lifeStyleInfo.foodPreferences") || []).includes(
											newPreference,
										)
									) {
										const currentPrefs =
											watch("lifeStyleInfo.foodPreferences") || [];
										setValue("lifeStyleInfo.foodPreferences", [
											...currentPrefs,
											newPreference,
										]);
										setInputText("");
									}
								}}
								returnKeyType="done"
							/>
							<TouchableOpacity
								style={[
									styles.addButton,
									{ backgroundColor: theme.colors.primary },
								]}
								onPress={() => {
									const newPreference = inputText.trim();
									const foodPrefs = watch("lifeStyleInfo.foodPreferences");
									if (
										newPreference &&
										foodPrefs &&
										!foodPrefs.includes(newPreference)
									) {
										setValue("lifeStyleInfo.foodPreferences", [
											...foodPrefs,
											newPreference,
										]);
										setInputText("");
									} else if (newPreference) {
										setValue("lifeStyleInfo.foodPreferences", [newPreference]);
										setInputText("");
									}
								}}
							>
								<Text
									style={[styles.addButtonText, { color: theme.colors.card }]}
								>
									Add
								</Text>
							</TouchableOpacity>
						</View>
					</View>,
				)}{" "}
				<Button
					title={loading ? "Saving..." : "Save Changes"}
					onPress={handleSubmit(onSubmit)}
					disabled={loading}
					variant="primary"
				/>
			</ScrollView>
		</Screen>
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
	section: {
		padding: 16,
		borderRadius: 8,
		marginBottom: 16,
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: "600",
		marginBottom: 16,
	},
	label: {
		fontSize: 16,
		marginBottom: 8,
	},
	pickerContainer: {
		marginBottom: 16,
	},
	switchContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 16,
	},
	chipContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		marginBottom: 10,
	},
	chip: {
		flexDirection: "row",
		alignItems: "center",
		padding: 8,
		borderRadius: 20,
		marginRight: 8,
		marginBottom: 8,
	},
	chipText: {
		fontSize: 14,
		marginRight: 4,
	},
	inputContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	input: {
		height: 40,
		paddingHorizontal: 12,
		borderWidth: 1,
		borderRadius: 8,
	},
	inputRow: {
		flexDirection: "row",
		alignItems: "center",
	},
	addButton: {
		paddingHorizontal: 16,
		paddingVertical: 8,
		borderRadius: 8,
		justifyContent: "center",
		alignItems: "center",
	},
	addButtonText: {
		color: "white",
		fontSize: 14,
		fontWeight: "600",
	},
});

export default LifestyleScreen;
