import React, { useState } from "react";
import { loginApi } from "../apis/Auth.api";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/auth.context";

const Login = () => {
  // auth context
  const [auth, setAuth] = useAuth();
  // usestaet for user input fields data
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({});
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

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
    if (!inputData.email) validate.email = "email is required";
    if (!inputData.password) validate.password = "password is required";

    if (Object.keys(validate).length === 0) {
      try {
        setError({});
        const res = await loginApi(inputData);
        toast.success(res.data.message);

        console.log(res.data);
        setInputData({
          email: "",
          password: "",
        });

        // in login we pass the user and token to context api for globle access around the app
        setAuth({
          ...auth,
          user: res.data?.user,
          token: res.data?.token,
        });

        // now we will save it in local sorage the user and the token
        localStorage.setItem(
          "auth",
          JSON.stringify({
            user: res.data.user,
            token: res.data.token,
          })
        );

        navigate(from);
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
    <div className="bg-surface text-color-text max-w-lg mx-auto my-10 p-10 rounded-lg shadow-xl border border-muted/30">
      <form className="space-y-4" onSubmit={handleForm}>
        <h1 className="text-3xl font-bold text-primary text-center underline underline-offset-4 py-2">
          Login Form
        </h1>

        {serverError && (
          <p className="text-danger text-sm font-semibold text-center">
            {serverError}
          </p>
        )}

        {/* Email */}
        <div>
          <label
            className="block text-sm font-medium mb-1 text-muted"
            htmlFor="email"
          >
            Enter Email:
          </label>
          <input
            className="w-full bg-background p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary placeholder-muted"
            type="email"
            name="email"
            id="email"
            placeholder="e.g. example@email.com"
            value={inputData.email}
            onChange={handleInputData}
          />
          {error.email && (
            <span className="text-danger text-sm font-medium">
              {error.email}
            </span>
          )}
        </div>

        {/* Password */}
        <div>
          <label
            className="block text-sm font-medium mb-1 text-muted"
            htmlFor="password"
          >
            Enter Password:
          </label>
          <input
            className="w-full bg-background p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary placeholder-muted"
            type="password"
            name="password"
            id="password"
            placeholder="Minimum 8 characters"
            value={inputData.password}
            onChange={handleInputData}
          />
          {error.password && (
            <span className="text-danger text-sm font-medium">
              {error.password}
            </span>
          )}
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="bg-primary hover:bg-primary-hover transition-colors text-white py-3 px-8 mt-2 rounded-lg w-full cursor-pointer"
          >
            Login
          </button>
        </div>

        {/* Link */}
        <div className="text-center mt-4">
          <p className="text-sm text-muted">
            Don’t have an account?
            <span
              onClick={() => navigate("/register")}
              className="text-primary underline cursor-pointer hover:text-primary-hover"
            >
              Register here
            </span>
          </p>
          <p className="text-sm text-muted">
            <span
              onClick={() => navigate("/forgot_password")}
              className="text-primary underline cursor-pointer hover:text-primary-hover"
            >
              Forgot your password?
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
