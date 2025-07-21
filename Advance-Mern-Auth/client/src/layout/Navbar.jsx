import React from "react";
import { assets } from "../assets/assets.js";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import axios from "axios";
import toast from "react-hot-toast";

const Navbar = () => {
  const { userData, backend_url, setIsLogedIn, setUserData } = useAuth();
  const navigate = useNavigate();

  const handleSendVerifyEmailOtp = async () => {
    axios.defaults.withCredentials = true;
    try {
      const { data } = await axios.post(`${backend_url}/api/auth/send-verify-otp`);
      if (data.success) {
        toast.success(data.message);
        navigate("/email-verify");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Something went wrong!";
      toast.error(errorMessage);
    }
  };

  // handle logout
  const handleLogOut = async () => {
    try {
      const { data } = await axios.post(
        `${backend_url}/api/auth/logout`,
        {},
        { withCredentials: true }
      );
      if (data.success) {
        setIsLogedIn(false);
        setUserData(false);
        toast.success(data.message);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <>
      <nav className="w-full flex justify-between items-center  p-4  sm:py-6 sm:px-24 absolute top-0">
        <img
          onClick={() => navigate("/")}
          className="w-28 sm:w-32  cursor-pointer"
          src={assets.logo}
          alt="logo image"
        />

        {userData ? (
          <div className="w-10 h-10 flex justify-center items-center cursor-pointer bg-black text-white text-lg rounded-full font-semibold relative group">
            {userData.name[0].toUpperCase()}

            <ul className="absolute top-12 right-0 w-48 bg-white rounded-xl text-gray-700 text-sm shadow-xl space-y-1 p-2 transform scale-0 opacity-0 transition duration-300 origin-top-right group-hover:scale-100 group-hover:opacity-100 border border-gray-100">
              {!userData.isVerified && (
                <li
                  onClick={handleSendVerifyEmailOtp}
                  className="flex justify-start items-center gap-2 w-full px-4 py-2 rounded-md hover:bg-gray-100 cursor-pointer transition duration-200"
                >
                  <img src={assets.mail_icon} alt="" /> Verify Email
                </li>
              )}

              <li
                onClick={handleLogOut}
                className="flex justify-start items-center  gap-2 w-full px-4 py-2 rounded-md hover:bg-gray-100 cursor-pointer transition duration-200"
              >
                <img src={assets.lock_icon} alt="" /> Logout
              </li>
            </ul>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="flex justify-between items-center gap-2 border border-gray-500 rounded-full py-2 px-6 cursor-pointer text-gray-800 hover:bg-gray-100 transition-all"
          >
            <span>Login</span>
            <img src={assets.arrow_icon} alt="" />
          </button>
        )}
      </nav>
    </>
  );
};

export default Navbar;
