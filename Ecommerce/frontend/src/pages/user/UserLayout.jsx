import React from "react";
import { FaUser, FaListUl, FaHome } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";

const UserLayout = () => {
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
          User Panel
        </h2>

        <nav className="flex flex-col gap-2 text-sm">
          <NavLink to="/dashbord" end className={navLinkClass}>
            <FaHome /> Dashboard
          </NavLink>
          <NavLink to="/dashbord/orders" className={navLinkClass}>
            <FaListUl /> My Orders
          </NavLink>
          <NavLink to="/dashbord/profile" className={navLinkClass}>
            <FaUser /> Profile
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

export default UserLayout;
