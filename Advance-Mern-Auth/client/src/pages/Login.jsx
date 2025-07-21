import axios from "axios";

import { useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const Login = () => {
  // form state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({}); // error state
  const navigate = useNavigate(); // navigate

  // useauth context api
  const { backend_url, setIsLogedIn ,getUserData} = useAuth();

  // handle input form fields
  const handleFormData = (e) => {
    setFormData((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  };

  // handle Form submit
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    let validate = {};
    // Email Validation
    if (!formData.email.trim()) {
      validate.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      validate.email = "Email is not valid";
    }

    // Password Validation
    if (!formData.password) {
      validate.password = "Password is required";
    } else if (formData.password.length < 6) {
      validate.password = "Password must be at least 6 characters";
    }

    if (Object.keys(validate).length === 0) {
      setError({});
      setFormData({
        email: "",
        password: "",
      });
      console.log("submited data", formData);

      try {
        const { data } = await axios.post(
        `${backend_url}/api/auth/login`,
        formData,
        { withCredentials: true }
      );

      if (data.success) {
        setIsLogedIn(true)
        getUserData();
        navigate("/");
        toast.success(data.message)
      }
        
      } catch (error) {
        console.log("error in login api calling : ",error?.response?.data?.message);
        toast.error(error?.response?.data?.message || "Login Failed");
      }
    } else {
      setError(validate);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleFormSubmit}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl px-8 py-10"
      >
        <div className="text-center mb-6">
          <img src={assets.logo} alt="Logo" className="mx-auto w-20 mb-4" />
          <h2 className="text-3xl font-extrabold text-gray-800">
            Welcome Back
          </h2>
          <p className="text-sm text-gray-500 mt-1">Login to your account</p>
        </div>

        {error.email && <span className="text-red-500">{error.email}</span>}
        <div className="flex items-center gap-3 border border-gray-300 rounded-lg px-4 py-2 mb-4 hover:shadow-md transition">
          <img className="w-5 h-5" src={assets.mail_icon} alt="person icon" />
          <input
            className="w-full border-none outline-none text-gray-600 bg-transparent placeholder:text-gray-400"
            type="text"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleFormData}
          />
        </div>

        {error.password && (
          <span className="text-red-500">{error.password}</span>
        )}
        <div className="flex items-center gap-3 border border-gray-300 rounded-lg px-4 py-2 mb-6 hover:shadow-md transition">
          <img className="w-5 h-5" src={assets.lock_icon} alt="lock icon" />
          <input
            className="w-full border-none outline-none text-gray-600 bg-transparent placeholder:text-gray-400"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleFormData}
          />
        </div>

        {/* ➕ Forgot Password */}
        <div className="text-left  mb-2">
          <span
            onClick={() => navigate("/reset-password")}
            className="text-sm text-blue-600 hover:underline cursor-pointer"
          >
            Forgot Password?
          </span>
        </div>

        <button
          type="submit"
          className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-700 transition duration-200 hover:cursor-pointer"
        >
          Login
        </button>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don’t have an account?{" "}
          <span 
            onClick={()=>navigate("/register")}
           className="text-blue-600 cursor-pointer hover:underline">
            Sign up
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
