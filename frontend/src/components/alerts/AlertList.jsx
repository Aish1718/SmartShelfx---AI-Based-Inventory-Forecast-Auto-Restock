import React, { useState, useEffect } from 'react';
import { Bell, AlertTriangle, CheckCircle, X, Filter } from 'lucide-react';
import { alertService } from '../../services/alertService';

const AlertList = () => {
  const [alerts, setAlerts] = useState([]);
  const [filteredAlerts, setFilteredAlerts] = useState([]);
  const [typeFilter, setTypeFilter] = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [showDismissed, setShowDismissed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAlerts();
  }, []);

  useEffect(() => {
    filterAlerts();
  }, [typeFilter, severityFilter, showDismissed, alerts]);

  const fetchAlerts = async () => {
    try {
      const response = await alertService.getAllAlerts();
      setAlerts(response.data);
    } catch (error) {
      console.error('Error fetching alerts:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterAlerts = () => {
    let filtered = [...alerts];

    if (!showDismissed) {
      filtered = filtered.filter(a => !a.isDismissed);
    }

    if (typeFilter !== 'all') {
      filtered = filtered.filter(a => a.alertType === typeFilter);
    }

    if (severityFilter !== 'all') {
      filtered = filtered.filter(a => a.severity === severityFilter);
    }

    setFilteredAlerts(filtered);
  };

  const handleDismiss = async (id) => {
    try {
      await alertService.dismissAlert(id);
      fetchAlerts();
    } catch (error) {
      console.error('Error dismissing alert:', error);
    }
  };

  const handleDismissAll = async () => {
    if (window.confirm('Dismiss all alerts?')) {
      try {
        await alertService.dismissAll();
        fetchAlerts();
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const getSeverityColor = (severity) => {
    const colors = {
      CRITICAL: 'bg-red-100 border-red-300 text-red-800',
      HIGH: 'bg-orange-100 border-orange-300 text-orange-800',
      MEDIUM: 'bg-yellow-100 border-yellow-300 text-yellow-800',
      LOW: 'bg-green-100 border-green-300 text-green-800',
    };
    return colors[severity] || 'bg-gray-100 border-gray-300 text-gray-800';
  };

  const getAlertIcon = (type) => {
    return <AlertTriangle className="w-5 h-5" />;
  };

  return (
    <div className="p-6 bg-[#0A0F1A] min-h-screen text-gray-200" style={{ backgroundColor: "#1F2A38" }}>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold flex items-center space-x-3" style={{ color: "#D2C1B6" }}>
            <Bell className="w-8 h-8" style={{ color: "#D2C1B6" }}/>
            <span>Alerts & Notifications</span>
          </h1>
          <p className="mt-1" style={{ color: "#D2C1B6" }}>Manage system alerts and warnings</p>
        </div>
        <button
          onClick={handleDismissAll}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
        >
          Dismiss All
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'].map((sev) => (
          <div key={sev} className={`rounded-lg border-2 p-4 ${getSeverityColor(sev)}`}>
            <p className="text-sm font-medium">{sev}</p>
            <p className="text-2xl font-bold">
              {alerts.filter(a => a.severity === sev && !a.isDismissed).length}
            </p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-[#0D1322] border border-white/10 rounded-lg shadow-md p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="all">All Types</option>
            <option value="LOW_STOCK">Low Stock</option>
            <option value="OUT_OF_STOCK">Out of Stock</option>
            <option value="FORECAST">Forecast</option>
          </select> */}

          {/* <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="all">All Severities</option>
            <option value="CRITICAL">Critical</option>
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
          </select> */}

          {/* <label className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg">
            <input
              type="checkbox"
              checked={showDismissed}
              onChange={(e) => setShowDismissed(e.target.checked)}
              className="w-4 h-4"
            />
            <span>Show Dismissed</span>
          </label> */}

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="px-4 py-2 rounded-lg text-gray-200"
          style={{
            backgroundColor: "#0D1322",
            border: "1px solid #1A2234",
          }}
      >
        <option value="all">All Types</option>
        <option value="LOW_STOCK">Low Stock</option>
        <option value="OUT_OF_STOCK">Out of Stock</option>
        <option value="FORECAST">Forecast</option>
      </select>

      <select
        value={severityFilter}
        onChange={(e) => setSeverityFilter(e.target.value)}
        className="px-4 py-2 rounded-lg text-gray-200"
        style={{
          backgroundColor: "#0D1322",
          border: "1px solid #1A2234",
        }}
      >
        <option value="all">All Severities</option>
        <option value="CRITICAL">Critical</option>
        <option value="HIGH">High</option>
        <option value="MEDIUM">Medium</option>
        <option value="LOW">Low</option>
      </select>

      <label
        className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-200"
        style={{
          backgroundColor: "#0D1322",
          border: "1px solid #1A2234",
        }}
      >
        <input
          type="checkbox"
          checked={showDismissed}
          onChange={(e) => setShowDismissed(e.target.checked)}
          className="w-4 h-4"
        />
        <span>Show Dismissed</span>
      </label>



        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {filteredAlerts.map((alert) => (
          <div
            key={alert.id}
            className={`bg-white rounded-lg border-2 p-6 ${getSeverityColor(alert.severity)} ${
              alert.isDismissed ? 'opacity-50' : ''
            }`}
          >
            <div className="flex justify-between items-start">
              <div className="flex space-x-4 flex-1">
                <div className={`p-3 rounded-lg ${getSeverityColor(alert.severity)}`}>
                  {getAlertIcon(alert.alertType)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-sm font-semibold">
                      {alert.alertType?.replace('_', ' ')}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(alert.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-gray-900 mb-2">{alert.message}</p>
                  {alert.productName && (
                    <p className="text-sm text-gray-600">
                      Product: <span className="font-medium">{alert.productName}</span>
                      {alert.productSku && ` (${alert.productSku})`}
                    </p>
                  )}
                </div>
              </div>
              {!alert.isDismissed && (
                <button
                  onClick={() => handleDismiss(alert.id)}
                  className="text-gray-400 hover:text-red-600 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredAlerts.length === 0 && (
        <div className="bg-white rounded-lg p-8 text-center text-gray-500">
          <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
          <p>No alerts to display</p>
        </div>
      )}
    </div>
  );
};

export default AlertList;