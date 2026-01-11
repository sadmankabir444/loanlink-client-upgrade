import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { FaHome, FaInfoCircle, FaChartBar, FaDollarSign, FaUsers, FaFileAlt } from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

const DashboardHome = () => {
  const { user } = useContext(AuthContext);

  // Mock data for charts
  const loanData = [
    { name: 'Jan', applications: 45, approvals: 30 },
    { name: 'Feb', applications: 52, approvals: 38 },
    { name: 'Mar', applications: 48, approvals: 35 },
    { name: 'Apr', applications: 60, approvals: 42 },
    { name: 'May', applications: 55, approvals: 40 },
    { name: 'Jun', applications: 65, approvals: 48 },
  ];

  const statusData = [
    { name: 'Pending', value: 25 },
    { name: 'Approved', value: 55 },
    { name: 'Rejected', value: 20 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  const stats = [
    { title: 'Total Applications', value: '245', icon: <FaFileAlt />, color: 'bg-blue-500' },
    { title: 'Active Loans', value: '156', icon: <FaDollarSign />, color: 'bg-green-500' },
    { title: 'Total Users', value: '1,240', icon: <FaUsers />, color: 'bg-purple-500' },
    { title: 'Revenue', value: '$24.8K', icon: <FaChartBar />, color: 'bg-indigo-500' },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Card */}
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-2xl p-8 shadow-lg transform transition-transform hover:scale-105 duration-300">
        <h2 className="text-3xl font-extrabold">Welcome, {user?.displayName || "User"}!</h2>
        <p className="mt-2 opacity-80">
          Use the sidebar to navigate through your dashboard.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{stat.title}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-full text-white`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">Loan Applications & Approvals</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={loanData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="applications" fill="#8884d8" name="Applications" />
                <Bar dataKey="approvals" fill="#82ca9d" name="Approvals" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">Application Status Distribution</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Info / Tips Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300">
        <h3 className="text-2xl font-semibold mb-3 flex items-center gap-2">
          <FaInfoCircle /> Dashboard Overview
        </h3>
        <p className="text-gray-700 dark:text-gray-300">
          Here you can view your account info, check loan application statuses, and manage your interactions based on your role.
        </p>

        {user?.role === "manager" && (
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            As a manager, you can view pending and approved loan applications under the "Manage Loans" section.
          </p>
        )}

        {user?.role === "admin" && (
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            As an admin, you have full access to user management and all loan operations.
          </p>
        )}
      </div>
    </div>
  );
};

export default DashboardHome;
