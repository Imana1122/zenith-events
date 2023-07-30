import axios from "axios";
import API_BASE_URL from "./apiConfig";
import { useStateContext } from "./contents/ContextProvider";
import { useEffect } from "react";

// Create a new Axios instance with the base URL
const axiosClient = axios.create({
  baseURL: API_BASE_URL + "/api",
});

// Request interceptor: Add the JWT token to the request headers before making a request
axiosClient.interceptors.request.use(async (config) => {
  // Get the JWT token from localStorage and add it to the Authorization header
  config.headers.Authorization = `Bearer ${localStorage.getItem("TOKEN")}`;
  console.log(config.headers.Authorization)
  return config;
});



// Response interceptor: Handle unauthorized (401) responses
axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // If the response status is 401 (Unauthorized), call handleLogout to logout the user
    if (error.response && error.response.status === 401) {
        localStorage.removeItem("TOKEN");
        localStorage.removeItem("USER");
        // Redirect to the login page using window.location.href
        window.location.href = "/login";
    }
    throw error;
  }
);

export default axiosClient;
