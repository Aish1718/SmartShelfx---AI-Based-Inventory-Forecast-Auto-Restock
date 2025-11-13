import React, { useEffect, useState } from "react";

const TopProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/analytics/top-products")
      .then((res) => res.json())
      .then((json) => setProducts(json))
      .catch((err) => console.error("Error loading top products", err));
  }, []);

  return (
    <div className="bg-white p-5 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Products</h2>

      <table className="w-full text-left">
        <thead>
          <tr className="border-b">
            <th className="py-2 font-medium">#</th>
            <th className="py-2 font-medium">Product</th>
            <th className="py-2 font-medium">Sales</th>
            <th className="py-2 font-medium">Revenue</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p, index) => (
            <tr key={index} className="border-b text-sm">
              <td className="py-2">{index + 1}</td>
              <td className="py-2">{p.name}</td>
              <td className="py-2">{p.sales}</td>
              <td className="py-2">₹{p.revenue}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {products.length === 0 && (
        <p className="text-gray-500 text-center mt-4">No data available.</p>
      )}
    </div>
  );
};

export default TopProducts;
