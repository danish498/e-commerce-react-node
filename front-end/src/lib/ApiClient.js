// Import necessary modules and utilities
import axios from "axios";
import { LocalStorage } from "./utils";

// Create an Axios instance for API requests
export const apiClient = axios.create({
  baseURL: "http://localhost:8080/api/v1",
});

// Add an interceptor to set authorization header with user token before requests
apiClient.interceptors.request.use(
  function (config) {
    // Retrieve user token from local storage
    const token = LocalStorage.get("token");
    // Set authorization header with bearer token
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// API functions for different actions
const loginUser = (data) => {
  return apiClient.post("/login", data);
};

const registerUserApi = (data) => {
  return apiClient.post("/register", data);
};

const logoutUser = () => {
  return apiClient.post("/logout");
};

// Export all the API functions

export { registerUserApi, loginUser, logoutUser };
