import axios from "axios";

export const API_URL = import.meta.env.VITE_LMS_BASE_URL || "https://api.svarp.org/lms";

const api = axios.create({ baseURL: API_URL });

// Request interceptor to automatically attach authorization header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
