import axios from "axios";

const API_URL = "http://localhost:3000/api";

// Configure axios to send cookies with every request
axios.defaults.withCredentials = true;

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    });
    return response.data.data.user;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

export const register = async (
  firstName,
  lastName,
  email,
  password,
  passwordConfirm,
) => {
  try {
    const response = await axios.post(`${API_URL}/auth/signup`, {
      firstName,
      lastName,
      email,
      password,
      passwordConfirm,
    });
    return response.data.data.user;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Registration failed");
  }
};

export const logout = async () => {
  try {
    await axios.post(`${API_URL}/auth/logout`);
  } catch (error) {
    console.error("Logout failed:", error);
  }
};

export const getUser = async () => {
  try {
    const response = await axios.get(`${API_URL}/users/me`);
    return response.data.data.user;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      return null; // User is not authenticated
    }
    throw new Error(error.response?.data?.message || "Failed to get user data");
  }
};

export const updateProfile = async (name, email) => {
  try {
    const response = await axios.patch(`${API_URL}/users/updateMe`, {
      name,
      email,
    });
    return response.data.data.user;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to update profile",
    );
  }
};

export const changePassword = async (
  passwordCurrent,
  password,
  passwordConfirm,
) => {
  try {
    await axios.patch(`${API_URL}/users/updatePassword`, {
      passwordCurrent,
      password,
      passwordConfirm,
    });
  } catch (error) {
    throw new Error("Failed to send password reset email");
  }
};

export const forgotPassword = async (email) => {
  try {
    await axios.post(`${API_URL}/auth/forgotPassword`, { email });
  } catch (error) {
    throw new Error("Failed to send password reset email");
  }
};

export const resetPassword = async (token, password, passwordConfirm) => {
  try {
    await axios.patch(`${API_URL}/auth/resetPassword/${token}`, {
      password,
      passwordConfirm,
    });
  } catch (error) {
    throw new Error("Failed to reset password");
  }
};
