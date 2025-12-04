// frontend/src/components/analytics/ExportReport.jsx

import React, { useState } from "react";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { exportToCSV, exportToPDF } from "../../utils/exportUtils";

const ExportReport = ({ analytics }) => {
  const [loading, setLoading] = useState(false);

  const handleExport = async (type) => {
    setLoading(true);

    if (type === "csv") exportToCSV(analytics, "analytics-report.csv");
    if (type === "pdf") await exportToPDF(analytics, "analytics-report.pdf");

    setLoading(false);
  };

  return (
    <div className="bg-white rounded-lg p-5 shadow-md">
      <h2 className="text-lg font-semibold text-gray-900">Export Reports</h2>

      <div className="flex gap-3 mt-4">
        <button
          onClick={() => handleExport("csv")}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <ArrowDownTrayIcon className="w-5 h-5" />
          Export CSV
        </button>

        <button
          onClick={() => handleExport("pdf")}
          className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
        >
          <ArrowDownTrayIcon className="w-5 h-5" />
          Export PDF
        </button>
      </div>

      {loading && <p className="text-sm text-gray-500 mt-3">Exporting...</p>}
    </div>
  );
};

export default ExportReport;
