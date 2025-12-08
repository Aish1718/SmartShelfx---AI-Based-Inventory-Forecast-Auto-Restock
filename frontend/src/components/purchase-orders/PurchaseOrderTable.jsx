// import React, { useState, useContext } from 'react';
// import { Edit2, Trash2, CheckCircle, XCircle, Truck } from 'lucide-react';
// import { purchaseOrderService } from '../../services/purchaseOrderService';
// import { AuthContext } from '../../context/AuthContext';
// import POStatusModal from './POStatusModal';

// const PurchaseOrderTable = ({ orders, onRefresh, loading }) => {
//   const { user } = useContext(AuthContext);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [showStatusModal, setShowStatusModal] = useState(false);

//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric'
//     });
//   };

//   const getStatusColor = (status) => {
//     const colors = {
//       PENDING: 'bg-yellow-100 text-yellow-800',
//       APPROVED: 'bg-blue-100 text-blue-800',
//       DISPATCHED: 'bg-purple-100 text-purple-800',
//       DELIVERED: 'bg-green-100 text-green-800',
//       CANCELLED: 'bg-red-100 text-red-800',
//     };
//     return colors[status] || 'bg-gray-100 text-gray-800';
//   };

//   const handleStatusClick = (order) => {
//     setSelectedOrder(order);
//     setShowStatusModal(true);
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure you want to delete this purchase order?')) {
//       try {
//         await purchaseOrderService.deletePurchaseOrder(id);
//         onRefresh();
//       } catch (error) {
//         alert('Error deleting order: ' + error.response?.data?.error);
//       }
//     }
//   };

//   if (loading) {
//     return (
//       <div className="bg-white rounded-lg shadow-sm p-8 text-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
//       </div>
//     );
//   }

//   if (orders.length === 0) {
//     return (
//       <div className="bg-white rounded-lg shadow-sm p-8 text-center text-gray-500">
//         No purchase orders found
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="bg-white rounded-lg shadow-sm overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                   Order ID
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                   Product
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                   Vendor
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                   Quantity
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                   Total Cost
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                   Expected
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                   Status
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {orders.map((order) => (
//                 <tr key={order.id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="flex items-center">
//                       <span className="text-sm font-medium text-gray-900">#{order.id}</span>
//                       {order.isAiGenerated && (
//                         <span className="ml-2 text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded">
//                           AI
//                         </span>
//                       )}
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div>
//                       <p className="text-sm font-medium text-gray-900">{order.productName}</p>
//                       <p className="text-xs text-gray-500">SKU: {order.productSku}</p>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div>
//                       <p className="text-sm text-gray-900">{order.vendorName}</p>
//                       <p className="text-xs text-gray-500">{order.vendorEmail}</p>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
//                     {order.quantity}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                     ${order.totalCost?.toFixed(2) || '0.00'}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
//                     {formatDate(order.expectedDelivery)}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <button
//                       onClick={() => handleStatusClick(order)}
//                       className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
//                         order.status
//                       )} hover:opacity-80 transition`}
//                     >
//                       {order.status}
//                     </button>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                     <div className="flex space-x-2">
//                       <button
//                         onClick={() => handleStatusClick(order)}
//                         className="text-indigo-600 hover:text-indigo-900"
//                         title="Update Status"
//                       >
//                         <Edit2 className="w-5 h-5" />
//                       </button>
//                       {user.role === 'ADMIN' && order.status === 'PENDING' && (
//                         <button
//                           onClick={() => handleDelete(order.id)}
//                           className="text-red-600 hover:text-red-900"
//                           title="Delete"
//                         >
//                           <Trash2 className="w-5 h-5" />
//                         </button>
//                       )}
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {showStatusModal && selectedOrder && (
//         <POStatusModal
//           order={selectedOrder}
//           onClose={() => {
//             setShowStatusModal(false);
//             setSelectedOrder(null);
//           }}
//           onUpdate={() => {
//             setShowStatusModal(false);
//             setSelectedOrder(null);
//             onRefresh();
//           }}
//         />
//       )}
//     </>
//   );
// };

// export default PurchaseOrderTable;





// import React, { useState, useContext } from 'react';
// import { Edit2, Trash2 } from 'lucide-react';
// import { purchaseOrderService } from '../../services/purchaseOrderService';
// import { AuthContext } from '../../context/AuthContext';
// import POStatusModal from './POStatusModal';

// const PurchaseOrderTable = ({ orders, onRefresh, loading }) => {
//   const { user } = useContext(AuthContext);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [showStatusModal, setShowStatusModal] = useState(false);

//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric'
//     });
//   };

//   const getStatusColor = (status) => {
//     const colors = {
//       PENDING: 'bg-yellow-100 text-yellow-800',
//       APPROVED: 'bg-blue-100 text-blue-800',
//       DISPATCHED: 'bg-purple-100 text-purple-800',
//       DELIVERED: 'bg-green-100 text-green-800',
//       CANCELLED: 'bg-red-100 text-red-800',
//     };
//     return colors[status] || 'bg-gray-100 text-gray-800';
//   };

//   const handleStatusClick = (order) => {
//     if (user.role !== 'VENDOR') return; // Manager CANNOT open modal
//     setSelectedOrder(order);
//     setShowStatusModal(true);
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure you want to delete this purchase order?')) {
//       try {
//         await purchaseOrderService.deletePurchaseOrder(id);
//         onRefresh();
//       } catch (error) {
//         alert('Error deleting order: ' + error.response?.data?.error);
//       }
//     }
//   };

//   if (loading) {
//     return (
//       <div className="bg-white rounded-lg shadow-sm p-8 text-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
//       </div>
//     );
//   }

//   if (orders.length === 0) {
//     return (
//       <div className="bg-white rounded-lg shadow-sm p-8 text-center text-gray-500">
//         No purchase orders found
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="bg-white rounded-lg shadow-sm overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                   Order ID
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                   Product
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                   Vendor
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                   Quantity
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                   Total Cost
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                   Expected
//                 </th>

//                 {/* Only Vendor sees Status column */}
//                 {user.role === 'VENDOR' && (
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                     Status
//                   </th>
//                 )}

//                 {/* Only Vendor + Admin see Actions */}
//                 {(user.role === 'VENDOR' || user.role === 'ADMIN') && (
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                     Actions
//                   </th>
//                 )}
//               </tr>
//             </thead>

//             <tbody className="bg-white divide-y divide-gray-200">
//               {orders.map((order) => (
//                 <tr key={order.id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="flex items-center">
//                       <span className="text-sm font-medium text-gray-900">#{order.id}</span>
//                       {order.isAiGenerated && (
//                         <span className="ml-2 text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded">
//                           AI
//                         </span>
//                       )}
//                     </div>
//                   </td>

//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <p className="text-sm font-medium text-gray-900">{order.productName}</p>
//                     <p className="text-xs text-gray-500">SKU: {order.productSku}</p>
//                   </td>

//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <p className="text-sm">{order.vendorName}</p>
//                     <p className="text-xs text-gray-500">{order.vendorEmail}</p>
//                   </td>

//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
//                     {order.quantity}
//                   </td>

//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                     ${order.totalCost?.toFixed(2) || '0.00'}
//                   </td>

//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
//                     {formatDate(order.expectedDelivery)}
//                   </td>

//                   {/* Vendor-only Status Badge */}
//                   {user.role === 'VENDOR' && (
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <button
//                         onClick={() => handleStatusClick(order)}
//                         className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
//                           order.status
//                         )} hover:opacity-80 transition`}
//                       >
//                         {order.status}
//                       </button>
//                     </td>
//                   )}

//                   {/* Vendor can edit status, Admin can delete */}
//                   {(user.role === 'VENDOR' || user.role === 'ADMIN') && (
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                       <div className="flex space-x-2">
//                         {/* Vendor sees edit button */}
//                         {user.role === 'VENDOR' && (
//                           <button
//                             onClick={() => handleStatusClick(order)}
//                             className="text-indigo-600 hover:text-indigo-900"
//                             title="Update Status"
//                           >
//                             <Edit2 className="w-5 h-5" />
//                           </button>
//                         )}

//                         {/* Admin sees delete button */}
//                         {user.role === 'ADMIN' && order.status === 'PENDING' && (
//                           <button
//                             onClick={() => handleDelete(order.id)}
//                             className="text-red-600 hover:text-red-900"
//                             title="Delete"
//                           >
//                             <Trash2 className="w-5 h-5" />
//                           </button>
//                         )}
//                       </div>
//                     </td>
//                   )}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {showStatusModal && selectedOrder && (
//         <POStatusModal
//           order={selectedOrder}
//           onClose={() => {
//             setShowStatusModal(false);
//             setSelectedOrder(null);
//           }}
//           onUpdate={() => {
//             setShowStatusModal(false);
//             setSelectedOrder(null);
//             onRefresh();
//           }}
//         />
//       )}
//     </>
//   );
// };

// export default PurchaseOrderTable;




// import React, { useState, useContext } from 'react';
// import { Edit2, Trash2 } from 'lucide-react';
// import { purchaseOrderService } from '../../services/purchaseOrderService';
// import { AuthContext } from '../../context/AuthContext';
// import POStatusModal from './POStatusModal';

// const PurchaseOrderTable = ({ orders, onRefresh, loading }) => {
//   const { user } = useContext(AuthContext);

//   // ✔ Normalize roles EXACTLY like in PurchaseOrderList.jsx
//   const isAdmin = user.role === "ADMIN" || user.role === "ROLE_ADMIN";
//   const isManager = user.role === "MANAGER" || user.role === "ROLE_MANAGER";
//   const isVendor = user.role === "VENDOR" || user.role === "ROLE_VENDOR";

//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [showStatusModal, setShowStatusModal] = useState(false);

//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric'
//     });
//   };

//   const getStatusColor = (status) => {
//     const colors = {
//       PENDING: 'bg-yellow-100 text-yellow-800',
//       APPROVED: 'bg-blue-100 text-blue-800',
//       DISPATCHED: 'bg-purple-100 text-purple-800',
//       DELIVERED: 'bg-green-100 text-green-800',
//       CANCELLED: 'bg-red-100 text-red-800',
//     };
//     return colors[status] || 'bg-gray-100 text-gray-800';
//   };

//   const handleStatusClick = (order) => {
//     // ❌ Manager cannot update status
//     // ❌ Admin should NOT update vendor status
//     // ✔ Only VENDOR can open modal
//     if (!isVendor) return;

//     setSelectedOrder(order);
//     setShowStatusModal(true);
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure?')) {
//       try {
//         await purchaseOrderService.deletePurchaseOrder(id);
//         onRefresh();
//       } catch (error) {
//         alert('Error deleting order');
//       }
//     }
//   };

//   if (loading) {
//     return (
//       <div className="bg-white rounded-lg shadow-sm p-8 text-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
//       </div>
//     );
//   }

//   if (orders.length === 0) {
//     return (
//       <div className="bg-white rounded-lg shadow-sm p-8 text-center text-gray-500">
//         No purchase orders found
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="bg-white rounded-lg shadow-sm overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vendor</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Cost</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Expected</th>

//                 {/* ✔ Only vendor can see STATUS button */}
//                 {isVendor && (
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                     Status
//                   </th>
//                 )}

//                 {/* ✔ Admin can delete
//                     ✔ Vendor can update status
//                     ❌ Manager sees NOTHING here */}
//                 {(isAdmin || isVendor) && (
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                     Actions
//                   </th>
//                 )}
//               </tr>
//             </thead>

//             <tbody className="bg-white divide-y divide-gray-200">
//               {orders.map((order) => (
//                 <tr key={order.id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4 whitespace-nowrap">#{order.id}</td>

//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <p className="text-sm font-medium text-gray-900">{order.productName}</p>
//                     <p className="text-xs text-gray-500">SKU: {order.productSku}</p>
//                   </td>

//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <p className="text-sm">{order.vendorName}</p>
//                     <p className="text-xs text-gray-500">{order.vendorEmail}</p>
//                   </td>

//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
//                     {order.quantity}
//                   </td>

//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                     ${order.totalCost?.toFixed(2)}
//                   </td>

//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
//                     {formatDate(order.expectedDelivery)}
//                   </td>

//                   {/* ✔ Vendor-only status badge */}
//                   {isVendor && (
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <button
//                         onClick={() => handleStatusClick(order)}
//                         className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
//                           order.status
//                         )} hover:opacity-80 transition`}
//                       >
//                         {order.status}
//                       </button>
//                     </td>
//                   )}

//                   {/* ✔ Vendor = Edit Status
//                       ✔ Admin = Delete
//                       ❌ Manager = NOTHING */}
//                   {(isVendor || isAdmin) && (
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                       <div className="flex space-x-2">

//                         {/* Vendor button */}
//                         {isVendor && (
//                           <button
//                             onClick={() => handleStatusClick(order)}
//                             className="text-indigo-600 hover:text-indigo-900"
//                           >
//                             <Edit2 className="w-5 h-5" />
//                           </button>
//                         )}

//                         {/* Admin Delete */}
//                         {isAdmin && order.status === "PENDING" && (
//                           <button
//                             onClick={() => handleDelete(order.id)}
//                             className="text-red-600 hover:text-red-900"
//                           >
//                             <Trash2 className="w-5 h-5" />
//                           </button>
//                         )}
//                       </div>
//                     </td>
//                   )}

//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Status Modal */}
//       {showStatusModal && selectedOrder && (
//         <POStatusModal
//           order={selectedOrder}
//           onClose={() => {
//             setShowStatusModal(false);
//             setSelectedOrder(null);
//           }}
//           onUpdate={() => {
//             setShowStatusModal(false);
//             setSelectedOrder(null);
//             onRefresh();
//           }}
//         />
//       )}
//     </>
//   );
// };

// export default PurchaseOrderTable;



//path: frontend/src/components/purchase-orders/PurchaseOrderTable.jsx

// import React, { useState, useContext } from 'react';
// import { Edit2, Trash2 } from 'lucide-react';
// import { purchaseOrderService } from '../../services/purchaseOrderService';
// import { AuthContext } from '../../context/AuthContext';
// import POStatusModal from './POStatusModal';
// import { useNavigate } from "react-router-dom";


// const PurchaseOrderTable = ({ orders, onRefresh, loading }) => {
//   const { user } = useContext(AuthContext);
//   const navigate = useNavigate();


//   // ===============================================
//   // ROLE NORMALIZATION (IMPORTANT!)
//   // ===============================================
//   const isAdmin = user.role === "ADMIN" || user.role === "ROLE_ADMIN";
//   const isManager = user.role === "MANAGER" || user.role === "ROLE_MANAGER";
//   const isVendor = user.role === "VENDOR" || user.role === "ROLE_VENDOR";

//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [showStatusModal, setShowStatusModal] = useState(false);

//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric'
//     });
//   };

//   const getStatusColor = (status) => {
//     const colors = {
//       PENDING: 'bg-yellow-100 text-yellow-800',
//       APPROVED: 'bg-blue-100 text-blue-800',
//       DISPATCHED: 'bg-purple-100 text-purple-800',
//       DELIVERED: 'bg-green-100 text-green-800',
//       CANCELLED: 'bg-red-100 text-red-800',
//     };
//     return colors[status] || 'bg-gray-100 text-gray-800';
//   };

//   const handleStatusClick = (order) => {
//     // Only Vendors can update order status
//     if (!isVendor) return;

//     setSelectedOrder(order);
//     setShowStatusModal(true);
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure?')) {
//       try {
//         await purchaseOrderService.deletePurchaseOrder(id);
//         onRefresh();
//       } catch (error) {
//         alert('Error deleting order');
//       }
//     }
//   };

//   if (loading) {
//     return (
//       <div className="bg-white rounded-lg shadow-sm p-8 text-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
//       </div>
//     );
//   }

//   if (orders.length === 0) {
//     return (
//       <div className="bg-white rounded-lg shadow-sm p-8 text-center text-gray-500">
//         No purchase orders found
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="bg-white rounded-lg shadow-sm overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vendor</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Cost</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Expected</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Details</th>


//                 {/* Vendor-only: Status badge */}
//                 {isVendor && (
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
//                 )}

//                 {/* Vendor: edit status | Admin: delete */}
//                 {/* {(isVendor || isAdmin) && (
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
//                 )} */}
//               </tr>
//             </thead>

//             <tbody className="bg-white divide-y divide-gray-200">
//               {orders.map((order) => (
//                 <tr key={order.id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4 whitespace-nowrap">#{order.id}</td>

//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <p className="text-sm font-medium text-gray-900">{order.productName}</p>
//                     <p className="text-xs text-gray-500">SKU: {order.productSku}</p>
//                   </td>

//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <p className="text-sm">{order.vendorName}</p>
//                     <p className="text-xs text-gray-500">{order.vendorEmail}</p>
//                   </td>

//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
//                     {order.quantity}
//                   </td>

//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                     ${order.totalCost?.toFixed(2)}
//                   </td>

//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
//                     {formatDate(order.expectedDelivery)}
//                   </td>

//                   <td>
//                     <button
//                       onClick={() => navigate(`/purchase-orders/${order.id}`)}
//                       className="text-indigo-600 hover:text-indigo-800 font-semibold"
//                     >
//                       View Details
//                     </button>
//                   </td>

//                   {/* Vendor-only status badge */}
//                   {isVendor && (
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <button
//                         onClick={() => handleStatusClick(order)}
//                         className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
//                           order.status
//                         )} hover:opacity-80 transition`}
//                       >
//                         {order.status}
//                       </button>
//                     </td>
//                   )}

//                   {/* Vendor = Can edit status */}
//                   {/* Admin = Can delete if PENDING */}
//                   {(isVendor || isAdmin) && (
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                       <div className="flex space-x-2">

//                         {/* Vendor update button */}
//                         {isVendor && (
//                           <button
//                             onClick={() => handleStatusClick(order)}
//                             className="text-indigo-600 hover:text-indigo-900"
//                           >
//                             <Edit2 className="w-5 h-5" />
//                           </button>
//                         )}

//                         {/* Admin delete button */}
//                         {isAdmin && order.status === "PENDING" && (
//                           <button
//                             onClick={() => handleDelete(order.id)}
//                             className="text-red-600 hover:text-red-900"
//                           >
//                             <Trash2 className="w-5 h-5" />
//                           </button>
//                         )}

//                       </div>
//                     </td>
//                   )}

//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Status Modal */}
//       {showStatusModal && selectedOrder && (
//         <POStatusModal
//           order={selectedOrder}
//           onClose={() => {
//             setShowStatusModal(false);
//             setSelectedOrder(null);
//           }}
//           onUpdate={() => {
//             setShowStatusModal(false);
//             setSelectedOrder(null);
//             onRefresh();
//           }}
//         />
//       )}
//     </>
//   );
// };

// export default PurchaseOrderTable;


// path: frontend/src/components/purchase-orders/PurchaseOrderTable.jsx

// import React, { useState, useContext } from 'react';
// import { Edit2, Trash2 } from 'lucide-react';
// import { purchaseOrderService } from '../../services/purchaseOrderService';
// import { AuthContext } from '../../context/AuthContext';
// import POStatusModal from './POStatusModal';
// import { useNavigate } from "react-router-dom";

// const PurchaseOrderTable = ({ orders, onRefresh, loading }) => {
//   const { user } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const isAdmin = user.role === "ADMIN" || user.role === "ROLE_ADMIN";
//   const isManager = user.role === "MANAGER" || user.role === "ROLE_MANAGER";
//   const isVendor = user.role === "VENDOR" || user.role === "ROLE_VENDOR";

//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [showStatusModal, setShowStatusModal] = useState(false);

//   const formatDate = (dateString) => {
//     if (!dateString) return "N/A";
//     return new Date(dateString).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });
//   };

//   // ✨ Dark-theme status colors
//   const getStatusColor = (status) => {
//     const colors = {
//       PENDING: "bg-yellow-900/40 text-yellow-300 border border-yellow-700",
//       APPROVED: "bg-blue-900/40 text-blue-300 border border-blue-700",
//       DISPATCHED: "bg-purple-900/40 text-purple-300 border border-purple-700",
//       DELIVERED: "bg-green-900/40 text-green-300 border border-green-700",
//       CANCELLED: "bg-red-900/40 text-red-300 border border-red-700",
//     };
//     return colors[status] || "bg-gray-800 text-gray-300 border border-gray-700";
//   };

//   const handleStatusClick = (order) => {
//     if (!isVendor) return;
//     setSelectedOrder(order);
//     setShowStatusModal(true);
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure?")) {
//       try {
//         await purchaseOrderService.deletePurchaseOrder(id);
//         onRefresh();
//       } catch (error) {
//         alert("Error deleting order");
//       }
//     }
//   };

//   // --- LOADING UI ---
//   if (loading) {
//     return (
//       <div className="bg-[#1A2234] rounded-lg p-8 text-center border border-[#2A3248]">
//         <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 mx-auto"></div>
//       </div>
//     );
//   }

//   // --- EMPTY STATE ---
//   if (orders.length === 0) {
//     return (
//       <div className="bg-[#1A2234] rounded-lg p-8 text-center text-gray-400 border border-[#2A3248]">
//         No purchase orders found
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="bg-[#1A2234] rounded-lg border border-[#2A3248] overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-[#2A3248]">
//             {/* ================= TABLE HEADER ================= */}
//             <thead className="bg-[#111827]">
//               <tr>
//                 {[
//                   "Order ID",
//                   "Product",
//                   "Vendor",
//                   "Quantity",
//                   "Total Cost",
//                   "Expected",
//                   "Details",
//                 ].map((header) => (
//                   <th
//                     key={header}
//                     className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider"
//                   >
//                     {header}
//                   </th>
//                 ))}

//                 {isVendor && (
//                   <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase">
//                     Status
//                   </th>
//                 )}

//                 {(isAdmin || isVendor) && (
//                   <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase">
//                     Actions
//                   </th>
//                 )}
//               </tr>
//             </thead>

//             {/* ================= TABLE BODY ================= */}
//             <tbody className="bg-[#0D1322] divide-y divide-[#2A3248] text-gray-200">
//               {orders.map((order) => (
//                 <tr
//                   key={order.id}
//                   className="hover:bg-[#131A2C] transition"
//                 >
//                   {/* Order ID */}
//                   <td className="px-6 py-4 whitespace-nowrap text-gray-300">
//                     #{order.id}
//                   </td>

//                   {/* Product */}
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <p className="font-semibold text-white">
//                       {order.productName}
//                     </p>
//                     <p className="text-xs text-gray-400">
//                       SKU: {order.productSku}
//                     </p>
//                   </td>

//                   {/* Vendor */}
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <p className="text-gray-200">{order.vendorName}</p>
//                     <p className="text-xs text-gray-400">{order.vendorEmail}</p>
//                   </td>

//                   {/* Quantity */}
//                   <td className="px-6 py-4 whitespace-nowrap font-bold text-blue-300">
//                     {order.quantity}
//                   </td>

//                   {/* Cost */}
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     ${order.totalCost?.toFixed(2)}
//                   </td>

//                   {/* Expected Date */}
//                   <td className="px-6 py-4 whitespace-nowrap text-gray-400">
//                     {formatDate(order.expectedDelivery)}
//                   </td>

//                   {/* View Details */}
//                   <td className="px-6 py-4">
//                     <button
//                       onClick={() =>
//                         navigate(`/purchase-orders/${order.id}`)
//                       }
//                       className="text-blue-400 hover:text-blue-300 underline"
//                     >
//                       View
//                     </button>
//                   </td>

//                   {/* Vendor Status Badge */}
//                   {isVendor && (
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <button
//                         onClick={() => handleStatusClick(order)}
//                         className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
//                           order.status
//                         )}`}
//                       >
//                         {order.status}
//                       </button>
//                     </td>
//                   )}

//                   Actions
//                   {(isVendor || isAdmin) && (
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex space-x-3">

//                         {/* Vendor Edit */}
//                         {isVendor && (
//                           <button
//                             onClick={() => handleStatusClick(order)}
//                             className="text-blue-400 hover:text-blue-300"
//                           >
//                             <Edit2 className="w-5 h-5" />
//                           </button>
//                         )}

//                         {/* Admin Delete Only if Pending */}
//                         {isAdmin && order.status === "PENDING" && (
//                           <button
//                             onClick={() => handleDelete(order.id)}
//                             className="text-red-400 hover:text-red-300"
//                           >
//                             <Trash2 className="w-5 h-5" />
//                           </button>
//                         )}
//                       </div>
//                     </td>
//                   )}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* STATUS MODAL */}
//       {showStatusModal && selectedOrder && (
//         <POStatusModal
//           order={selectedOrder}
//           onClose={() => {
//             setShowStatusModal(false);
//             setSelectedOrder(null);
//           }}
//           onUpdate={() => {
//             setShowStatusModal(false);
//             setSelectedOrder(null);
//             onRefresh();
//           }}
//         />
//       )}
//     </>
//   );
// };

// export default PurchaseOrderTable;


import React, { useState, useContext } from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { purchaseOrderService } from '../../services/purchaseOrderService';
import { AuthContext } from '../../context/AuthContext';
import POStatusModal from './POStatusModal';
import { useNavigate } from "react-router-dom";

const PurchaseOrderTable = ({ orders, onRefresh, loading }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const isAdmin = user.role === "ADMIN" || user.role === "ROLE_ADMIN";
  const isVendor = user.role === "VENDOR" || user.role === "ROLE_VENDOR";

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showStatusModal, setShowStatusModal] = useState(false);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    const colors = {
      PENDING: 'bg-yellow-700/30 text-yellow-300 border border-yellow-600',
      APPROVED: 'bg-blue-700/30 text-blue-300 border border-blue-600',
      DISPATCHED: 'bg-purple-700/30 text-purple-300 border border-purple-600',
      DELIVERED: 'bg-green-700/30 text-green-300 border border-green-600',
      CANCELLED: 'bg-red-700/30 text-red-300 border border-red-600',
    };
    return colors[status] || 'bg-gray-700/30 text-gray-300';
  };

  const handleStatusClick = (order) => {
    if (!isVendor) return;
    setSelectedOrder(order);
    setShowStatusModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await purchaseOrderService.deletePurchaseOrder(id);
        onRefresh();
      } catch (error) {
        alert('Error deleting order');
      }
    }
  };

  if (loading) {
    return (
      <div className="bg-[#0D1726] rounded-lg shadow-xl p-8 text-center text-blue-300">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="bg-[#0D1726] rounded-lg shadow-xl p-8 text-center text-gray-400">
        No purchase orders found
      </div>
    );
  }

  return (
    <>
      <div className="bg-[#0D1726] rounded-lg shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">

            {/* -------- DARK HEADER -------- */}
            <thead className="bg-[#1A2333]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase">Product</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase">Vendor</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase">Total Cost</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase">Expected</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase">Details</th>

                {/* Ensure header matches body columns */}
                {(isVendor || isAdmin) && (
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase">
                    Actions
                  </th>
                )}
              </tr>
            </thead>

            {/* -------- DARK BODY ROWS -------- */}
            <tbody className="bg-[#0D1726] divide-y divide-gray-800">
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-[#162032] transition"
                >
                  <td className="px-6 py-4 text-blue-300 whitespace-nowrap">
                    #{order.id}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-gray-200 font-medium">{order.productName}</p>
                    <p className="text-xs text-gray-500">SKU: {order.productSku}</p>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-gray-300">{order.vendorName}</p>
                    <p className="text-xs text-gray-500">{order.vendorEmail}</p>
                  </td>

                  <td className="px-6 py-4 text-gray-200 font-semibold">
                    {order.quantity}
                  </td>

                  <td className="px-6 py-4 text-blue-300">
                    ${order.totalCost?.toFixed(2)}
                  </td>

                  <td className="px-6 py-4 text-gray-400">
                    {formatDate(order.expectedDelivery)}
                  </td>

                  <td className="px-6 py-4">
                    <button
                      onClick={() => navigate(`/purchase-orders/${order.id}`)}
                      className="text-blue-400 hover:text-blue-300 underline"
                    >
                      View
                    </button>
                  </td>

                  {(isVendor || isAdmin) && (
                    <td className="px-6 py-4 text-gray-300">
                      <div className="flex space-x-3">

                        {/* Vendor Status Update Button */}
                        {isVendor && (
                          <button onClick={() => handleStatusClick(order)}>
                            <Edit2 className="w-5 h-5 text-blue-400 hover:text-blue-300" />
                          </button>
                        )}

                        {/* Admin Delete Button */}
                        {isAdmin && order.status === "PENDING" && (
                          <button onClick={() => handleDelete(order.id)}>
                            <Trash2 className="w-5 h-5 text-red-400 hover:text-red-300" />
                          </button>
                        )}
                      </div>
                    </td>
                  )}

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* STATUS MODAL */}
      {showStatusModal && selectedOrder && (
        <POStatusModal
          order={selectedOrder}
          onClose={() => {
            setShowStatusModal(false);
            setSelectedOrder(null);
          }}
          onUpdate={() => {
            setShowStatusModal(false);
            setSelectedOrder(null);
            onRefresh();
          }}
        />
      )}
    </>
  );
};

export default PurchaseOrderTable;
