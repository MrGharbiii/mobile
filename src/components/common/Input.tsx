import React from "react";
import { TextInput, View, Text, StyleSheet } from "react-native";
import { Controller, useFormContext } from "react-hook-form";
import { useTheme } from "../../context/ThemeContext";

interface InputProps {
	name: string;
	label: string;
	rules?: object;
	error?: any;
	[key: string]: any;
}

const Input: React.FC<InputProps> = ({
	name,
	label,
	rules = {},
	error,
	...props
}) => {
	const { theme } = useTheme();
	const { control } = useFormContext();

	return (
		<View style={styles.container}>
			<Text style={[styles.label, { color: theme.colors.text }]}>{label}</Text>
			<Controller
				control={control}
				render={({ field: { onChange, onBlur, value } }) => (
					<TextInput
						style={[
							styles.input,
							{
								backgroundColor: theme.colors.card,
								color: theme.colors.text,
								borderColor: error ? "red" : theme.colors.border,
							},
						]}
						onBlur={onBlur}
						onChangeText={onChange}
						value={value}
						{...props}
					/>
				)}
				name={name}
				rules={rules}
			/>
			{error && <Text style={styles.error}>{error.message}</Text>}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginBottom: 15,
	},
	label: {
		marginBottom: 5,
		fontSize: 16,
	},
	input: {
		height: 50,
		padding: 10,
		borderRadius: 5,
		borderWidth: 1,
	},
	error: {
		color: "red",
		fontSize: 12,
		marginTop: 5,
	},
});

export default Input;
