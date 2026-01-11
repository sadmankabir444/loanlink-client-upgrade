import { Outlet, NavLink, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { FaHome, FaDollarSign, FaUserFriends, FaFileAlt, FaCog, FaSignOutAlt, FaUser, FaChartBar } from "react-icons/fa";

const DashboardLayout = () => {
  const { user, loading, logout } = useContext(AuthContext);

  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  const handleLogout = () => {
    logout();
  };

  // Navigation items based on role
  const navItems = {
    borrower: [
      { path: "/dashboard", label: "Dashboard", icon: <FaHome /> },
      { path: "/dashboard/my-loans", label: "My Loans", icon: <FaDollarSign /> },
      { path: "/dashboard/profile", label: "My Profile", icon: <FaUser /> },
    ],
    manager: [
      { path: "/dashboard", label: "Dashboard", icon: <FaHome /> },
      { path: "/dashboard/add-loan", label: "Add Loan", icon: <FaDollarSign /> },
      { path: "/dashboard/manage-loans", label: "Manage Loans", icon: <FaChartBar /> },
      { path: "/dashboard/pending-loans", label: "Pending Apps", icon: <FaFileAlt /> },
      { path: "/dashboard/approved-loans", label: "Approved Apps", icon: <FaFileAlt /> },
      { path: "/dashboard/profile", label: "My Profile", icon: <FaUser /> },
    ],
    admin: [
      { path: "/dashboard", label: "Dashboard", icon: <FaHome /> },
      { path: "/dashboard/manage-users", label: "Manage Users", icon: <FaUserFriends /> },
      { path: "/dashboard/all-loans", label: "All Loans", icon: <FaDollarSign /> },
      { path: "/dashboard/applications", label: "Applications", icon: <FaFileAlt /> },
      { path: "/dashboard/profile", label: "My Profile", icon: <FaUser /> },
    ],
  };

  const currentNavItems = navItems[user?.role] || [];

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="bg-gradient-to-b from-primary to-secondary text-white w-full md:w-64 min-h-screen">
        <div className="p-6 border-b border-white/20">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <FaDollarSign /> LoanLink
          </h2>
          <p className="text-sm opacity-80 mt-1 truncate">{user?.email}</p>
        </div>
        
        <nav className="p-4 space-y-1">
          {currentNavItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? "bg-white/20 text-white font-medium"
                    : "hover:bg-white/10 text-white/80"
                }`
              }
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
          
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all w-full text-left hover:bg-white/10 text-white/80 mt-4"
          >
            <span className="text-lg"><FaSignOutAlt /></span>
            <span>Logout</span>
          </button>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6 bg-base-100 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
