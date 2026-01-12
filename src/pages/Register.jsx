import { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash, FaGoogle, FaUserPlus, FaUser, FaEnvelope, FaLock, FaIdCard } from "react-icons/fa";

const Register = () => {
  const { register, updateUserProfile, googleLogin } = useContext(AuthContext);

  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // =======================
  // Email / Password Register
  // =======================
  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;

    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;
    const role = form.role.value;

    // Validation
    const newErrors = {};
    if (!name) newErrors.name = "Name is required";
    if (!email) newErrors.email = "Email is required";
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) newErrors.email = "Invalid email format";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6) newErrors.password = "Password must be at least 6 characters";
    else if (!/(?=.*[a-z])(?=.*[A-Z])/g.test(password)) newErrors.password = "Must contain uppercase and lowercase";
    if (!role) newErrors.role = "Please select a role";
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);

      
      await register(name, email, password);

      // Update Firebase profile
      await updateUserProfile(name, photo);

      toast.success("Registration successful 🎉");
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error("Registration failed ❌");
    } finally {
      setLoading(false);
    }
  };

  // =======================
  // Google Login
  // =======================
  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      await googleLogin();

      toast.success("Google login successful 🎉");
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error("Google login failed ❌");
    } finally {
      setLoading(false);
    }
  };
  


  return (
    <div
      className="
        min-h-screen flex items-center justify-center
        bg-gradient-to-br
        from-pink-200 via-purple-200 to-indigo-200
        dark:from-pink-950 dark:via-purple-900 dark:to-indigo-950
        transition-colors duration-500
      "
    >
      <div className="w-full max-w-lg bg-base-100/90 dark:bg-base-300/20 backdrop-blur-xl rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaUserPlus className="text-primary text-2xl" />
          </div>
          <h2 className="text-3xl font-bold mb-2">
            Create Account 🚀
          </h2>
          <p className="text-gray-600 dark:text-gray-400">Join us today and start your journey</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-6">
          <div className="space-y-2">
            <label className="label">
              <span className="label-text font-medium text-gray-700 dark:text-gray-300">Full Name</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="text-gray-400" />
              </div>
              <input
                name="name"
                placeholder="Enter your full name"
                className={`input input-bordered w-full pl-10 ${errors.name ? 'input-error' : ''}`}
                onChange={() => {
                  if (errors.name) setErrors(prev => ({...prev, name: ''}));
                }}
                required
              />
            </div>
            {errors.name && <p className="text-error text-sm mt-1">{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <label className="label">
              <span className="label-text font-medium text-gray-700 dark:text-gray-300">Photo URL (Optional)</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaIdCard className="text-gray-400" />
              </div>
              <input
                name="photo"
                placeholder="Enter your photo URL"
                className="input input-bordered w-full pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="label">
              <span className="label-text font-medium text-gray-700 dark:text-gray-300">Email Address</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope className="text-gray-400" />
              </div>
              <input
                name="email"
                type="email"
                placeholder="Enter your email"
                className={`input input-bordered w-full pl-10 ${errors.email ? 'input-error' : ''}`}
                onChange={() => {
                  if (errors.email) setErrors(prev => ({...prev, email: ''}));
                }}
                required
              />
            </div>
            {errors.email && <p className="text-error text-sm mt-1">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <label className="label">
              <span className="label-text font-medium text-gray-700 dark:text-gray-300">Role</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaIdCard className="text-gray-400" />
              </div>
              <select
                name="role"
                className={`select select-bordered w-full pl-10 ${errors.role ? 'select-error' : ''}`}
                onChange={() => {
                  if (errors.role) setErrors(prev => ({...prev, role: ''}));
                }}
                required
              >
                <option value="">Select Role</option>
                <option value="borrower">Borrower</option>
                <option value="manager">Manager</option>
              </select>
            </div>
            {errors.role && <p className="text-error text-sm mt-1">{errors.role}</p>}
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
                name="password"
                type={showPass ? "text" : "password"}
                placeholder="Enter your password"
                className={`input input-bordered w-full pl-10 ${errors.password ? 'input-error' : ''}`}
                onChange={() => {
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

          <button
            type="submit"
            className={`btn btn-primary w-full py-3 text-lg font-semibold ${loading ? "loading" : ""}`}
            disabled={loading}
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <div className="divider my-8">OR REGISTER WITH</div>

        <button
          onClick={handleGoogleLogin}
          className={`btn btn-outline w-full py-3 flex justify-center gap-2 mb-6 ${
            loading ? "loading" : ""
          }`}
          disabled={loading}
        >
          <FaGoogle />
          Continue with Google
        </button>



        <p className="text-center text-gray-600 dark:text-gray-400 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="link link-primary font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
