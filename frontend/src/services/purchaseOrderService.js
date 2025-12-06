// // frontend/src/services/purchaseOrderService.js

// import api from './api';

// export const purchaseOrderService = {
//   // Create new purchase order
//   createPurchaseOrder: (data) => api.post('/purchase-orders', data),

//   // Get all purchase orders
//   getAllPurchaseOrders: () => api.get('/purchase-orders'),

//   // Get purchase order by ID
//   getPurchaseOrderById: (id) => api.get(`/purchase-orders/${id}`),

//   // Get purchase orders by status
//   getPurchaseOrdersByStatus: (status) => api.get(`/purchase-orders/status/${status}`),

//   // Get purchase orders by vendor
//   getPurchaseOrdersByVendor: (vendorId) => api.get(`/purchase-orders/vendor/${vendorId}`),

//   // Update order status
//   updateOrderStatus: (id, data) => api.put(`/purchase-orders/${id}/status`, data),

//   // Delete purchase order
//   deletePurchaseOrder: (id) => api.delete(`/purchase-orders/${id}`),

//   // Get restock recommendations
//   getRestockRecommendations: (payload) => api.get('/purchase-orders/recommendations', payload),

//   // Generate auto-restock orders
//   generateAutoRestockOrders: () => api.post('/purchase-orders/auto-restock'),
// };





// frontend/src/services/purchaseOrderService.js
import api from './api';

export const purchaseOrderService = {
  // Get all purchase orders
  getAllPurchaseOrders: async () => {
    return await api.get('/purchase-orders');
  },

  // Get purchase order by ID
  getPurchaseOrderById: async (id) => {
    return await api.get(`/purchase-orders/${id}`);
  },

  // Get orders by status
  getPurchaseOrdersByStatus: async (status) => {
    return await api.get(`/purchase-orders/status/${status}`);
  },

  // Get orders by vendor
  getPurchaseOrdersByVendor: async (vendorId) => {
    return await api.get(`/purchase-orders/vendor/${vendorId}`);
  },

  // ⭐ ADD THIS
  getPurchaseOrdersByManager: async (managerId) => {
      return await api.get(`/purchase-orders/manager/${managerId}`);
  },

  // Create new purchase order
  createPurchaseOrder: async (orderData) => {
    return await api.post('/purchase-orders', orderData);
  },

  // Update order status
  updateOrderStatus: async (id, statusData) => {
    return await api.put(`/purchase-orders/${id}/status`, statusData);
  },

  // Delete purchase order
  deletePurchaseOrder: async (id) => {
    return await api.delete(`/purchase-orders/${id}`);
  },

  // ⭐ NEW: Get AI restock recommendations
  getRestockRecommendations: async () => {
    return await api.get('/purchase-orders/recommendations');
  },

  // ⭐ NEW: Auto-generate restock orders (bulk)
  generateAutoRestockOrders: async () => {
    return await api.post('/purchase-orders/auto-restock');
  },
};