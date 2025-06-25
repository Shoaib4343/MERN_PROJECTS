import React, { useState } from "react";

const CreateCategory = () => {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form logic here
    console.log("Category Created:", name);
    setName("");
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-surface rounded-xl shadow-md mt-6">
      <h2 className="text-2xl font-semibold text-primary mb-4">Create Category</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="categoryName"
            className="block text-sm font-medium text-color-text mb-1"
          >
            Category Name
          </label>
          <input
            type="text"
            id="categoryName"
            placeholder="e.g., Electronics"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-hover transition"
        >
          Create
        </button>
      </form>

      {/* Optional: Feedback Messages */}
      {/* <p className="mt-4 text-green-600">Category created successfully!</p> */}
      {/* <p className="mt-4 text-red-600">Something went wrong!</p> */}
    </div>
  );
};

export default CreateCategory;
