import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowDownCircle,
  ArrowUpCircle,
  Calendar,
  Filter,
  Download,
  Plus
} from 'lucide-react';
import { transactionService } from '../../services/transactionService';
// import { format } from 'date-fns';

const TransactionHistory = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [summary, setSummary] = useState(null);
  const [filterType, setFilterType] = useState('all');
  const [dateRange, setDateRange] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransactions();
    fetchSummary();
  }, []);

  useEffect(() => {
    filterTransactions();
  }, [filterType, dateRange, transactions]);

  const fetchTransactions = async () => {
    try {
      let response;
      if (dateRange === 'today') {
        response = await transactionService.getTodayTransactions();
      } else {
        response = await transactionService.getAllTransactions();
      }
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSummary = async () => {
    try {
      const response = await transactionService.getTransactionSummary();
      setSummary(response.data);
    } catch (error) {
      console.error('Error fetching summary:', error);
    }
  };

  const filterTransactions = () => {
    let filtered = [...transactions];

    // Filter by type
    if (filterType !== 'all') {
      filtered = filtered.filter(t => t.type === filterType);
    }

    // Filter by date range
    if (dateRange === 'today') {
      const today = new Date().toDateString();
      filtered = filtered.filter(t =>
        new Date(t.timestamp).toDateString() === today
      );
    } else if (dateRange === 'week') {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      filtered = filtered.filter(t => new Date(t.timestamp) >= weekAgo);
    } else if (dateRange === 'month') {
      const monthAgo = new Date();
      monthAgo.setMonth(monthAgo.getMonth() - 1);
      filtered = filtered.filter(t => new Date(t.timestamp) >= monthAgo);
    }

    setFilteredTransactions(filtered);
  };

  const formatDate = (dateString) => {
  try {
    const date = new Date(dateString);
    const options = {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    };
    return date.toLocaleDateString('en-US', options);
    } catch {
    return dateString;
    }
    };

  const exportTransactions = () => {
    // Create CSV content
    const headers = ['Date', 'Product', 'SKU', 'Type', 'Quantity', 'Previous Stock', 'New Stock', 'Handled By', 'Reference', 'Notes'];
    const csvContent = [
      headers.join(','),
      ...filteredTransactions.map(t => [
        formatDate(t.timestamp),
        t.productName,
        t.productSku,
        t.type,
        t.quantity,
        t.previousStock,
        t.newStock,
        t.handledByName || 'N/A',
        t.referenceNumber || 'N/A',
        (t.notes || 'N/A').replace(/,/g, ';')
      ].join(','))
    ].join('\n');

    // Download CSV
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transactions_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
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
          <h1 className="text-3xl font-bold text-gray-900">Transaction History</h1>
          <p className="text-gray-600 mt-1">Track all stock movements</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={exportTransactions}
            className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
          >
            <Download className="w-5 h-5" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={() => navigate('/transactions/stock-in')}
            className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
          >
            <ArrowDownCircle className="w-5 h-5" />
            <span>Stock In</span>
          </button>
          <button
            onClick={() => navigate('/transactions/stock-out')}
            className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
          >
            <ArrowUpCircle className="w-5 h-5" />
            <span>Stock Out</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      {summary && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <p className="text-sm text-gray-600">Total Transactions</p>
            <p className="text-2xl font-bold text-gray-900">{summary.totalTransactions}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <p className="text-sm text-gray-600">Stock In</p>
            <p className="text-2xl font-bold text-green-600">
              {summary.stockInCount} ({summary.totalStockIn} units)
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <p className="text-sm text-gray-600">Stock Out</p>
            <p className="text-2xl font-bold text-red-600">
              {summary.stockOutCount} ({summary.totalStockOut} units)
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <p className="text-sm text-gray-600">Products Affected</p>
            <p className="text-2xl font-bold text-indigo-600">{summary.productCount}</p>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 appearance-none"
            >
              <option value="all">All Transactions</option>
              <option value="IN">Stock In Only</option>
              <option value="OUT">Stock Out Only</option>
            </select>
          </div>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 appearance-none"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
            </select>
          </div>
        </div>
      </div>

      {/* Transaction Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {filteredTransactions.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <p>No transactions found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date & Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock Change</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Handled By</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reference</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDate(transaction.timestamp)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{transaction.productName}</p>
                        <p className="text-xs text-gray-500">SKU: {transaction.productSku}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {transaction.type === 'IN' ? (
                        <span className="px-2 py-1 inline-flex items-center space-x-1 text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          <ArrowDownCircle className="w-3 h-3" />
                          <span>Stock In</span>
                        </span>
                      ) : (
                        <span className="px-2 py-1 inline-flex items-center space-x-1 text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                          <ArrowUpCircle className="w-3 h-3" />
                          <span>Stock Out</span>
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      {transaction.type === 'IN' ? '+' : '-'}{transaction.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {transaction.previousStock} → {transaction.newStock}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {transaction.handledByName || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {transaction.referenceNumber || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;