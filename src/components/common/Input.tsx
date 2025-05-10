import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Controller, Control, FieldError, RegisterOptions, Path } from "react-hook-form";
import { useTheme } from "../../context/ThemeContext";

interface InputProps<T extends Record<string, any>> {
	name: Path<T>;
	label?: string;
	placeholder?: string;
	rules?: Omit<RegisterOptions<T, Path<T>>, "valueAsNumber" | "valueAsDate" | "setValueAs">;
	secureTextEntry?: boolean;
	keyboardType?: "default" | "numeric" | "email-address" | "phone-pad";
	multiline?: boolean;
	numberOfLines?: number;
	prefix?: React.ReactNode;
	suffix?: React.ReactNode;
	control: Control<T>;
	error?: FieldError;
	autoCapitalize?: "none" | "sentences" | "words" | "characters";
}

export const Input = <T extends Record<string, any>>({
	name,
	label,
	placeholder,
	rules,
	secureTextEntry,
	keyboardType = "default",
	multiline = false,
	numberOfLines = 1,
	prefix,
	suffix,
	control,
	error,
	autoCapitalize,
}: InputProps<T>) => {
	const { theme } = useTheme();

	return (
		<View style={styles.container}>
			{label && (
				<Text style={[styles.label, { color: theme.colors.text }]}>
					{label}
				</Text>
			)}
			<Controller
				control={control}
				render={({ field: { onChange, onBlur, value } }) => (
					<View
						style={[
							styles.inputContainer,
							{
								borderColor: error
									? theme.colors.notification
									: theme.colors.border,
							},
						]}
					>
						{prefix && <View style={styles.prefix}>{prefix}</View>}
						<TextInput
							style={[
								styles.input,
								{
									color: theme.colors.text,
									minHeight: multiline ? numberOfLines * 24 : 50,
								},
							]}
							onBlur={onBlur}
							onChangeText={onChange}
							value={typeof value === 'string' ? value : value?.toString() ?? ''}
							placeholder={placeholder}
							placeholderTextColor={theme.colors.textSecondary}
							secureTextEntry={secureTextEntry}
							keyboardType={keyboardType}
							multiline={multiline}
							numberOfLines={numberOfLines}
							autoCapitalize={autoCapitalize}
						/>
						{suffix && <View style={styles.suffix}>{suffix}</View>}
					</View>
				)}
				name={name}
				rules={rules}
			/>
			{error && (
				<Text style={[styles.error, { color: theme.colors.notification }]}>
					{error.message?.toString()}
				</Text>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginBottom: 16,
	},
	label: {
		marginBottom: 8,
		fontSize: 14,
		fontWeight: "500",
	},
	inputContainer: {
		flexDirection: "row",
		alignItems: "center",
		borderWidth: 1,
		borderRadius: 8,
		overflow: "hidden",
	},
	input: {
		flex: 1,
		paddingHorizontal: 12,
		paddingVertical: 12,
		fontSize: 16,
	},
	prefix: {
		paddingLeft: 12,
	},
	suffix: {
		paddingRight: 12,
	},
	error: {
		marginTop: 4,
		fontSize: 12,
	},
});
