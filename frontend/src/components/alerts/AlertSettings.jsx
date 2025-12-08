import React, { useEffect, useState } from "react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

const AlertSettings = () => {
  const [settings, setSettings] = useState({
    lowStockThreshold: 10,
    expiryWarningDays: 7,
  });

  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  // Load existing settings
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch("/api/alerts/settings");
        if (res.ok) {
          const data = await res.json();
          setSettings(data);
        }
      } catch (err) {
        console.error("Error loading alert settings", err);
      }
      setLoading(false);
    };

    fetchSettings();
  }, []);

  // Save settings
  const handleSave = async () => {
    try {
      const res = await fetch("/api/alerts/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      }
    } catch (err) {
      console.error("Error saving settings", err);
    }
  };

  if (loading) return <p className="text-gray-500">Loading settings...</p>;

  return (
    <div className="bg-white shadow-md p-6 rounded-lg">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Alert Settings</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Low Stock Threshold
          </label>
          <input
            type="number"
            className="mt-1 w-full p-2 border rounded-lg"
            value={settings.lowStockThreshold}
            onChange={(e) =>
              setSettings({ ...settings, lowStockThreshold: e.target.value })
            }
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Expiry Warning (Days)
          </label>
          <input
            type="number"
            className="mt-1 w-full p-2 border rounded-lg"
            value={settings.expiryWarningDays}
            onChange={(e) =>
              setSettings({ ...settings, expiryWarningDays: e.target.value })
            }
          />
        </div>
      </div>

      <button
        onClick={handleSave}
        className="mt-5 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Save Settings
      </button>

      {saved && (
        <div className="mt-3 flex items-center gap-2 text-green-600 text-sm">
          <CheckCircleIcon className="w-5 h-5" />
          Settings saved successfully!
        </div>
      )}
    </div>
  );
};

export default AlertSettings;





// import React, { useState, useEffect } from "react";
// import { Bell, X, AlertTriangle } from "lucide-react";
// import { alertService } from "../../services/alertService";

// const AlertList = () => {
//   const [alerts, setAlerts] = useState([]);
//   const [filteredAlerts, setFilteredAlerts] = useState([]);
//   const [typeFilter, setTypeFilter] = useState("all");
//   const [severityFilter, setSeverityFilter] = useState("all");
//   const [showDismissed, setShowDismissed] = useState(false);

//   useEffect(() => {
//     fetchAlerts();
//   }, []);

//   useEffect(() => {
//     filterAlerts();
//   }, [typeFilter, severityFilter, showDismissed, alerts]);

//   const fetchAlerts = async () => {
//     try {
//       const response = await alertService.getAllAlerts();
//       setAlerts(response.data);
//     } catch (err) {
//       console.error("Error fetching alerts:", err);
//     }
//   };

//   const filterAlerts = () => {
//     let filtered = [...alerts];

//     if (!showDismissed) filtered = filtered.filter((a) => !a.isDismissed);
//     if (typeFilter !== "all") filtered = filtered.filter((a) => a.alertType === typeFilter);
//     if (severityFilter !== "all") filtered = filtered.filter((a) => a.severity === severityFilter);

//     setFilteredAlerts(filtered);
//   };

//   const handleDismiss = async (id) => {
//     await alertService.dismissAlert(id);
//     fetchAlerts();
//   };

//   const handleDismissAll = async () => {
//     if (window.confirm("Dismiss all alerts?")) {
//       await alertService.dismissAll();
//       fetchAlerts();
//     }
//   };

//   // 🔥 NEW — NEON DARK THEME SEVERITY COLORS
//   const severityStyles = {
//     CRITICAL:
//       "border-red-500/40 bg-red-900/40 text-red-300 shadow-red-500/20",
//     HIGH:
//       "border-orange-500/40 bg-orange-900/40 text-orange-300 shadow-orange-500/20",
//     MEDIUM:
//       "border-yellow-500/40 bg-yellow-900/40 text-yellow-300 shadow-yellow-500/20",
//     LOW:
//       "border-green-500/40 bg-green-900/40 text-green-300 shadow-green-500/20",
//   };

//   return (
//     <div className="p-8 text-gray-200">

//       {/* HEADER */}
//       <div className="flex justify-between items-center mb-6">
//         <div>
//           <h1 className="text-3xl font-bold flex items-center gap-3 text-indigo-300">
//             <Bell className="w-8 h-8" />
//             Alerts & Notifications
//           </h1>
//           <p className="text-gray-400">Manage system alerts and warnings</p>
//         </div>

//         <button
//           onClick={handleDismissAll}
//           className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-lg shadow-red-900/40"
//         >
//           Dismiss All
//         </button>
//       </div>

//       {/* SUMMARY CARDS – DARK THEME */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
//         {["CRITICAL", "HIGH", "MEDIUM", "LOW"].map((sev) => (
//           <div
//             key={sev}
//             className={`rounded-xl p-5 border shadow-md ${severityStyles[sev]}`}
//           >
//             <p className="text-sm font-medium">{sev}</p>
//             <p className="text-3xl font-bold mt-1">
//               {alerts.filter((a) => a.severity === sev && !a.isDismissed).length}
//             </p>
//           </div>
//         ))}
//       </div>

//       {/* FILTERS – DARK GLOSSY */}
//       <div
//         className="
//           bg-[#0A0F1A]/70
//           border border-white/10
//           rounded-xl
//           shadow-lg shadow-black/40
//           backdrop-blur-xl
//           p-6
//           flex flex-wrap gap-4
//         "
//       >
//         <select
//           value={typeFilter}
//           onChange={(e) => setTypeFilter(e.target.value)}
//           className="bg-[#111827] text-gray-300 border border-white/10 px-4 py-3 rounded-lg focus:ring-indigo-500"
//         >
//           <option value="all">All Types</option>
//           <option value="LOW_STOCK">Low Stock</option>
//           <option value="OUT_OF_STOCK">Out of Stock</option>
//           <option value="FORECAST">Forecast</option>
//         </select>

//         <select
//           value={severityFilter}
//           onChange={(e) => setSeverityFilter(e.target.value)}
//           className="bg-[#111827] text-gray-300 border border-white/10 px-4 py-3 rounded-lg focus:ring-indigo-500"
//         >
//           <option value="all">All Severities</option>
//           <option value="CRITICAL">Critical</option>
//           <option value="HIGH">High</option>
//           <option value="MEDIUM">Medium</option>
//           <option value="LOW">Low</option>
//         </select>

//         <label className="flex items-center gap-2 px-4 py-3 bg-[#111827] border border-white/10 rounded-lg text-gray-300">
//           <input
//             type="checkbox"
//             checked={showDismissed}
//             onChange={(e) => setShowDismissed(e.target.checked)}
//           />
//           Show Dismissed
//         </label>
//       </div>

//       {/* ALERT LIST */}
//       <div className="space-y-5 mt-8">
//         {filteredAlerts.map((alert) => (
//           <div
//             key={alert.id}
//             className={`
//               rounded-xl p-6 border shadow-lg backdrop-blur-xl
//               flex justify-between items-start
//               ${severityStyles[alert.severity]}
//               ${alert.isDismissed ? "opacity-50" : ""}
//             `}
//           >
//             <div className="flex gap-4">
//               <div className="p-3 bg-black/20 rounded-lg">
//                 <AlertTriangle className="w-6 h-6" />
//               </div>

//               <div>
//                 <p className="font-bold text-lg">
//                   {alert.alertType.replaceAll("_", " ")}
//                 </p>

//                 <p className="text-gray-300 mt-1">{alert.message}</p>

//                 {alert.productName && (
//                   <p className="text-sm text-gray-400 mt-2">
//                     Product: <span className="text-gray-200">{alert.productName}</span>
//                     {alert.productSku && ` (${alert.productSku})`}
//                   </p>
//                 )}

//                 <p className="text-xs text-gray-500 mt-2">
//                   {new Date(alert.createdAt).toLocaleString()}
//                 </p>
//               </div>
//             </div>

//             {!alert.isDismissed && (
//               <button
//                 onClick={() => handleDismiss(alert.id)}
//                 className="text-gray-300 hover:text-red-400"
//               >
//                 <X className="w-6 h-6" />
//               </button>
//             )}
//           </div>
//         ))}
//       </div>

//       {filteredAlerts.length === 0 && (
//         <div
//           className="
//             text-center mt-10 text-gray-400
//             bg-[#0D1322]/60 border border-white/10 backdrop-blur-xl
//             p-10 rounded-xl
//           "
//         >
//           No alerts to display.
//         </div>
//       )}
//     </div>
//   );
// };

// export default AlertList;
