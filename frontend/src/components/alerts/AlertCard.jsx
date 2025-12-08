// import React from "react";
// import {
//   ExclamationTriangleIcon,
//   AlertCircleIcon,
//   ClockIcon,
//   CheckCircleIcon,
// } from "@heroicons/react/24/outline";

// const AlertCard = ({ alert, onResolve }) => {
//   const severityColors = {
//     HIGH: "border-red-500 bg-red-50",
//     MEDIUM: "border-yellow-500 bg-yellow-50",
//     LOW: "border-blue-500 bg-blue-50",
//   };

//   const icons = {
//     LOW_STOCK: <AlertCircleIcon className="w-6 h-6 text-orange-600" />,
//     OUT_OF_STOCK: <ExclamationTriangleIcon className="w-6 h-6 text-red-600" />,
//     EXPIRY_SOON: <ClockIcon className="w-6 h-6 text-yellow-600" />,
//     EXPIRED: <ExclamationTriangleIcon className="w-6 h-6 text-red-700" />,
//     SLOW_MOVING: <ClockIcon className="w-6 h-6 text-blue-700" />,
//     OVERSTOCK: <AlertCircleIcon className="w-6 h-6 text-indigo-700" />,
//   };

//   return (
//     <div
//       className={`border-l-4 rounded-lg p-4 shadow-sm transition ${severityColors[alert.severity]}`}
//     >
//       <div className="flex items-start gap-3">
//         <div>{icons[alert.type]}</div>

//         <div className="flex-1">
//           <h3 className="font-semibold text-gray-900">
//             {alert.type.replace(/_/g, " ")}
//           </h3>
//           <p className="text-gray-700 text-sm mt-1">{alert.message}</p>

//           <p className="text-xs text-gray-500 mt-2">
//             Created: {new Date(alert.createdAt).toLocaleString()}
//           </p>

//           {!alert.resolved && (
//             <button
//               onClick={() => onResolve(alert.id)}
//               className="mt-3 flex items-center gap-2 bg-green-600 text-white px-3 py-1.5 rounded-md text-sm hover:bg-green-700 transition"
//             >
//               <CheckCircleIcon className="w-4 h-4" />
//               Resolve Alert
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AlertCard;



import React from "react";
import {
  ExclamationTriangleIcon,
  AlertCircleIcon,
  ClockIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

const AlertCard = ({ alert, onResolve }) => {
  // Glow color accents for severity on dark theme
  const severityColors = {
    HIGH: "border-red-500/60 bg-red-900/20",
    MEDIUM: "border-yellow-500/60 bg-yellow-900/20",
    LOW: "border-blue-500/60 bg-blue-900/20",
  };

  // Icons styled to match dark neon theme
  const icons = {
    LOW_STOCK: <AlertCircleIcon className="w-6 h-6 text-orange-400" />,
    OUT_OF_STOCK: <ExclamationTriangleIcon className="w-6 h-6 text-red-400" />,
    EXPIRY_SOON: <ClockIcon className="w-6 h-6 text-yellow-400" />,
    EXPIRED: <ExclamationTriangleIcon className="w-6 h-6 text-red-500" />,
    SLOW_MOVING: <ClockIcon className="w-6 h-6 text-blue-400" />,
    OVERSTOCK: <AlertCircleIcon className="w-6 h-6 text-indigo-400" />,
  };

  return (
    <div
      className={`
        border-l-4 rounded-xl p-4
        shadow-lg shadow-black/40
        backdrop-blur-md
        transition
        ${severityColors[alert.severity]}
      `}
    >
      <div className="flex items-start gap-4">
        <div>{icons[alert.type]}</div>

        <div className="flex-1">
          <h3 className="font-semibold text-white tracking-wide">
            {alert.type.replace(/_/g, " ")}
          </h3>

          <p className="text-gray-300 text-sm mt-1">{alert.message}</p>

          <p className="text-xs text-gray-400 mt-2">
            Created: {new Date(alert.createdAt).toLocaleString()}
          </p>

          {!alert.resolved && (
            <button
              onClick={() => onResolve(alert.id)}
              className="
                mt-3 flex items-center gap-2
                bg-green-600/70 hover:bg-green-600
                text-white px-3 py-1.5
                rounded-md text-sm
                transition shadow-md shadow-green-900/40
              "
            >
              <CheckCircleIcon className="w-4 h-4" />
              Resolve Alert
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlertCard;
