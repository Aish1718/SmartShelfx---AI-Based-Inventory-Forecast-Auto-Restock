import api from './api';

export const purchaseOrderService = {
  // Create new purchase order
  createPurchaseOrder: (data) => api.post('/purchase-orders', data),

  // Get all purchase orders
  getAllPurchaseOrders: () => api.get('/purchase-orders'),

  // Get purchase order by ID
  getPurchaseOrderById: (id) => api.get(`/purchase-orders/${id}`),

  // Get purchase orders by status
  getPurchaseOrdersByStatus: (status) => api.get(`/purchase-orders/status/${status}`),

  // Get purchase orders by vendor
  getPurchaseOrdersByVendor: (vendorId) => api.get(`/purchase-orders/vendor/${vendorId}`),

  // Update order status
  updateOrderStatus: (id, data) => api.put(`/purchase-orders/${id}/status`, data),

  // Delete purchase order
  deletePurchaseOrder: (id) => api.delete(`/purchase-orders/${id}`),

  // Get restock recommendations
  getRestockRecommendations: () => api.get('/purchase-orders/recommendations'),

  // Generate auto-restock orders
  generateAutoRestockOrders: () => api.post('/purchase-orders/auto-restock'),
};