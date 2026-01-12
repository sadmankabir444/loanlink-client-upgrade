import axios from "axios";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://loanlink-server-seven.vercel.app",
  withCredentials: true, // 🔥 MUST
});

export default axiosSecure;
