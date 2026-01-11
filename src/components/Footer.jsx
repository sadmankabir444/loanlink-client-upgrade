import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <footer className="
      bg-gray-100 dark:bg-neutral-900
      text-gray-700 dark:text-gray-300
      transition-colors duration-300
    ">
      <motion.div 
        className="max-w-7xl mx-auto px-6 py-14 grid gap-10 md:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        
        {/* Brand */}
        <motion.div variants={itemVariants}>
          <h2 className="text-3xl font-bold text-primary">LoanLink</h2>
          <p className="mt-4 text-sm leading-relaxed">
            A modern platform to request, manage and track microloans
            with transparency and ease.
          </p>
        </motion.div>

        {/* Links */}
        <motion.div variants={itemVariants}>
          <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
          <ul className="space-y-3 text-sm">
            <motion.li variants={itemVariants} whileHover={{ x: 5 }}>
              <Link className="hover:text-primary transition" to="/">
                Home
              </Link>
            </motion.li>
            <motion.li variants={itemVariants} whileHover={{ x: 5 }}>
              <Link className="hover:text-primary transition" to="/loans">
                All Loans
              </Link>
            </motion.li>
            <motion.li variants={itemVariants} whileHover={{ x: 5 }}>
              <Link className="hover:text-primary transition" to="/dashboard">
                Dashboard
              </Link>
            </motion.li>
          </ul>
        </motion.div>

        {/* Contact */}
        <motion.div variants={itemVariants}>
          <h3 className="font-semibold text-lg mb-4">Contact</h3>
          <p className="text-sm">support@loanlink.com</p>
          <p className="text-sm mt-2">Dhaka, Bangladesh</p>
        </motion.div>
      </motion.div>

      {/* Bottom bar */}
      <motion.div 
        className="
          border-t border-gray-300 dark:border-neutral-700
          py-5 text-center text-sm
        "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        © {new Date().getFullYear()} LoanLink — Built with ❤️ for modern finance
      </motion.div>
    </footer>
  );
};

export default Footer;
