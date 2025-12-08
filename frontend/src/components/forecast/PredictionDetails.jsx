// // frontend/src/components/forecast/PredictionDetails.jsx

// import React from "react";
// import {
//   ChartBarIcon,
//   CalendarIcon,
//   Cog6ToothIcon,
// } from "@heroicons/react/24/outline";

// const PredictionDetails = ({ details }) => {
//   if (!details) {
//     return (
//       <div className="bg-white p-5 rounded-lg shadow-md">
//         <p className="text-gray-500 text-sm">
//           Select a forecast entry to view details.
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white p-5 rounded-lg shadow-md">
//       <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
//         <ChartBarIcon className="w-6 h-6 text-blue-600" />
//         Forecast Details
//       </h2>

//       <div className="space-y-3 text-sm text-gray-700">
//         <p>
//           <strong>Date:</strong> {details.date}
//         </p>

//         <p>
//           <strong>Predicted Stock:</strong>{" "}
//           <span className="font-semibold">{details.predicted}</span>
//         </p>

//         {details.confidenceInterval && (
//           <p>
//             <strong>Confidence:</strong> {details.confidenceInterval.lower} -{" "}
//             {details.confidenceInterval.upper}
//           </p>
//         )}

//         {details.recommendedReorderDate && (
//           <p>
//             <strong>Reorder Date:</strong>{" "}
//             {details.recommendedReorderDate}
//           </p>
//         )}

//         {details.recommendedReorderQuantity && (
//           <p>
//             <strong>Recommended Quantity:</strong>{" "}
//             {details.recommendedReorderQuantity}
//           </p>
//         )}

//         <div className="mt-4 p-3 bg-gray-100 rounded-lg">
//           <p className="font-semibold flex items-center gap-2">
//             <Cog6ToothIcon className="w-5 h-5 text-gray-700" />
//             Model Info
//           </p>
//           <p>Version: {details.modelVersion}</p>
//           <p>Accuracy: {(details.accuracy * 100).toFixed(2)}%</p>
//           <p>Generated At: {details.generatedAt}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PredictionDetails;



// frontend/src/components/forecast/PredictionDetails.jsx

import React from "react";
import {
  ChartBarIcon,
  CalendarIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

const PredictionDetails = ({ details }) => {
  if (!details) {
    return (
      <div className="bg-[#0D1322] p-5 rounded-lg shadow-md border border-[#1A2234]">
        <p className="text-gray-400 text-sm">
          Select a forecast entry to view details.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#0D1322] p-5 rounded-lg shadow-md border border-[#1A2234] text-[#D2C1B6]">
      <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
        <ChartBarIcon className="w-6 h-6 text-blue-400" />
        Forecast Details
      </h2>

      <div className="space-y-3 text-sm">
        <p>
          <strong className="text-gray-300">Date:</strong> {details.date}
        </p>

        <p>
          <strong className="text-gray-300">Predicted Stock:</strong>{" "}
          <span className="font-semibold text-blue-300">{details.predicted}</span>
        </p>

        {details.confidenceInterval && (
          <p>
            <strong className="text-gray-300">Confidence:</strong>{" "}
            {details.confidenceInterval.lower} -{" "}
            {details.confidenceInterval.upper}
          </p>
        )}

        {details.recommendedReorderDate && (
          <p>
            <strong className="text-gray-300">Reorder Date:</strong>{" "}
            {details.recommendedReorderDate}
          </p>
        )}

        {details.recommendedReorderQuantity && (
          <p>
            <strong className="text-gray-300">Recommended Quantity:</strong>{" "}
            {details.recommendedReorderQuantity}
          </p>
        )}

        {/* Model Info Box */}
        <div className="mt-4 p-3 rounded-lg bg-[#1A2234] border border-[#2A3248]">
          <p className="font-semibold flex items-center gap-2 text-gray-200">
            <Cog6ToothIcon className="w-5 h-5 text-blue-400" />
            Model Info
          </p>

          <p className="text-gray-300">Version: {details.modelVersion}</p>
          <p className="text-gray-300">
            Accuracy: {(details.accuracy * 100).toFixed(2)}%
          </p>
          <p className="text-gray-300">Generated At: {details.generatedAt}</p>
        </div>
      </div>
    </div>
  );
};

export default PredictionDetails;
