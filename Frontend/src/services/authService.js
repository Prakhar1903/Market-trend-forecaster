import axios from "axios";

const API_URL = "http://localhost:8002/auth";

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
  const response = await axios.get(`http://localhost:8002/users/profile`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });

  const userData = response.data;

  // Return consistent structure for the UI
  // Note: statistics and joinedDate are still mocked for now as backend doesn't track them yet
  return {
    name: userData.full_name || userData.username,
    username: userData.username,
    email: userData.email,
    joinedDate: "2024-01-15", // Mocked
    stats: {
      forecasts: 42,
      accuracy: "89%",
      lastLogin: "2 hours ago"
    }
  };
};

export const updateProfile = async (profileData) => {
  // Map back name to full_name for backend if needed
  const apiData = {
    username: profileData.username,
    full_name: profileData.name
  };
  const response = await axios.put(`http://localhost:8002/users/profile`, apiData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });
  return response.data;
};

export const updatePassword = async (passwords) => {
  // Mock update
  return { success: true };
};
