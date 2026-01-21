import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import LoanCard from "../components/LoanCard";
import SkeletonLoader from "../components/SkeletonLoader";

const AllLoans = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL || "https://loanlink-server-upgrade.vercel.app"}/loans`);
        if (!res.ok) {
          throw new Error("Failed to fetch loans");
        }
        const data = await res.json();
        setLoans(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load loans. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchLoans();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-10 text-center"
        >
          Available Loan Packages
        </motion.h2>
        <SkeletonLoader count={6} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-10 text-center"
        >
          Available Loan Packages
        </motion.h2>
        <div className="text-center mt-20 text-red-500 font-medium">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-10 text-center"
      >
        Available Loan Packages
      </motion.h2>

      {loans.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-gray-500 py-20"
        >
          <p>No loans available at the moment.</p>
        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {loans.map((loan, index) => (
            <motion.div
              key={loan._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <LoanCard loan={loan} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default AllLoans;
