import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

import { assets } from "../assets/assets";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  // form input state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState({});   // error state
  const navigate = useNavigate(); // navigate
  const { backend_url, setIsLogedIn ,getUserData} = useAuth();  // useauth context api


  // handle input form fileds
  const handleFormData =  (e) => {
    setFormData((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  };

  // handle form submit
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const validate = {};
    // Name Validation
    if (!formData.name.trim()) {
      validate.name = "Name is required";
    } else if (formData.name.trim().length < 3) {
      validate.name = "Name must be at least 3 characters";
    }

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
        name: "",
        email: "",
        password: "",
      });
      console.log("Form is submited", formData);

      try {
        const{data} = await axios.post(
          `${backend_url}/api/auth/register`,
          formData,
          {withCredentials:true}
        )
        if(data.success){
          setIsLogedIn(true);
          getUserData();
          toast.success(data.message);
          navigate("/home")
        }else{
          toast.error(data.message)
        }
      } catch (error) {
        console.log('Error in Register Api : ',error?.response?.data?.message);
        toast.error(error?.response?.data?.message);
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
            Create Account
          </h2>
          <p className="text-sm text-gray-500 mt-1">Sign up to get started</p>
        </div>

        {/* Full Name Field */}
        {error.name && <span className="text-red-500">*{error.name}</span>}
        <div className="flex items-center gap-3 border border-gray-300 rounded-lg px-4 py-2 mb-4 hover:shadow-md transition">
          <img className="w-5 h-5" src={assets.person_icon} alt="person icon" />
          <input
            className="w-full border-none outline-none text-gray-600 bg-transparent placeholder:text-gray-400"
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleFormData}
          />
        </div>

        {/* Email Field */}
        {error.email && <span className="text-red-500">*{error.email}</span>}
        <div className="flex items-center gap-3 border border-gray-300 rounded-lg px-4 py-2 mb-4 hover:shadow-md transition">
          <img className="w-5 h-5" src={assets.mail_icon} alt="mail icon" />
          <input
            className="w-full border-none outline-none text-gray-600 bg-transparent placeholder:text-gray-400"
            type="text"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleFormData}
          />
        </div>

        {/* Password Field */}
        {error.password && (
          <span className="text-red-500">*{error.password}</span>
        )}
        <div className="flex items-center gap-3 border border-gray-300 rounded-lg px-4 py-2 mb-6 hover:shadow-md transition">
          <img className="w-5 h-5" src={assets.lock_icon} alt="lock icon" />
          <input
            className="w-full border-none outline-none text-gray-600 bg-transparent placeholder:text-gray-400"
            type="password"
            name="password"
            placeholder="Create a password"
            value={formData.password}
            onChange={handleFormData}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-700 transition duration-200 hover:cursor-pointer"
        >
          Register
        </button>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;
