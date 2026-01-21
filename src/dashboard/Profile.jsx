import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../providers/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";
import LoadingSpinner from "../components/LoadingSpinner";
import { FaUserCircle, FaEnvelope, FaUserTag, FaCamera } from "react-icons/fa";


const Profile = () => {
  const { user, updateUserProfile } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchProfile = async () => {
      try {
        const res = await axiosSecure.get(`/users/${user.email}`);
        setProfile(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user?.email]);

  if (loading) return <LoadingSpinner />;

  const updateFirebaseProfile = async (name, photoUrl) => {
    try {
      // Update Firebase profile
      await updateUserProfile(name, photoUrl);
      
      // Update backend profile
      await axiosSecure.patch('/users/profile', { name, photoURL: photoUrl });
      
      // Refresh the profile data to update the UI
      const res = await axiosSecure.get(`/users/${user.email}`);
      setProfile(res.data);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <motion.div 
      className="max-w-4xl mx-auto p-6 space-y-8 bg-gradient-to-br from-base-100 to-base-200 min-h-screen py-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header Card */}
      <motion.div 
        className="bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 dark:from-indigo-900 dark:via-purple-800 dark:to-pink-900 
                        text-gray-900 dark:text-white rounded-3xl p-10 shadow-xl flex flex-col items-center space-y-4 transition-colors duration-500"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
        >
          {profile?.photoURL || user?.photoURL ? (
            <img 
              src={profile.photoURL || user.photoURL} 
              alt={profile?.name || "User"} 
              className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white shadow-lg"
            />
          ) : (
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-indigo-200 to-purple-300 flex items-center justify-center border-4 border-white shadow-lg">
              <FaUserCircle className="text-6xl md:text-7xl text-indigo-600" />
            </div>
          )}
        </motion.div>
        <motion.h2 
          className="text-3xl md:text-4xl font-bold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {profile?.name || "N/A"}
        </motion.h2>
        <motion.p 
          className="opacity-80 text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {profile?.role}
        </motion.p>
        
        {/* Update Profile Image */}
        <div className="mt-6">
          <label className="btn btn-outline btn-sm">
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  const file = e.target.files[0];
                  const reader = new FileReader();
                  
                  reader.onloadend = () => {
                    updateFirebaseProfile(profile?.name || user?.displayName, reader.result);
                  };
                  
                  reader.readAsDataURL(file);
                }
              }}
            />
            <FaCamera className="mr-2" /> Change Photo
          </label>
        </div>
      </motion.div>

      {/* Account Details */}
      <motion.div 
        className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 transition-colors duration-500"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <motion.h3 
          className="text-2xl font-semibold border-b border-gray-300 dark:border-gray-700 pb-3 mb-6
                         text-gray-900 dark:text-gray-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          Account Details
        </motion.h3>

        <motion.div 
          className="flex flex-col md:flex-row md:items-center md:gap-6 mb-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex items-center gap-3 mb-3 md:mb-0">
            <FaEnvelope className="text-indigo-500 text-xl" />
            <span className="text-gray-900 dark:text-gray-200">{profile?.email}</span>
          </div>
          <div className="flex items-center gap-3">
            <FaUserTag className="text-purple-500 text-xl" />
            <span className="text-gray-900 dark:text-gray-200">{profile?.role}</span>
          </div>
        </motion.div>

        {/* Optional extra info */}
        {profile?.phone && (
          <motion.div 
            className="flex items-center gap-3 mt-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9 }}
          >
            <FaUserTag className="text-green-500 text-xl" />
            <span className="text-gray-900 dark:text-gray-200">{profile.phone}</span>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Profile;
