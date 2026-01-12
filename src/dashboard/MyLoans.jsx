// src/dashboard/MyLoans.jsx
import { useEffect, useState, useContext } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";
import LoadingSpinner from "../components/LoadingSpinner";
import { AuthContext } from "../providers/AuthProvider";
import { motion } from "framer-motion";
import {
  FaIdCard,
  FaMoneyBillWave,
  FaUser,
  FaClock,
  FaCheck,
  FaTimes,
  FaEye,
  FaReceipt,
} from "react-icons/fa";

const MyLoans = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Loans

  const fetchLoans = async () => {
    if (!user?.email) return;
    try {
      setLoading(true);
      const res = await axiosSecure.get(
        `/loan-applications?email=${user.email}`
      );
      setLoans(res.data);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to fetch your loans", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLoans();
  }, [user]);

  // Cancel Loan

  const handleCancel = async (id) => {
    const confirm = await Swal.fire({
      title: "Cancel Loan?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel",
    });

    if (confirm.isConfirmed) {
      await axiosSecure.patch(`/loan-applications/${id}`, {
        status: "Cancelled",
      });
      Swal.fire("Cancelled!", "Your loan has been cancelled", "success");
      fetchLoans();
    }
  };

  // Pay Application Fee

  const handlePay = async (loan) => {
    const confirm = await Swal.fire({
      title: "Pay application fee?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Pay Now",
    });

    if (confirm.isConfirmed) {
      const transactionId = "TXN" + new Date().getTime();
      await axiosSecure.patch(`/loan-applications/${loan._id}`, {
        feeStatus: "Paid",
        transactionId,
      });
      Swal.fire("Paid!", "Application fee has been paid", "success");
      fetchLoans();
    }
  };

  // View Payment Info

  const handleViewPayment = (loan) => {
    Swal.fire({
      title: "Payment Details",
      html: `
        <p><b>Loan ID:</b> ${loan._id}</p>
        <p><b>Email:</b> ${loan.email}</p>
        <p><b>Transaction ID:</b> ${loan.transactionId || "N/A"}</p>
        <p><b>Paid At:</b> ${
          loan.paidAt ? new Date(loan.paidAt).toLocaleString() : "N/A"
        }</p>
      `,
      width: 500,
    });
  };

  if (loading) return <LoadingSpinner />;

  return (
    <motion.div
      className="p-4 bg-gradient-to-br from-base-100 to-base-200 min-h-screen"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2
        className="text-3xl font-bold text-primary mb-6 flex items-center gap-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <FaMoneyBillWave /> My Loans
      </motion.h2>

      <motion.div
        className="rounded-2xl shadow-lg bg-base-100 p-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {/* Desktop Table */}
        <div className="hidden lg:block overflow-x-auto rounded-xl">
          <table className="table w-full">
            <thead className="bg-gradient-to-r from-primary to-secondary text-white">
              <tr>
                <th className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <FaIdCard /> ID
                  </div>
                </th>

                <th className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <FaUser /> Title
                  </div>
                </th>

                <th className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <FaMoneyBillWave /> Amount
                  </div>
                </th>

                <th className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <FaClock /> Status
                  </div>
                </th>

                <th className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <FaReceipt /> Fee
                  </div>
                </th>

                <th className="px-4 py-3 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <FaEye /> Actions
                  </div>
                </th>
              </tr>
            </thead>

            <tbody>
              {loans.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-10">
                    <motion.div
                      className="flex flex-col items-center justify-center text-gray-500"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      <FaMoneyBillWave className="text-4xl mb-2" />
                      <p className="text-lg">No loans found</p>
                      <p className="text-sm mt-1">
                        Apply for a loan to see it here
                      </p>
                    </motion.div>
                  </td>
                </tr>
              )}

              {loans.map((loan, index) => (
                <motion.tr
                  key={loan._id}
                  className="hover:bg-base-200 transition-colors duration-200 border-b border-base-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.01 }}
                >
                  <td className="font-mono px-4 py-3">
                    {loan._id.slice(0, 6)}...
                  </td>
                  <td className="font-semibold px-4 py-3">{loan.loanTitle}</td>
                  <td className="font-bold text-lg px-4 py-3">
                    ৳{loan.loanAmount}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`badge ${
                        loan.status === "Approved"
                          ? "badge-success"
                          : loan.status === "Pending"
                          ? "badge-warning"
                          : "badge-error"
                      }`}
                    >
                      {loan.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {loan.feeStatus === "Paid" ? (
                      <motion.button
                        className="btn btn-xs btn-success flex items-center gap-1"
                        onClick={() => handleViewPayment(loan)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaCheck /> Paid
                      </motion.button>
                    ) : (
                      <motion.button
                        className="btn btn-xs btn-warning flex items-center gap-1"
                        onClick={() => handlePay(loan)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaTimes /> Pay
                      </motion.button>
                    )}
                  </td>
                  <td className="text-center space-x-2 px-4 py-3">
                    <motion.button
                      className="btn btn-xs btn-info flex items-center gap-1"
                      onClick={() =>
                        Swal.fire({
                          title: "Loan Details",
                          html: `
                          <div class="text-left">
                            <p><strong>Loan ID:</strong> ${loan._id}</p>
                            <p><strong>Title:</strong> ${loan.loanTitle}</p>
                            <p><strong>Amount:</strong> ৳${loan.loanAmount}</p>
                            <p><strong>Status:</strong> ${loan.status}</p>
                            <p><strong>Fee Status:</strong> ${
                              loan.feeStatus
                            }</p>
                            <p><strong>Created:</strong> ${new Date(
                              loan.createdAt
                            ).toLocaleDateString()}</p>
                          </div>
                        `,
                          width: 500,
                        })
                      }
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaEye /> View
                    </motion.button>
                    {loan.status === "Pending" && (
                      <motion.button
                        className="btn btn-xs btn-error flex items-center gap-1"
                        onClick={() => handleCancel(loan._id)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaTimes /> Cancel
                      </motion.button>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card Layout */}
        <div className="lg:hidden space-y-4">
          {loans.length === 0 && (
            <div className="text-center py-10">
              <motion.div
                className="flex flex-col items-center justify-center text-gray-500"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <FaMoneyBillWave className="text-4xl mb-2" />
                <p className="text-lg">No loans found</p>
                <p className="text-sm mt-1">Apply for a loan to see it here</p>
              </motion.div>
            </div>
          )}

          {loans.map((loan, index) => (
            <motion.div
              key={loan._id}
              className="card bg-base-100 border border-base-300 rounded-xl shadow-md p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.01 }}
            >
              {/* Primary Info Row */}
              <div className="grid grid-cols-3 gap-2 mb-3 pb-3 border-b border-gray-200">
                <div className="text-center">
                  <div className="text-xs text-gray-500 font-semibold">ID</div>
                  <div className="font-mono text-sm">
                    {loan._id.slice(0, 6)}...
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-gray-500 font-semibold">
                    Title
                  </div>
                  <div className="font-semibold text-sm">{loan.loanTitle}</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-gray-500 font-semibold">
                    Amount
                  </div>
                  <div className="font-bold text-lg">৳{loan.loanAmount}</div>
                </div>
              </div>

              {/* Other Details */}
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="font-semibold text-gray-600">Status:</div>
                <div>
                  <span
                    className={`badge ${
                      loan.status === "Approved"
                        ? "badge-success"
                        : loan.status === "Pending"
                        ? "badge-warning"
                        : "badge-error"
                    }`}
                  >
                    {loan.status}
                  </span>
                </div>

                <div className="font-semibold text-gray-600">Fee:</div>
                <div>
                  {loan.feeStatus === "Paid" ? (
                    <motion.button
                      className="btn btn-xs btn-success flex items-center gap-1"
                      onClick={() => handleViewPayment(loan)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaCheck /> Paid
                    </motion.button>
                  ) : (
                    <motion.button
                      className="btn btn-xs btn-warning flex items-center gap-1"
                      onClick={() => handlePay(loan)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaTimes /> Pay
                    </motion.button>
                  )}
                </div>
              </div>

              <div className="flex gap-2 mt-3">
                <motion.button
                  className="btn btn-sm btn-info flex-1 flex items-center justify-center gap-1"
                  onClick={() =>
                    Swal.fire({
                      title: "Loan Details",
                      html: `
                      <div class="text-left">
                        <p><strong>Loan ID:</strong> ${loan._id}</p>
                        <p><strong>Title:</strong> ${loan.loanTitle}</p>
                        <p><strong>Amount:</strong> ৳${loan.loanAmount}</p>
                        <p><strong>Status:</strong> ${loan.status}</p>
                        <p><strong>Fee Status:</strong> ${loan.feeStatus}</p>
                        <p><strong>Created:</strong> ${new Date(
                          loan.createdAt
                        ).toLocaleDateString()}</p>
                      </div>
                    `,
                      width: 500,
                    })
                  }
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaEye /> View
                </motion.button>
                {loan.status === "Pending" && (
                  <motion.button
                    className="btn btn-sm btn-error flex-1 flex items-center justify-center gap-1"
                    onClick={() => handleCancel(loan._id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaTimes /> Cancel
                  </motion.button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MyLoans;
