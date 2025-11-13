import api from './api';

export const transactionService = {
  // Create new transaction (Stock IN or OUT)
  createTransaction: (data) => api.post('/transactions', data),

  // Get all transactions
  getAllTransactions: () => api.get('/transactions'),

  // Get transaction by ID
  getTransactionById: (id) => api.get(`/transactions/${id}`),

  // Get transactions by product
  getTransactionsByProduct: (productId) => api.get(`/transactions/product/${productId}`),

  // Get transactions by type (IN or OUT)
  getTransactionsByType: (type) => api.get(`/transactions/type/${type}`),

  // Get transactions by date range
  getTransactionsByDateRange: (startDate, endDate) =>
    api.get('/transactions/date-range', {
      params: { startDate, endDate }
    }),

  // Get today's transactions
  getTodayTransactions: () => api.get('/transactions/today'),

  // Get transaction summary
  getTransactionSummary: () => api.get('/transactions/summary'),
};