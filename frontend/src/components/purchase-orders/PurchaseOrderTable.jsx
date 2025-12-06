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



// path: frontend/src/components/purchase-orders/PurchaseOrderTable.jsx

import React, { useState, useContext } from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { purchaseOrderService } from '../../services/purchaseOrderService';
import { AuthContext } from '../../context/AuthContext';
import POStatusModal from './POStatusModal';
import { useNavigate } from "react-router-dom";


const PurchaseOrderTable = ({ orders, onRefresh, loading }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();


  // ===============================================
  // ROLE NORMALIZATION (IMPORTANT!)
  // ===============================================
  const isAdmin = user.role === "ADMIN" || user.role === "ROLE_ADMIN";
  const isManager = user.role === "MANAGER" || user.role === "ROLE_MANAGER";
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
      PENDING: 'bg-yellow-100 text-yellow-800',
      APPROVED: 'bg-blue-100 text-blue-800',
      DISPATCHED: 'bg-purple-100 text-purple-800',
      DELIVERED: 'bg-green-100 text-green-800',
      CANCELLED: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const handleStatusClick = (order) => {
    // Only Vendors can update order status
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
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 text-center text-gray-500">
        No purchase orders found
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vendor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Cost</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Expected</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Details</th>


                {/* Vendor-only: Status badge */}
                {isVendor && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                )}

                {/* Vendor: edit status | Admin: delete */}
                {(isVendor || isAdmin) && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                )}
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">#{order.id}</td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm font-medium text-gray-900">{order.productName}</p>
                    <p className="text-xs text-gray-500">SKU: {order.productSku}</p>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm">{order.vendorName}</p>
                    <p className="text-xs text-gray-500">{order.vendorEmail}</p>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    {order.quantity}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${order.totalCost?.toFixed(2)}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {formatDate(order.expectedDelivery)}
                  </td>

                  <td>
                    <button
                      onClick={() => navigate(`/purchase-orders/${order.id}`)}
                      className="text-indigo-600 hover:text-indigo-800 font-semibold"
                    >
                      View Details
                    </button>
                  </td>

                  {/* Vendor-only status badge */}
                  {isVendor && (
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleStatusClick(order)}
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                          order.status
                        )} hover:opacity-80 transition`}
                      >
                        {order.status}
                      </button>
                    </td>
                  )}

                  {/* Vendor = Can edit status */}
                  {/* Admin = Can delete if PENDING */}
                  {(isVendor || isAdmin) && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">

                        {/* Vendor update button */}
                        {isVendor && (
                          <button
                            onClick={() => handleStatusClick(order)}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            <Edit2 className="w-5 h-5" />
                          </button>
                        )}

                        {/* Admin delete button */}
                        {isAdmin && order.status === "PENDING" && (
                          <button
                            onClick={() => handleDelete(order.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="w-5 h-5" />
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

      {/* Status Modal */}
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
