// frontend/src/services/forecastService.js

import api from './api';

export const forecastService = {
  // Get forecast for a specific product
  getForecastForProduct: (productId, days = 30) =>
    api.get(`/forecast/product/${productId}`, { params: { days } }),

  // Get bulk forecasts
  getBulkForecast: (productIds = null) =>
    api.post('/forecast/bulk', productIds ? { product_ids: productIds } : {}),

  // Get products at risk of stockout
  getProductsAtRisk: () =>
    api.get('/forecast/at-risk'),

  // Get forecast summary
  getForecastSummary: () =>
    api.get('/forecast/summary'),

  // Test AI service connection
  testConnection: () =>
    api.get('/forecast/test-connection'),
};