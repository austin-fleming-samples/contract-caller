import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import { initialAuthState } from "./auth.reducer";
import type { AuthState } from "./auth.reducer";
import { useAuth } from "./auth.hook";

const AuthContext = createContext<AuthState>(initialAuthState);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
	const authState = useAuth();

	return <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
