// // frontend/src/services/forecastService.js

// import api from './api';

// export const forecastService = {
//   // Get forecast for a specific product
//   getForecastForProduct: (productId, days = 30) =>
//     api.get(`/forecast/product/${productId}`, { params: { days } }),

//   // Get bulk forecasts
//   getBulkForecast: (productIds = null) =>
//     api.post('/forecast/bulk', productIds ? { product_ids: productIds } : {}),

//   // Get products at risk of stockout
//   getProductsAtRisk: () =>
//     api.get('/forecast/at-risk'),

//   // Get forecast summary
//   getForecastSummary: () =>
//     api.get('/forecast/summary'),

//   // Test AI service connection
//   testConnection: () =>
//     api.get('/forecast/test-connection'),
// };



// frontend/src/services/forecastService.js

import api from './api';

const retryRequest = async (fn, retries = 3, delay = 1000) => {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === retries - 1) throw error;

      console.log(`Retry ${i + 1}/${retries} after ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
      delay *= 2; // Exponential backoff
    }
  }
};

export const forecastService = {
  // Get forecast for a specific product
  getForecastForProduct: (productId, days = 30) =>
    retryRequest(() =>
      api.get(`/forecast/product/${productId}`, { params: { days } })
    ),

  // Get bulk forecasts
  getBulkForecast: (productIds = null) =>
    retryRequest(() =>
      api.post('/forecast/bulk', productIds ? { product_ids: productIds } : {})
    ),

  // Get products at risk of stockout
  getProductsAtRisk: () =>
    retryRequest(() => api.get('/forecast/at-risk')),

  // Get forecast summary
  getForecastSummary: () =>
    retryRequest(() => api.get('/forecast/summary')),

  // Test AI service connection
  testConnection: () =>
    api.get('/forecast/test-connection'),
};