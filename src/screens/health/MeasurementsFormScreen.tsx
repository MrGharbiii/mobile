import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import { Screen } from "../../components/common";
import { getMeasurements } from "../../services/healthService";
import { MesuresDto } from "../../types/health";
import {
  ActivityLevel,
  AlcoholConsumption,
  Gender,
  HealthGoal,
  StressLevel,
  WorkoutRoutine,
} from "../../constants/enumMappings";

const MeasurementsFormScreen = () => {
  const [measurements, setMeasurements] = useState<MesuresDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getMeasurements();
        setMeasurements(data);
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
      <Screen>
        <Text>Loading...</Text>
      </Screen>
    );
  }

  if (error) {
    return (
      <Screen>
        <Text style={styles.error}>{error}</Text>
      </Screen>
    );
  }

  if (!measurements) {
    return (
      <Screen>
        <Text>No measurements data available</Text>
      </Screen>
    );
  }

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.sectionTitle}>Basic Information</Text>
        
        <View style={styles.infoRow}>
          <Text style={styles.label}>Age:</Text>
          <Text style={styles.value}>{measurements.basicInfo?.age}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Text style={styles.label}>Gender:</Text>
          <Text style={styles.value}>{Gender[measurements.basicInfo?.gender || "MALE"]}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Text style={styles.label}>Height:</Text>
          <Text style={styles.value}>{measurements.basicInfo?.height} cm</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Text style={styles.label}>Current Weight:</Text>
          <Text style={styles.value}>{measurements.basicInfo?.currentWeight} kg</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Text style={styles.label}>Target Weight:</Text>
          <Text style={styles.value}>{measurements.basicInfo?.targetWeight} kg</Text>
        </View>

        <Text style={styles.sectionTitle}>Lifestyle Information</Text>
        
        <View style={styles.infoRow}>
          <Text style={styles.label}>Activity Level:</Text>
          <Text style={styles.value}>
            {ActivityLevel[measurements.lifeStyleInfo?.activityLevel || "MODERATE"]}
          </Text>
        </View>
        
        <View style={styles.infoRow}>
          <Text style={styles.label}>Alcohol Consumption:</Text>
          <Text style={styles.value}>
            {AlcoholConsumption[measurements.lifeStyleInfo?.alcoholConsumption || "NEVER"]}
          </Text>
        </View>
        
        <View style={styles.infoRow}>
          <Text style={styles.label}>Average Sleep Hours:</Text>
          <Text style={styles.value}>{measurements.lifeStyleInfo?.avgSleepHours}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Text style={styles.label}>Stress Level:</Text>
          <Text style={styles.value}>
            {StressLevel[measurements.lifeStyleInfo?.stressLevel || "MODERATE"]}
          </Text>
        </View>
        
        <View style={styles.infoRow}>
          <Text style={styles.label}>Workout Routine:</Text>
          <Text style={styles.value}>
            {WorkoutRoutine[measurements.lifeStyleInfo?.workoutRoutine || "NONE"]}
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Goals & Preferences</Text>
        
        <View style={styles.infoRow}>
          <Text style={styles.label}>Primary Health Goal:</Text>
          <Text style={styles.value}>
            {HealthGoal[measurements.goalsPreferences?.primaryHealthGoal || "HEALTH_MAINTENANCE"]}
          </Text>
        </View>
        
        {measurements.goalsPreferences?.workoutPreferences?.length > 0 && (
          <View style={styles.infoRow}>
            <Text style={styles.label}>Workout Preferences:</Text>
            <View style={styles.listContainer}>
              {measurements.goalsPreferences.workoutPreferences.map((pref, index) => (
                <Text key={index} style={styles.listItem}>• {pref}</Text>
              ))}
            </View>
          </View>
        )}
        
        {measurements.goalsPreferences?.dietaryRestrictions?.length > 0 && (
          <View style={styles.infoRow}>
            <Text style={styles.label}>Dietary Restrictions:</Text>
            <View style={styles.listContainer}>
              {measurements.goalsPreferences.dietaryRestrictions.map((restriction, index) => (
                <Text key={index} style={styles.listItem}>• {restriction}</Text>
              ))}
            </View>
          </View>
        )}

        <Text style={styles.sectionTitle}>Medical History</Text>
        
        {measurements.medicalHistory?.allergies?.length > 0 && (
          <View style={styles.infoRow}>
            <Text style={styles.label}>Allergies:</Text>
            <View style={styles.listContainer}>
              {measurements.medicalHistory.allergies.map((allergy, index) => (
                <Text key={index} style={styles.listItem}>• {allergy}</Text>
              ))}
            </View>
          </View>
        )}
        
        {measurements.medicalHistory?.chronicConditions?.length > 0 && (
          <View style={styles.infoRow}>
            <Text style={styles.label}>Chronic Conditions:</Text>
            <View style={styles.listContainer}>
              {measurements.medicalHistory.chronicConditions.map((condition, index) => (
                <Text key={index} style={styles.listItem}>• {condition}</Text>
              ))}
            </View>
          </View>
        )}
        
        {measurements.medicalHistory?.medications?.length > 0 && (
          <View style={styles.infoRow}>
            <Text style={styles.label}>Medications:</Text>
            <View style={styles.listContainer}>
              {measurements.medicalHistory.medications.map((med, index) => (
                <Text key={index} style={styles.listItem}>• {med}</Text>
              ))}
            </View>
          </View>
        )}
        
        {measurements.medicalHistory?.surgeries?.length > 0 && (
          <View style={styles.infoRow}>
            <Text style={styles.label}>Surgeries:</Text>
            <View style={styles.listContainer}>
              {measurements.medicalHistory.surgeries.map((surgery, index) => (
                <Text key={index} style={styles.listItem}>
                  • {surgery.name} ({surgery.year})
                </Text>
              ))}
            </View>
          </View>
        )}
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
  infoRow: {
    flexDirection: "row",
    marginBottom: 15,
    alignItems: "flex-start",
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    width: 150,
  },
  value: {
    fontSize: 16,
    flex: 1,
  },
  listContainer: {
    flex: 1,
  },
  listItem: {
    fontSize: 16,
    marginBottom: 4,
  },
  error: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
});

export default MeasurementsFormScreen;