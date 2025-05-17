import React from 'react';

const Profile = ({ user, onLogout }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm text-center">
        <h2 className="text-2xl font-bold mb-6">Profile</h2>
        <div className="mb-4">
          <span className="block text-gray-700 font-semibold mb-2">Email:</span>
          <span className="text-gray-900">{user?.email || 'Unknown'}</span>
        </div>
        <button onClick={onLogout} className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-700 font-semibold mt-6">Logout</button>
      </div>
    </div>
  );
};

export default Profile; 