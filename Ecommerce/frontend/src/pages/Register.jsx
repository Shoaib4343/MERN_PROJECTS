import React, { useState } from "react";
import { registerApi } from "../apis/Auth.api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  // usestaet for user input fields data
  const [inputData, setInputData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    answer: '',
  });
  const [error, setError] = useState({});
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  //   handle input datea fucntion
  const handleInputData = (e) => {
    setInputData((pre) => ({
      ...pre,
      [e.target.name]: e.target.value,
    }));
    setServerError(""); // clear error on typing
  };

  //   handle form fucntion prevent default
  const handleForm = async (e) => {
    e.preventDefault();

    let validate = {};
    if (!inputData.name) validate.name = "name is required";
    if (!inputData.email) validate.email = "email is required";
    if (!inputData.password) validate.password = "password is required";
    if (!inputData.phone) validate.phone = "phone is required";
    if (!inputData.address) validate.address = "address is required";
    if (!inputData.answer) validate.answer = "pet name is required";

    if (Object.keys(validate).length === 0) {
      try {
        setError({});
        const res = await registerApi(inputData);
        toast.success(res.data.message);

        console.log(res.data);
        setInputData({
          name: "",
          email: "",
          password: "",
          phone: "",
          address: "",
          answer: '',

        });
        setServerError("");

        navigate("/login");
      } catch (error) {
        console.log("Error in Registrations ", error.response?.data);
        if (error.response?.data?.error) {
          setServerError(error.response.data.error); // show Joi error
        } else {
          setServerError("Something went wrong. Try again.");
        }
      }
    } else {
      setError(validate);
    }
  };
  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-4 py-8 font-poppins text-color-text">
      <form
        onSubmit={handleForm}
        className="w-full max-w-2xl bg-surface backdrop-blur-md p-10 rounded-2xl shadow-xl border border-muted/30"
      >
        <h2 className="text-center text-4xl font-semibold text-primary mb-8 tracking-tight underline underline-offset-4">
          Register your account
        </h2>

        {serverError && (
          <p className="text-danger text-center text-sm mb-4 font-medium">
            {serverError}
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="text-sm font-medium text-muted mb-1 block">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="John Doe"
              value={inputData.name}
              onChange={handleInputData}
              className="bg-background w-full px-4 py-3  rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition "
            />
            {error.name && <p className="text-danger text-sm mt-1">{error.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="text-sm font-medium text-muted mb-1 block">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={inputData.email}
              onChange={handleInputData}
              className="bg-background w-full px-4 py-3  rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition"
            />
            {error.email && <p className="text-danger text-sm mt-1">{error.email}</p>}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="text-sm font-medium text-muted mb-1 block">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={inputData.password}
              onChange={handleInputData}
              className="bg-background w-full px-4 py-3  rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition"
            />
            {error.password && <p className="text-danger text-sm mt-1">{error.password}</p>}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="text-sm font-medium text-muted mb-1 block">
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              type="text"
              placeholder="03XX-XXXXXXX"
              value={inputData.phone}
              onChange={handleInputData}
              className="bg-background w-full px-4 py-3  rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition"
            />
            {error.phone && <p className="text-danger text-sm mt-1">{error.phone}</p>}
          </div>
        </div>

        {/* Address */}
        <div className="mt-6">
          <label htmlFor="address" className="text-sm font-medium text-muted mb-1 block">
            Address
          </label>
          <textarea
            id="address"
            name="address"
            placeholder="Street, City"
            value={inputData.address}
            onChange={handleInputData}
            className="bg-background w-full px-4 py-3  rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition"
          ></textarea>
          {error.address && <p className="text-danger text-sm mt-1">{error.address}</p>}
        </div>

        {/* Answer */}
        <div className="mt-4">
          <label htmlFor="answer" className="text-sm font-medium text-muted mb-1 block">
            Pet Name (Security Question)
          </label>
          <textarea
            id="answer"
            name="answer"
            placeholder="Your pet's name"
            value={inputData.answer}
            onChange={handleInputData}
            className="bg-background w-full px-4 py-3  rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition"
          ></textarea>
          {error.answer && <p className="text-danger text-sm mt-1">{error.answer}</p>}
        </div>

        {/* Button */}
        <button
          type="submit"
          className="mt-8 w-full py-3 bg-primary hover:bg-primary-hover text-white text-lg font-medium rounded-xl transition"
        >
          Sign Up
        </button>

        {/* Login Link */}
        <p className="text-center text-sm text-muted mt-6">
          Already have an account?
          <span
            onClick={() => navigate("/login")}
            className=" text-primary underline cursor-pointer hover:text-primary-hover"
          >
            Login here
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;
