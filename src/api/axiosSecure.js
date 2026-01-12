import axios from "axios";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://loanlink-server-upgrade.vercel.app",
  withCredentials: true, // enable cookies for auth
});

export default axiosSecure;
