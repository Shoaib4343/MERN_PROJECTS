import React, { useState } from "react";
import { registerApi } from "../apis/Auth.api";
import { useNavigate } from 'react-router-dom'

const Register = () => {
  // usestaet for user input fields data
  const [inputData, setInputData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
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

    if (Object.keys(validate).length === 0) {
      try {
        setError({});
        const res = await registerApi(inputData);
        alert(res.data.message);

        console.log(res.data);
        setInputData({
          name: "",
          email: "",
          password: "",
          phone: "",
          address: "",
        });
        setServerError(""); 
        
        navigate("/login")
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
    <div className="bg-gray-950 text-white max-w-lg mx-auto my-10 p-10 rounded-lg shadow shadow-red-600">
      <form className="space-y-4" onSubmit={handleForm}>
        <h1 className="text-3xl font-bold font-poppins text-center underline underline-offset-4 py-2">
          Registration Form
        </h1>

        {serverError && (
          <p className="text-red-500 text-sm font-semibold text-center">
            {serverError}
          </p>
        )}

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="name">
            Enter Name:
          </label>
          <input
            className="w-full bg-gray-800 p-3 rounded-lg focus:outline-gray-500 focus:outline-2"
            type="text"
            name="name"
            id="name"
            placeholder="e.g. John Doe"
            value={inputData.name}
            onChange={handleInputData}
          />
          {error.name && (
            <span className="text-red-600 text-sm font-medium">
              {error.name}
            </span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="email">
            Enter Email:
          </label>
          <input
            className="w-full bg-gray-800 p-3 rounded-lg focus:outline-gray-500 focus:outline-2"
            type="email"
            name="email"
            id="email"
            placeholder="e.g. example@email.com"
            value={inputData.email}
            onChange={handleInputData}
          />
          {error.email && (
            <span className="text-red-600 text-sm font-medium">
              {error.email}
            </span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="password">
            Enter Password:
          </label>
          <input
            className="w-full bg-gray-800 p-3 rounded-lg focus:outline-gray-500 focus:outline-2"
            type="password"
            name="password"
            id="password"
            placeholder="Minimum 6 characters"
            value={inputData.password}
            onChange={handleInputData}
          />
          {error.password && (
            <span className="text-red-600 text-sm font-medium">
              {error.password}
            </span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="phone">
            Enter Phone Number:
          </label>
          <input
            className="w-full bg-gray-800 p-3 rounded-lg focus:outline-gray-500 focus:outline-2"
            type="text"
            name="phone"
            id="phone"
            placeholder="e.g. 03XX-XXXXXXX"
            value={inputData.phone}
            onChange={handleInputData}
          />
          {error.phone && (
            <span className="text-red-600 text-sm font-medium">
              {error.phone}
            </span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="address">
            Enter Address:
          </label>
          <textarea
            className="w-full bg-gray-800 p-3 rounded-lg focus:outline-gray-500 focus:outline-2"
            name="address"
            id="address"
            placeholder="House #, Street #, City"
            value={inputData.address}
            onChange={handleInputData}
          ></textarea>
          {error.address && (
            <span className="text-red-600 text-sm font-medium">
              {error.address}
            </span>
          )}
        </div>

        <div>
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 transition-colors text-white py-3 px-6 mt-2 rounded-lg w-full cursor-pointer"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
