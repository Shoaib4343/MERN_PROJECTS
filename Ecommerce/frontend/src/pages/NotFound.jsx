import React from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 text-text font-poppins">
      <div className="text-center">
        <h1 className="text-8xl font-dancing text-danger font-bold mb-4 animate-pulse">
          404
        </h1>
        <h2 className="text-2xl font-playfair font-semibold mb-2">
          Page Not Found
        </h2>
        <p className="text-muted mb-6 max-w-md mx-auto">
          Sorry, the page you are looking for doesn’t exist or has been moved.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 border border-primary text-primary hover:bg-primary hover:text-white transition rounded-lg font-medium"
        >
          <FaArrowLeft /> Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
