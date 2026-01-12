import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaKey, FaEnvelope, FaLock, FaArrowLeft } from "react-icons/fa";
import { motion } from "framer-motion";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("email"); // "email" or "otp"
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    setLoading(true);
    try {
      // In a real app, this would send an OTP to the user's email
      // For demo purposes, we'll simulate the OTP process
      console.log(`OTP sent to ${email}`);
      toast.success("OTP sent to your email!");
      setStep("otp");
    } catch (error) {
      toast.error("Failed to send OTP");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp) {
      toast.error("Please enter the OTP");
      return;
    }

    setLoading(true);
    try {
      // In a real app, this would verify the OTP with the backend
      // For demo purposes, we'll simulate a successful verification
      // In this case, we'll assume the OTP "123456" is always correct for demo
      if (otp === "123456") {
        toast.success("Login successful!");
        // Navigate to dashboard as a borrower
        navigate("/dashboard");
      } else {
        toast.error("Invalid OTP. Please try again.");
      }
    } catch (error) {
      toast.error("Verification failed");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200 dark:from-indigo-950 dark:via-purple-900 dark:to-pink-950 transition-colors duration-500 p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full max-w-md bg-base-100/90 dark:bg-base-300/20 backdrop-blur-xl rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaKey className="text-primary text-2xl" />
          </div>
          <h2 className="text-3xl font-bold mb-2">
            {step === "email" ? "Forgot Password?" : "Enter OTP"}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {step === "email" 
              ? "Enter your email to receive an OTP" 
              : "Enter the OTP sent to your email"}
          </p>
        </div>

        {step === "email" ? (
          <form onSubmit={handleSendOtp} className="space-y-6">
            <div className="space-y-2">
              <label className="label">
                <span className="label-text font-medium text-gray-700 dark:text-gray-300">Email Address</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-400" />
                </div>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="input input-bordered w-full pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className={`btn btn-primary w-full py-3 text-lg font-semibold ${loading ? "loading" : ""}`}
              disabled={loading}
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-6">
            <div className="space-y-2">
              <label className="label">
                <span className="label-text font-medium text-gray-700 dark:text-gray-300">OTP Code</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Enter OTP code"
                  className="input input-bordered w-full pl-10"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className={`btn btn-primary w-full py-3 text-lg font-semibold ${loading ? "loading" : ""}`}
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>
        )}

        <div className="mt-6">
          <button
            onClick={() => step === "otp" ? setStep("email") : navigate("/login")}
            className="btn btn-ghost w-full flex items-center justify-center gap-2"
          >
            <FaArrowLeft /> Back to Login
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ForgotPassword;