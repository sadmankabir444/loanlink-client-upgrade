import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import LoanCard from "../components/LoanCard";
import SkeletonLoader from "../components/SkeletonLoader";

const ExploreLoans = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortOption, setSortOption] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);
  const [interestFilter, setInterestFilter] = useState("all");
  const [amountFilter, setAmountFilter] = useState("all");

  // Sample categories
  const categories = ["all", "Business", "Education", "Personal", "Home", "Auto"];

  useEffect(() => {
    // Simulate API call
    const fetchLoans = async () => {
      try {
        const res = await fetch("http://localhost:3000/loans");
        if (!res.ok) throw new Error("Failed to fetch loans");
        const data = await res.json();
        setLoans(data);
      } catch (error) {
        console.error("Error fetching loans:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLoans();
  }, []);

  // Filter and sort loans
  const filteredAndSortedLoans = useMemo(() => {
    let filtered = loans.filter(loan => {
      const matchesSearch = loan.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           loan.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           loan.category.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = categoryFilter === "all" || loan.category.toLowerCase() === categoryFilter.toLowerCase();
      
      let matchesInterest = true;
      if (interestFilter !== "all") {
        if (interestFilter === "low") matchesInterest = loan.interest <= 5;
        else if (interestFilter === "medium") matchesInterest = loan.interest > 5 && loan.interest <= 10;
        else if (interestFilter === "high") matchesInterest = loan.interest > 10;
      }
      
      let matchesAmount = true;
      if (amountFilter !== "all") {
        if (amountFilter === "small") matchesAmount = loan.maxAmount <= 10000;
        else if (amountFilter === "medium") matchesAmount = loan.maxAmount > 10000 && loan.maxAmount <= 50000;
        else if (amountFilter === "large") matchesAmount = loan.maxAmount > 50000;
      }

      return matchesSearch && matchesCategory && matchesInterest && matchesAmount;
    });

    // Sort loans
    switch (sortOption) {
      case "interest-low":
        filtered.sort((a, b) => a.interest - b.interest);
        break;
      case "interest-high":
        filtered.sort((a, b) => b.interest - a.interest);
        break;
      case "amount-low":
        filtered.sort((a, b) => a.maxAmount - b.maxAmount);
        break;
      case "amount-high":
        filtered.sort((a, b) => b.maxAmount - a.maxAmount);
        break;
      case "name-asc":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "name-desc":
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        // Default sorting - by creation date or id
        break;
    }

    return filtered;
  }, [loans, searchTerm, categoryFilter, sortOption, interestFilter, amountFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedLoans.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedLoans = filteredAndSortedLoans.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 dark:text-white">
          Explore Loan Options
        </h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Discover the perfect loan solution tailored to your financial needs. Filter by category, interest rate, and more.
        </p>
      </motion.div>

      {/* Filters Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg mb-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Search */}
          <div className="lg:col-span-2">
            <input
              type="text"
              placeholder="Search loans..."
              className="input input-bordered w-full"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          {/* Category Filter */}
          <div>
            <select
              className="select select-bordered w-full"
              value={categoryFilter}
              onChange={(e) => {
                setCategoryFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </option>
              ))}
            </select>
          </div>

          {/* Interest Filter */}
          <div>
            <select
              className="select select-bordered w-full"
              value={interestFilter}
              onChange={(e) => {
                setInterestFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="all">All Interest Rates</option>
              <option value="low">Low (≤5%)</option>
              <option value="medium">Medium (5%-10%)</option>
              <option value="high">High (&gt;10%)</option>
            </select>
          </div>

          {/* Amount Filter */}
          <div>
            <select
              className="select select-bordered w-full"
              value={amountFilter}
              onChange={(e) => {
                setAmountFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="all">All Amounts</option>
              <option value="small">Small (≤$10,000)</option>
              <option value="medium">Medium ($10,001-$50,000)</option>
              <option value="large">Large (&gt;$50,000)</option>
            </select>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-4 items-center">
          <div className="flex items-center">
            <span className="mr-2 text-gray-600 dark:text-gray-300">Sort by:</span>
            <select
              className="select select-bordered"
              value={sortOption}
              onChange={(e) => {
                setSortOption(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="default">Default</option>
              <option value="interest-low">Interest: Low to High</option>
              <option value="interest-high">Interest: High to Low</option>
              <option value="amount-low">Amount: Low to High</option>
              <option value="amount-high">Amount: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
            </select>
          </div>

          <div className="ml-auto text-sm text-gray-600 dark:text-gray-300">
            Showing {paginatedLoans.length} of {filteredAndSortedLoans.length} loans
          </div>
        </div>
      </motion.div>

      {/* Results Section */}
      {loading ? (
        <SkeletonLoader count={9} />
      ) : filteredAndSortedLoans.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">No loans found</h3>
          <p className="text-gray-600 dark:text-gray-400">Try adjusting your filters to see more results.</p>
        </motion.div>
      ) : (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
          >
            {paginatedLoans.map((loan, index) => (
              <motion.div
                key={loan._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <LoanCard loan={loan} />
              </motion.div>
            ))}
          </motion.div>

          {/* Pagination */}
          {totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-center items-center gap-2"
            >
              <button
                className={`btn btn-outline ${currentPage === 1 ? "btn-disabled" : ""}`}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  className={`btn ${currentPage === page ? "btn-primary" : "btn-outline"}`}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              ))}
              
              <button
                className={`btn btn-outline ${currentPage === totalPages ? "btn-disabled" : ""}`}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </motion.div>
          )}
        </>
      )}
    </div>
  );
};

export default ExploreLoans;