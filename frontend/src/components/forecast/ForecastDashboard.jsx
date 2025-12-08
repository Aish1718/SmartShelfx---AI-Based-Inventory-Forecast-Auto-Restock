// // frontend/src/components/forecast/ForecastDashboard.jsx

// import React, { useState, useEffect } from 'react';
// import {
//   TrendingUp,
//   AlertTriangle,
//   Activity,
//   RefreshCw,
//   BarChart3,
//   Package
// } from 'lucide-react';
// import { forecastService } from '../../services/forecastService';
// import ForecastChart from './ForecastChart';
// import ForecastTable from './ForecastTable';
// import ProductForecastModal from './ProductForecastModel';

// const ForecastDashboard = () => {
//   const [summary, setSummary] = useState(null);
//   const [atRiskProducts, setAtRiskProducts] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     setLoading(true);
//     setError('');

//     try {
//       const [summaryRes, atRiskRes] = await Promise.all([
//         forecastService.getForecastSummary(),
//         forecastService.getProductsAtRisk()
//       ]);

//       setSummary(summaryRes.data);
//       setAtRiskProducts(atRiskRes.data.products || []);
//     } catch (err) {
//       setError(err.response?.data?.error || 'Failed to load forecast data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRefresh = async () => {
//     setRefreshing(true);
//     await fetchData();
//     setRefreshing(false);
//   };

//   const handleViewForecast = (product) => {
//     setSelectedProduct(product);
//     setShowModal(true);
//   };

//   const getRiskColor = (level) => {
//     const colors = {
//       CRITICAL: 'bg-red-100 text-red-800 border-red-200',
//       HIGH: 'bg-orange-100 text-orange-800 border-orange-200',
//       MEDIUM: 'bg-yellow-100 text-yellow-800 border-yellow-200',
//       LOW: 'bg-green-100 text-green-800 border-green-200',
//     };
//     return colors[level] || 'bg-gray-100 text-gray-800 border-gray-200';
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading AI forecasts...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
//             <TrendingUp className="w-8 h-8 text-indigo-600" />
//             <span>AI Demand Forecasting</span>
//           </h1>
//           <p className="text-gray-600 mt-1">
//             Machine learning powered inventory predictions
//           </p>
//         </div>
//         <button
//           onClick={handleRefresh}
//           disabled={refreshing}
//           className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
//         >
//           <RefreshCw className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
//           <span>{refreshing ? 'Refreshing...' : 'Refresh'}</span>
//         </button>
//       </div>

//       {error && (
//         <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
//           {error}
//         </div>
//       )}

//       {/* Summary Cards */}
//       {summary && (
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//           <div className="bg-white rounded-lg shadow-sm p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">Total Products</p>
//                 <p className="text-3xl font-bold text-gray-900 mt-2">
//                   {summary.totalProducts}
//                 </p>
//               </div>
//               <div className="bg-indigo-100 p-3 rounded-lg">
//                 <Package className="w-6 h-6 text-indigo-600" />
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-lg shadow-sm p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">At Risk</p>
//                 <p className="text-3xl font-bold text-red-600 mt-2">
//                   {summary.productsAtRisk}
//                 </p>
//               </div>
//               <div className="bg-red-100 p-3 rounded-lg">
//                 <AlertTriangle className="w-6 h-6 text-red-600" />
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-lg shadow-sm p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">Avg Confidence</p>
//                 <p className="text-3xl font-bold text-green-600 mt-2">
//                   {(summary.avgConfidence * 100).toFixed(0)}%
//                 </p>
//               </div>
//               <div className="bg-green-100 p-3 rounded-lg">
//                 <Activity className="w-6 h-6 text-green-600" />
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-lg shadow-sm p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">7-Day Demand</p>
//                 <p className="text-3xl font-bold text-blue-600 mt-2">
//                   {summary.totalPredictedDemand7Days}
//                 </p>
//               </div>
//               <div className="bg-blue-100 p-3 rounded-lg">
//                 <BarChart3 className="w-6 h-6 text-blue-600" />
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Risk Breakdown */}
//       {summary && (
//         <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
//           <h2 className="text-lg font-semibold mb-4">Risk Level Breakdown</h2>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//             <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
//               <p className="text-2xl font-bold text-red-600">{summary.criticalRisk}</p>
//               <p className="text-sm text-red-700 mt-1">Critical</p>
//             </div>
//             <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-200">
//               <p className="text-2xl font-bold text-orange-600">{summary.highRisk}</p>
//               <p className="text-sm text-orange-700 mt-1">High</p>
//             </div>
//             <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
//               <p className="text-2xl font-bold text-yellow-600">{summary.mediumRisk}</p>
//               <p className="text-sm text-yellow-700 mt-1">Medium</p>
//             </div>
//             <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
//               <p className="text-2xl font-bold text-green-600">{summary.lowRisk}</p>
//               <p className="text-sm text-green-700 mt-1">Low</p>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Products at Risk Table */}
//       <div className="bg-white rounded-lg shadow-sm overflow-hidden">
//         <div className="p-6 border-b border-gray-200">
//           <h2 className="text-lg font-semibold flex items-center space-x-2">
//             <AlertTriangle className="w-5 h-5 text-red-600" />
//             <span>Products at Risk of Stockout</span>
//           </h2>
//         </div>

//         {atRiskProducts.length === 0 ? (
//           <div className="p-8 text-center text-gray-500">
//             <Activity className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//             <p>No products at risk of stockout</p>
//             <p className="text-sm mt-2">All products have adequate stock levels</p>
//           </div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                     Product
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                     Current Stock
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                     7-Day Demand
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                     Risk Level
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                     Confidence
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                     Action
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {atRiskProducts.map((product) => (
//                   <tr key={product.productId} className="hover:bg-gray-50">
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div>
//                         <p className="text-sm font-medium text-gray-900">
//                           {product.productName}
//                         </p>
//                         <p className="text-xs text-gray-500">SKU: {product.productSku}</p>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <p className="text-sm font-semibold text-gray-900">
//                         {product.currentStock}
//                       </p>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <p className="text-sm font-semibold text-red-600">
//                         {product.predictedDemand7Days}
//                       </p>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span
//                         className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getRiskColor(
//                           product.riskLevel
//                         )}`}
//                       >
//                         {product.riskLevel}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <p className="text-sm text-gray-900">
//                         {(product.confidenceScore * 100).toFixed(0)}%
//                       </p>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                       <button
//                         onClick={() => handleViewForecast(product)}
//                         className="text-indigo-600 hover:text-indigo-900"
//                       >
//                         View Details
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>

//       {/* Product Forecast Modal */}
//       {showModal && selectedProduct && (
//         <ProductForecastModal
//           product={selectedProduct}
//           onClose={() => {
//             setShowModal(false);
//             setSelectedProduct(null);
//           }}
//         />
//       )}
//     </div>
//   );
// };

// export default ForecastDashboard;


// frontend/src/components/forecast/ForecastDashboard.jsx

// import React, { useState, useEffect } from 'react';
// import {
//   TrendingUp,
//   AlertTriangle,
//   Activity,
//   RefreshCw,
//   BarChart3,
//   Package
// } from 'lucide-react';
// import { forecastService } from '../../services/forecastService';
// import ProductForecastModal from './ProductForecastModel';

// const ForecastDashboard = () => {
//   const [summary, setSummary] = useState(null);
//   const [atRiskProducts, setAtRiskProducts] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [error, setError] = useState('');

//   // frontend/src/components/forecast/ForecastDashboard.jsx
// // Add this to prevent multiple simultaneous requests

// const [isFetching, setIsFetching] = useState(false);

// const fetchData = async () => {
//   if (isFetching) {
//     console.log('⏳ Already fetching, skipping...');
//     return;
//   }

//   setIsFetching(true);
//   setLoading(true);
//   setError('');

//   try {
//     console.log('📊 Fetching forecast data...');

//     // Fetch sequentially instead of parallel to reduce load
//     const summaryRes = await forecastService.getForecastSummary();
//     console.log('✅ Summary:', summaryRes.data);
//     setSummary(summaryRes.data);

//     // Wait a bit before next request
//     await new Promise(resolve => setTimeout(resolve, 500));

//     const atRiskRes = await forecastService.getProductsAtRisk();
//     console.log('✅ At Risk:', atRiskRes.data);

//     const products = atRiskRes.data.products || atRiskRes.data || [];
//     setAtRiskProducts(products);

//   } catch (err) {
//     console.error('❌ Failed to load forecast data:', err);
//     setError(err.response?.data?.error || 'Failed to load forecast data');
//   } finally {
//     setLoading(false);
//     setIsFetching(false);
//   }
// };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   // const fetchData = async () => {
//   //   setLoading(true);
//   //   setError('');

//   //   try {
//   //     console.log('📊 Fetching forecast data...');

//   //     const [summaryRes, atRiskRes] = await Promise.all([
//   //       forecastService.getForecastSummary(),
//   //       forecastService.getProductsAtRisk()
//   //     ]);

//   //     console.log('✅ Summary:', summaryRes.data);
//   //     console.log('✅ At Risk:', atRiskRes.data);

//   //     setSummary(summaryRes.data);

//   //     // Handle both response formats
//   //     const products = atRiskRes.data.products || atRiskRes.data || [];
//   //     setAtRiskProducts(products);

//   //   } catch (err) {
//   //     console.error('❌ Failed to load forecast data:', err);
//   //     setError(err.response?.data?.error || 'Failed to load forecast data');
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   const handleRefresh = async () => {
//     setRefreshing(true);
//     await fetchData();
//     setRefreshing(false);
//   };

//   const handleViewForecast = (product) => {
//     console.log('👁️ Viewing forecast for:', product);

//     // Normalize product object (handle both snake_case and camelCase)
//     const normalizedProduct = {
//       productId: product.product_id || product.productId,
//       productName: product.product_name || product.productName,
//       productSku: product.product_sku || product.productSku,
//       currentStock: product.currentStock || product.current_stock,
//       riskLevel: product.risk_level || product.riskLevel
//     };

//     setSelectedProduct(normalizedProduct);
//     setShowModal(true);
//   };

//   const getRiskColor = (level) => {
//     const colors = {
//       CRITICAL: 'bg-red-100 text-red-800 border-red-200',
//       HIGH: 'bg-orange-100 text-orange-800 border-orange-200',
//       MEDIUM: 'bg-yellow-100 text-yellow-800 border-yellow-200',
//       LOW: 'bg-green-100 text-green-800 border-green-200',
//     };
//     return colors[level] || 'bg-gray-100 text-gray-800 border-gray-200';
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading AI forecasts...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
//             <TrendingUp className="w-8 h-8 text-indigo-600" />
//             <span>AI Demand Forecasting</span>
//           </h1>
//           <p className="text-gray-600 mt-1">
//             Machine learning powered inventory predictions
//           </p>
//         </div>
//         <button
//           onClick={handleRefresh}
//           disabled={refreshing}
//           className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
//         >
//           <RefreshCw className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
//           <span>{refreshing ? 'Refreshing...' : 'Refresh'}</span>
//         </button>
//       </div>

//       {error && (
//         <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
//           {error}
//         </div>
//       )}

//       {/* Summary Cards */}
//       {summary && (
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//           <div className="bg-white rounded-lg shadow-sm p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">Total Products</p>
//                 <p className="text-3xl font-bold text-gray-900 mt-2">
//                   {summary.totalProducts || 0}
//                 </p>
//               </div>
//               <div className="bg-indigo-100 p-3 rounded-lg">
//                 <Package className="w-6 h-6 text-indigo-600" />
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-lg shadow-sm p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">At Risk</p>
//                 <p className="text-3xl font-bold text-red-600 mt-2">
//                   {summary.productsAtRisk || 0}
//                 </p>
//               </div>
//               <div className="bg-red-100 p-3 rounded-lg">
//                 <AlertTriangle className="w-6 h-6 text-red-600" />
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-lg shadow-sm p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">Avg Confidence</p>
//                 <p className="text-3xl font-bold text-green-600 mt-2">
//                   {((summary.avgConfidence || 0) * 100).toFixed(0)}%
//                 </p>
//               </div>
//               <div className="bg-green-100 p-3 rounded-lg">
//                 <Activity className="w-6 h-6 text-green-600" />
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-lg shadow-sm p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">7-Day Demand</p>
//                 <p className="text-3xl font-bold text-blue-600 mt-2">
//                   {summary.totalPredictedDemand7Days || 0}
//                 </p>
//               </div>
//               <div className="bg-blue-100 p-3 rounded-lg">
//                 <BarChart3 className="w-6 h-6 text-blue-600" />
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Risk Breakdown */}
//       {summary && (
//         <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
//           <h2 className="text-lg font-semibold mb-4">Risk Level Breakdown</h2>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//             <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
//               <p className="text-2xl font-bold text-red-600">{summary.criticalRisk || 0}</p>
//               <p className="text-sm text-red-700 mt-1">Critical</p>
//             </div>
//             <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-200">
//               <p className="text-2xl font-bold text-orange-600">{summary.highRisk || 0}</p>
//               <p className="text-sm text-orange-700 mt-1">High</p>
//             </div>
//             <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
//               <p className="text-2xl font-bold text-yellow-600">{summary.mediumRisk || 0}</p>
//               <p className="text-sm text-yellow-700 mt-1">Medium</p>
//             </div>
//             <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
//               <p className="text-2xl font-bold text-green-600">{summary.lowRisk || 0}</p>
//               <p className="text-sm text-green-700 mt-1">Low</p>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Products at Risk Table */}
//       <div className="bg-white rounded-lg shadow-sm overflow-hidden">
//         <div className="p-6 border-b border-gray-200">
//           <h2 className="text-lg font-semibold flex items-center space-x-2">
//             <AlertTriangle className="w-5 h-5 text-red-600" />
//             <span>Products at Risk of Stockout</span>
//           </h2>
//         </div>

//         {atRiskProducts.length === 0 ? (
//           <div className="p-8 text-center text-gray-500">
//             <Activity className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//             <p>No products at risk of stockout</p>
//             <p className="text-sm mt-2">All products have adequate stock levels</p>
//           </div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                     Product
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                     Current Stock
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                     7-Day Demand
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                     Risk Level
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                     Confidence
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                     Action
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {atRiskProducts.map((product) => {
//                   const productId = product.product_id || product.productId;
//                   const productName = product.product_name || product.productName;
//                   const productSku = product.product_sku || product.productSku;
//                   const currentStock = product.currentStock || product.current_stock;
//                   const predictedDemand = product.predicted_demand_7days || product.predictedDemand7Days;
//                   const riskLevel = product.risk_level || product.riskLevel;
//                   const confidence = product.confidence_score || product.confidenceScore;

//                   return (
//                     <tr key={productId} className="hover:bg-gray-50">
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div>
//                           <p className="text-sm font-medium text-gray-900">{productName}</p>
//                           <p className="text-xs text-gray-500">SKU: {productSku}</p>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <p className="text-sm font-semibold text-gray-900">{currentStock}</p>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <p className="text-sm font-semibold text-red-600">{predictedDemand}</p>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span
//                           className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getRiskColor(
//                             riskLevel
//                           )}`}
//                         >
//                           {riskLevel}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <p className="text-sm text-gray-900">
//                           {((confidence || 0) * 100).toFixed(0)}%
//                         </p>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                         <button
//                           onClick={() => handleViewForecast(product)}
//                           className="text-indigo-600 hover:text-indigo-900"
//                         >
//                           View Details
//                         </button>
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>

//       {/* Product Forecast Modal */}
//       {showModal && selectedProduct && (
//         <ProductForecastModal
//           product={selectedProduct}
//           onClose={() => {
//             setShowModal(false);
//             setSelectedProduct(null);
//           }}
//         />
//       )}
//     </div>
//   );
// };

// export default ForecastDashboard;



// frontend/src/components/forecast/ForecastDashboard.jsx

import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  AlertTriangle,
  Activity,
  RefreshCw,
  BarChart3,
  Package
} from 'lucide-react';
import { forecastService } from '../../services/forecastService';
import ProductForecastModal from './ProductForecastModel';

const ForecastDashboard = () => {
  const [summary, setSummary] = useState(null);
  const [atRiskProducts, setAtRiskProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const [isFetching, setIsFetching] = useState(false);

  const fetchData = async () => {
    if (isFetching) return;

    setIsFetching(true);
    setLoading(true);
    setError('');

    try {
      const summaryRes = await forecastService.getForecastSummary();
      setSummary(summaryRes.data);

      await new Promise(res => setTimeout(res, 300));

      const atRiskRes = await forecastService.getProductsAtRisk();
      const products = atRiskRes.data.products || atRiskRes.data || [];
      setAtRiskProducts(products);

    } catch (err) {
      setError('Failed to load forecast data');
    } finally {
      setLoading(false);
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  const handleViewForecast = (product) => {
    const normalizedProduct = {
      productId: product.product_id ?? product.productId,
      productName: product.product_name ?? product.productName,
      productSku: product.product_sku ?? product.productSku,
      currentStock: product.currentStock ?? product.current_stock,
      riskLevel: product.risk_level ?? product.riskLevel
    };

    setSelectedProduct(normalizedProduct);
    setShowModal(true);
  };

  const getRiskColor = (level) => {
    const colors = {
      CRITICAL: "bg-[#3B0D0D] border-[#7F1D1D] text-[#FF6B6B]",
      HIGH: "bg-[#422006] border-[#854D0E] text-[#F59E0B]",
      MEDIUM: "bg-[#3F3A06] border-[#A16207] text-[#EAB308]",
      LOW: "bg-[#052E16] border-[#166534] text-[#22C55E]",
    };
    return colors[level] || "bg-[#1F2937] border-[#374151] text-gray-300";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#0A0F1A]">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-b-2 border-blue-500 rounded-full mx-auto"></div>
          <p className="text-[#D2C1B6] mt-3">Loading AI forecasts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-[#0A0F1A] text-[#D2C1B6]">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center space-x-3">
            <TrendingUp className="w-8 h-8 text-blue-500" />
            <span>AI Demand Forecasting</span>
          </h1>
          <p className="text-gray-400 mt-1">Machine learning powered inventory predictions</p>
        </div>

        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition disabled:opacity-50"
        >
          <RefreshCw className={`w-5 h-5 ${refreshing ? "animate-spin" : ""}`} />
          <span>{refreshing ? "Refreshing..." : "Refresh"}</span>
        </button>
      </div>

      {/* ERROR ALERT */}
      {error && (
        <div className="mb-6 p-4 bg-[#3B0D0D] border border-[#7F1D1D] text-[#FF6B6B] rounded-lg">
          {error}
        </div>
      )}

      {/* SUMMARY CARDS */}
      {summary && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            {
              title: "Total Products",
              value: summary.totalProducts,
              icon: Package,
              color: "text-blue-400",
              bg: "bg-[#111827]",
            },
            {
              title: "At Risk",
              value: summary.productsAtRisk,
              icon: AlertTriangle,
              color: "text-red-400",
              bg: "bg-[#180A0A]",
            },
            {
              title: "Avg Confidence",
              value: `${(summary.avgConfidence * 100).toFixed(0)}%`,
              icon: Activity,
              color: "text-green-400",
              bg: "bg-[#0F1E14]",
            },
            {
              title: "7-Day Demand",
              value: summary.totalPredictedDemand7Days,
              icon: BarChart3,
              color: "text-indigo-400",
              bg: "bg-[#111827]",
            },
          ].map((card, index) => (
            <div
              key={index}
              className={`rounded-lg p-6 border border-[#1A2234] shadow-md ${card.bg}`}
            >
              <div className="flex justify-between items-center mb-3">
                <p className="text-sm text-gray-400">{card.title}</p>
                <div className="p-2 rounded-lg bg-[#1F2937]">
                  <card.icon className={`w-6 h-6 ${card.color}`} />
                </div>
              </div>
              <p className="text-3xl font-bold">{card.value}</p>
            </div>
          ))}
        </div>
      )}

      {/* RISK BREAKDOWN */}
      {summary && (
        <div className="bg-[#0D1322] p-6 rounded-lg border border-[#1A2234] mb-8">
          <h2 className="text-lg font-semibold mb-4">Risk Level Breakdown</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Critical", value: summary.criticalRisk, color: "text-red-400" },
              { label: "High", value: summary.highRisk, color: "text-orange-400" },
              { label: "Medium", value: summary.mediumRisk, color: "text-yellow-400" },
              { label: "Low", value: summary.lowRisk, color: "text-green-400" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="text-center p-4 bg-[#0A0F1A] rounded-lg border border-[#1A2234]"
              >
                <p className={`text-2xl font-bold ${item.color}`}>{item.value}</p>
                <p className="text-sm text-gray-400 mt-1">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PRODUCTS AT RISK TABLE */}
      <div className="bg-[#0D1322] border border-[#1A2234] rounded-lg overflow-hidden">
        <div className="p-6 border-b border-[#1A2234]">
          <h2 className="text-lg font-semibold flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <span>Products at Risk of Stockout</span>
          </h2>
        </div>

        {atRiskProducts.length === 0 ? (
          <div className="p-8 text-center text-gray-400">
            <Activity className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p>No products at risk of stockout</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[#1A2234]">
              <thead className="bg-[#111827]">
                <tr>
                  {["Product", "Current Stock", "7-Day Demand", "Risk Level", "Confidence", "Action"].map((h) => (
                    <th
                      key={h}
                      className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-[#1A2234]">
                {atRiskProducts.map((product) => {
                  const productId = product.product_id || product.productId;
                  const productName = product.product_name || product.productName;
                  const productSku = product.product_sku || product.productSku;

                  const currentStock = product.currentStock || product.current_stock;
                  const predicted = product.predicted_demand_7days || product.predictedDemand7Days;

                  const riskLevel = product.risk_level || product.riskLevel;
                  const confidence = product.confidence_score || product.confidenceScore;

                  return (
                    <tr key={productId} className="hover:bg-[#1A2234] transition">
                      <td className="px-6 py-4">
                        <p className="font-medium">{productName}</p>
                        <p className="text-xs text-gray-400">SKU: {productSku}</p>
                      </td>

                      <td className="px-6 py-4">{currentStock}</td>

                      <td className="px-6 py-4 text-red-400 font-semibold">{predicted}</td>

                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 text-xs font-semibold rounded-full border ${getRiskColor(
                            riskLevel
                          )}`}
                        >
                          {riskLevel}
                        </span>
                      </td>

                      <td className="px-6 py-4">{((confidence || 0) * 100).toFixed(0)}%</td>

                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleViewForecast(product)}
                          className="text-blue-400 hover:text-blue-300"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>

            </table>
          </div>
        )}
      </div>

      {showModal && selectedProduct && (
        <ProductForecastModal
          product={selectedProduct}
          onClose={() => {
            setSelectedProduct(null);
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
};

export default ForecastDashboard;
