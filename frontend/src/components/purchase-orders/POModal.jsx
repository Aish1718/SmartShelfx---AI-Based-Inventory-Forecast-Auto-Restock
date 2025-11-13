import React from 'react';
import { X, Package, User, Calendar, DollarSign, FileText } from 'lucide-react';

const POModal = ({ order, onClose }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status) => {
    const colors = {
      PENDING: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      APPROVED: 'bg-blue-100 text-blue-800 border-blue-300',
      DISPATCHED: 'bg-purple-100 text-purple-800 border-purple-300',
      DELIVERED: 'bg-green-100 text-green-800 border-green-300',
      CANCELLED: 'bg-red-100 text-red-800 border-red-300',
    };
    return colors[status] || 'bg-gray-100 text-gray-800 border-gray-300';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Purchase Order #{order.id}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Created {formatDateTime(order.createdAt)}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Status Badge */}
          <div className="flex items-center space-x-3">
            <span
              className={`px-4 py-2 text-sm font-semibold rounded-full border-2 ${getStatusColor(
                order.status
              )}`}
            >
              {order.status}
            </span>
            {order.isAiGenerated && (
              <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-semibold rounded-full">
                AI Generated
              </span>
            )}
          </div>

          {/* Product Information */}
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <div className="flex items-center space-x-2 mb-4">
              <Package className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg font-semibold text-gray-900">Product Information</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Product Name</p>
                <p className="text-base font-semibold text-gray-900">{order.productName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">SKU</p>
                <p className="text-base font-semibold text-gray-900">{order.productSku}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Quantity Ordered</p>
                <p className="text-base font-semibold text-gray-900">{order.quantity} units</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Cost</p>
                <p className="text-base font-semibold text-green-600">
                  ${order.totalCost?.toFixed(2) || '0.00'}
                </p>
              </div>
            </div>
          </div>

          {/* Vendor Information */}
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <div className="flex items-center space-x-2 mb-4">
              <User className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg font-semibold text-gray-900">Vendor Information</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Vendor Name</p>
                <p className="text-base font-semibold text-gray-900">{order.vendorName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Contact Email</p>
                <p className="text-base font-semibold text-gray-900">{order.vendorEmail}</p>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <div className="flex items-center space-x-2 mb-4">
              <Calendar className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg font-semibold text-gray-900">Timeline</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Order Date</span>
                <span className="text-sm font-semibold text-gray-900">
                  {formatDateTime(order.orderDate)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Expected Delivery</span>
                <span className="text-sm font-semibold text-gray-900">
                  {formatDate(order.expectedDelivery)}
                </span>
              </div>
              {order.approvedAt && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Approved On</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {formatDateTime(order.approvedAt)}
                  </span>
                </div>
              )}
              {order.approvedByName && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Approved By</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {order.approvedByName}
                  </span>
                </div>
              )}
              {order.actualDelivery && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Actual Delivery</span>
                  <span className="text-sm font-semibold text-green-600">
                    {formatDate(order.actualDelivery)}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Notes */}
          {order.notes && (
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <div className="flex items-center space-x-2 mb-4">
                <FileText className="w-5 h-5 text-gray-600" />
                <h3 className="text-lg font-semibold text-gray-900">Notes</h3>
              </div>
              <p className="text-sm text-gray-700 whitespace-pre-wrap">{order.notes}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="w-full px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default POModal;
