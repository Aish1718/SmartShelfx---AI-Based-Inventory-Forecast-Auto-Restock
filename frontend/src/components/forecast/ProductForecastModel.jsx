// frontend/src/components/forecast/ProductForecastModel.jsx

import React, { useState, useEffect } from 'react';
import { X, TrendingUp, AlertCircle, Calendar } from 'lucide-react';
import { forecastService } from '../../services/forecastService';
import ForecastChart from './ForecastChart';

const ProductForecastModal = ({ product, onClose }) => {
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDetailedForecast();
  }, [product.productId]);

  const fetchDetailedForecast = async () => {
    try {
      const response = await forecastService.getForecastForProduct(
        product.productId,
        30
      );
      setForecast(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load forecast');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading forecast...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {forecast?.productName || product.productName}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              SKU: {forecast?.productSku || product.productSku}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {error ? (
          <div className="p-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600 flex items-center space-x-2">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          </div>
        ) : forecast ? (
          <div className="p-6 space-y-6">
            {/* Current Status */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <p className="text-sm text-blue-700 mb-1">Current Stock</p>
                <p className="text-2xl font-bold text-blue-900">
                  {forecast.currentStock}
                </p>
              </div>
              <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                <p className="text-sm text-orange-700 mb-1">Reorder Level</p>
                <p className="text-2xl font-bold text-orange-900">
                  {forecast.reorderLevel}
                </p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                <p className="text-sm text-purple-700 mb-1">Confidence</p>
                <p className="text-2xl font-bold text-purple-900">
                  {(forecast.confidenceScore * 100).toFixed(0)}%
                </p>
              </div>
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <p className="text-sm text-green-700 mb-1">Avg Daily Demand</p>
                <p className="text-2xl font-bold text-green-900">
                  {forecast.historicalSummary?.avgDailyDemand?.toFixed(1) || 0}
                </p>
              </div>
            </div>

            {/* Predictions Summary */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6 border border-indigo-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-indigo-600" />
                <span>Demand Predictions</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Next 7 Days</p>
                  <p className="text-3xl font-bold text-indigo-600 mt-1">
                    {forecast.predictions.next7Days}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Next 14 Days</p>
                  <p className="text-3xl font-bold text-indigo-600 mt-1">
                    {forecast.predictions.next14Days}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Next 30 Days</p>
                  <p className="text-3xl font-bold text-indigo-600 mt-1">
                    {forecast.predictions.next30Days}
                  </p>
                </div>
              </div>
            </div>

            {/* Risk Analysis */}
            <div
              className={`rounded-lg p-6 border ${
                forecast.riskAnalysis.atRisk
                  ? 'bg-red-50 border-red-200'
                  : 'bg-green-50 border-green-200'
              }`}
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <AlertCircle
                  className={`w-5 h-5 ${
                    forecast.riskAnalysis.atRisk ? 'text-red-600' : 'text-green-600'
                  }`}
                />
                <span>Risk Analysis</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <p
                    className={`text-xl font-bold mt-1 ${
                      forecast.riskAnalysis.atRisk ? 'text-red-600' : 'text-green-600'
                    }`}
                  >
                    {forecast.riskAnalysis.atRisk ? 'At Risk' : 'Safe'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Risk Level</p>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mt-1 ${
                      {
                        CRITICAL: 'bg-red-600 text-white',
                        HIGH: 'bg-orange-600 text-white',
                        MEDIUM: 'bg-yellow-600 text-white',
                        LOW: 'bg-green-600 text-white',
                      }[forecast.riskAnalysis.riskLevel]
                    }`}
                  >
                    {forecast.riskAnalysis.riskLevel}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Days Until Stockout</p>
                  <p className="text-xl font-bold text-gray-900 mt-1">
                    {forecast.riskAnalysis.daysUntilStockout || 'N/A'}
                  </p>
                </div>
              </div>
              {forecast.riskAnalysis.recommendedOrderQuantity > 0 && (
                <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-600">Recommended Order Quantity</p>
                  <p className="text-2xl font-bold text-indigo-600 mt-1">
                    {forecast.riskAnalysis.recommendedOrderQuantity} units
                  </p>
                </div>
              )}
            </div>

            {/* Forecast Chart */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-gray-600" />
                <span>30-Day Forecast</span>
              </h3>
              <ForecastChart data={forecast.predictions.dailyForecast} />
            </div>

            {/* Historical Summary */}
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Historical Summary (90 Days)
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Avg Daily</p>
                  <p className="text-xl font-bold text-gray-900 mt-1">
                    {forecast.historicalSummary?.avgDailyDemand?.toFixed(1) || 0}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Max Daily</p>
                  <p className="text-xl font-bold text-gray-900 mt-1">
                    {forecast.historicalSummary?.maxDailyDemand || 0}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Min Daily</p>
                  <p className="text-xl font-bold text-gray-900 mt-1">
                    {forecast.historicalSummary?.minDailyDemand || 0}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Demand</p>
                  <p className="text-xl font-bold text-gray-900 mt-1">
                    {forecast.historicalSummary?.totalDemand90Days || 0}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ProductForecastModal;