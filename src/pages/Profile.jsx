import React from "react";
import { useSelector } from "react-redux";

export default function Profile() {
  const user = useSelector((state) => state.auth.userData);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg text-gray-700">
        Please log in to view your profile.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-cyan-500 mb-6">Your Profile</h1>

      <div className="bg-white/10 rounded-xl p-6 shadow-lg space-y-4 text-gray-100">
        <div>
          <span className="block text-sm text-gray-400">Name</span>
          <span className="text-lg font-medium">{user.name || "No name set"}</span>
        </div>

        <div>
          <span className="block text-sm text-gray-400">Email</span>
          <span className="text-lg font-medium">{user.email}</span>
        </div>

        {user.$id && (
          <div>
            <span className="block text-sm text-gray-400">User ID</span>
            <span className="text-lg font-mono">{user.$id}</span>
          </div>
        )}

        <div className="pt-4">
          <p className="text-sm text-gray-400">
            Joined: {user.registration ? new Date(user.registration).toLocaleDateString() : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
}
