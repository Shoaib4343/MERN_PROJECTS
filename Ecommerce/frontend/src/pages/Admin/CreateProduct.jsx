import React, { useState } from "react";

const CreateProduct = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    category: "",
  });
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log("Product:", { ...form, image });
    // Reset form
    setForm({
      name: "",
      description: "",
      price: "",
      quantity: "",
      category: "",
    });
    setImage(null);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-surface rounded-xl shadow-md mt-6">
      <h2 className="text-2xl font-semibold text-primary mb-6">Create Product</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-color-text mb-1">Product Name</label>
          <input
            type="text"
            name="name"
            placeholder="e.g., iPhone 15"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-color-text mb-1">Description</label>
          <textarea
            name="description"
            placeholder="Enter product description"
            value={form.description}
            onChange={handleChange}
            rows="4"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            required
          ></textarea>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-color-text mb-1">Price ($)</label>
            <input
              type="number"
              name="price"
              placeholder="e.g., 999"
              value={form.price}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-color-text mb-1">Quantity</label>
            <input
              type="number"
              name="quantity"
              placeholder="e.g., 50"
              value={form.quantity}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-color-text mb-1">Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-primary"
            required
          >
            <option value="">Select Category</option>
            <option value="electronics">Electronics</option>
            <option value="fashion">Fashion</option>
            <option value="grocery">Grocery</option>
          </select>
        </div>

        <div>
          <label className="block text-sm text-color-text mb-1">Product Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-hover"
          />
        </div>

        <button
          type="submit"
          className="mt-4 bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-hover transition"
        >
          Create Product
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
