// // frontend/src/components/purchase-orders/RestockRecommendation.jsx

// import React, { useState, useEffect } from 'react';
// import { X, Sparkles, ShoppingCart, AlertTriangle, TrendingUp } from 'lucide-react';
// import { purchaseOrderService } from '../../services/purchaseOrderService';

// const RestockRecommendation = ({ onClose, onOrdersCreated }) => {
//   const [recommendations, setRecommendations] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [generating, setGenerating] = useState(false);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     fetchRecommendations();
//   }, []);

//   const fetchRecommendations = async () => {
//     try {
//       const response = await purchaseOrderService.getRestockRecommendations();
//       setRecommendations(response.data);
//     } catch (err) {
//       setError(err.response?.data?.error || 'Failed to load recommendations');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGenerateAll = async () => {
//     if (!window.confirm('Generate purchase orders for all recommended products?')) {
//       return;
//     }

//     setGenerating(true);
//     try {
//       const response = await purchaseOrderService.generateAutoRestockOrders();
//       alert(`Successfully generated ${response.data.length} purchase orders!`);
//       onOrdersCreated();
//       onClose();
//     } catch (err) {
//       setError(err.response?.data?.error || 'Failed to generate orders');
//     } finally {
//       setGenerating(false);
//     }
//   };

//   const getRiskColor = (level) => {
//     const colors = {
//       CRITICAL: 'bg-red-100 text-red-800 border-red-300',
//       HIGH: 'bg-orange-100 text-orange-800 border-orange-300',
//       MEDIUM: 'bg-yellow-100 text-yellow-800 border-yellow-300',
//       LOW: 'bg-green-100 text-green-800 border-green-300',
//     };
//     return colors[level] || 'bg-gray-100 text-gray-800 border-gray-300';
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
//         <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white">
//           <div className="flex items-center space-x-3">
//             <Sparkles className="w-6 h-6 text-purple-600" />
//             <div>
//               <h2 className="text-2xl font-bold text-gray-900">AI Restock Recommendations</h2>
//               <p className="text-sm text-gray-600 mt-1">
//                 Powered by machine learning forecasts
//               </p>
//             </div>
//           </div>
//           <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
//             <X className="w-6 h-6" />
//           </button>
//         </div>

//         <div className="p-6">
//           {error && (
//             <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 flex items-center space-x-2">
//               <AlertTriangle className="w-5 h-5" />
//               <span>{error}</span>
//             </div>
//           )}

//           {loading ? (
//             <div className="text-center py-12">
//               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
//               <p className="text-gray-600">Loading AI recommendations...</p>
//             </div>
//           ) : recommendations.length === 0 ? (
//             <div className="text-center py-12">
//               <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//               <p className="text-gray-600">No restock recommendations at this time</p>
//               <p className="text-sm text-gray-500 mt-2">All products have adequate stock levels</p>
//             </div>
//           ) : (
//             <>
//               <div className="mb-6 flex justify-between items-center">
//                 <p className="text-gray-600">
//                   Found <span className="font-bold text-gray-900">{recommendations.length}</span>{' '}
//                   products that need restocking
//                 </p>
//                 <button
//                   onClick={handleGenerateAll}
//                   disabled={generating}
//                   className="flex items-center space-x-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition font-medium disabled:opacity-50"
//                 >
//                   <ShoppingCart className="w-5 h-5" />
//                   <span>{generating ? 'Generating...' : 'Generate All Orders'}</span>
//                 </button>
//               </div>

//               <div className="space-y-4">
//                 {recommendations.map((rec) => (
//                   <div
//                     key={rec.productId}
//                     className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition"
//                   >
//                     <div className="flex justify-between items-start">
//                       <div className="flex-1">
//                         <div className="flex items-center space-x-3 mb-2">
//                           <h3 className="text-lg font-semibold text-gray-900">
//                             {rec.productName}
//                           </h3>
//                           <span
//                             className={`px-3 py-1 text-xs font-semibold rounded-full border ${getRiskColor(
//                               rec.riskLevel
//                             )}`}
//                           >
//                             {rec.riskLevel} RISK
//                           </span>
//                           {rec.hasActiveOrder && (
//                             <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
//                               Order Pending
//                             </span>
//                           )}
//                         </div>
//                         <p className="text-sm text-gray-600 mb-4">SKU: {rec.productSku}</p>

//                         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
//                           <div>
//                             <p className="text-xs text-gray-600">Current Stock</p>
//                             <p className="text-lg font-bold text-gray-900">{rec.currentStock}</p>
//                           </div>
//                           <div>
//                             <p className="text-xs text-gray-600">Reorder Level</p>
//                             <p className="text-lg font-bold text-gray-900">{rec.reorderLevel}</p>
//                           </div>
//                           <div>
//                             <p className="text-xs text-gray-600">7-Day Demand</p>
//                             <p className="text-lg font-bold text-orange-600">
//                               {rec.predictedDemand7Days}
//                             </p>
//                           </div>
//                           <div>
//                             <p className="text-xs text-gray-600">Recommended Order</p>
//                             <p className="text-lg font-bold text-purple-600">
//                               {rec.recommendedQuantity}
//                             </p>
//                           </div>
//                         </div>

//                         {rec.reason && (
//                           <div className="bg-orange-50 border border-orange-200 rounded p-3 mb-4">
//                             <p className="text-sm text-orange-800">
//                               <strong>Reason:</strong> {rec.reason}
//                             </p>
//                           </div>
//                         )}

//                         {rec.vendorName && (
//                           <div className="flex items-center space-x-2 text-sm text-gray-600">
//                             <span>Vendor:</span>
//                             <span className="font-semibold text-gray-900">{rec.vendorName}</span>
//                             <span className="text-gray-400">({rec.vendorEmail})</span>
//                           </div>
//                         )}

//                         <div className="mt-4 flex items-center space-x-4">
//                           <div className="flex items-center space-x-2">
//                             <div className="w-full bg-gray-200 rounded-full h-2 w-32">
//                               <div
//                                 className="bg-green-600 h-2 rounded-full"
//                                 style={{ width: `${rec.confidenceScore * 100}%` }}
//                               ></div>
//                             </div>
//                             <span className="text-sm text-gray-600">
//                               {(rec.confidenceScore * 100).toFixed(0)}% confidence
//                             </span>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RestockRecommendation;




// frontend/src/components/purchase-orders/RestockRecommendation.jsx

// import React, { useState, useEffect } from 'react';
// import { X, Sparkles, ShoppingCart, AlertTriangle, TrendingUp, CheckCircle, Loader } from 'lucide-react';
// import { purchaseOrderService } from '../../services/purchaseOrderService';

// const RestockRecommendation = ({ onClose, onOrdersCreated }) => {
//   const [recommendations, setRecommendations] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [generating, setGenerating] = useState(false);
//   const [selectedItems, setSelectedItems] = useState(new Set());
//   const [error, setError] = useState('');

//   useEffect(() => {
//     fetchRecommendations();
//   }, []);

//   const fetchRecommendations = async () => {
//     try {
//       const response = await purchaseOrderService.getRestockRecommendations();
//       console.log('Recommendations received:', response.data);
//       setRecommendations(response.data);

//       if (response.data.length === 0) {
//         setError('');
//       }
//     } catch (err) {
//       console.error('Failed to load recommendations:', err);
//       setError(err.response?.data?.message || 'Failed to load recommendations');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ⭐ Generate single PO
//   const handleGenerateSingle = async (recommendation) => {
//     try {
//       const orderData = {
//         productId: recommendation.productId,
//         vendorId: recommendation.vendorId,
//         quantity: recommendation.recommendedQuantity,
//         expectedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
//           .toISOString()
//           .split('T')[0],
//         notes: `AI-generated order. ${recommendation.reason}`,
//         isAiGenerated: true
//       };

//       await purchaseOrderService.createPurchaseOrder(orderData);
//       alert(`✅ Purchase order created for ${recommendation.productName}!`);

//       // Remove from list
//       setRecommendations(prev =>
//         prev.filter(r => r.productId !== recommendation.productId)
//       );

//       onOrdersCreated();
//     } catch (err) {
//       console.error('Failed to create PO:', err);
//       alert(`Failed to create PO for ${recommendation.productName}`);
//     }
//   };

//   // ⭐ Generate selected POs
//   const handleGenerateSelected = async () => {
//     if (selectedItems.size === 0) {
//       alert('Please select at least one item');
//       return;
//     }

//     setGenerating(true);
//     let successCount = 0;

//     for (const productId of selectedItems) {
//       const rec = recommendations.find(r => r.productId === productId);
//       if (!rec || !rec.vendorId || rec.hasActiveOrder) continue;

//       try {
//         await handleGenerateSingle(rec);
//         successCount++;
//       } catch (error) {
//         console.error(`Failed for product ${productId}:`, error);
//       }
//     }

//     setGenerating(false);
//     setSelectedItems(new Set());

//     if (successCount > 0) {
//       alert(`✅ Successfully generated ${successCount} purchase order(s)!`);
//     }
//   };

//   // ⭐ Generate all eligible POs (bulk)
//   const handleGenerateAll = async () => {
//     const eligible = recommendations.filter(r => r.vendorId && !r.hasActiveOrder);

//     if (eligible.length === 0) {
//       alert('No eligible items for auto-generation');
//       return;
//     }

//     const confirmed = window.confirm(
//       `Generate ${eligible.length} purchase orders automatically?\n\n` +
//       `This will create orders for all CRITICAL and HIGH risk products with assigned vendors.`
//     );

//     if (!confirmed) return;

//     setGenerating(true);
//     try {
//       const response = await purchaseOrderService.generateAutoRestockOrders();
//       alert(`✅ Successfully generated ${response.data.length} purchase orders!`);
//       fetchRecommendations();
//       onOrdersCreated();
//     } catch (err) {
//       console.error('Auto-generate failed:', err);
//       setError(err.response?.data?.message || 'Failed to generate orders');
//     } finally {
//       setGenerating(false);
//     }
//   };

//   const toggleSelection = (productId) => {
//     setSelectedItems(prev => {
//       const newSet = new Set(prev);
//       if (newSet.has(productId)) {
//         newSet.delete(productId);
//       } else {
//         newSet.add(productId);
//       }
//       return newSet;
//     });
//   };

//   const getRiskColor = (level) => {
//     const colors = {
//       CRITICAL: 'bg-red-100 text-red-800 border-red-300',
//       HIGH: 'bg-orange-100 text-orange-800 border-orange-300',
//       MEDIUM: 'bg-yellow-100 text-yellow-800 border-yellow-300',
//       LOW: 'bg-green-100 text-green-800 border-green-300',
//     };
//     return colors[level] || 'bg-gray-100 text-gray-800 border-gray-300';
//   };

//   const getRiskIcon = (level) => {
//     switch (level) {
//       case 'CRITICAL':
//         return <AlertTriangle className="w-5 h-5 text-red-600" />;
//       case 'HIGH':
//         return <AlertTriangle className="w-5 h-5 text-orange-600" />;
//       case 'MEDIUM':
//         return <TrendingUp className="w-5 h-5 text-yellow-600" />;
//       default:
//         return <CheckCircle className="w-5 h-5 text-green-600" />;
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">

//         {/* Header */}
//         <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gradient-to-r from-purple-50 to-blue-50">
//           <div className="flex items-center space-x-3">
//             <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
//               <Sparkles className="w-7 h-7 text-white" />
//             </div>
//             <div>
//               <h2 className="text-2xl font-bold text-gray-900">AI Restock Recommendations</h2>
//               <p className="text-sm text-gray-600 mt-1">Powered by machine learning forecasts</p>
//             </div>
//           </div>
//           <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-2 hover:bg-white rounded-lg transition">
//             <X className="w-6 h-6" />
//           </button>
//         </div>

//         {/* Action Bar */}
//         {!loading && recommendations.length > 0 && (
//           <div className="px-6 py-4 bg-gray-50 border-b flex items-center justify-between">
//             <div className="text-sm text-gray-600">
//               {selectedItems.size > 0 ? (
//                 <span className="font-medium text-blue-600">
//                   {selectedItems.size} item(s) selected
//                 </span>
//               ) : (
//                 <span>
//                   Found <span className="font-bold text-gray-900">{recommendations.length}</span> products needing restock
//                 </span>
//               )}
//             </div>

//             <div className="flex space-x-2">
//               {selectedItems.size > 0 && (
//                 <button
//                   onClick={handleGenerateSelected}
//                   disabled={generating}
//                   className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
//                 >
//                   {generating ? (
//                     <Loader className="w-5 h-5 animate-spin" />
//                   ) : (
//                     <ShoppingCart className="w-5 h-5" />
//                   )}
//                   <span>Generate Selected ({selectedItems.size})</span>
//                 </button>
//               )}

//               <button
//                 onClick={handleGenerateAll}
//                 disabled={generating}
//                 className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition disabled:opacity-50 font-medium"
//               >
//                 {generating ? (
//                   <Loader className="w-5 h-5 animate-spin" />
//                 ) : (
//                   <Sparkles className="w-5 h-5" />
//                 )}
//                 <span>Auto-Generate All</span>
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Content */}
//         <div className="flex-1 overflow-y-auto p-6">
//           {error && (
//             <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 flex items-center space-x-2">
//               <AlertTriangle className="w-5 h-5" />
//               <span>{error}</span>
//             </div>
//           )}

//           {loading ? (
//             <div className="text-center py-16">
//               <Loader className="w-16 h-16 text-purple-600 animate-spin mx-auto mb-4" />
//               <p className="text-gray-600 text-lg">Analyzing inventory and forecasting demand...</p>
//               <p className="text-gray-500 text-sm mt-2">This may take a few moments</p>
//             </div>
//           ) : recommendations.length === 0 ? (
//             <div className="text-center py-16">
//               <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <CheckCircle className="w-12 h-12 text-green-600" />
//               </div>
//               <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                 No restock recommendations at this time
//               </h3>
//               <p className="text-gray-600">All products have adequate stock levels</p>
//             </div>
//           ) : (
//             <div className="space-y-4">
//               {recommendations.map((rec) => (
//                 <div
//                   key={rec.productId}
//                   className={`border rounded-xl p-5 hover:shadow-lg transition-all ${
//                     selectedItems.has(rec.productId)
//                       ? 'border-blue-500 bg-blue-50 shadow-md'
//                       : 'border-gray-200 bg-white'
//                   }`}
//                 >
//                   <div className="flex items-start space-x-4">

//                     {/* Checkbox */}
//                     {rec.vendorId && !rec.hasActiveOrder && (
//                       <input
//                         type="checkbox"
//                         checked={selectedItems.has(rec.productId)}
//                         onChange={() => toggleSelection(rec.productId)}
//                         className="mt-1.5 w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
//                       />
//                     )}

//                     {/* Content */}
//                     <div className="flex-1">
//                       <div className="flex justify-between items-start mb-4">
//                         <div>
//                           <div className="flex items-center space-x-3 mb-2">
//                             <h3 className="text-lg font-bold text-gray-900">{rec.productName}</h3>
//                             {getRiskIcon(rec.riskLevel)}
//                             <span className={`px-3 py-1 text-xs font-bold rounded-full border ${getRiskColor(rec.riskLevel)}`}>
//                               {rec.riskLevel} RISK
//                             </span>
//                           </div>
//                           <p className="text-sm text-gray-600">SKU: {rec.productSku}</p>
//                         </div>

//                         {rec.hasActiveOrder && (
//                           <span className="px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium flex items-center gap-1">
//                             <CheckCircle className="w-4 h-4" />
//                             Active Order
//                           </span>
//                         )}
//                       </div>

//                       {/* Stats Grid */}
//                       <div className="grid grid-cols-4 gap-3 mb-4">
//                         <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
//                           <p className="text-xs text-gray-600 mb-1 font-medium">Current Stock</p>
//                           <p className="text-2xl font-bold text-gray-900">{rec.currentStock}</p>
//                         </div>
//                         <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
//                           <p className="text-xs text-gray-600 mb-1 font-medium">Reorder Level</p>
//                           <p className="text-2xl font-bold text-gray-900">{rec.reorderLevel}</p>
//                         </div>
//                         <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
//                           <p className="text-xs text-purple-700 mb-1 font-medium">Predicted (7d)</p>
//                           <p className="text-2xl font-bold text-purple-900">{rec.predictedDemand7Days}</p>
//                         </div>
//                         <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
//                           <p className="text-xs text-blue-700 mb-1 font-medium">Recommended</p>
//                           <p className="text-2xl font-bold text-blue-900">{rec.recommendedQuantity}</p>
//                         </div>
//                       </div>

//                       {/* Reason */}
//                       {rec.reason && (
//                         <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-4">
//                           <p className="text-sm text-orange-800">
//                             <strong>Reason:</strong> {rec.reason}
//                           </p>
//                         </div>
//                       )}

//                       {/* Vendor & Actions */}
//                       <div className="flex items-center justify-between pt-3 border-t border-gray-200">
//                         <div className="flex-1">
//                           {rec.vendorName ? (
//                             <div className="text-sm">
//                               <span className="text-gray-600">Vendor: </span>
//                               <span className="font-semibold text-gray-900">{rec.vendorName}</span>
//                               <span className="text-gray-500 ml-2">({rec.vendorEmail})</span>
//                             </div>
//                           ) : (
//                             <div className="text-sm text-orange-600 flex items-center gap-1">
//                               <AlertTriangle className="w-4 h-4" />
//                               <span className="font-medium">No vendor assigned</span>
//                             </div>
//                           )}

//                           <div className="flex items-center gap-2 mt-2">
//                             <div className="w-32 bg-gray-200 rounded-full h-2">
//                               <div
//                                 className="bg-green-600 h-2 rounded-full transition-all"
//                                 style={{ width: `${rec.confidenceScore * 100}%` }}
//                               ></div>
//                             </div>
//                             <span className="text-sm text-gray-600">
//                               {(rec.confidenceScore * 100).toFixed(0)}% confidence
//                             </span>
//                           </div>
//                         </div>

//                         {!selectedItems.has(rec.productId) && rec.vendorId && !rec.hasActiveOrder && (
//                           <button
//                             onClick={() => handleGenerateSingle(rec)}
//                             className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 text-sm font-medium transition-all shadow-sm hover:shadow"
//                           >
//                             <ShoppingCart className="w-4 h-4" />
//                             Generate PO
//                           </button>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//       </div>
//     </div>
//   );
// };

// export default RestockRecommendation;




// frontend/src/services/purchaseOrderService.js

// frontend/src/components/purchase-orders/RestockRecommendation.jsx

import React, { useState, useEffect } from 'react';
import { X, Sparkles, ShoppingCart, AlertTriangle, TrendingUp, CheckCircle, Loader } from 'lucide-react';
import { purchaseOrderService } from '../../services/purchaseOrderService';

const RestockRecommendation = ({ onClose, onOrdersCreated }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    try {
      const response = await purchaseOrderService.getRestockRecommendations();
      console.log('✅ Recommendations received:', response.data);

      // Filter out items that already have active orders
      const validRecs = response.data.filter(rec => !rec.hasActiveOrder);
      setRecommendations(validRecs);

      if (validRecs.length === 0) {
        setError('');
      }
    } catch (err) {
      console.error('❌ Failed to load recommendations:', err);
      setError(err.response?.data?.message || 'Failed to load recommendations');
    } finally {
      setLoading(false);
    }
  };

  // ⭐ FIX: Generate single PO with proper error handling
  const handleGenerateSingle = async (recommendation) => {
    console.log('🔄 Generating PO for:', recommendation.productName);

    try {
      // Validate vendor exists
      if (!recommendation.vendorId) {
        alert(`❌ Cannot create PO: No vendor assigned to ${recommendation.productName}`);
        return;
      }

      const orderData = {
        productId: recommendation.productId,
        vendorId: recommendation.vendorId,
        quantity: recommendation.recommendedQuantity,
        expectedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split('T')[0],
        notes: `AI-generated order. ${recommendation.reason || 'Restock recommended by AI'}`,
        isAiGenerated: true
      };

      console.log('📤 Sending PO data:', orderData);

      const response = await purchaseOrderService.createPurchaseOrder(orderData);
      console.log('✅ PO created successfully:', response.data);

      alert(`✅ Purchase order #${response.data.id} created for ${recommendation.productName}!`);

      // Remove from list
      setRecommendations(prev =>
        prev.filter(r => r.productId !== recommendation.productId)
      );

      // Remove from selected if it was selected
      setSelectedItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(recommendation.productId);
        return newSet;
      });

      onOrdersCreated();
    } catch (err) {
      console.error('❌ Failed to create PO:', err);
      console.error('Error response:', err.response?.data);

      const errorMsg = err.response?.data?.message
        || err.response?.data?.error
        || `Failed to create PO for ${recommendation.productName}`;

      alert(`❌ ${errorMsg}`);
    }
  };

  // ⭐ FIX: Generate selected POs one by one with proper error handling
  const handleGenerateSelected = async () => {
    if (selectedItems.size === 0) {
      alert('Please select at least one item');
      return;
    }

    const confirmed = window.confirm(
      `Generate ${selectedItems.size} purchase order(s) for selected products?`
    );

    if (!confirmed) return;

    setGenerating(true);
    let successCount = 0;
    let failCount = 0;
    const errors = [];

    for (const productId of selectedItems) {
      const rec = recommendations.find(r => r.productId === productId);
      if (!rec) continue;

      try {
        await handleGenerateSingle(rec);
        successCount++;
      } catch (error) {
        failCount++;
        errors.push(`${rec.productName}: ${error.message}`);
      }
    }

    setGenerating(false);
    setSelectedItems(new Set());

    // Show summary
    let message = '';
    if (successCount > 0) {
      message += `✅ Successfully generated ${successCount} order(s)\n`;
    }
    if (failCount > 0) {
      message += `❌ Failed to generate ${failCount} order(s)\n`;
      if (errors.length > 0) {
        message += '\nErrors:\n' + errors.join('\n');
      }
    }

    if (message) {
      alert(message);
    }
  };

  // ⭐ Generate all eligible POs (bulk via backend)
  const handleGenerateAll = async () => {
    const eligible = recommendations.filter(r => r.vendorId && !r.hasActiveOrder);

    if (eligible.length === 0) {
      alert('No eligible items for auto-generation\n\nMake sure products have vendors assigned.');
      return;
    }

    const confirmed = window.confirm(
      `Generate ${eligible.length} purchase orders automatically?\n\n` +
      `This will create orders for all CRITICAL and HIGH risk products with assigned vendors.`
    );

    if (!confirmed) return;

    setGenerating(true);
    try {
      console.log('🔄 Auto-generating all orders...');
      const response = await purchaseOrderService.generateAutoRestockOrders();
      console.log('✅ Auto-generate response:', response.data);

      alert(`✅ Successfully generated ${response.data.length} purchase orders!`);
      await fetchRecommendations(); // Refresh list
      onOrdersCreated();
    } catch (err) {
      console.error('❌ Auto-generate failed:', err);
      console.error('Error response:', err.response?.data);

      const errorMsg = err.response?.data?.message
        || err.response?.data?.error
        || 'Failed to generate orders';

      setError(errorMsg);
      alert(`❌ ${errorMsg}`);
    } finally {
      setGenerating(false);
    }
  };

  // ⭐ FIX: Toggle selection properly
  const toggleSelection = (productId) => {
    setSelectedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
        console.log('❌ Deselected:', productId);
      } else {
        newSet.add(productId);
        console.log('✅ Selected:', productId);
      }
      console.log('Current selection:', Array.from(newSet));
      return newSet;
    });
  };

  const getRiskColor = (level) => {
    const colors = {
      CRITICAL: 'bg-red-100 text-red-800 border-red-300',
      HIGH: 'bg-orange-100 text-orange-800 border-orange-300',
      MEDIUM: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      LOW: 'bg-green-100 text-green-800 border-green-300',
    };
    return colors[level] || 'bg-gray-100 text-gray-800 border-gray-300';
  };

  const getRiskIcon = (level) => {
    switch (level) {
      case 'CRITICAL':
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 'HIGH':
        return <AlertTriangle className="w-5 h-5 text-orange-600" />;
      case 'MEDIUM':
        return <TrendingUp className="w-5 h-5 text-yellow-600" />;
      default:
        return <CheckCircle className="w-5 h-5 text-green-600" />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">

        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gradient-to-r from-purple-50 to-blue-50">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">AI Restock Recommendations</h2>
              <p className="text-sm text-gray-600 mt-1">Powered by machine learning forecasts</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-2 hover:bg-white rounded-lg transition">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Action Bar */}
        {!loading && recommendations.length > 0 && (
          <div className="px-6 py-4 bg-gray-50 border-b flex items-center justify-between">
            <div className="text-sm text-gray-600">
              {selectedItems.size > 0 ? (
                <span className="font-medium text-blue-600">
                  {selectedItems.size} item(s) selected
                </span>
              ) : (
                <span>
                  Found <span className="font-bold text-gray-900">{recommendations.length}</span> products needing restock
                </span>
              )}
            </div>

            <div className="flex space-x-2">
              {selectedItems.size > 0 && (
                <button
                  onClick={handleGenerateSelected}
                  disabled={generating}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                >
                  {generating ? (
                    <Loader className="w-5 h-5 animate-spin" />
                  ) : (
                    <ShoppingCart className="w-5 h-5" />
                  )}
                  <span>Generate Selected ({selectedItems.size})</span>
                </button>
              )}

              <button
                onClick={handleGenerateAll}
                disabled={generating}
                className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition disabled:opacity-50 font-medium"
              >
                {generating ? (
                  <Loader className="w-5 h-5 animate-spin" />
                ) : (
                  <Sparkles className="w-5 h-5" />
                )}
                <span>{generating ? 'Generating...' : 'Auto-Generate All'}</span>
              </button>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          )}

          {loading ? (
            <div className="text-center py-16">
              <Loader className="w-16 h-16 text-purple-600 animate-spin mx-auto mb-4" />
              <p className="text-gray-600 text-lg">Analyzing inventory and forecasting demand...</p>
              <p className="text-gray-500 text-sm mt-2">This may take a few moments</p>
            </div>
          ) : recommendations.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No restock recommendations at this time
              </h3>
              <p className="text-gray-600">All products have adequate stock levels</p>
            </div>
          ) : (
            <div className="space-y-4">
              {recommendations.map((rec) => {
                const isSelected = selectedItems.has(rec.productId);
                const canSelect = rec.vendorId && !rec.hasActiveOrder;

                return (
                  <div
                    key={rec.productId}
                    className={`border rounded-xl p-5 transition-all ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50 shadow-lg'
                        : 'border-gray-200 bg-white hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-start space-x-4">

                      {/* ⭐ FIX: Checkbox with proper event handling */}
                      {canSelect && (
                        <div className="pt-1">
                          <input
                            type="checkbox"
                            id={`select-${rec.productId}`}
                            checked={isSelected}
                            onChange={(e) => {
                              e.stopPropagation();
                              toggleSelection(rec.productId);
                            }}
                            className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
                          />
                        </div>
                      )}

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-lg font-bold text-gray-900">{rec.productName}</h3>
                              {getRiskIcon(rec.riskLevel)}
                              <span className={`px-3 py-1 text-xs font-bold rounded-full border ${getRiskColor(rec.riskLevel)}`}>
                                {rec.riskLevel} RISK
                              </span>
                            </div>
                            <p className="text-sm text-gray-600">SKU: {rec.productSku}</p>
                          </div>

                          {rec.hasActiveOrder && (
                            <span className="px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium flex items-center gap-1">
                              <CheckCircle className="w-4 h-4" />
                              Active Order
                            </span>
                          )}
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-4 gap-3 mb-4">
                          <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                            <p className="text-xs text-gray-600 mb-1 font-medium">Current Stock</p>
                            <p className="text-2xl font-bold text-gray-900">{rec.currentStock}</p>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                            <p className="text-xs text-gray-600 mb-1 font-medium">Reorder Level</p>
                            <p className="text-2xl font-bold text-gray-900">{rec.reorderLevel}</p>
                          </div>
                          <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
                            <p className="text-xs text-purple-700 mb-1 font-medium">Predicted (7d)</p>
                            <p className="text-2xl font-bold text-purple-900">{rec.predictedDemand7Days}</p>
                          </div>
                          <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                            <p className="text-xs text-blue-700 mb-1 font-medium">Recommended</p>
                            <p className="text-2xl font-bold text-blue-900">{rec.recommendedQuantity}</p>
                          </div>
                        </div>

                        {/* Reason */}
                        {rec.reason && (
                          <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-4">
                            <p className="text-sm text-orange-800">
                              <strong>Reason:</strong> {rec.reason}
                            </p>
                          </div>
                        )}

                        {/* Vendor & Actions */}
                        <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                          <div className="flex-1">
                            {rec.vendorName ? (
                              <div className="text-sm">
                                <span className="text-gray-600">Vendor: </span>
                                <span className="font-semibold text-gray-900">{rec.vendorName}</span>
                                <span className="text-gray-500 ml-2">({rec.vendorEmail})</span>
                              </div>
                            ) : (
                              <div className="text-sm text-orange-600 flex items-center gap-1">
                                <AlertTriangle className="w-4 h-4" />
                                <span className="font-medium">No vendor assigned - Cannot generate PO</span>
                              </div>
                            )}

                            <div className="flex items-center gap-2 mt-2">
                              <div className="w-32 bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-green-600 h-2 rounded-full transition-all"
                                  style={{ width: `${rec.confidenceScore * 100}%` }}
                                ></div>
                              </div>
                              <span className="text-sm text-gray-600">
                                {(rec.confidenceScore * 100).toFixed(0)}% confidence
                              </span>
                            </div>
                          </div>

                          {!isSelected && canSelect && (
                            <button
                              onClick={() => handleGenerateSingle(rec)}
                              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 text-sm font-medium transition-all shadow-sm hover:shadow"
                            >
                              <ShoppingCart className="w-4 h-4" />
                              Generate PO
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default RestockRecommendation;