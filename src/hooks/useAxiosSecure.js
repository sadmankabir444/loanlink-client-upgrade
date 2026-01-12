import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

// Create an Axios instance
// Uses environment variable VITE_API_URL if available, otherwise falls back to deployed backend
const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://loanlink-server-upgrade.vercel.app",
  withCredentials: true, // enable cookies for auth
});

const useAxiosSecure = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Request interceptor: ensures withCredentials is always true
    const requestInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        config.withCredentials = true;
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor: handles 401/403 errors
    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      (error) => {
        const status = error.response?.status;

        if (status === 401 || status === 403) {
          console.log("❌ Unauthorized - redirecting to login");
          navigate("/login", { replace: true });
        }

        return Promise.reject(error);
      }
    );

    // Cleanup interceptors on component unmount
    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
