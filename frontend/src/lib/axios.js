import axios from "axios";

// Use VITE_API_URL if defined, otherwise fallback to localhost for development
const BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
