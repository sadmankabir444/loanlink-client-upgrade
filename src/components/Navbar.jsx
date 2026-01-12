import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { CiSun, CiDark } from "react-icons/ci";
import { IoMdClose, IoMdMenu } from "react-icons/io";
import { FaUser, FaSignOutAlt, FaTachometerAlt, FaList, FaMoneyBillWave, FaCog } from "react-icons/fa";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [theme, setTheme] = useState(
    document.documentElement.getAttribute("data-theme") || "light"
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Theme toggle
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  // Logout handler with toast
  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      navigate("/login");
      setMobileMenuOpen(false);
    } catch {
      toast.error("Logout failed");
    }
  };

  const activeClass = "text-primary font-semibold border-b-2 border-primary";
  const normalClass = "hover:text-primary transition";

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? activeClass : normalClass)}
          onClick={() => setMobileMenuOpen(false)}
        >
          Home
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/loans"
          className={({ isActive }) => (isActive ? activeClass : normalClass)}
          onClick={() => setMobileMenuOpen(false)}
        >
          All Loans
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? activeClass : normalClass)}
          onClick={() => setMobileMenuOpen(false)}
        >
          About
        </NavLink>
      </li>

      {!user ? (
        <>
          <li>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? activeClass : normalClass
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              Login
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/register"
              className={({ isActive }) =>
                isActive ? activeClass : normalClass
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              Register
            </NavLink>
          </li>
        </>
      ) : (
        <>
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) => (isActive ? activeClass : normalClass)}
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <nav className="navbar bg-base-100 shadow-xl px-4 sticky top-0 z-50 border-b border-primary/10">
      {/* Left */}
      <div className="navbar-start">
        <Link to="/" className="text-2xl font-bold text-primary flex items-center gap-2">
          <FaMoneyBillWave className="text-primary" /> LoanLink
        </Link>
      </div>

      {/* Center (Desktop) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-4 font-medium">
          {navLinks}
        </ul>
      </div>

      {/* Right */}
      <div className="navbar-end flex items-center gap-3">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className={`relative w-14 h-7 rounded-full p-1 bg-white/30 dark:bg-gray-700/30 backdrop-blur-md border border-white/30 dark:border-gray-500 flex items-center transition-colors duration-300`}
          aria-label="Toggle Theme"
        >
          <span
            className={`absolute top-1 left-1 w-5 h-5 bg-white dark:bg-gray-200 rounded-full shadow-md flex items-center justify-center transform transition-transform duration-300
      ${theme === "light" ? "translate-x-0" : "translate-x-7"}`}
          >
            {theme === "light" ? (
              <CiSun className="text-yellow-500" size={16} />
            ) : (
              <CiDark className="text-gray-800" size={16} />
            )}
          </span>
        </button>

        {/* Desktop User Menu */}
        {user && (
          <div className="hidden lg:flex items-center gap-3">
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="flex items-center gap-2 cursor-pointer">
                <div className="avatar">
                  <div className="w-10 h-10 rounded-full border-2 border-primary overflow-hidden">
                    <img 
                      src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName || user.email}&background=random`} 
                      alt={user.displayName || "User"} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <span className="hidden md:inline">{user.displayName || user.email.substring(0, 10)}</span>
              </label>
              <ul tabIndex={0} className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                <li>
                  <NavLink to="/dashboard" className="flex items-center gap-2">
                    <FaTachometerAlt /> Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/profile" className="flex items-center gap-2">
                    <FaUser /> Profile
                  </NavLink>
                </li>
                {user?.role === 'borrower' && (
                  <li>
                    <NavLink to="/dashboard/my-loans" className="flex items-center gap-2">
                      <FaMoneyBillWave /> My Loans
                    </NavLink>
                  </li>
                )}
                {user?.role === 'manager' && (
                  <>
                    <li>
                      <NavLink to="/dashboard/add-loan" className="flex items-center gap-2">
                        <FaMoneyBillWave /> Add Loan
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/dashboard/manage-loans" className="flex items-center gap-2">
                        <FaList /> Manage Loans
                      </NavLink>
                    </li>
                  </>
                )}
                {user?.role === 'admin' && (
                  <>
                    <li>
                      <NavLink to="/dashboard/all-loans" className="flex items-center gap-2">
                        <FaList /> All Loans
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/dashboard/applications" className="flex items-center gap-2">
                        <FaList /> Applications
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/dashboard/manage-users" className="flex items-center gap-2">
                        <FaCog /> Manage Users
                      </NavLink>
                    </li>
                  </>
                )}
                <li>
                  <button onClick={handleLogout} className="flex items-center gap-2 text-red-500">
                    <FaSignOutAlt /> Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button 
            className="btn btn-ghost text-xl"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <IoMdClose size={24} /> : <IoMdMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`lg:hidden absolute top-full left-0 right-0 bg-base-100 shadow-lg z-50 ${mobileMenuOpen ? '' : 'hidden'}`}>
        <ul className="menu p-4 gap-2">
          {navLinks}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
