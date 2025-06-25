import React from "react";

const users = [
  {
    id: 1,
    name: "Shoaib Khan",
    email: "shoaib@example.com",
    role: "Admin",
  },
  {
    id: 2,
    name: "Fatima Noor",
    email: "fatima@example.com",
    role: "User",
  },
  {
    id: 3,
    name: "Ali Raza",
    email: "ali@example.com",
    role: "User",
  },
];

const UserList = () => {
  return (
    <div className="p-6 max-w-6xl mx-auto bg-surface rounded-xl shadow-md mt-6">
      <h2 className="text-2xl font-semibold text-primary mb-6">User List</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 text-sm">
            <tr>
              <th className="px-6 py-3 text-left font-medium text-gray-700">#</th>
              <th className="px-6 py-3 text-left font-medium text-gray-700">Name</th>
              <th className="px-6 py-3 text-left font-medium text-gray-700">Email</th>
              <th className="px-6 py-3 text-left font-medium text-gray-700">Role</th>
              <th className="px-6 py-3 text-left font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 text-sm">
            {users.map((user, index) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-3">{index + 1}</td>
                <td className="px-6 py-3 font-medium text-color-text">{user.name}</td>
                <td className="px-6 py-3">{user.email}</td>
                <td className="px-6 py-3">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      user.role === "Admin"
                        ? "bg-green-100 text-green-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-3 space-x-2">
                  <button className="text-blue-600 hover:underline">View</button>
                  <button className="text-yellow-600 hover:underline">Edit</button>
                  <button className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
