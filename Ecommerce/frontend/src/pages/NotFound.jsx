import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950 text-white px-4">
      <div className="text-center">
        <h1 className="text-7xl font-extrabold mb-4 animate-pulse text-gray-100">404</h1>
        <p className="text-2xl font-semibold mb-2">Page Not Found</p>
        <p className="text-gray-400 mb-6">Sorry, the page you are looking for doesn’t exist or has been moved.</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-2 border border-gray-700 rounded hover:bg-gray-800 transition"
        >
          <FaArrowLeft /> Go back home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
