// src/pages/LoanDetails.jsx
import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

import useAxiosSecure from "../hooks/useAxiosSecure";
import LoadingSpinner from "../components/LoadingSpinner";
import { AuthContext } from "../providers/AuthProvider";

const LoanDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [loan, setLoan] = useState(null);
  const [role, setRole] = useState("");
  const [pageLoading, setPageLoading] = useState(true);

  // =====================
  // Fetch loan & user role
  // =====================
  useEffect(() => {
    
    if (!user?.email) return;

    setPageLoading(true);

    const fetchData = async () => {
      try {
        const [loanRes, userRes] = await Promise.all([
          axiosSecure.get(`/loans/${id}`),
          axiosSecure.get(`/users/${user.email}`),
        ]);

        setLoan(loanRes.data);
        setRole(userRes.data?.role || "");
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to fetch loan details", "error");
      } finally {
        setPageLoading(false);
      }
    };

    fetchData();
  }, [id, user, axiosSecure]);

  // =====================
  // Loading state
  // =====================
  if (authLoading || pageLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  // =====================
  // Loan not found
  // =====================
  if (!loan?._id) {
    return (
      <div className="text-center mt-24">
        <h2 className="text-2xl font-bold">Loan not found</h2>
        <p className="opacity-70 mt-2">
          The loan you are trying to view does not exist.
        </p>
      </div>
    );
  }

  const canApply = role === "borrower";
  
  // Calculate loan benefits
  const calculateBenefits = () => {
    const maxAmount = loan.maxAmount || 0;
    const interestRate = loan.interest || 0;
    const monthlyPayment = (maxAmount * (1 + interestRate / 100)) / 12;
    
    return {
      maxAmount,
      interestRate,
      monthlyPayment,
      totalRepayment: maxAmount * (1 + interestRate / 100)
    };
  };
  
  const benefits = calculateBenefits();

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-800 dark:text-white">
          {loan.title}
        </h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          {loan.description}
        </p>
      </motion.div>
      
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl overflow-hidden shadow-xl"
          >
            <img
              src={loan.image}
              alt={loan.title}
              className="w-full h-96 object-cover"
            />
          </motion.div>
          
          {/* Overview Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Loan Overview</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-300">Category</span>
                  <span className="font-semibold text-gray-800 dark:text-white">{loan.category}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-300">Interest Rate</span>
                  <span className="font-semibold text-gray-800 dark:text-white">{loan.interest}%</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-300">Maximum Amount</span>
                  <span className="font-semibold text-gray-800 dark:text-white">$ {loan.maxAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-300">EMI Plans</span>
                  <span className="font-semibold text-gray-800 dark:text-white">{loan.emiPlans?.join(", ")} months</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-300">Required Documents</span>
                  <span className="font-semibold text-gray-800 dark:text-white">{loan.requiredDocs || "N/A"}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-300">Processing Time</span>
                  <span className="font-semibold text-gray-800 dark:text-white">24-48 Hours</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-300">Eligibility</span>
                  <span className="font-semibold text-gray-800 dark:text-white">Credit Score 550+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-300">Status</span>
                  <span className="font-semibold text-green-600 dark:text-green-400">Available</span>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Description Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Description & Benefits</h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {loan.description}
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>Competitive interest rates starting from {loan.interest}%</li>
                <li>Flexible repayment options up to {Math.max(...loan.emiPlans || [12])} months</li>
                <li>Quick approval process with minimal paperwork</li>
                <li>Online application and tracking</li>
                <li>No hidden fees or charges</li>
              </ul>
            </div>
          </motion.div>
          
          {/* Reviews Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Customer Reviews</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                  JD
                </div>
                <div>
                  <div className="flex items-center space-x-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461c.969 0 1.371-1.24.588-1.81l-2.8-2.034z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    "The loan approval was incredibly fast. I had the funds in my account within 24 hours. Highly recommend!"
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">John Doe, Small Business Owner</p>
                </div>
              </div>
              <div className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-white font-bold">
                  SA
                </div>
                <div>
                  <div className="flex items-center space-x-1 mb-1">
                    {[...Array(4)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461c.969 0 1.371-1.24.588-1.81l-2.8-2.034z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    "Excellent customer service and transparent terms. Made my home improvement project possible."
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Sarah Adams, Homeowner</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Sidebar */}
        <div className="space-y-8">
          {/* Apply Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-gradient-to-br from-primary to-secondary text-white rounded-2xl p-6 shadow-lg sticky top-24"
          >
            <h3 className="text-xl font-bold mb-4">Apply for this Loan</h3>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span>Monthly Payment</span>
                <span className="font-bold">$ {(benefits.maxAmount * (1 + benefits.interestRate / 100) / 12).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Repayment</span>
                <span className="font-bold">$ {benefits.totalRepayment.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Interest Rate</span>
                <span className="font-bold">{loan.interest}%</span>
              </div>
            </div>
            
            <button
              disabled={!canApply}
              onClick={() => navigate(`/apply-loan/${loan._id}`)}
              className={`btn w-full ${canApply ? "btn-accent text-primary" : "btn-disabled"}`}
            >
              Apply Now
            </button>
            
            {!canApply && (
              <p className="text-xs text-red-200 mt-3 text-center">
                Only borrowers are allowed to apply for loans.
              </p>
            )}
          </motion.div>
          
          {/* Related Loans */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
          >
            <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">Related Loans</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                <img src="https://placehold.co/60x40" alt="Business Loan" className="w-15 h-10 object-cover rounded" />
                <div>
                  <p className="font-medium text-gray-800 dark:text-white">Business Loan</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">7.5% Interest</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                <img src="https://placehold.co/60x40" alt="Education Loan" className="w-15 h-10 object-cover rounded" />
                <div>
                  <p className="font-medium text-gray-800 dark:text-white">Education Loan</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">6.8% Interest</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                <img src="https://placehold.co/60x40" alt="Home Loan" className="w-15 h-10 object-cover rounded" />
                <div>
                  <p className="font-medium text-gray-800 dark:text-white">Home Loan</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">5.2% Interest</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Info Note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-6"
          >
            <h3 className="text-lg font-bold mb-2 text-blue-800 dark:text-blue-200 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Important Information
            </h3>
            <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
              <li>• Review terms carefully before applying</li>
              <li>• Ensure you can afford monthly payments</li>
              <li>• Late payments may incur additional fees</li>
              <li>• Prepayment may be allowed without penalty</li>
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LoanDetails;
