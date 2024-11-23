import React, { createContext, useContext, useState, useEffect } from "react";
import { AuthContextType, User } from "../types/auth";
import { AuthService } from "../services/authService";

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);

  const initializeAuth = () => {
    const token = AuthService.isAuthenticated();

    if (token) {
      setIsAuthenticated(true);
      const payload = AuthService.decodeToken();
      const { name, email } = payload;
      setUser({
        name,
        email,
      });
    }
    setIsLoading(false);
  };
  useEffect(() => {
    initializeAuth();
  }, []);

  const login = (token: string) => {
    AuthService.setToken(token);
    initializeAuth();
  };

  const logout = () => {
    localStorage.removeItem("murree_jwt_token");
    setIsAuthenticated(false);
    setUser(null);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isLoading, login, logout, user }}
    >
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
