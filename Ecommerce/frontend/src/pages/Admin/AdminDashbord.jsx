import React from "react";
import { FaUser, FaBoxOpen, FaDollarSign } from "react-icons/fa";

const AdminDashbord = () => {
  return (
    <>
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-primary">Dashboard Overview</h1>
      </header>

      {/* Stats Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-surface rounded-xl shadow-md p-4 flex items-center gap-4">
          <FaUser className="text-primary text-3xl" />
          <div>
            <p className="text-muted text-sm">Total Users</p>
            <h2 className="text-xl font-bold">1,200</h2>
          </div>
        </div>

        <div className="bg-surface rounded-xl shadow-md p-4 flex items-center gap-4">
          <FaBoxOpen className="text-primary text-3xl" />
          <div>
            <p className="text-muted text-sm">Total Products</p>
            <h2 className="text-xl font-bold">560</h2>
          </div>
        </div>

        <div className="bg-surface rounded-xl shadow-md p-4 flex items-center gap-4">
          <FaDollarSign className="text-primary text-3xl" />
          <div>
            <p className="text-muted text-sm">Monthly Revenue</p>
            <h2 className="text-xl font-bold">$45,300</h2>
          </div>
        </div>
      </section>

      {/* Table Placeholder */}
      <section>
        <div className="bg-surface rounded-xl shadow-md overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="px-6 py-3">User</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Role</th>
                <th className="px-6 py-3">Joined</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="text-color-text">
              <tr className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">Shoaib Khan</td>
                <td className="px-6 py-4">shoaib@example.com</td>
                <td className="px-6 py-4">Admin</td>
                <td className="px-6 py-4">Jun 2024</td>
                <td className="px-6 py-4">
                  <button className="text-danger hover:underline">Delete</button>
                </td>
              </tr>
              {/* Add more rows */}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default AdminDashbord;
