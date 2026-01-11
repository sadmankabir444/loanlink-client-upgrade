import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash, FaGoogle, FaUser, FaLock, FaSignInAlt } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import axiosSecure from "../api/axiosSecure";

export default function Login() {
  const { login, googleLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // =====================
  // Email / Password Login
  // =====================
  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Validation
    const newErrors = {};
    if (!email) newErrors.email = "Email is required";
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) newErrors.email = "Invalid email format";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6) newErrors.password = "Password must be at least 6 characters";
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setLoading(true);
    try {
      
      const result = await login(email, password);
      const user = result.user;

      
      try {
        await axiosSecure.post("/login", { email: user.email });
      } catch (err) {
        console.error("Backend login failed", err);
        
      }

      toast.success("Login successful 🎉");

      
      setEmail("");
      setPassword("");
      setErrors({});

      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      toast.error("Login failed ❌");
    } finally {
      setLoading(false);
    }
  };

  // =====================
  // Google Login
  // =====================
  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await googleLogin();

      
      toast.success("Google login successful 🎉");

      
      setEmail("");
      setPassword("");

      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      toast.error("Google login failed ❌");
    } finally {
      setLoading(false);
    }
  };
  
  // Demo Login
  const handleDemoLogin = () => {
    setEmail("demo@example.com");
    setPassword("Password123");
    toast.success("Demo credentials filled!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200 dark:from-indigo-950 dark:via-purple-900 dark:to-pink-950 transition-colors duration-500">
      <div className="w-full max-w-md bg-base-100/90 dark:bg-base-300/20 backdrop-blur-xl rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaSignInAlt className="text-primary text-2xl" />
          </div>
          <h2 className="text-3xl font-bold mb-2">Welcome Back 👋</h2>
          <p className="text-gray-600 dark:text-gray-400">Sign in to your account to continue</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="label">
              <span className="label-text font-medium text-gray-700 dark:text-gray-300">Email Address</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="text-gray-400" />
              </div>
              <input
                type="email"
                placeholder="Enter your email"
                className={`input input-bordered w-full pl-10 ${errors.email ? 'input-error' : ''}`}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors(prev => ({...prev, email: ''}));
                }}
                required
              />
            </div>
            {errors.email && <p className="text-error text-sm mt-1">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <label className="label">
              <span className="label-text font-medium text-gray-700 dark:text-gray-300">Password</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="text-gray-400" />
              </div>
              <input
                type={showPass ? "text" : "password"}
                placeholder="Enter your password"
                className={`input input-bordered w-full pl-10 ${errors.password ? 'input-error' : ''}`}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors(prev => ({...prev, password: ''}));
                }}
                required
              />
              <span
                onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer opacity-70"
              >
                {showPass ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.password && <p className="text-error text-sm mt-1">{errors.password}</p>}
          </div>

          <div className="flex justify-between items-center">
            <label className="label cursor-pointer">
              <input type="checkbox" className="checkbox checkbox-primary" />
              <span className="label-text ml-2 text-gray-700 dark:text-gray-300">Remember me</span>
            </label>
            <Link to="#" className="text-sm text-primary hover:underline">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className={`btn btn-primary w-full py-3 text-lg font-semibold ${loading ? "loading" : ""}`}
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="divider my-8">OR CONTINUE WITH</div>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className={`btn btn-outline w-full py-3 flex gap-2 justify-center mb-6 ${loading ? "loading" : ""}`}
          disabled={loading}
        >
          <FaGoogle />
          {loading ? "Processing..." : "Sign in with Google"}
        </button>

        {/* Demo Login */}
        <button
          onClick={handleDemoLogin}
          className="btn btn-accent w-full py-3 mb-6 text-white"
        >
          Try Demo Account
        </button>

        <p className="text-center text-gray-600 dark:text-gray-400 mt-6">
          New here?{" "}
          <Link to="/register" className="link link-primary font-medium">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
