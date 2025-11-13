import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Package, TrendingDown, ShoppingCart, AlertTriangle } from 'lucide-react';
import api from '../../services/api';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({
    totalProducts: 0,
    lowStockCount: 0,
    pendingOrders: 0,
    totalValue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await api.get('/dashboard/stats');
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Products',
      value: stats.totalProducts || 0,
      icon: Package,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Low Stock Alerts',
      value: stats.lowStockCount || 0,
      icon: AlertTriangle,
      color: 'bg-red-500',
      bgColor: 'bg-red-50',
    },
    {
      title: 'Pending Orders',
      value: stats.pendingOrders || 0,
      icon: ShoppingCart,
      color: 'bg-yellow-500',
      bgColor: 'bg-yellow-50',
    },
    {
      title: 'Inventory Value',
      value: `$${(stats.totalValue || 0).toLocaleString()}`,
      icon: TrendingDown,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Welcome back, {user?.name}! Here's your inventory overview.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{card.title}</p>
                <p className="text-2xl font-bold text-gray-900">{card.value}</p>
              </div>
              <div className={`${card.bgColor} p-3 rounded-lg`}>
                <card.icon className={`w-6 h-6 ${card.color.replace('bg-', 'text-')}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center justify-between py-3 border-b last:border-b-0">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                    <Package className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Product Updated</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full bg-indigo-50 hover:bg-indigo-100 text-indigo-700 py-3 px-4 rounded-lg text-left font-medium transition">
              Add New Product
            </button>
            <button className="w-full bg-green-50 hover:bg-green-100 text-green-700 py-3 px-4 rounded-lg text-left font-medium transition">
              Record Stock In
            </button>
            <button className="w-full bg-yellow-50 hover:bg-yellow-100 text-yellow-700 py-3 px-4 rounded-lg text-left font-medium transition">
              View Forecast
            </button>
            <button className="w-full bg-red-50 hover:bg-red-100 text-red-700 py-3 px-4 rounded-lg text-left font-medium transition">
              Check Alerts
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;