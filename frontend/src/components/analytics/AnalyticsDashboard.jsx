import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Download, Calendar } from 'lucide-react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, LineElement, PointElement } from 'chart.js';
import { Pie, Bar, Line } from 'react-chartjs-2';
import { analyticsService } from '../../services/analyticsService';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, LineElement, PointElement);

const AnalyticsDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await analyticsService.getDashboardStats();
      setStats(response.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const categoryData = {
    labels: ['Electronics', 'Clothing', 'Food', 'Books', 'Furniture'],
    datasets: [{
      data: [30, 25, 20, 15, 10],
      backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'],
    }]
  };

  const monthlyData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Stock In',
      data: [650, 590, 800, 810, 560, 550],
      backgroundColor: '#10B981',
    }, {
      label: 'Stock Out',
      data: [450, 520, 600, 650, 490, 500],
      backgroundColor: '#EF4444',
    }]
  };

  const trendData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [{
      label: 'Inventory Value',
      data: [45000, 52000, 48000, 55000],
      borderColor: '#3B82F6',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      fill: true,
    }]
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
            <BarChart3 className="w-8 h-8 text-indigo-600" />
            <span>Analytics & Reports</span>
          </h1>
          <p className="text-gray-600 mt-1">Comprehensive inventory insights</p>
        </div>
        <button className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
          <Download className="w-5 h-5" />
          <span>Export Report</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <p className="text-sm text-gray-600">Total Products</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            {stats?.totalProducts || 0}
          </p>
          <p className="text-sm text-green-600 mt-2">+12% from last month</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <p className="text-sm text-gray-600">Total Value</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            ${(stats?.totalValue || 0).toLocaleString()}
          </p>
          <p className="text-sm text-green-600 mt-2">+8% from last month</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <p className="text-sm text-gray-600">Low Stock Items</p>
          <p className="text-3xl font-bold text-red-600 mt-2">
            {stats?.lowStockCount || 0}
          </p>
          <p className="text-sm text-red-600 mt-2">Action required</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <p className="text-sm text-gray-600">Active Orders</p>
          <p className="text-3xl font-bold text-blue-600 mt-2">
            {stats?.pendingOrders || 0}
          </p>
          <p className="text-sm text-blue-600 mt-2">In progress</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Inventory by Category</h2>
          <Pie data={categoryData} />
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Monthly Stock Movement</h2>
          <Bar data={monthlyData} />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Inventory Value Trend</h2>
        <Line data={trendData} />
      </div>
    </div>
  );
};

export default AnalyticsDashboard;