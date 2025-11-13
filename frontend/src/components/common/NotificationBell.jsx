import React, { useEffect, useState } from "react";
import { BellAlertIcon } from "@heroicons/react/24/outline";

const NotificationBell = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch("/api/alerts-summary")
      .then((res) => res.json())
      .then((data) => {
        const total =
          (data.LOW_STOCK || 0) +
          (data.OUT_OF_STOCK || 0) +
          (data.EXPIRY_SOON || 0) +
          (data.EXPIRED || 0);
        setCount(total);
      })
      .catch((err) => console.error("Error loading alert count", err));
  }, []);

  return (
    <div className="relative cursor-pointer">
      <BellAlertIcon className="w-7 h-7 text-gray-700 hover:text-blue-600 transition" />

      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
          {count}
        </span>
      )}
    </div>
  );
};

export default NotificationBell;
