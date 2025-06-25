import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const Error403 = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 text-text font-poppins">
      <div className="text-center">
        <h1 className="text-8xl font-dancing text-danger font-bold mb-4 animate-pulse">
          403
        </h1>
        <h2 className="text-2xl font-playfair font-semibold mb-2">
          Access Denied
        </h2>
        <p className="text-muted mb-6 max-w-md mx-auto">
          You do not have permission to view this page. Please return to the
          homepage or contact the administrator if you believe this is an error.
        </p>

        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 px-6 py-3 border border-primary text-primary hover:bg-primary hover:text-white transition rounded-lg font-medium"
        >
          <FaArrowLeft /> Go Back Home
        </button>
      </div>
    </div>
  );
};

export default Error403;
