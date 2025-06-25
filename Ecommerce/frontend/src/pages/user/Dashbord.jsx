import React from "react";

const Dashbord = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-primary">Welcome Back!</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow p-5">
          <h2 className="text-muted text-sm mb-1">Orders</h2>
          <p className="text-2xl font-bold text-primary">14</p>
        </div>
        <div className="bg-white rounded-xl shadow p-5">
          <h2 className="text-muted text-sm mb-1">Wishlist</h2>
          <p className="text-2xl font-bold text-primary">6</p>
        </div>
        <div className="bg-white rounded-xl shadow p-5">
          <h2 className="text-muted text-sm mb-1">Last Order</h2>
          <p className="text-2xl font-bold text-primary">June 2025</p>
        </div>
      </div>
    </div>
  );
};

export default Dashbord;
