import React from "react";

const UserProfile = () => {
  return (
    <div className="space-y-6 max-w-xl">
      <h1 className="text-2xl font-semibold text-primary">My Profile</h1>

      <form className="space-y-4 bg-white p-6 rounded-xl shadow">
        <div>
          <label className="block text-sm text-muted mb-1">Full Name</label>
          <input
            type="text"
            placeholder="John Doe"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-primary"
          />
        </div>

        <div>
          <label className="block text-sm text-muted mb-1">Email</label>
          <input
            type="email"
            placeholder="john@example.com"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-primary"
          />
        </div>

        <div>
          <label className="block text-sm text-muted mb-1">Phone</label>
          <input
            type="text"
            placeholder="+92 300 1234567"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-primary"
          />
        </div>

        <button
          type="submit"
          className="mt-4 bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-hover transition"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UserProfile;
