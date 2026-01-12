import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const LoanCard = ({ loan }) => {
  const {
    _id,
    title,
    image,
    interest,
    maxAmount,
    shortDesc,
  } = loan;

  return (
    <motion.div 
      className="bg-gradient-to-br from-base-100 to-base-200 rounded-xl overflow-hidden border border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300 group"
      whileHover={{ y: -5, scale: 1.02, boxShadow: "0 15px 30px -5px rgba(0, 0, 0, 0.15)" }}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="relative overflow-hidden">
        <figure>
          <img 
            src={image} 
            alt={title} 
            className="w-full h-32 object-cover transition-transform duration-500 group-hover:scale-105" 
          />
        </figure>
      </div>

      <div className="p-4">
        <h2 className="card-title text-lg group-hover:text-primary transition-colors duration-300 truncate">{title}</h2>
        <p className="text-xs text-gray-600 dark:text-gray-300 mt-1 mb-2 line-clamp-2">{shortDesc}</p>

        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="p-2 rounded-lg bg-base-200/50">
            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Interest</p>
            <p className="text-sm font-bold text-primary">{interest}%</p>
          </div>
          <div className="p-2 rounded-lg bg-base-200/50">
            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Max</p>
            <p className="text-sm font-bold text-primary truncate">${maxAmount}</p>
          </div>
        </div>

        <Link 
          to={`/loans/${_id}`} 
          className="btn btn-primary btn-sm w-full"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  );
};

export default LoanCard;
