import axios from "axios";

export const axiosUser = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/`,
});

axiosUser.interceptors.request.use((config) => {
  const token = `${process.env.token}`;
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});