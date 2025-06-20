import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { CiMenuFries } from "react-icons/ci";
import { RxCross1, RxTokens } from "react-icons/rx";
import { useAuth } from "../context/auth.context";
import { toast } from "react-toastify";

const Header = () => {
  const [isNav, setIsNav] = useState(false);
  const menuRef = useRef(null);
  // auth context
  const [auth, setAuth] = useAuth();

  // navigate
  const navigate = useNavigate();

  useEffect(() => {
    const menuRefHandler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setIsNav(false);
      }
    };
    document.addEventListener("mousedown", menuRefHandler);

    return () => {
      document.removeEventListener("mousedown", menuRefHandler);
    };
  }, []);

  const handleIsNav = () => {
    setIsNav(!isNav);
  };

  // handle LogouOut
  const handleLogOut = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    navigate("/");
    toast.success("Logout Successfully");
  };

  // helper class for active nav link
  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-gray-300 font-semibold"
      : "text-white hover:text-gray-300 transition";

  return (
    <header className="bg-gray-900 text-white shadow-md sticky top-0 z-50">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-6 py-4">
        {/* Logo */}
        <h1 className="text-2xl font-bold tracking-tight text-gray-100 font-poppins">
          <NavLink to="/" className="text-white">
            EcoMart
          </NavLink>
        </h1>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-10 items-center text-sm font-medium">
          <ol className="flex gap-6">
            <li>
              <NavLink to="/" className={navLinkClass}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/category" className={navLinkClass}>
                Category
              </NavLink>
            </li>
            <li>
              <NavLink to="/cart" className={navLinkClass}>
                Cart
              </NavLink>
            </li>
          </ol>
          <div className="flex gap-3">
            {!auth.user ? (
              <>
                {" "}
                <NavLink
                  to="/login"
                  className="px-4 py-1 border border-gray-300 rounded-md hover:bg-gray-700 transition"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="px-4 py-1 bg-gray-300 text-gray-900 rounded-md hover:bg-gray-200 transition"
                >
                  Register
                </NavLink>
              </>
            ) : (
              <NavLink
                to="/login"
                className="px-4 py-1 bg-gray-300 text-gray-900 rounded-md hover:bg-gray-200 transition"
                onClick={handleLogOut}
              >
                Logout
              </NavLink>
            )}
          </div>
        </nav>

        {/*  Menu Icon */}
        <div
          onClick={handleIsNav}
          className="md:hidden text-3xl cursor-pointer transition duration-300"
        >
          <CiMenuFries />
        </div>
      </div>

      {/* Mobile Menu */}
      <nav
        ref={menuRef}
        className={`fixed top-0 w-64 h-full bg-gray-800 text-white p-6 z-40 transition-all duration-500 ease-in-out md:hidden ${
          isNav ? "right-0" : "-right-full"
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-100">EcoMart</h2>
          <button onClick={handleIsNav} className="text-2xl cursor-pointer">
            <RxCross1 />
          </button>
        </div>
        <ol className="flex flex-col gap-5 text-base">
          <NavLink to="/" onClick={handleIsNav} className={navLinkClass}>
            Home
          </NavLink>
          <NavLink
            to="/category"
            onClick={handleIsNav}
            className={navLinkClass}
          >
            Category
          </NavLink>
          <NavLink to="/cart" onClick={handleIsNav} className={navLinkClass}>
            Cart
          </NavLink>
        </ol>
        <div className="mt-8 flex flex-col gap-3">
          {!auth.user ? (
            <>
              <NavLink
                to="/login"
                onClick={handleIsNav}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-700 transition"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                onClick={handleIsNav}
                className="px-4 py-2 bg-gray-300 text-gray-900 rounded-md hover:bg-gray-200 transition"
              >
                Register
              </NavLink>
            </>
          ) : (
            <NavLink
              to="/login"
              onClick={() => {
                handleIsNav();
                handleLogOut();
              }}
              className="px-4 py-2 bg-gray-300 text-gray-900 rounded-md hover:bg-gray-200 transition"
            >
              Logout
            </NavLink>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
