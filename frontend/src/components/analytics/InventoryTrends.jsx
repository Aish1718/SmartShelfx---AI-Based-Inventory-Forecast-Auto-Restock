import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const InventoryTrends = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/analytics/inventory-trends")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Error loading inventory trends", err));
  }, []);

  return (
    <div className="bg-white p-5 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Inventory Trends
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="stockLevel" stroke="#2563eb" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default InventoryTrends;
