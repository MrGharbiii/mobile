import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { Button, Input, Screen } from "../../components/common";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthStackParamList } from "../../types/navigation";

type RegisterScreenProps = {
	navigation: StackNavigationProp<AuthStackParamList, "Register">;
};

interface FormData {
	email: string;
	password: string;
	confirmPassword: string;
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
	const { register, isLoading } = useAuth();
	const {
		control,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<FormData>();
	const [error, setError] = useState("");

	const onSubmit = async (data: FormData) => {
		try {
			await register(data.email, data.password);
		} catch (err) {
			setError("Registration failed. Please try again.");
		}
	};

	return (
		<Screen style={styles.container}>
			<Text style={styles.title}>Create Account</Text>

			{error && <Text style={styles.error}>{error}</Text>}

			<Input
				control={control}
				name="email"
				label="Email"
				rules={{
					required: "Email is required",
					pattern: {
						value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
						message: "Invalid email address",
					},
				}}
				autoCapitalize="none"
				keyboardType="email-address"
			/>

			<Input
				control={control}
				name="password"
				label="Password"
				rules={{
					required: "Password is required",
					minLength: {
						value: 8,
						message: "Password must be at least 8 characters",
					},
				}}
				secureTextEntry
			/>

			<Input
				control={control}
				name="confirmPassword"
				label="Confirm Password"
				rules={{
					required: "Confirm your password",
					validate: (value: string) =>
						value === watch("password") || "Passwords do not match",
				}}
				secureTextEntry
			/>

			<Button
				title="Register"
				onPress={handleSubmit(onSubmit)}
				loading={isLoading}
			/>

			<View style={styles.footer}>
				<Text>Already have an account? </Text>
				<TouchableOpacity onPress={() => navigation.navigate("Login")}>
					<Text style={styles.link}>Login</Text>
				</TouchableOpacity>
			</View>
		</Screen>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 20,
		justifyContent: "center",
	},
	title: {
		fontSize: 32,
		fontWeight: "bold",
		marginBottom: 30,
		textAlign: "center",
	},
	error: {
		color: "red",
		marginBottom: 10,
		textAlign: "center",
	},
	footer: {
		flexDirection: "row",
		justifyContent: "center",
		marginTop: 20,
	},
	link: {
		color: "blue",
		fontWeight: "bold",
	},
});

export default RegisterScreen;
