import { useState, useRef } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import axios from "axios";
import { Loader } from "lucide-react";

const ResetPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);

  const [otp, setOtp] = useState(""); // store OTP
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const { backend_url } = useAuth();

  // Step 1: Submit email
  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setError("Email is required");
      return;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Enter a valid email");
      return;
    }

    setError("");

    try {
      const { data } = await axios.post(
        `${backend_url}/api/auth/send-reset-otp`,
        { email },
        { withCredentials: true }
      );

      if (data.success) {
        toast.success(data.message);
        setStep(2);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Reset request failed");
    }
  };

  // Step 2: OTP handlers
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

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    if (code.includes("")) {
      toast.error("Please fill all 6 digits.");
      return;
    }

    const joinedOtp = code.join("");
    setOtp(joinedOtp);
    setStep(3)
  };

  // Step 3: Password reset
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      toast.error("Please fill in both password fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post(
        `${backend_url}/api/auth/reset-password`,
        { email, otp, password },
        { withCredentials: true }
      );
      

      if (data.success) {
        toast.success("Password reset successfully!");
        navigate("/login");
      } else {
        toast.error(data.message || "Password reset failed");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      {step === 1 && (
        <form
          onSubmit={handleEmailSubmit}
          className="w-full max-w-md bg-white rounded-2xl shadow-xl px-8 py-10"
        >
          <div className="text-center mb-6">
            <img src={assets.logo} alt="Logo" className="mx-auto w-20 mb-4" />
            <h2 className="text-3xl font-extrabold text-gray-800">Reset Password</h2>
            <p className="text-sm text-gray-500 mt-1">
              Enter your email to receive reset code
            </p>
          </div>

          {error && <span className="text-red-500">{error}</span>}

          <div className="flex items-center gap-3 border border-gray-300 rounded-lg px-4 py-2 mb-6">
            <img className="w-5 h-5" src={assets.mail_icon} alt="mail icon" />
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full bg-transparent text-gray-600 placeholder:text-gray-400 border-none outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-700 transition duration-200"
          >
            Send Reset Link
          </button>
        </form>
      )}

      {step === 2 && (
        <form
          onSubmit={handleOtpSubmit}
          className="w-full max-w-md bg-white rounded-2xl shadow-xl px-8 py-10"
        >
          <div className="text-center mb-6">
            <h2 className="text-3xl font-extrabold text-gray-800">Verify OTP</h2>
            <p className="text-sm text-gray-500 mt-1">
              Enter the 6-digit code sent to {email}
            </p>
          </div>

          <div className="flex justify-between gap-2 mb-6">
            {code.map((digit, i) => (
              <input
                key={i}
                type="text"
                maxLength={6}
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
            } flex items-center justify-center transition duration-200`}
          >
            {loading ? <Loader className="animate-spin w-5 h-5" /> : "Verify Code"}
          </button>
        </form>
      )}

      {/* {step === 3 && (
        <form
          onSubmit={handlePasswordSubmit}
          className="w-full max-w-md bg-white rounded-2xl shadow-xl px-8 py-10"
        >
          <div className="text-center mb-6">
            <h2 className="text-3xl font-extrabold text-gray-800">Set New Password</h2>
            <p className="text-sm text-gray-500 mt-1">
              Create a secure new password
            </p>
          </div>

          <div className="mb-4">
            <label className="text-sm text-gray-600 mb-1 block">New Password</label>
            <input
              type="password"
              value={password}
              disabled={loading}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-gray-700"
              placeholder="New password"
            />
          </div>

          <div className="mb-6">
            <label className="text-sm text-gray-600 mb-1 block">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              disabled={loading}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-gray-700"
              placeholder="Confirm password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg font-semibold text-white ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-gray-800 hover:bg-gray-700"
            } transition duration-200`}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      )} */}
      {step === 3 && (
  <form
    onSubmit={handlePasswordSubmit}
    className="w-full max-w-md bg-white rounded-2xl shadow-xl px-8 py-10"
  >
    <div className="text-center mb-6">
      <h2 className="text-3xl font-extrabold text-gray-800">Set New Password</h2>
      <p className="text-sm text-gray-500 mt-1">
        Create a secure new password
      </p>
    </div>

    <div className="flex items-center gap-3 border border-gray-300 rounded-lg px-4 py-2 mb-6 hover:shadow-md transition">
      <img className="w-5 h-5" src={assets.lock_icon} alt="lock icon" />
      <input
        type="password"
        value={password}
        disabled={loading}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border-none outline-none text-gray-600 bg-transparent placeholder:text-gray-400"
        placeholder="New password"
      />
    </div>

    <div className="flex items-center gap-3 border border-gray-300 rounded-lg px-4 py-2 mb-8 hover:shadow-md transition">
      <img className="w-5 h-5" src={assets.lock_icon} alt="lock icon" />
      <input
        type="password"
        value={confirmPassword}
        disabled={loading}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="w-full border-none outline-none text-gray-600 bg-transparent placeholder:text-gray-400"
        placeholder="Confirm password"
      />
    </div>

    <button
      type="submit"
      disabled={loading}
      className={`w-full py-2 rounded-lg font-semibold text-white ${
        loading ? "bg-gray-400 cursor-not-allowed" : "bg-gray-800 hover:bg-gray-700"
      } transition duration-200`}
    >
      {loading ? "Resetting..." : "Reset Password"}
    </button>
  </form>
)}

    </div>
  );
};

export default ResetPassword;
