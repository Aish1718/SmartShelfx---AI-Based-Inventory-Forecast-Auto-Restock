import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const SalesComparison = () => {
  const [range, setRange] = useState("monthly");
  const [data, setData] = useState([]);

  const loadData = () => {
    fetch(`/api/analytics/sales-comparison?range=${range}`)
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Error loading sales comparison", err));
  };

  useEffect(() => {
    loadData();
  }, [range]);

  return (
    <div className="bg-white p-5 rounded-lg shadow-md">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">
          Sales Comparison
        </h2>

        <select
          value={range}
          onChange={(e) => setRange(e.target.value)}
          className="border px-3 py-1 rounded-md"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="sales" fill="#10b981" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesComparison;
