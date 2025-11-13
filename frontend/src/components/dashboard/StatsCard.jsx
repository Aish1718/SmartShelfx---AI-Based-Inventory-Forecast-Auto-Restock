import React from "react";

const StatsCard = ({ icon: Icon, label, value, color = "blue" }) => {
  const bgColor = {
    blue: "bg-blue-100 text-blue-700",
    green: "bg-green-100 text-green-700",
    red: "bg-red-100 text-red-700",
    yellow: "bg-yellow-100 text-yellow-700",
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow-md flex items-center gap-4">
      <div className={`p-3 rounded-full ${bgColor[color]}`}>
        <Icon className="w-6 h-6" />
      </div>

      <div>
        <p className="text-gray-600 text-sm">{label}</p>
        <h3 className="text-2xl font-semibold">{value}</h3>
      </div>
    </div>
  );
};

export default StatsCard;
