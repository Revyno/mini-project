import axios from "axios";
import Cookies from "js-cookie";

const userApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://reqres.in/api/",
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

userApi.interceptors.request.use((cfg) => {
  const token = Cookies.get("token");
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

export default userApi;
