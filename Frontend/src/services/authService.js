import axios from "axios";
import http from "./httpClient";

const API_URL = "http://localhost:8000/auth";

export const signup = async (userData) => {
  const response = await axios.post(`${API_URL}/signup`, userData);
  return response.data;
};

export const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  return response.data;
};

// Profile methods
export const getProfile = async () => {
  const response = await http.get("/users/profile");
  return response.data;
};

export const updateProfile = async (profileData) => {
  const response = await http.put("/users/profile", profileData);
  return response.data;
};

export const updatePassword = async (passwords) => {
  const response = await http.put("/users/change-password", passwords);
  return response.data;
};
