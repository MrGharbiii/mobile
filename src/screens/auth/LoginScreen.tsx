import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { Button, Input, Screen } from "../../components/common";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthStackParamList } from "../../types/navigation";

type LoginScreenProps = {
	navigation: StackNavigationProp<AuthStackParamList, "Login">;
};

interface FormData {
	email: string;
	password: string;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
	const { login, isLoading } = useAuth();
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>();
	const [error, setError] = useState("");

	const onSubmit = async (data: FormData) => {
		try {
			await login(data.email, data.password);
		} catch (err) {
			setError("Invalid email or password");
		}
	};

	return (
		<Screen style={styles.container}>
			<Text style={styles.title}>SlimHealthy</Text>

			{error && <Text style={styles.error}>{error}</Text>}

			<Input
				control={control}
				name="email"
				label="Email"
				rules={{ required: "Email is required" }}
				error={errors.email}
				autoCapitalize="none"
				keyboardType="email-address"
			/>

			<Input
				control={control}
				name="password"
				label="Password"
				rules={{ required: "Password is required" }}
				error={errors.password}
				secureTextEntry
			/>

			<Button
				title="Login"
				onPress={handleSubmit(onSubmit)}
				loading={isLoading}
			/>

			<View style={styles.footer}>
				<Text>Don't have an account? </Text>
				<TouchableOpacity onPress={() => navigation.navigate("Register")}>
					<Text style={styles.link}>Register</Text>
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

export default LoginScreen;
