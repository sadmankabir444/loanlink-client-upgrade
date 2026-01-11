import { useContext } from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthContext } from "../providers/AuthProvider";

const PrivateRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  // 🔄 auth loading
  if (loading) {
    return (
      <motion.div 
        className="min-h-screen flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.span 
          className="loading loading-spinner loading-lg"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>
    );
  }

  // 🔒 not logged in
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // ⛔ role protection
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  // ✅ IMPORTANT PART
  
  return children ? children : <Outlet />;
};

export default PrivateRoute;
