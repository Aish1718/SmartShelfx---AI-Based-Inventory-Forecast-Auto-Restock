// frontend/src/components/forecast/ProductForecastModel.jsx

// import React, { useState, useEffect } from 'react';
// import { X, TrendingUp, AlertCircle, Calendar } from 'lucide-react';
// import { forecastService } from '../../services/forecastService';
// import ForecastChart from './ForecastChart';

// const ProductForecastModal = ({ product, onClose }) => {
//   const [forecast, setForecast] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     fetchDetailedForecast();
//   }, [product.productId]);

//   // const fetchDetailedForecast = async () => {
//   //   try {
//   //     const response = await forecastService.getForecastForProduct(
//   //       product.productId,
//   //       30
//   //     );
//   //     setForecast(response.data);
//   //   } catch (err) {
//   //     setError(err.response?.data?.error || 'Failed to load forecast');
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

// //   const fetchDetailedForecast = async () => {
// //   try {
// //     setLoading(true);
// //     setError("");

// //     const response = await forecastService.getForecastForProduct(
// //       product.productId,
// //       30
// //     );

// //     const data = response.data || {};
// //     const preds = data.predictions || {};
// //     const risk = data.risk_analysis || {};

// //     const mapped = {
// //       productId: data.product_id ?? product.productId,
// //       productName: data.product_name ?? product.productName,
// //       productSku: data.product_sku ?? product.productSku,

// //       currentStock: data.currentStock ?? data.current_stock ?? 0,
// //       reorderLevel: data.reorderLevel ?? data.reorder_level ?? 0,

// //       confidenceScore:
// //         Number(data.confidence_score ?? data.confidenceScore ?? 0),

// //       predictions: {
// //         next7Days: preds.next_7_days ?? preds.next7Days ?? 0,
// //         next14Days: preds.next_14_days ?? preds.next14Days ?? 0,
// //         next30Days: preds.next_30_days ?? preds.next30Days ?? 0,

// //         dailyForecast: (preds.daily_forecast || []).map((d) => ({
// //           date: d.date,
// //           predictedDemand:
// //             d.predicted_demand ?? d.predictedDemand ?? 0,
// //         })),
// //       },

// //       riskAnalysis: {
// //         atRisk: risk.at_risk ?? false,
// //         riskLevel: risk.risk_level ?? "LOW",
// //         daysUntilStockout: risk.days_until_stockout ?? null,
// //         recommendedOrderQuantity:
// //           risk.recommended_order_quantity ?? 0,
// //       },

// //       historicalSummary: {
// //         avgDailyDemand:
// //           data.historical_summary?.avg_daily_demand ?? 0,
// //         maxDailyDemand:
// //           data.historical_summary?.max_daily_demand ?? 0,
// //         minDailyDemand:
// //           data.historical_summary?.min_daily_demand ?? 0,
// //         totalDemand90Days:
// //           data.historical_summary?.total_demand_90days ?? 0,
// //       },
// //     };

// //     setForecast(mapped);
// //   } catch (err) {
// //     console.error(err);
// //     setError(err.response?.data?.error || "Failed to load forecast");
// //   } finally {
// //     setLoading(false);
// //   }
// // };


// //   const fetchDetailedForecast = async () => {
// //   try {
// //     const response = await forecastService.getForecastForProduct(
// //       product.productId,
// //       30
// //     );

// //     const apiData = response.data;

// //     const preds = apiData.predictions || {};

// //     // ------------------------------
// //     // 🔥 FIX: Create daily forecast if missing
// //     // ------------------------------
// //     let daily = preds.daily_forecast || [];

// //     if (!daily || daily.length === 0) {
// //       const avg = Math.ceil((preds.next_30_days ?? 0) / 30);
// //       const today = new Date();

// //       daily = Array.from({ length: 30 }, (_, i) => ({
// //         date: new Date(today.getTime() + (i + 1) * 86400000).toISOString(),
// //         predictedDemand: avg
// //       }));
// //     }

// //     // ------------------------------
// //     // 🔥 Build frontend-safe forecast object
// //     // ------------------------------
// //     const mapped = {
// //       productName: apiData.product_name,
// //       productSku: apiData.product_sku,
// //       currentStock: apiData.currentStock,
// //       reorderLevel: apiData.reorderLevel,
// //       confidenceScore:
// //         apiData.confidence_score ??
// //         apiData.predictions?.confidence_score ??
// //         apiData.predictions?.confidence ??
// //         apiData.confidence ??
// //         null,

// //       predictions: {
// //         next7Days: preds.next_7_days ?? 0,
// //         next14Days: preds.next_14_days ?? 0,
// //         next30Days: preds.next_30_days ?? 0,
// //         dailyForecast: daily
// //       },

// //       riskAnalysis: apiData.risk_analysis || {
// //         atRisk: false,
// //         riskLevel: "LOW",
// //         daysUntilStockout: null,
// //         recommendedOrderQuantity: 0
// //       },

// //       historicalSummary: apiData.historical_summary || {
// //         avgDailyDemand: 0,
// //         maxDailyDemand: 0,
// //         minDailyDemand: 0,
// //         totalDemand90Days: 0
// //       }
// //     };

// //     setForecast(mapped);
// //   } catch (err) {
// //     setError(err.response?.data?.error || "Failed to load forecast");
// //   } finally {
// //     setLoading(false);
// //   }
// // };


//   //   const fetchDetailedForecast = async () => {
//   //   setLoading(true);
//   //   setError("");

//   //   try {
//   //     const response = await forecastService.getForecastForProduct(
//   //       product.productId,
//   //       30
//   //     );

//   //     const data = response.data;
//   //     console.log("🔍 Raw forecast from AI service:", data);

//   //     // ⭐ Normalize snake_case -> camelCase for the modal
//   //     const normalizedForecast = {
//   //       productName: data.product_name || data.productName || product.productName,
//   //       productSku: data.product_sku || data.productSku || product.productSku,

//   //       currentStock:
//   //         data.currentStock ??
//   //         data.current_stock ??
//   //         product.currentStock,

//   //       reorderLevel:
//   //         data.reorderLevel ??
//   //         data.reorder_level ??
//   //         product.reorderLevel,

//   //       // CONFIDENCE (0.5 -> 50%)
//   //       confidenceScore:
//   //         data.confidence_score != null
//   //           ? Number(data.confidence_score)
//   //           : data.confidenceScore != null
//   //           ? Number(data.confidenceScore)
//   //           : 0,

//   //       predictions: {
//   //         next7Days:
//   //           data.predictions?.next_7_days ??
//   //           data.predictions?.next7Days ??
//   //           0,
//   //         next14Days:
//   //           data.predictions?.next_14_days ??
//   //           data.predictions?.next14Days ??
//   //           0,
//   //         next30Days:
//   //           data.predictions?.next_30_days ??
//   //           data.predictions?.next30Days ??
//   //           0,

//   //         // 30-day daily forecast for the chart
//   //         dailyForecast:
//   //           data.predictions?.daily_forecast?.map((d) => ({
//   //             date: d.date,
//   //             predictedDemand:
//   //               d.predicted_demand ??
//   //               d.predictedDemand ??
//   //               0,
//   //           })) || [],
//   //       },

//   //       riskAnalysis: {
//   //         atRisk:
//   //           data.risk_analysis?.at_risk ??
//   //           data.riskAnalysis?.atRisk ??
//   //           false,
//   //         riskLevel:
//   //           data.risk_analysis?.risk_level ??
//   //           data.riskAnalysis?.riskLevel ??
//   //           "LOW",
//   //         daysUntilStockout:
//   //           data.risk_analysis?.days_until_stockout ??
//   //           data.riskAnalysis?.daysUntilStockout ??
//   //           null,
//   //         recommendedOrderQuantity:
//   //           data.risk_analysis?.recommended_order_quantity ??
//   //           data.riskAnalysis?.recommendedOrderQuantity ??
//   //           0,
//   //       },

//   //       historicalSummary: {
//   //         avgDailyDemand:
//   //           data.historical_summary?.avg_daily_demand ??
//   //           data.historicalSummary?.avgDailyDemand ??
//   //           0,
//   //         maxDailyDemand:
//   //           data.historical_summary?.max_daily_demand ??
//   //           data.historicalSummary?.maxDailyDemand ??
//   //           0,
//   //         minDailyDemand:
//   //           data.historical_summary?.min_daily_demand ??
//   //           data.historicalSummary?.minDailyDemand ??
//   //           0,
//   //         totalDemand90Days:
//   //           data.historical_summary?.total_demand_90days ??
//   //           data.historicalSummary?.totalDemand90Days ??
//   //           0,
//   //       },
//   //     };

//   //     console.log("✅ Normalized forecast for modal:", normalizedForecast);
//   //     setForecast(normalizedForecast);
//   //   } catch (err) {
//   //     console.error("❌ Error loading detailed forecast:", err);
//   //     setError(err.response?.data?.error || "Failed to load forecast");
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   const fetchDetailedForecast = async () => {
//   setLoading(true);
//   setError("");

//   try {
//     const response = await forecastService.getForecastForProduct(
//       product.productId,
//       30
//     );

//     const data = response.data;
//     console.log("🔍 Raw forecast from AI service:", data);

//     // ⭐ Normalize snake_case -> camelCase for the modal
//     const normalizedForecast = {
//       productName: data.product_name || data.productName || product.productName,
//       productSku: data.product_sku || data.productSku || product.productSku,

//       currentStock:
//         data.currentStock ??
//         data.current_stock ??
//         product.currentStock,

//       reorderLevel:
//         data.reorderLevel ??
//         data.reorder_level ??
//         product.reorderLevel,

//       // CONFIDENCE (0.5 -> 50%)
//       confidenceScore:
//         data.confidence_score != null
//           ? Number(data.confidence_score)
//           : data.confidenceScore != null
//           ? Number(data.confidenceScore)
//           : 0,

//       predictions: {
//         next7Days:
//           data.predictions?.next_7_days ??
//           data.predictions?.next7Days ??
//           0,
//         next14Days:
//           data.predictions?.next_14_days ??
//           data.predictions?.next14Days ??
//           0,
//         next30Days:
//           data.predictions?.next_30_days ??
//           data.predictions?.next30Days ??
//           0,

//         // Raw daily forecast from backend (may be empty)
//         dailyForecast:
//           data.predictions?.daily_forecast?.map((d) => ({
//             date: d.date,
//             predictedDemand:
//               d.predicted_demand ??
//               d.predictedDemand ??
//               0,
//           })) || [],
//       },

//       riskAnalysis: {
//         atRisk:
//           data.risk_analysis?.at_risk ??
//           data.riskAnalysis?.atRisk ??
//           false,
//         riskLevel:
//           data.risk_analysis?.risk_level ??
//           data.riskAnalysis?.riskLevel ??
//           "LOW",
//         daysUntilStockout:
//           data.risk_analysis?.days_until_stockout ??
//           data.riskAnalysis?.daysUntilStockout ??
//           null,
//         recommendedOrderQuantity:
//           data.risk_analysis?.recommended_order_quantity ??
//           data.riskAnalysis?.recommendedOrderQuantity ??
//           0,
//       },

//       historicalSummary: {
//         avgDailyDemand:
//           data.historical_summary?.avg_daily_demand ??
//           data.historicalSummary?.avgDailyDemand ??
//           0,
//         maxDailyDemand:
//           data.historical_summary?.max_daily_demand ??
//           data.historicalSummary?.maxDailyDemand ??
//           0,
//         minDailyDemand:
//           data.historical_summary?.min_daily_demand ??
//           data.historicalSummary?.minDailyDemand ??
//           0,
//         totalDemand90Days:
//           data.historical_summary?.total_demand_90days ??
//           data.historicalSummary?.totalDemand90Days ??
//           0,
//       },
//     };

//     // ----------------------------------------
//     // ⭐ FIX: If no daily forecast → generate simple 30-day forecast
//     // ----------------------------------------
//     if (
//       !normalizedForecast.predictions.dailyForecast ||
//       normalizedForecast.predictions.dailyForecast.length === 0
//     ) {
//       console.warn("⚠️ No daily forecast received. Generating fallback 30-day chart data.");

//       const avgDaily = Math.round(
//         normalizedForecast.predictions.next30Days / 30
//       );

//       normalizedForecast.predictions.dailyForecast = Array.from(
//         { length: 30 },
//         (_, i) => ({
//           date: new Date(Date.now() + i * 86400000).toISOString(),
//           predictedDemand: avgDaily,
//         })
//       );
//     }

//     console.log("✅ Normalized forecast for modal:", normalizedForecast);
//     setForecast(normalizedForecast);
//   } catch (err) {
//     console.error("❌ Error loading detailed forecast:", err);
//     setError(err.response?.data?.error || "Failed to load forecast");
//   } finally {
//     setLoading(false);
//   }
// };





//   if (loading) {
//     return (
//       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//         <div className="bg-white rounded-lg p-8">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
//           <p className="text-gray-600 mt-4">Loading forecast...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
//         {/* Header */}
//         <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white">
//           <div>
//             <h2 className="text-2xl font-bold text-gray-900">
//               {forecast?.productName || product.productName}
//             </h2>
//             <p className="text-sm text-gray-600 mt-1">
//               SKU: {forecast?.productSku || product.productSku}
//             </p>
//           </div>
//           <button
//             onClick={onClose}
//             className="text-gray-400 hover:text-gray-600"
//           >
//             <X className="w-6 h-6" />
//           </button>
//         </div>

//         {error ? (
//           <div className="p-6">
//             <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600 flex items-center space-x-2">
//               <AlertCircle className="w-5 h-5" />
//               <span>{error}</span>
//             </div>
//           </div>
//         ) : forecast ? (
//           <div className="p-6 space-y-6">
//             {/* Current Status */}
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//               <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
//                 <p className="text-sm text-blue-700 mb-1">Current Stock</p>
//                 <p className="text-2xl font-bold text-blue-900">
//                   {forecast.currentStock}
//                 </p>
//               </div>
//               <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
//                 <p className="text-sm text-orange-700 mb-1">Reorder Level</p>
//                 <p className="text-2xl font-bold text-orange-900">
//                   {forecast.reorderLevel}
//                 </p>
//               </div>
//               <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
//                 <p className="text-sm text-purple-700 mb-1">Confidence</p>
//                 <p className="text-2xl font-bold text-purple-900">
//                   {(forecast.confidenceScore * 100).toFixed(0)}%
//                 </p>
//               </div>
//               <div className="bg-green-50 rounded-lg p-4 border border-green-200">
//                 <p className="text-sm text-green-700 mb-1">Avg Daily Demand</p>
//                 <p className="text-2xl font-bold text-green-900">
//                   {forecast.historicalSummary?.avgDailyDemand?.toFixed(1) || 0}
//                 </p>
//               </div>
//             </div>

//             {/* Predictions Summary */}
//             <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6 border border-indigo-200">
//               <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
//                 <TrendingUp className="w-5 h-5 text-indigo-600" />
//                 <span>Demand Predictions</span>
//               </h3>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <div>
//                   <p className="text-sm text-gray-600">Next 7 Days</p>
//                   <p className="text-3xl font-bold text-indigo-600 mt-1">
//                     {forecast.predictions.next7Days}
//                   </p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-600">Next 14 Days</p>
//                   <p className="text-3xl font-bold text-indigo-600 mt-1">
//                     {forecast.predictions.next14Days}
//                   </p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-600">Next 30 Days</p>
//                   <p className="text-3xl font-bold text-indigo-600 mt-1">
//                     {forecast.predictions.next30Days}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Risk Analysis */}
//             <div
//               className={`rounded-lg p-6 border ${
//                 forecast.riskAnalysis.atRisk
//                   ? 'bg-red-50 border-red-200'
//                   : 'bg-green-50 border-green-200'
//               }`}
//             >
//               <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
//                 <AlertCircle
//                   className={`w-5 h-5 ${
//                     forecast.riskAnalysis.atRisk ? 'text-red-600' : 'text-green-600'
//                   }`}
//                 />
//                 <span>Risk Analysis</span>
//               </h3>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <div>
//                   <p className="text-sm text-gray-600">Status</p>
//                   <p
//                     className={`text-xl font-bold mt-1 ${
//                       forecast.riskAnalysis.atRisk ? 'text-red-600' : 'text-green-600'
//                     }`}
//                   >
//                     {forecast.riskAnalysis.atRisk ? 'At Risk' : 'Safe'}
//                   </p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-600">Risk Level</p>
//                   <span
//                     className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mt-1 ${
//                       {
//                         CRITICAL: 'bg-red-600 text-white',
//                         HIGH: 'bg-orange-600 text-white',
//                         MEDIUM: 'bg-yellow-600 text-white',
//                         LOW: 'bg-green-600 text-white',
//                       }[forecast.riskAnalysis.riskLevel]
//                     }`}
//                   >
//                     {forecast.riskAnalysis.riskLevel}
//                   </span>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-600">Days Until Stockout</p>
//                   <p className="text-xl font-bold text-gray-900 mt-1">
//                     {forecast.riskAnalysis.daysUntilStockout || 'N/A'}
//                   </p>
//                 </div>
//               </div>
//               {forecast.riskAnalysis.recommendedOrderQuantity > 0 && (
//                 <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
//                   <p className="text-sm text-gray-600">Recommended Order Quantity</p>
//                   <p className="text-2xl font-bold text-indigo-600 mt-1">
//                     {forecast.riskAnalysis.recommendedOrderQuantity} units
//                   </p>
//                 </div>
//               )}
//             </div>

//             {/* Forecast Chart */}
//             {/* <div className="bg-white rounded-lg border border-gray-200 p-6">
//               <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
//                 <Calendar className="w-5 h-5 text-gray-600" />
//                 <span>30-Day Forecast</span>
//               </h3>
//               <ForecastChart data={forecast.predictions.dailyForecast} />
//             </div> */}

//             {/* Historical Summary */}
//             <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
//               <h3 className="text-lg font-semibold text-gray-900 mb-4">
//                 Historical Summary (90 Days)
//               </h3>
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                 <div>
//                   <p className="text-sm text-gray-600">Avg Daily</p>
//                   <p className="text-xl font-bold text-gray-900 mt-1">
//                     {forecast.historicalSummary?.avgDailyDemand?.toFixed(1) || 0}
//                   </p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-600">Max Daily</p>
//                   <p className="text-xl font-bold text-gray-900 mt-1">
//                     {forecast.historicalSummary?.maxDailyDemand || 0}
//                   </p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-600">Min Daily</p>
//                   <p className="text-xl font-bold text-gray-900 mt-1">
//                     {forecast.historicalSummary?.minDailyDemand || 0}
//                   </p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-600">Total Demand</p>
//                   <p className="text-xl font-bold text-gray-900 mt-1">
//                     {forecast.historicalSummary?.totalDemand90Days || 0}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ) : null}
//       </div>
//     </div>
//   );
// };

// export default ProductForecastModal;










import React, { useState, useEffect } from 'react';
import { X, TrendingUp, AlertCircle } from 'lucide-react';
import { forecastService } from '../../services/forecastService';

const ProductForecastModal = ({ product, onClose }) => {
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchForecast();
  }, [product.productId]);

  const fetchForecast = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await forecastService.getForecastForProduct(
        product.productId,
        30
      );

      const data = response.data;
      const preds = data.predictions || {};
      const risk = data.risk_analysis || {};

      // ⭐ ORIGINAL MAPPING (correct data logic)
      const normalized = {
        productName: data.product_name ?? product.productName,
        productSku: data.product_sku ?? product.productSku,

        currentStock: data.currentStock ?? data.current_stock ?? product.currentStock,
        reorderLevel: data.reorderLevel ?? data.reorder_level ?? product.reorderLevel,

        // confidenceScore: Number(data.confidence_score ?? 0),

          confidenceScore: Number(
            data.confidence_score ??
            data.confidenceScore ??
            data.confidence ??
            data.predictions?.confidence_score ??
            data.predictions?.confidence ??
            0
        ),


        predictions: {
          next7Days: preds.next_7_days ?? preds.next7Days ?? 0,
          next14Days: preds.next_14_days ?? preds.next14Days ?? 0,
          next30Days: preds.next_30_days ?? preds.next30Days ?? 0,
          dailyForecast:
            (preds.daily_forecast || []).map((d) => ({
              date: d.date,
              predictedDemand: d.predicted_demand ?? d.predictedDemand ?? 0,
            }))
        },

        riskAnalysis: {
          atRisk: risk.at_risk ?? false,
          riskLevel: risk.risk_level ?? "LOW",
          daysUntilStockout: risk.days_until_stockout ?? null,
          recommendedOrderQuantity: risk.recommended_order_quantity ?? 0
        },

        // historicalSummary: {
        //   avgDailyDemand: data.historical_summary?.avg_daily_demand ?? 0,
        //   maxDailyDemand: data.historical_summary?.max_daily_demand ?? 0,
        //   minDailyDemand: data.historical_summary?.min_daily_demand ?? 0,
        //   totalDemand90Days: data.historical_summary?.total_demand_90days ?? 0
        // }
        historicalSummary: {
         avgDailyDemand:
           data.historical_summary?.avg_daily_demand ??
           data.historicalSummary?.avgDailyDemand ??
           0,
         maxDailyDemand:
           data.historical_summary?.max_daily_demand ??
           data.historicalSummary?.maxDailyDemand ??
           0,
         minDailyDemand:
           data.historical_summary?.min_daily_demand ??
           data.historicalSummary?.minDailyDemand ??
           0,
         totalDemand90Days:
           data.historical_summary?.total_demand_90days ??
           data.historicalSummary?.totalDemand90Days ??
           0,
       },
      };

      // ⭐ Fallback chart generator
      if (!normalized.predictions.dailyForecast.length) {
        const avg = Math.ceil(normalized.predictions.next30Days / 30);
        normalized.predictions.dailyForecast = Array.from({ length: 30 }, (_, i) => ({
          date: new Date(Date.now() + i * 86400000).toISOString(),
          predictedDemand: avg
        }));
      }

      setForecast(normalized);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to load forecast");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
        <div className="bg-[#0F1A2A] p-8 rounded-lg border border-blue-900 text-white">
          <div className="h-12 w-12 rounded-full border-b-2 border-blue-400 animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-300">Loading forecast...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-[#0D1424] text-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto border border-blue-900 shadow-xl">

        {/* Header */}
        <div className="p-6 bg-[#0F1A2A] border-b border-blue-800 flex justify-between items-center sticky top-0">
          <div>
            <h2 className="text-2xl font-bold text-blue-300">{forecast.productName}</h2>
            <p className="text-sm text-gray-400">SKU: {forecast.productSku}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-blue-900/40 rounded-lg transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {error ? (
          <div className="p-6">
            <div className="bg-red-900/30 border border-red-700 p-4 rounded-lg text-red-300 flex gap-2">
              <AlertCircle className="w-5 h-5" />
              {error}
            </div>
          </div>
        ) : (
          <div className="p-6 space-y-6">

            {/* Current Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <StatCard label="Current Stock" value={forecast.currentStock} color="blue" />
              <StatCard label="Reorder Level" value={forecast.reorderLevel} color="orange" />
              <StatCard label="Confidence" value={`${(forecast.confidenceScore * 100).toFixed(0)}%`} color="purple" />
              <StatCard label="Avg Daily Demand" value={forecast.historicalSummary.avgDailyDemand.toFixed(1)} color="green" />
            </div>

            {/* Demand Predictions */}
            <div className="bg-[#111B33] border border-blue-800 rounded-lg p-6">
              <h3 className="flex items-center gap-2 text-blue-300 font-semibold mb-4">
                <TrendingUp className="w-5 h-5" /> Demand Predictions
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <PredictionCard label="Next 7 Days" value={forecast.predictions.next7Days} />
                <PredictionCard label="Next 14 Days" value={forecast.predictions.next14Days} />
                <PredictionCard label="Next 30 Days" value={forecast.predictions.next30Days} />
              </div>
            </div>

            {/* Risk Analysis */}
            <RiskSection risk={forecast.riskAnalysis} />

            {/* Historical Summary */}
            <div className="bg-[#111B33] border border-blue-800 p-6 rounded-lg">
              <h3 className="text-blue-300 text-lg font-semibold mb-4">Historical Summary (90 Days)</h3>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <HistoryCard label="Avg Daily" value={forecast.historicalSummary.avgDailyDemand.toFixed(1)} />
                <HistoryCard label="Max Daily" value={forecast.historicalSummary.maxDailyDemand} />
                <HistoryCard label="Min Daily" value={forecast.historicalSummary.minDailyDemand} />
                <HistoryCard label="Total Demand" value={forecast.historicalSummary.totalDemand90Days} />
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

/* ---------- Reusable Components ---------- */

const StatCard = ({ label, value, color }) => (
  <div className={`rounded-lg p-4 border bg-${color}-900/20 border-${color}-800`}>
    <p className={`text-sm text-${color}-300`}>{label}</p>
    <p className={`text-2xl font-bold text-${color}-400`}>{value}</p>
  </div>
);

const PredictionCard = ({ label, value }) => (
  <div>
    <p className="text-gray-300">{label}</p>
    <p className="text-3xl font-bold text-blue-400">{value}</p>
  </div>
);

const RiskSection = ({ risk }) => (
  <div className={`rounded-lg p-6 border ${risk.atRisk ? "bg-red-900/20 border-red-800" : "bg-green-900/20 border-green-800"}`}>
    <h3 className="flex items-center gap-2 text-gray-200 text-lg font-semibold mb-4">
      <AlertCircle className={`w-5 h-5 ${risk.atRisk ? "text-red-400" : "text-green-400"}`} />
      Risk Analysis
    </h3>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <HistoryCard label="Status" value={risk.atRisk ? "At Risk" : "Safe"} />
      <HistoryCard label="Risk Level" value={risk.riskLevel} />
      <HistoryCard label="Days Until Stockout" value={risk.daysUntilStockout || "N/A"} />
    </div>

    {risk.recommendedOrderQuantity > 0 && (
      <div className="mt-4 p-4 bg-[#0F1A2A] border border-blue-800 rounded-lg">
        <p className="text-gray-300">Recommended Order Quantity</p>
        <p className="text-2xl font-bold text-blue-400">{risk.recommendedOrderQuantity} units</p>
      </div>
    )}
  </div>
);

const HistoryCard = ({ label, value }) => (
  <div>
    <p className="text-gray-300">{label}</p>
    <p className="text-xl font-bold text-gray-100">{value}</p>
  </div>
);

export default ProductForecastModal;
