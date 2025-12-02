// frontend/src/components/forecast/ForecastTable.jsx

import React from "react";

const ForecastTable = ({ forecastData, onSelect }) => {
  return (
    <div className="bg-white p-5 shadow-md rounded-lg">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Forecast Summary
      </h2>

      {forecastData.length === 0 ? (
        <p className="text-gray-500 text-sm">No forecast data available.</p>
      ) : (
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="py-2">Date</th>
              <th className="py-2">Predicted Quantity</th>
              <th className="py-2 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {forecastData.map((item, idx) => (
              <tr key={idx} className="border-b text-sm">
                <td className="py-2">{item.date}</td>
                <td
                  className={`py-2 ${
                    item.predicted < 10 ? "text-red-600 font-semibold" : ""
                  }`}
                >
                  {item.predicted}
                </td>
                <td className="py-2 text-right">
                  <button
                    onClick={() => onSelect(item)}
                    className="text-blue-600 hover:underline"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ForecastTable;
