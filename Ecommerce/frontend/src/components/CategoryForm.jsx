const CategoryForm = ({
  title = "Create Category",
  buttonLabel = "Create",
  name,
  setName,
  onSubmit,
  onCancel,
  error,
  showCancel = false,
  color,
}) => {
  return (
    <div
      className={`p-6 max-w-4xl mx-auto bg-${color}-50 rounded-xl shadow-md mt-6 border border-${color}-200`}
    >
      <h2 className={`text-2xl font-semibold text-${color}-600 mb-4`}>
        {title}
      </h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="categoryName"
            className={`block text-sm font-medium text-${color}-800 mb-1`}
          >
            Category Name
          </label>
          <input
            type="text"
            id="categoryName"
            placeholder="e.g., Electronics"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`w-full border border-${color}-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-${color}-500 focus:border-transparent transition`}
            
          />
          {error && (
            <span className="font-semibold text-sm text-red-600">{error}</span>
          )}
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className={` text-gray-900 px-6 py-2 rounded-md border border-${color}-300 transition`}
          >
            {buttonLabel}
          </button>
          {showCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="border border-gray-300 px-6 py-2 rounded-md  transition"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
