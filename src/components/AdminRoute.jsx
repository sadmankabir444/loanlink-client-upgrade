import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [role, setRole] = useState("");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || "https://loanlink-server-seven.vercel.app"}/users/${user.email}`)
      .then(res => res.json())
      .then(data => setRole(data.role));
  }, [user]);

  if (role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminRoute;
