// src/services/vendorService.js
import api from './api';

const vendorService = {
  // Fetch all purchase orders for the vendor
  getVendorOrders: (vendorId) => api.get(`/purchase-orders/vendor/${vendorId}`).then(res => res.data),
};

export default vendorService;
