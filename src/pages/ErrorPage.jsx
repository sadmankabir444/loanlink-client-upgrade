import { Link, useRouteError } from "react-router-dom";
import { motion } from "framer-motion";

const ErrorPage = () => {
  const error = useRouteError();

  const status = error?.status || 500;
  const message =
    error?.statusText ||
    error?.message ||
    "Something went wrong. Please try again.";

  return (
    <motion.div 
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 to-orange-100 dark:from-gray-900 dark:to-gray-800 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="max-w-xl w-full text-center bg-white/80 dark:bg-gray-900/70 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-white/40 dark:border-gray-700"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >

        {/* Status Code */}
        <motion.h1 
          className="text-7xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {status}
        </motion.h1>

        {/* Title */}
        <motion.h2 
          className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Oops! Something broke
        </motion.h2>

        {/* Message */}
        <motion.p 
          className="text-gray-600 dark:text-gray-400 mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          {message}
        </motion.p>

        {/* Actions */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <motion.a
            href="/"
            className="px-6 py-3 rounded-xl font-medium bg-orange-500 text-white hover:bg-orange-600 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Go Home
          </motion.a>

          <motion.button
            onClick={() => window.location.reload()}
            className="px-6 py-3 rounded-xl font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Reload Page
          </motion.button>
        </motion.div>

        {/* Footer hint */}
        <motion.p 
          className="mt-8 text-sm text-gray-500 dark:text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          If the problem persists, please contact support.
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default ErrorPage;
