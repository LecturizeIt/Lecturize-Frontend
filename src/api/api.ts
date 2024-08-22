import axios from "axios";
import { setAccessToken } from "../utils/storage";

const API_URL = "http://localhost:8080";

export const login = async (email: string, password: string) => {
  try {
    
    const response = await axios.post(`${API_URL}/api/auth/login`, { email, password });
    const { accessToken } = response.data;
    setAccessToken(accessToken);

  } catch (error) {

    console.error("Login failed", error);
    throw new Error("Login failed");

  }
};

export const register = async (username: string, email: string, password: string) => {
  try {

    const response = await axios.post(`${API_URL}/api/auth/register`, { email, username, password });
    return response.data;

  } catch (error) {

    console.error("Registration failed", error);
    throw new Error("Registration failed");

  }
};
