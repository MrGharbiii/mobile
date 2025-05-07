import React, { createContext, useContext, useState, ReactNode } from "react";
import { Appearance } from "react-native";
import { lightTheme, darkTheme } from "../constants/theme";

interface ThemeContextType {
	theme: typeof lightTheme;
	toggleTheme: () => void;
	isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const colorScheme = Appearance.getColorScheme();
	const [isDark, setIsDark] = useState(colorScheme === "dark");
	const [theme, setTheme] = useState(isDark ? darkTheme : lightTheme);

	const toggleTheme = () => {
		setIsDark(!isDark);
		setTheme(isDark ? lightTheme : darkTheme);
	};

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme, isDark }}>
			{children}
		</ThemeContext.Provider>
	);
};

export const useTheme = () => {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}
	return context;
};
