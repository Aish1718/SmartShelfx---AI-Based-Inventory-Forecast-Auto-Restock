import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const InventoryChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetch("/api/analytics/inventory-trends")
      .then((res) => res.json())
      .then((data) => setChartData(data))
      .catch((err) => console.error("Error loading inventory chart", err));
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg p-5">
      <h2 className="text-lg font-semibold text-gray-900">Inventory Trend</h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="stockLevel"
            stroke="#2563eb"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default InventoryChart;
