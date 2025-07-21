import React, { useState, useRef, useEffect } from "react";
import { Loader } from "lucide-react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const EmailVerification = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);
  const { backend_url, getUserData,isLogedIn,userData, } = useAuth();
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleChange = (index, value) => {
    const newCode = [...code];

    if (value.length > 1) {
      const pasted = value.slice(0, 6).split("");
      for (let i = 0; i < 6; i++) {
        newCode[i] = pasted[i] || "";
      }
      setCode(newCode);
      const pos = newCode.findLastIndex((d) => d !== "");
      inputRefs.current[Math.min(pos + 1, 5)]?.focus();
    } else {
      newCode[index] = value;
      setCode(newCode);
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (code.includes("")) {
      toast.error("Please fill all 6 digits.");
      return;
    }

    const otp = code.join("");

    setLoading(true);
    try {
      const { data } = await axios.post(
        `${backend_url}/api/auth/verify-otp`,
        { otp },
        { withCredentials: true }
      );

      if (data.success) {
        toast.success(data.message);
        await getUserData();
        navigate("/");
      } else {
        toast.error(data.message || "Invalid OTP");
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Something went wrong!";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{
    isLogedIn && userData && userData.isVerified && navigate("/");
  },[isLogedIn,userData])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl px-8 py-10"
      >
        <div className="text-center mb-6">
          <h2 className="text-3xl font-extrabold text-gray-800">Verify Email</h2>
          <p className="text-sm text-gray-500 mt-1">
            Enter the 6-digit code sent to your email
          </p>
        </div>

        <div className="flex justify-between gap-2 mb-6">
          {code.map((digit, i) => (
            <input
              key={i}
              type="text"
              maxLength="6"
              value={digit}
              disabled={loading}
              ref={(el) => (inputRefs.current[i] = el)}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className={`w-12 h-12 text-xl text-center font-semibold border rounded-lg
              ${loading ? "bg-gray-100 cursor-not-allowed" : "bg-white"}
              focus:outline-none focus:ring-2 focus:ring-gray-700`}
            />
          ))}
        </div>

        <button
          type="submit"
          disabled={loading || code.includes("")}
          className={`w-full py-2 rounded-lg font-semibold text-white
          ${
            loading || code.includes("")
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gray-800 hover:bg-gray-700"
          }
          flex items-center justify-center transition duration-200`}
        >
          {loading ? <Loader className="animate-spin w-5 h-5" /> : "Verify Email"}
        </button>
      </form>
    </div>
  );
};

export default EmailVerification;
