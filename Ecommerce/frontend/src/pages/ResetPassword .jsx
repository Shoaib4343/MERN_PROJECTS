import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { resetPassword } from "../apis/Auth.api";

const ResetPassword = () => {
  const [inputData, setInputData] = useState({
    email: "",
    answer: "",
    new_password: "",
  });
  const [error, setError] = useState({});
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  const handleInputData = (e) => {
    setInputData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setServerError("");
  };

  const handleForm = async (e) => {
    e.preventDefault();

    let validate = {};
    if (!inputData.email) validate.email = "Email is required";
    if (!inputData.answer) validate.answer = "Answer is required";
    if (!inputData.new_password || inputData.new_password.length < 8)
      validate.new_password = "Minimum 8 characters required";

    if (Object.keys(validate).length === 0) {
      try {
        setError({});
        const res = await resetPassword(inputData);
        toast.success(res.data.message);
        navigate("/login");
      } catch (error) {
        console.log("Reset error", error.response?.data);
        setServerError(
          error.response?.data?.error || "Something went wrong. Try again."
        );
      }
    } else {
      setError(validate);
    }
  };

  return (
    <div className="bg-surface text-color-text max-w-lg mx-auto my-10 p-10 rounded-lg shadow-xl border border-muted/30">
      <form className="space-y-4" onSubmit={handleForm}>
        <h1 className="text-3xl font-bold text-primary text-center underline underline-offset-4 py-2">
          Reset Password
        </h1>

        {serverError && (
          <p className="text-danger text-sm font-semibold text-center">
            {serverError}
          </p>
        )}

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1 text-muted">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="example@email.com"
            value={inputData.email}
            onChange={handleInputData}
            className="w-full bg-background p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {error.email && <p className="text-danger text-sm">{error.email}</p>}
        </div>

        {/* Answer */}
        <div>
          <label htmlFor="answer" className="block text-sm font-medium mb-1 text-muted">
            Security Answer (e.g. pet's name)
          </label>
          <input
            type="text"
            name="answer"
            placeholder="Your answer"
            value={inputData.answer}
            onChange={handleInputData}
            className="w-full bg-background p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {error.answer && <p className="text-danger text-sm">{error.answer}</p>}
        </div>

        {/* New Password */}
        <div>
          <label htmlFor="new_password" className="block text-sm font-medium mb-1 text-muted">
            New Password
          </label>
          <input
            type="password"
            name="new_password"
            placeholder="New password"
            value={inputData.new_password}
            onChange={handleInputData}
            className="w-full bg-background p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {error.new_password && <p className="text-danger text-sm">{error.new_password}</p>}
        </div>

        <button
          type="submit"
          className="bg-primary hover:bg-primary-hover transition-colors text-white py-3 px-6 mt-2 rounded-lg w-full"
        >
          Reset Password
        </button>

        <p className="text-center text-sm text-muted mt-4">
          Remembered your password?
          <span
            onClick={() => navigate("/login")}
            className="text-primary underline cursor-pointer hover:text-primary-hover"
          >
            {" "}Login here
          </span>
        </p>
      </form>
    </div>
  );
};

export default ResetPassword;
