import React from "react";

const UserOrders = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-primary">My Orders</h1>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">Order ID</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Total</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b hover:bg-gray-50">
              <td className="px-6 py-4">#12345</td>
              <td className="px-6 py-4">2025-06-01</td>
              <td className="px-6 py-4">Shipped</td>
              <td className="px-6 py-4">$120</td>
              <td className="px-6 py-4 text-primary hover:underline cursor-pointer">
                View
              </td>
            </tr>
            {/* More orders */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserOrders;
