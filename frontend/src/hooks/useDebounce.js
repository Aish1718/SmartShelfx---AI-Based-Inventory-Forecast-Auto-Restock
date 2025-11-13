import { useEffect, useState } from "react";

export default function useDashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadAnalytics = async () => {
    setLoading(true);

    try {
      const res = await fetch("/api/analytics/overview");
      const data = await res.json();
      setAnalytics(data);
    } catch (err) {
      console.error("Error loading dashboard analytics:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnalytics();
  }, []);

  return {
    analytics,
    loading,
    reload: loadAnalytics,
  };
}
