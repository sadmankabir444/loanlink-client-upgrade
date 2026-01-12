// src/dashboard/PendingLoans.jsx
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";
import LoadingSpinner from "../components/LoadingSpinner";

const PendingLoans = () => {
  const axiosSecure = useAxiosSecure();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch pending applications
  const fetchApplications = async () => {
    try {
      setLoading(true);
      const res = await axiosSecure.get("/manager/pending");
      setApplications(res.data);
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to fetch pending applications", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  // Approve loan
  const handleApprove = async (id) => {
    const confirm = await Swal.fire({
      title: "Approve Loan?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Approve",
    });
    if (confirm.isConfirmed) {
      await axiosSecure.patch(`/manager/approve/${id}`);
      Swal.fire("Approved!", "Loan approved successfully", "success");
      fetchApplications();
    }
  };

  // Reject loan
  const handleReject = async (id) => {
    const confirm = await Swal.fire({
      title: "Reject Loan?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Reject",
    });
    if (confirm.isConfirmed) {
      await axiosSecure.patch(`/manager/reject/${id}`);
      Swal.fire("Rejected!", "Loan rejected successfully", "error");
      fetchApplications();
    }
  };

  // View loan details
  const handleView = (app) => {
    Swal.fire({
      title: "Loan Application Details",
      width: 650,
      html: `
        <div style="text-align:left">
          <p><b>User:</b> ${app.userName} (${app.userEmail})</p>
          <p><b>Loan Title:</b> ${app.loanTitle}</p>
          <p><b>Category:</b> ${app.loanCategory}</p>
          <p><b>Amount:</b> $${app.loanAmount}</p>
          <p><b>Status:</b> ${app.status}</p>
          <p><b>Applied Date:</b> ${new Date(app.createdAt).toLocaleDateString()}</p>
          <p><b>Address:</b> ${app.address}</p>
          <p><b>Reason:</b> ${app.reason}</p>
        </div>
      `,
    });
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-4 bg-gradient-to-br from-base-100 to-base-200 min-h-screen">
      <h2 className="text-3xl font-bold text-primary mb-6">
        Pending Loan Applications
      </h2>

      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto rounded-xl">
        <table className="table w-full">
          <thead className="bg-gradient-to-r from-primary to-secondary text-white">
            <tr>
              <th className="px-4 py-3">Loan ID</th>
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">Loan Title</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {applications.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-10">
                  <div className="flex flex-col items-center justify-center text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <p className="text-lg">No pending applications</p>
                    <p className="text-sm mt-1">There are currently no pending applications to review</p>
                  </div>
                </td>
              </tr>
            )}

            {applications.map((app) => (
              <tr key={app._id} className="hover:bg-base-200 border-b border-base-200">
                <td className="px-4 py-3">{app._id.slice(0, 6)}...</td>
                <td className="px-4 py-3">
                  <p className="font-semibold">{app.userName}</p>
                  <p className="text-sm opacity-70">{app.userEmail}</p>
                </td>
                <td className="px-4 py-3">{app.loanTitle}</td>
                <td className="px-4 py-3">${app.loanAmount}</td>
                <td className="px-4 py-3">{new Date(app.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-3 text-center space-x-2">
                  <button
                    className="btn btn-xs btn-info"
                    onClick={() => handleView(app)}
                  >
                    View
                  </button>
                  <button
                    className="btn btn-xs btn-success"
                    onClick={() => handleApprove(app._id)}
                  >
                    Approve
                  </button>
                  <button
                    className="btn btn-xs btn-error"
                    onClick={() => handleReject(app._id)}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4">
        {applications.length === 0 && (
          <div className="text-center py-10">
            <div className="flex flex-col items-center justify-center text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <p className="text-lg">No pending applications</p>
              <p className="text-sm mt-1">There are currently no pending applications to review</p>
            </div>
          </div>
        )}
        
        {applications.map((app) => (
          <div key={app._id} className="card bg-base-100 border border-base-300 rounded-xl shadow-md p-4">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <div>
                  <p className="font-semibold">{app.loanTitle}</p>
                  <p className="text-sm opacity-70">ID: {app._id.slice(0, 6)}...</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">${app.loanAmount}</p>
                  <p className="text-sm">{new Date(app.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
              
              <div className="mt-2">
                <p className="font-medium">{app.userName}</p>
                <p className="text-sm opacity-70">{app.userEmail}</p>
              </div>
            </div>
            
            <div className="flex gap-2 mt-4">
              <button
                className="btn btn-sm btn-info flex-1"
                onClick={() => handleView(app)}
              >
                View
              </button>
              <button
                className="btn btn-sm btn-success flex-1"
                onClick={() => handleApprove(app._id)}
              >
                Approve
              </button>
              <button
                className="btn btn-sm btn-error flex-1"
                onClick={() => handleReject(app._id)}
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PendingLoans;
