import axios from "axios";
export const axiosUser = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/`,
});

axiosUser.interceptors.request.use((config) => {
  const token = localStorage.getItem("Redberry-Realestate");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});