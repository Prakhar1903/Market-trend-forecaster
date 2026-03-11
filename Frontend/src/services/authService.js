import axios from "axios";

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
  // Mocking for now as backend might not have these endpoints fully ready
  return {
    name: "John Doe",
    username: "johndoe",
    email: "john@example.com",
    joinedDate: "2024-01-15",
    stats: {
      forecasts: 42,
      accuracy: "89%",
      lastLogin: "2 hours ago"
    }
  };
};

export const updateProfile = async (profileData) => {
  // Mock update
  return { success: true, data: profileData };
};

export const updatePassword = async (passwords) => {
  // Mock update
  return { success: true };
};
