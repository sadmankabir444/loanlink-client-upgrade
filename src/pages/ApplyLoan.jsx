import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthContext } from "../providers/AuthProvider";
import toast from "react-hot-toast";

const ApplyLoan = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [loan, setLoan] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Fetch loan details
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || "https://loanlink-server-upgrade.vercel.app"}/loans/${id}`)
      .then(res => res.json())
      .then(data => setLoan(data))
      .catch(err => toast.error("Failed to fetch loan details"));
  }, [id]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!loan) return;

    setSubmitting(true);
    const form = e.target;

    const application = {
      loanId: id,
      loanTitle: loan.title,
      interest: loan.interest,
      email: user.email,
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      phone: form.phone.value,
      nid: form.nid.value,
      incomeSource: form.incomeSource.value,
      monthlyIncome: form.monthlyIncome.value,
      loanAmount: form.loanAmount.value,
      reason: form.reason.value,
      address: form.address.value,
      notes: form.notes.value,
      status: "Pending",
      feeStatus: "Unpaid",
      createdAt: new Date(),
    };

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || "https://loanlink-server-upgrade.vercel.app"}/loan-applications`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(application),
      });
      if (!res.ok) throw new Error("Submission failed");

      toast.success("Loan Application Submitted!");
      navigate("/dashboard/my-loans");
    } catch (err) {
      toast.error(err.message || "Failed to submit application");
    } finally {
      setSubmitting(false);
    }
  };

  if (!loan) return <div className="text-center mt-20"><span className="loading loading-spinner loading-lg"></span></div>;

  return (
    <motion.div 
      className="max-w-4xl mx-auto px-4 py-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2 
        className="text-2xl font-bold mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Apply for {loan.title}
      </motion.h2>

      <motion.form 
        onSubmit={handleSubmit}
        className="grid md:grid-cols-2 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {/* Auto-filled fields */}
        <motion.input 
          readOnly 
          value={user.email} 
          className="input input-bordered bg-gray-100 dark:bg-gray-700" 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        />
        <motion.input 
          readOnly 
          value={loan.title} 
          className="input input-bordered bg-gray-100 dark:bg-gray-700" 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        />
        <motion.input 
          readOnly 
          value={`${loan.interest}%`} 
          className="input input-bordered bg-gray-100 dark:bg-gray-700" 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
        />

        {/* User input fields */}
        <motion.input 
          name="firstName" 
          placeholder="First Name" 
          className="input input-bordered" 
          required 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
        />
        <motion.input 
          name="lastName" 
          placeholder="Last Name" 
          className="input input-bordered" 
          required 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.9 }}
        />
        <motion.input 
          name="phone" 
          placeholder="Contact Number" 
          className="input input-bordered" 
          required 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.0 }}
        />
        <motion.input 
          name="nid" 
          placeholder="NID / Passport" 
          className="input input-bordered" 
          required 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.1 }}
        />
        <motion.input 
          name="incomeSource" 
          placeholder="Income Source" 
          className="input input-bordered" 
          required 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2 }}
        />
        <motion.input 
          name="monthlyIncome" 
          placeholder="Monthly Income" 
          className="input input-bordered" 
          required 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.3 }}
        />
        <motion.input 
          name="loanAmount" 
          placeholder="Loan Amount" 
          className="input input-bordered" 
          required 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.4 }}
        />

        <motion.textarea 
          name="reason" 
          placeholder="Reason for Loan" 
          className="textarea textarea-bordered md:col-span-2" 
          required 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.5 }}
        />
        <motion.textarea 
          name="address" 
          placeholder="Address" 
          className="textarea textarea-bordered md:col-span-2" 
          required 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.6 }}
        />
        <motion.textarea 
          name="notes" 
          placeholder="Extra Notes" 
          className="textarea textarea-bordered md:col-span-2" 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.7 }}
        />

        {/* Submit button with spinner */}
        <motion.button
          type="submit"
          disabled={submitting}
          className={`btn btn-primary md:col-span-2 flex justify-center items-center gap-2 ${submitting ? "opacity-70 cursor-not-allowed" : ""}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8 }}
          whileHover={!submitting ? { scale: 1.03 } : {}}
          whileTap={!submitting ? { scale: 0.98 } : {}}
        >
          {submitting && <span className="loading loading-spinner loading-sm"></span>}
          {submitting ? "Submitting..." : "Submit Application"}
        </motion.button>
      </motion.form>
    </motion.div>
  );
};

export default ApplyLoan;
