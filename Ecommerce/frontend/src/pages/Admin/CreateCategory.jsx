import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  createCategoryApi,
  deleteSingleCategoryApi,
  getAllCategoriesApi,
  updateCategoryApi,
} from "../../apis/Category.api";

const CreateCategory = () => {
  const [name, setName] = useState("");
  const [categoreis, setCategoreis] = useState([]);
  const [error, setError] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null); // holds the category object
  const [updateName, setUpdateName] = useState(""); // update form input

  // Create Category Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Clear previous error
    setError("");

    // Simple validation
    if (!name.trim()) {
      setError("Category name is required.");
      return;
    }

    if (name.trim().length < 3) {
      setError("Category name must be at least 3 characters.");
      return;
    }
    try {
      const { data } = await createCategoryApi({ name });
      console.log(data);
      toast.success(`${data.category.name} Category Created Successfully`);
      setName("");
      getAllCategories();
    } catch (error) {
      console.log("error:", error.message);
      setError(error?.response?.data?.message || "Something Went Wrong.");
    }
  };

  // Get All Categories
  const getAllCategories = async () => {
    try {
      const res = await getAllCategoriesApi();
      setCategoreis(res.data.categories);
    } catch (error) {
      console.log("error", error.message);
      toast.error("Error While Getting Categories");
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  // Delete Category
  const handleDelete = async (id) => {
    try {
      await deleteSingleCategoryApi(id);
      toast.success("Category Delete Successfully");
      getAllCategories();
    } catch (error) {
      console.log("errro : ", error.message);
      toast.error(
        error?.response?.data?.message || "Failed to delete category"
      );
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (!updateName.trim()) return toast.error("Name is required.");
    try {
      const res = await updateCategoryApi(editingCategory._id, updateName);
      toast.success("Category updated successfully");
      setEditingCategory(null);
      setUpdateName("");
      getAllCategories();
    } catch (error) {
      console.log("update error", error.message);
      toast.error(error?.response?.data?.message || "Update failed");
    }
  };

  return (
    <>
      {/* Create Category Form */}
      <div className="p-6 max-w-4xl mx-auto bg-surface rounded-xl shadow-md mt-6 border border-gray-100">
        <h2 className="text-2xl font-semibold text-primary mb-4">
          Create Category
        </h2>
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
              name="name"
            />

            {error && (
              <span className="font-semibold text-sm text-red-600">
                {error}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-hover transition"
          >
            Create
          </button>
        </form>
      </div>

      {editingCategory && (
        <div className="p-6 max-w-4xl mx-auto bg-yellow-50 rounded-xl shadow-md mt-6 border border-yellow-200">
          <h2 className="text-2xl font-semibold text-yellow-700 mb-4">
            Update Category
          </h2>
          <form onSubmit={handleUpdateSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="updateCategoryName"
                className="block text-sm font-medium text-yellow-800 mb-1"
              >
                New Category Name
              </label>
              <input
                type="text"
                id="updateCategoryName"
                placeholder="e.g., Updated Name"
                value={updateName}
                onChange={(e) => setUpdateName(e.target.value)}
                className="w-full border border-yellow-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition"
                required
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="bg-yellow-600 text-white px-6 py-2 rounded-md hover:bg-yellow-700 transition"
              >
                Update
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditingCategory(null);
                  setUpdateName("");
                }}
                className="bg-gray-300 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Category List */}
      <div className="p-6 max-w-4xl mx-auto bg-surface rounded-xl shadow-md mt-6 border border-gray-100">
        <h2 className="text-2xl font-semibold text-primary mb-6">
          Category List
        </h2>

        <div className="overflow-x-auto ">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 text-sm">
              <tr>
                <th className="px-6 py-3 text-left font-medium text-gray-700">
                  #
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-700">
                  Category Name
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 text-sm">
              {categoreis.map((curCategory, index) => (
                <tr key={curCategory._id} className="hover:bg-gray-50">
                  <td className="px-6 py-3">{index + 1}</td>
                  <td className="px-6 py-3 font-medium text-color-text">
                    {curCategory.name}
                  </td>
                  <td className="px-6 py-3 space-x-2">
                    <button
                      onClick={() => {
                        setEditingCategory(curCategory);
                        setUpdateName(curCategory.name);
                      }}
                      className="text-blue-600 hover:underline cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(curCategory._id)}
                      className="text-red-600 hover:underline cursor-pointer"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default CreateCategory;
