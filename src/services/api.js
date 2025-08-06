import axios from "axios";
import { API_URL } from "../config/envConfig";
import toast from "react-hot-toast";
import { store } from "../redux/store";
import { logoutUser } from "../redux/auth/authSlice";

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.accessToken;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const errorMsg = error.response?.data?.message || "An error occurred";

    if (status === 401) {
      store.dispatch(logoutUser());
    } else {
      toast.error(errorMsg);
    }

    return Promise.reject(error);
  }
);

export default api;
