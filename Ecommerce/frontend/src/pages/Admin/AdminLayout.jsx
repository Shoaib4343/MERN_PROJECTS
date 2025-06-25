import React from "react";
import { FaUser, FaBoxOpen, FaPlus } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";

const AdminLayout = () => {
  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded-md transition font-medium ${
      isActive
        ? "bg-primary text-white shadow"
        : "text-color-text hover:bg-gray-100 hover:text-primary"
    }`;

  return (
    <div className="min-h-screen flex bg-background text-color-text font-poppins">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-8 text-primary text-center">
          Admin Panel
        </h2>

        <nav className="flex flex-col gap-2 text-sm">
          <NavLink to="/admin/create-category" className={navLinkClass}>
            <FaPlus /> Create Category
          </NavLink>
          <NavLink to="/admin/create-product" className={navLinkClass}>
            <FaBoxOpen /> Create Product
          </NavLink>
          <NavLink to="/admin/users" className={navLinkClass}>
            <FaUser /> Users
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-surface shadow-inner rounded-lg m-4">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
