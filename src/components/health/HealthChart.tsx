import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { useTheme } from "../../context/ThemeContext";
import { Dimensions } from "react-native";

interface HealthChartProps {
	data: {
		labels: string[];
		datasets: {
			data: number[];
		}[];
	};
	title: string;
	yAxisSuffix?: string;
}

const HealthChart: React.FC<HealthChartProps> = ({
	data,
	title,
	yAxisSuffix = "",
}) => {
	const { theme } = useTheme();
	const screenWidth = Dimensions.get("window").width - 32;

	const chartConfig = {
		backgroundColor: theme.colors.card,
		backgroundGradientFrom: theme.colors.card,
		backgroundGradientTo: theme.colors.card,
		decimalPlaces: 1,
		color: (opacity = 1) => `rgba(74, 109, 167, ${opacity})`,
		labelColor: (opacity = 1) =>
			`rgba(${theme.dark ? "255, 255, 255" : "0, 0, 0"}, ${opacity})`,
		style: {
			borderRadius: 16,
		},
		propsForDots: {
			r: "4",
			strokeWidth: "2",
			stroke: theme.colors.primary,
		},
	};

	return (
		<View style={[styles.container, { backgroundColor: theme.colors.card }]}>
			<Text style={[styles.title, { color: theme.colors.text }]}>{title}</Text>
			<LineChart
				data={data}
				width={screenWidth}
				height={220}
				chartConfig={chartConfig}
				bezier
				style={{
					marginVertical: 8,
					borderRadius: 8,
				}}
				yAxisSuffix={yAxisSuffix}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 16,
		borderRadius: 8,
		marginVertical: 8,
		elevation: 2,
	},
	title: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 8,
	},
});

export default HealthChart;
