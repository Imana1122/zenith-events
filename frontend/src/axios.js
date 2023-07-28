import axios from "axios";
import API_BASE_URL from "./apiConfig";
import { useStateContext } from "./contents/ContextProvider";

const axiosClient = axios.create({
  baseURL: API_BASE_URL + "/api",
});

axiosClient.interceptors.request.use(async (config) => {

  config.headers.Authorization = `Bearer ${localStorage.getItem("TOKEN")}`;

  return config;
});

export const handleLogout = () => {
    const { setCurrentUser, setUserToken } = useStateContext();
    setCurrentUser({});
    setUserToken("");
    window.location.href = "/login"; // Redirect to the login page using window.location.href
  };

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
        handleLogout();
        return Promise.reject(error);
    }
    throw error;
  }
);

export default axiosClient;
