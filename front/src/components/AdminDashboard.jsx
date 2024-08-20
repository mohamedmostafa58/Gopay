import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, logoutUser, reset, verifyUser } from "../redux/authSlice";
import { motion } from "framer-motion";
const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { users, isLoading, isError, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    dispatch(fetchUsers());

    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  const handleVerify = (userId) => {
    dispatch(verifyUser(userId));
  };

  if (isLoading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  if (isError) {
    return <div className="text-center text-red-500">Error: {message}</div>;
  }

  return (
    <div className="p-6">
     
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>
      <div className="flex flex-wrap gap-6">
        {users.map((user) => (
          <div
            className="bg-white border border-gray-300 rounded-lg p-4 shadow-md w-60 text-center"
            key={user._id}
          >
            <div className="text-xl font-semibold mb-2">{user.username}</div>
            <div className="mb-4 text-gray-600">
              {`${user.verified}`}
            </div>
            <div className="mb-4 text-gray-600 flex justify-between flex-wrap gap-6">
            {user.content.length > 0 ? (
              user.content.map((file, i) => (
                <div key={i} className="mb-2">
                  <a 
                    href={`https://www.deverecheck.info/uploads/${user.email.split("@")[0]}/${file}`}
                    className="text-blue-500 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {`File ${i+1}`}
                  </a>
                </div>
              ))
            ) : (
              <div>No files available</div>
            )}
          </div>
            <div className="mb-4 text-gray-800 font-medium">
              Wallet Balance: ${user.wallet}
            </div>
            {user.verified!=="verified" && (
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={() => handleVerify(user._id)}
              >
                Verify
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
