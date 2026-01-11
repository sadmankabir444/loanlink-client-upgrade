import React from "react";
import { motion } from "framer-motion";

const LoadingSpinner = ({ text = "Loading, please wait..." }) => {
  return (
    <motion.div 
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 dark:from-gray-900 dark:to-gray-800"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div 
        className="flex flex-col items-center gap-6 p-8 rounded-2xl bg-white/70 dark:bg-gray-900/60 backdrop-blur-xl shadow-xl border border-white/40 dark:border-gray-700"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        
        {/* Spinner */}
        <motion.div 
          className="relative w-20 h-20"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <span className="absolute inset-0 rounded-full border-4 border-blue-500/30"></span>
          <span className="absolute inset-0 rounded-full border-4 border-t-blue-600 animate-spin"></span>
        </motion.div>

        {/* Text */}
        <motion.div 
          className="text-center space-y-1"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            {text}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 animate-pulse">
            Please don’t refresh the page
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default LoadingSpinner;
