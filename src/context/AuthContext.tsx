import React, {
	createContext,
	useContext,
	useState,
	ReactNode,
	useEffect,
} from "react";
import { login as apiLogin, register as apiRegister } from "../api/auth";
import { getToken, storeToken, removeToken } from "../services/storageService";

interface AuthContextType {
	token: string | null;
	isLoading: boolean;
	login: (email: string, password: string) => Promise<void>;
	register: (email: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
export type { AuthContextType };

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [token, setToken] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const loadToken = async () => {
			const storedToken = await getToken();
			setToken(storedToken);
			setIsLoading(false);
		};
		loadToken();
	}, []);

	const login = async (email: string, password: string) => {
		const response = await apiLogin({ email, password });
		await storeToken(response.data.token);
		setToken(response.data.token);
	};

	const register = async (email: string, password: string) => {
		const response = await apiRegister({ email, password });
		await storeToken(response.data.token);
		setToken(response.data.token);
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
