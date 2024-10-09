import { setAccessToken } from "../utils/storage.utils";
import { api } from "./api";


export const login = async (email: string, password: string) => {
  try {
    const response = await api.post("/api/auth/login", {
      email,
      password,
    });
    const { accessToken } = response.data;
    setAccessToken(accessToken);
  } catch (error) {
    console.error("Login failed", error);
    throw new Error("Login failed");
  }
};

export const register = async (
  username: string,
  email: string,
  password: string
) => {
  try {
    const response = await api.post("/api/auth/register", {
      email,
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Registration failed", error);
    throw new Error("Registration failed");
  }
};
