import React, { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const notify = (type, message) => {
    const id = Date.now();
    const newNotification = { id, type, message };

    setNotifications((prev) => [...prev, newNotification]);

    // Auto-remove after 4 seconds
    setTimeout(() => {
      setNotifications((prev) =>
        prev.filter((n) => n.id !== id)
      );
    }, 4000);
  };

  const success = (msg) => notify("success", msg);
  const error = (msg) => notify("error", msg);
  const warning = (msg) => notify("warning", msg);

  return (
    <NotificationContext.Provider value={{ success, error, warning }}>
      {children}

      {/* Notification Bubble UI */}
      <div className="fixed top-4 right-4 space-y-3 z-50">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`px-4 py-2 rounded shadow text-white
              ${n.type === "success" ? "bg-green-600" : ""}
              ${n.type === "error" ? "bg-red-600" : ""}
              ${n.type === "warning" ? "bg-yellow-600" : ""}`}
          >
            {n.message}
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
