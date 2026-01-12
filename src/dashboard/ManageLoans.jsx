// src/dashboard/ManageLoans.jsx
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import useAxiosSecure from "../hooks/useAxiosSecure";
import LoadingSpinner from "../components/LoadingSpinner";

const ManageLoans = () => {
  const axiosSecure = useAxiosSecure();
  const [loans, setLoans] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch Loans
  const fetchLoans = async () => {
    try {
      setLoading(true);
      const res = await axiosSecure.get("/manager/my-loans");
      setLoans(res.data);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to fetch loans", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  // Delete Loan
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete Loan?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
    });

    if (confirm.isConfirmed) {
      try {
        await axiosSecure.delete(`/manager/delete-loan/${id}`);
        toast.success("Loan deleted successfully");
        setLoans(loans.filter((loan) => loan._id !== id));
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to delete loan", "error");
      }
    }
  };

  // Filter loans by search
  const filteredLoans = loans.filter(
    (loan) =>
      loan.title.toLowerCase().includes(search.toLowerCase()) ||
      loan.category.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-4 bg-gradient-to-br from-base-100 to-base-200 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-primary mb-4 md:mb-0">Manage Loans</h2>
        <input
          type="text"
          placeholder="Search by title or category"
          className="input input-bordered w-full max-w-xs"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto rounded-xl">
        <table className="table w-full">
          <thead className="bg-gradient-to-r from-primary to-secondary text-white">
            <tr>
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Interest</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLoans.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-10">
                  <div className="flex flex-col items-center justify-center text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <p className="text-lg">No loans found</p>
                    <p className="text-sm mt-1">Try adjusting your search or add a new loan</p>
                  </div>
                </td>
              </tr>
            )}

            {filteredLoans.map((loan) => (
              <tr key={loan._id} className="hover:bg-base-200 border-b border-base-200">
                <td className="px-4 py-3">
                  <img
                    src={loan.image}
                    alt={loan.title}
                    className="w-20 h-14 rounded object-cover"
                  />
                </td>
                <td className="px-4 py-3 font-semibold">{loan.title}</td>
                <td className="px-4 py-3">{loan.interest}%</td>
                <td className="px-4 py-3">{loan.category}</td>
                <td className="px-4 py-3 text-center space-x-2">
                  <button
                    className="btn btn-xs btn-info"
                    onClick={() =>
                      Swal.fire(
                        "Update Feature",
                        "Use the update-loan page",
                        "info"
                      )
                    }
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-xs btn-error"
                    onClick={() => handleDelete(loan._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4">
        {filteredLoans.length === 0 && (
          <div className="text-center py-10">
            <div className="flex flex-col items-center justify-center text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <p className="text-lg">No loans found</p>
              <p className="text-sm mt-1">Try adjusting your search or add a new loan</p>
            </div>
          </div>
        )}
        
        {filteredLoans.map((loan) => (
          <div key={loan._id} className="card bg-base-100 border border-base-300 rounded-xl shadow-md p-4">
            <div className="flex items-start gap-4">
              <img
                src={loan.image}
                alt={loan.title}
                className="w-20 h-14 rounded object-cover flex-shrink-0"
              />
              <div className="flex-1">
                <h3 className="font-bold text-lg">{loan.title}</h3>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div><span className="text-gray-600 font-medium">Interest:</span> {loan.interest}%</div>
                  <div><span className="text-gray-600 font-medium">Category:</span> {loan.category}</div>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button
                className="btn btn-sm btn-info flex-1"
                onClick={() =>
                  Swal.fire(
                    "Update Feature",
                    "Use the update-loan page",
                    "info"
                  )
                }
              >
                Update
              </button>
              <button
                className="btn btn-sm btn-error flex-1"
                onClick={() => handleDelete(loan._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageLoans;
