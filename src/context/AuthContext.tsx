import React, { createContext, useState, useEffect, ReactNode } from "react";
import { getAccessToken, removeAccessToken } from "../utils/storage.utils";
import { login as apiLogin, register as apiRegister } from "../api/login";
import { IUser } from "../domain/models/user.model";
import { api } from "../api/api";


interface IAuthContextType {
  user: IUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<IAuthContextType | undefined>(undefined);


export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<IUser | null>(null);
  const isAuthenticated = !!user;

  useEffect(() => {
    const fetchUserData = async () => {
      const token = getAccessToken();
      if (token) {
        try {
          const response = await api.get("/api/user", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data);
        } catch (error) {
          console.error("Failed to fetch user data", error);
        }
      }
    };

    fetchUserData();
  }, []);

  const login = async (email: string, password: string) => {
    await apiLogin(email, password);
    const token = getAccessToken();
    if (token) {
      try {
        const response = await api.get("/api/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Failed to fetch user data after login", error);
      }
    }
  };

  const register = async (
    username: string,
    email: string,
    password: string
  ) => {
    await apiRegister(username, email, password);
  };

  const logout = () => {
    removeAccessToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
