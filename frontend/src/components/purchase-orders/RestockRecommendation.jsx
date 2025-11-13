import React, { useState, useEffect } from 'react';
import { X, Sparkles, ShoppingCart, AlertTriangle, TrendingUp } from 'lucide-react';
import { purchaseOrderService } from '../../services/purchaseOrderService';

const RestockRecommendation = ({ onClose, onOrdersCreated }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    try {
      const response = await purchaseOrderService.getRestockRecommendations();
      setRecommendations(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load recommendations');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateAll = async () => {
    if (!window.confirm('Generate purchase orders for all recommended products?')) {
      return;
    }

    setGenerating(true);
    try {
      const response = await purchaseOrderService.generateAutoRestockOrders();
      alert(`Successfully generated ${response.data.length} purchase orders!`);
      onOrdersCreated();
      onClose();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to generate orders');
    } finally {
      setGenerating(false);
    }
  };

  const getRiskColor = (level) => {
    const colors = {
      CRITICAL: 'bg-red-100 text-red-800 border-red-300',
      HIGH: 'bg-orange-100 text-orange-800 border-orange-300',
      MEDIUM: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      LOW: 'bg-green-100 text-green-800 border-green-300',
    };
    return colors[level] || 'bg-gray-100 text-gray-800 border-gray-300';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white">
          <div className="flex items-center space-x-3">
            <Sparkles className="w-6 h-6 text-purple-600" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900">AI Restock Recommendations</h2>
              <p className="text-sm text-gray-600 mt-1">
                Powered by machine learning forecasts
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          )}

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading AI recommendations...</p>
            </div>
          ) : recommendations.length === 0 ? (
            <div className="text-center py-12">
              <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No restock recommendations at this time</p>
              <p className="text-sm text-gray-500 mt-2">All products have adequate stock levels</p>
            </div>
          ) : (
            <>
              <div className="mb-6 flex justify-between items-center">
                <p className="text-gray-600">
                  Found <span className="font-bold text-gray-900">{recommendations.length}</span>{' '}
                  products that need restocking
                </p>
                <button
                  onClick={handleGenerateAll}
                  disabled={generating}
                  className="flex items-center space-x-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition font-medium disabled:opacity-50"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>{generating ? 'Generating...' : 'Generate All Orders'}</span>
                </button>
              </div>

              <div className="space-y-4">
                {recommendations.map((rec) => (
                  <div
                    key={rec.productId}
                    className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {rec.productName}
                          </h3>
                          <span
                            className={`px-3 py-1 text-xs font-semibold rounded-full border ${getRiskColor(
                              rec.riskLevel
                            )}`}
                          >
                            {rec.riskLevel} RISK
                          </span>
                          {rec.hasActiveOrder && (
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                              Order Pending
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-4">SKU: {rec.productSku}</p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div>
                            <p className="text-xs text-gray-600">Current Stock</p>
                            <p className="text-lg font-bold text-gray-900">{rec.currentStock}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-600">Reorder Level</p>
                            <p className="text-lg font-bold text-gray-900">{rec.reorderLevel}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-600">7-Day Demand</p>
                            <p className="text-lg font-bold text-orange-600">
                              {rec.predictedDemand7Days}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-600">Recommended Order</p>
                            <p className="text-lg font-bold text-purple-600">
                              {rec.recommendedQuantity}
                            </p>
                          </div>
                        </div>

                        {rec.reason && (
                          <div className="bg-orange-50 border border-orange-200 rounded p-3 mb-4">
                            <p className="text-sm text-orange-800">
                              <strong>Reason:</strong> {rec.reason}
                            </p>
                          </div>
                        )}

                        {rec.vendorName && (
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <span>Vendor:</span>
                            <span className="font-semibold text-gray-900">{rec.vendorName}</span>
                            <span className="text-gray-400">({rec.vendorEmail})</span>
                          </div>
                        )}

                        <div className="mt-4 flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <div className="w-full bg-gray-200 rounded-full h-2 w-32">
                              <div
                                className="bg-green-600 h-2 rounded-full"
                                style={{ width: `${rec.confidenceScore * 100}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-600">
                              {(rec.confidenceScore * 100).toFixed(0)}% confidence
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RestockRecommendation;