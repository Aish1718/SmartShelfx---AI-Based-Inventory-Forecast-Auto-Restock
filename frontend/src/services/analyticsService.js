import api from './api';

export const analyticsService = {
  getDashboardStats: () => api.get('/dashboard/stats'),
  getInventoryTrends: () => api.get('/analytics/inventory-trends'),
  getTopProducts: (limit = 10) => api.get(`/analytics/top-products?limit=${limit}`),
  getSalesComparison: (months = 6) => api.get(`/analytics/sales-comparison?months=${months}`),
  exportReport: (format = 'pdf') => api.get(`/analytics/export?format=${format}`, {
    responseType: 'blob'
  }),
};