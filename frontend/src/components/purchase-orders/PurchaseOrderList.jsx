import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShoppingCart,
  Plus,
  Filter,
  RefreshCw,
  Sparkles,
  Package
} from 'lucide-react';
import { purchaseOrderService } from '../../services/purchaseOrderService';
import { AuthContext } from '../../context/AuthContext';
import PurchaseOrderTable from './PurchaseOrderTable';
import PurchaseOrderForm from './PurchaseOrderForm';
import RestockRecommendation from './RestockRecommendation';

const PurchaseOrderList = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [statusFilter, orders]);

  const fetchOrders = async () => {
    try {
      let response;
      if (user.role === 'VENDOR') {
        response = await purchaseOrderService.getPurchaseOrdersByVendor(user.id);
      } else {
        response = await purchaseOrderService.getAllPurchaseOrders();
      }
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const filterOrders = () => {
    if (statusFilter === 'all') {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(orders.filter(o => o.status === statusFilter));
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchOrders();
  };

  const handleFormSubmit = () => {
    setShowForm(false);
    fetchOrders();
  };

  const getStatusColor = (status) => {
    const colors = {
      PENDING: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      APPROVED: 'bg-blue-100 text-blue-800 border-blue-200',
      DISPATCHED: 'bg-purple-100 text-purple-800 border-purple-200',
      DELIVERED: 'bg-green-100 text-green-800 border-green-200',
      CANCELLED: 'bg-red-100 text-red-800 border-red-200',
    };
    return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const statusCounts = {
    PENDING: orders.filter(o => o.status === 'PENDING').length,
    APPROVED: orders.filter(o => o.status === 'APPROVED').length,
    DISPATCHED: orders.filter(o => o.status === 'DISPATCHED').length,
    DELIVERED: orders.filter(o => o.status === 'DELIVERED').length,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
            <ShoppingCart className="w-8 h-8 text-indigo-600" />
            <span>Purchase Orders</span>
          </h1>
          <p className="text-gray-600 mt-1">Manage procurement and restocking</p>
        </div>
        <div className="flex space-x-3">
          {user.role !== 'VENDOR' && (
            <>
              <button
                onClick={() => setShowRecommendations(true)}
                className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
              >
                <Sparkles className="w-5 h-5" />
                <span>AI Recommendations</span>
              </button>
              <button
                onClick={() => setShowForm(true)}
                className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
              >
                <Plus className="w-5 h-5" />
                <span>Create Order</span>
              </button>
            </>
          )}
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition disabled:opacity-50"
          >
            <RefreshCw className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">{statusCounts.PENDING}</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Package className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Approved</p>
              <p className="text-2xl font-bold text-blue-600">{statusCounts.APPROVED}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">In Transit</p>
              <p className="text-2xl font-bold text-purple-600">{statusCounts.DISPATCHED}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <Package className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Delivered</p>
              <p className="text-2xl font-bold text-green-600">{statusCounts.DELIVERED}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <Package className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex items-center space-x-4">
          <Filter className="w-5 h-5 text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Orders ({orders.length})</option>
            <option value="PENDING">Pending ({statusCounts.PENDING})</option>
            <option value="APPROVED">Approved ({statusCounts.APPROVED})</option>
            <option value="DISPATCHED">In Transit ({statusCounts.DISPATCHED})</option>
            <option value="DELIVERED">Delivered ({statusCounts.DELIVERED})</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <PurchaseOrderTable
        orders={filteredOrders}
        onRefresh={fetchOrders}
        loading={loading}
      />

      {/* Modals */}
      {showForm && (
        <PurchaseOrderForm
          onClose={() => setShowForm(false)}
          onSubmit={handleFormSubmit}
        />
      )}

      {showRecommendations && (
        <RestockRecommendation
          onClose={() => setShowRecommendations(false)}
          onOrdersCreated={fetchOrders}
        />
      )}
    </div>
  );
};

export default PurchaseOrderList;