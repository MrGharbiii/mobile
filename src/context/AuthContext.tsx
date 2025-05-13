import {
	createContext,
	useContext,
	useState,
	useEffect,
	useCallback,
} from "react";
import type { ReactNode } from "react";
import {
	login as apiLogin,
	register as apiRegister,
	validateToken,
} from "../api/auth";
import { getToken, storeToken, removeToken } from "../services/storageService";

interface AuthContextType {
	token: string | null;
	isLoading: boolean;
	login: (email: string, password: string) => Promise<void>;
	register: (email: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
	undefined,
);
export type { AuthContextType };

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [token, setToken] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const validateAndSetToken = useCallback(
		async (storedToken: string | null) => {
			if (!storedToken) {
				setToken(null);
				return;
			}

			try {
				// Try to validate the token with the backend
				await validateToken(storedToken);
				setToken(storedToken);
			} catch (error) {
				console.error("Token validation failed:", error);
				await removeToken();
				setToken(null);
			}
		},
		[],
	);
	useEffect(() => {
		const loadToken = async () => {
			try {
				const storedToken = await getToken();
				await validateAndSetToken(storedToken);
			} catch (error) {
				console.error("Error loading token:", error);
				setToken(null);
			} finally {
				setIsLoading(false);
			}
		};
		loadToken();
	}, [validateAndSetToken]);

	const login = async (email: string, password: string) => {
		const response = await apiLogin({ email, password });
		const newToken = response.data.token;
		await storeToken(newToken);
		setToken(newToken);
	};

	const register = async (email: string, password: string) => {
		const response = await apiRegister({ email, password });
		const newToken = response.data.token;
		await storeToken(newToken);
		setToken(newToken);
	};

	const logout = async () => {
		await removeToken();
		setToken(null);
	};

	return (
		<AuthContext.Provider value={{ token, isLoading, login, register, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
