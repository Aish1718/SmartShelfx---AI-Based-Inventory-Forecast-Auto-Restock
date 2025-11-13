import React, { useState, useEffect } from "react";

const ProductFilter = ({ onChange, categories = [] }) => {
  const [filters, setFilters] = useState({
    search: "",
    category: "all",
    stockStatus: "all",
    sortBy: "name",
  });

  // Notify parent when filters change
  useEffect(() => {
    onChange(filters);
  }, [filters]);

  const handleChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow-md mb-4">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Product Filters
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        {/* Search */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Search
          </label>
          <input
            type="text"
            placeholder="Search products..."
            className="mt-1 w-full border rounded-lg p-2"
            value={filters.search}
            onChange={(e) => handleChange("search", e.target.value)}
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            className="mt-1 w-full border rounded-lg p-2"
            value={filters.category}
            onChange={(e) => handleChange("category", e.target.value)}
          >
            <option value="all">All</option>
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Stock Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Stock Status
          </label>
          <select
            className="mt-1 w-full border rounded-lg p-2"
            value={filters.stockStatus}
            onChange={(e) => handleChange("stockStatus", e.target.value)}
          >
            <option value="all">All</option>
            <option value="low">Low Stock</option>
            <option value="out">Out of Stock</option>
            <option value="in">In Stock</option>
          </select>
        </div>

        {/* Sort */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Sort By
          </label>
          <select
            className="mt-1 w-full border rounded-lg p-2"
            value={filters.sortBy}
            onChange={(e) => handleChange("sortBy", e.target.value)}
          >
            <option value="name">Name</option>
            <option value="stock">Stock</option>
            <option value="sales">Sales</option>
            <option value="price">Price</option>
          </select>
        </div>

      </div>
    </div>
  );
};

export default ProductFilter;
