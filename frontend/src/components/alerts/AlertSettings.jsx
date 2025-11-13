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
