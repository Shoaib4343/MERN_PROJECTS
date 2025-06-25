import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { CiMenuFries } from "react-icons/ci";
import { RxCross1 } from "react-icons/rx";
import { useAuth } from "../context/auth.context";
import { toast } from "react-toastify";

const Header = () => {
  const [isNav, setIsNav] = useState(false);
  const menuRef = useRef(null);
  const [auth, setAuth] = useAuth();
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

  const handleLogOut = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    navigate("/");
    toast.success("Logout Successfully");
  };

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-primary font-semibold"
      : "text-color-text hover:text-primary transition";

  return (
    <header className="bg-surface text-color-text shadow-md sticky top-0 z-50 font-poppins">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-6 py-4">
        {/* Logo */}
        <h1 className="text-2xl font-bold tracking-tight text-primary">
          <NavLink to="/" className="text-primary">
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
                <NavLink
                  to="/login"
                  className="px-4 py-2 border border-muted text-muted rounded-md hover:bg-primary-hover hover:text-white transition"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-hover transition"
                >
                  Register
                </NavLink>
              </>
            ) : (
              // <NavLink
              //   to="/login"
              //   onClick={handleLogOut}
              //   className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-hover transition"
              // >
              //   Logout
              // </NavLink>
              <div className="group relative inline-block">
                <button className="px-4 py-2 bg-primary text-white rounded ">
                  {auth?.user?.name}
                </button>

                <div className="absolute  right-0 top-10 w-40 bg-white text-black rounded shadow-md opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-50 border border-gray-200">
                  <NavLink
                    to={`${auth?.user?.role === 1 ? '/admin' : '/dashbord'}`}
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Dashboard
                  </NavLink>
                  <NavLink
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Profile
                  </NavLink>
                  <button
                    onClick={handleLogOut}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Burger Menu */}
        <div
          onClick={handleIsNav}
          className="md:hidden text-3xl cursor-pointer transition"
        >
          <CiMenuFries />
        </div>
      </div>

      {/* Mobile Menu */}
      <nav
        ref={menuRef}
        className={`fixed top-0 w-64 h-full bg-surface text-color-text p-6 z-40 transition-all duration-500 ease-in-out md:hidden ${
          isNav ? "right-0" : "-right-full"
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-primary">EcoMart</h2>
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
                className="px-4 py-2 border border-muted text-muted rounded-md hover:bg-primary-hover hover:text-white transition"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                onClick={handleIsNav}
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-hover transition"
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
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-hover transition"
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
