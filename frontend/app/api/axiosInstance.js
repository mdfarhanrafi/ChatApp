import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://chatapp-xy0c.onrender.com/api",
  withCredentials: true,
});