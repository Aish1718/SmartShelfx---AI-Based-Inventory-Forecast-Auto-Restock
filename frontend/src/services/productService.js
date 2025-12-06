import api from './api';

export const productService = {
  getAllProducts: () => api.get('/products'),

  getProductById: (id) => api.get(`/products/${id}`),

  getProductBySku: (sku) => api.get(`/products/sku/${sku}`),

  createProduct: (data) => api.post('/products', data),

  updateProduct: (id, data) => api.put(`/products/${id}`, data),

  deleteProduct: (id) => api.delete(`/products/${id}`),

  searchProducts: (keyword) => api.get('/products/search', { params: { keyword } }),

  getProductsByCategory: (category) => api.get(`/products/category/${category}`),

  getLowStockProducts: () => api.get('/products/low-stock'),

  getAllCategories: () => api.get('/products/categories'),

  importCSV: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/products/import-csv', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },

  getProductsByManager: async (managerId) => {
    return await api.get(`/products/manager/${managerId}`);
  },

};