// src/screens/health/DashboardScreen.tsx
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { getMeasurements, saveMeasurements } from "../../services/healthService";
import StatsCard from "../../components/health/StatsCard";
import BMICalculator from "../../components/health/BMICalculator";
import { Button } from "../../components/common";
 import MeasurementsFormPopup from "../../components/health/MeasurementsFormPopup";

const DashboardScreen: React.FC = () => {
  const { theme } = useTheme();
  const [measurements, setMeasurements] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const loadMeasurements = async () => {
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
  };

  useEffect(() => {
    loadMeasurements();
  }, []);

  const handleSubmitMeasurements = async (formData: any) => {
    try {
      await saveMeasurements(formData);
      await loadMeasurements(); 
	  console.log(measurements);
	  
    } catch (error) {
      console.error("Error saving measurements:", error);
      setError("Failed to save measurements. Please try again.");
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Text style={{ color: theme.colors.text }}>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Text style={[styles.error, { color: theme.colors.notification }]}>{error}</Text>
      </View>
    );
  }

  if (!measurements) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Text style={{ color: theme.colors.text }}>No measurements found</Text>
        <Button title="Add Measurements" onPress={() => setShowForm(true)} />
      </View>
    );
  }

  return (
    <>
      <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.text }]}>Dashboard</Text>
          <Button 
            title="Update Measurements" 
            onPress={() => setShowForm(true)} 
          />
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

      <MeasurementsFormPopup
        visible={showForm}
        onClose={() => setShowForm(false)}
        onSubmit={handleSubmitMeasurements}
        initialData={measurements}
      />
    </>
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
  updateButton: {
    width: 180,
  },
  error: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
});

export default DashboardScreen;