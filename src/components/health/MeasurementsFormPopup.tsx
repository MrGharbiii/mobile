// src/components/health/MeasurementsFormPopup.tsx
import React from "react";
import { Modal, View, StyleSheet, Text, ScrollView } from "react-native";
import { Button, Input, Screen } from "../common";
import { Picker } from "@react-native-picker/picker";
import { useTheme } from "../../context/ThemeContext";
import { useForm, Controller } from "react-hook-form";
import {
  ActivityLevel,
  AlcoholConsumption,
  Gender,
  HealthGoal,
  StressLevel,
  WorkoutRoutine,
} from "../../constants/enumMappings";

interface MeasurementsFormPopupProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  initialData?: any;
}

const MeasurementsFormPopup: React.FC<MeasurementsFormPopupProps> = ({
  visible,
  onClose,
  onSubmit,
  initialData = {},
}) => {
  const { theme } = useTheme();
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      basicInfo: {
        age: initialData.basicInfo?.age || "",
        gender: initialData.basicInfo?.gender || "MALE",
        height: initialData.basicInfo?.height || "",
        currentWeight: initialData.basicInfo?.currentWeight || "",
        targetWeight: initialData.basicInfo?.targetWeight || "",
      },
      lifeStyleInfo: {
        activityLevel: initialData.lifeStyleInfo?.activityLevel || "MODERATE",
        alcoholConsumption: initialData.lifeStyleInfo?.alcoholConsumption || "NEVER",
        avgSleepHours: initialData.lifeStyleInfo?.avgSleepHours || "",
        stressLevel: initialData.lifeStyleInfo?.stressLevel || "MODERATE",
        workoutRoutine: initialData.lifeStyleInfo?.workoutRoutine || "NONE",
      },
      goalsPreferences: {
        primaryHealthGoal: initialData.goalsPreferences?.primaryHealthGoal || "HEALTH_MAINTENANCE",
      },
    }
  });

  const handleFormSubmit = (data: any) => {
    onSubmit(data);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={[styles.modalContainer, { backgroundColor: theme.colors.background }]}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={[styles.title, { color: theme.colors.text }]}>Update Measurements</Text>

          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Basic Information</Text>
          
          <Controller
            control={control}
            name="basicInfo.age"
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
              <Input
                control={control}
                name="basicInfo.age"
                label="Age"
                keyboardType="numeric"
                error={error}
              />
            )}
          />
          
          <View style={styles.pickerContainer}>
            <Text style={[styles.label, { color: theme.colors.text }]}>Gender</Text>
            <Controller
              control={control}
              name="basicInfo.gender"
              render={({ field: { onChange, value } }) => (
                <Picker
                  selectedValue={value}
                  onValueChange={onChange}
                  style={[styles.picker, { backgroundColor: theme.colors.card }]}
                >
                  {Object.entries(Gender).map(([key, value]) => (
                    <Picker.Item key={key} label={value} value={key} />
                  ))}
                </Picker>
              )}
            />
          </View>
          
          <Controller
            control={control}
            name="basicInfo.height"
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
              <Input
                control={control}
                name="basicInfo.height"
                label="Height (cm)"
                keyboardType="numeric"
                error={error}
              />
            )}
          />
          
          <Controller
            control={control}
            name="basicInfo.currentWeight"
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
              <Input
                control={control}
                name="basicInfo.currentWeight"
                label="Current Weight (kg)"
                keyboardType="numeric"
                error={error}
              />
            )}
          />
          
          <Controller
            control={control}
            name="basicInfo.targetWeight"
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
              <Input
                control={control}
                name="basicInfo.targetWeight"
                label="Target Weight (kg)"
                keyboardType="numeric"
                error={error}
              />
            )}
          />

          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Lifestyle Information</Text>
          
          <View style={styles.pickerContainer}>
            <Text style={[styles.label, { color: theme.colors.text }]}>Activity Level</Text>
            <Controller
              control={control}
              name="lifeStyleInfo.activityLevel"
              render={({ field: { onChange, value } }) => (
                <Picker
                  selectedValue={value}
                  onValueChange={onChange}
                  style={[styles.picker, { backgroundColor: theme.colors.card }]}
                >
                  {Object.entries(ActivityLevel).map(([key, value]) => (
                    <Picker.Item key={key} label={value} value={key} />
                  ))}
                </Picker>
              )}
            />
          </View>
          
          <View style={styles.pickerContainer}>
            <Text style={[styles.label, { color: theme.colors.text }]}>Alcohol Consumption</Text>
            <Controller
              control={control}
              name="lifeStyleInfo.alcoholConsumption"
              render={({ field: { onChange, value } }) => (
                <Picker
                  selectedValue={value}
                  onValueChange={onChange}
                  style={[styles.picker, { backgroundColor: theme.colors.card }]}
                >
                  {Object.entries(AlcoholConsumption).map(([key, value]) => (
                    <Picker.Item key={key} label={value} value={key} />
                  ))}
                </Picker>
              )}
            />
          </View>
          
          <Controller
            control={control}
            name="lifeStyleInfo.avgSleepHours"
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
              <Input
                control={control}
                name="lifeStyleInfo.avgSleepHours"
                label="Average Sleep Hours"
                keyboardType="numeric"
                error={error}
              />
            )}
          />
          
          <View style={styles.pickerContainer}>
            <Text style={[styles.label, { color: theme.colors.text }]}>Stress Level</Text>
            <Controller
              control={control}
              name="lifeStyleInfo.stressLevel"
              render={({ field: { onChange, value } }) => (
                <Picker
                  selectedValue={value}
                  onValueChange={onChange}
                  style={[styles.picker, { backgroundColor: theme.colors.card }]}
                >
                  {Object.entries(StressLevel).map(([key, value]) => (
                    <Picker.Item key={key} label={value} value={key} />
                  ))}
                </Picker>
              )}
            />
          </View>
          
          <View style={styles.pickerContainer}>
            <Text style={[styles.label, { color: theme.colors.text }]}>Workout Routine</Text>
            <Controller
              control={control}
              name="lifeStyleInfo.workoutRoutine"
              render={({ field: { onChange, value } }) => (
                <Picker
                  selectedValue={value}
                  onValueChange={onChange}
                  style={[styles.picker, { backgroundColor: theme.colors.card }]}
                >
                  {Object.entries(WorkoutRoutine).map(([key, value]) => (
                    <Picker.Item key={key} label={value} value={key} />
                  ))}
                </Picker>
              )}
            />
          </View>

          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Goals & Preferences</Text>
          
          <View style={styles.pickerContainer}>
            <Text style={[styles.label, { color: theme.colors.text }]}>Primary Health Goal</Text>
            <Controller
              control={control}
              name="goalsPreferences.primaryHealthGoal"
              render={({ field: { onChange, value } }) => (
                <Picker
                  selectedValue={value}
                  onValueChange={onChange}
                  style={[styles.picker, { backgroundColor: theme.colors.card }]}
                >
                  {Object.entries(HealthGoal).map(([key, value]) => (
                    <Picker.Item key={key} label={value} value={key} />
                  ))}
                </Picker>
              )}
            />
          </View>

          <View style={styles.buttonContainer}>
            <Button title="Cancel" onPress={onClose} variant="secondary" />
            <Button title="Submit" onPress={handleSubmit(handleFormSubmit)} />
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

// ... keep the same styles
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    margin: 20,
    marginTop: 50,
    marginBottom: 50,
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 10,
  },
  pickerContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
  },
  picker: {
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
});

export default MeasurementsFormPopup;