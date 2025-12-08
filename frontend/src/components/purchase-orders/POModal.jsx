// import React from 'react';
// import { X, Package, User, Calendar, DollarSign, FileText } from 'lucide-react';

// const POModal = ({ order, onClose }) => {
//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric',
//     });
//   };

//   const formatDateTime = (dateString) => {
//     if (!dateString) return 'N/A';
//     return new Date(dateString).toLocaleString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit',
//     });
//   };

//   const getStatusColor = (status) => {
//     const colors = {
//       PENDING: 'bg-yellow-100 text-yellow-800 border-yellow-300',
//       APPROVED: 'bg-blue-100 text-blue-800 border-blue-300',
//       DISPATCHED: 'bg-purple-100 text-purple-800 border-purple-300',
//       DELIVERED: 'bg-green-100 text-green-800 border-green-300',
//       CANCELLED: 'bg-red-100 text-red-800 border-red-300',
//     };
//     return colors[status] || 'bg-gray-100 text-gray-800 border-gray-300';
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
//         {/* Header */}
//         <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white">
//           <div>
//             <h2 className="text-2xl font-bold text-gray-900">
//               Purchase Order #{order.id}
//             </h2>
//             <p className="text-sm text-gray-600 mt-1">
//               Created {formatDateTime(order.createdAt)}
//             </p>
//           </div>
//           <button
//             onClick={onClose}
//             className="text-gray-400 hover:text-gray-600"
//           >
//             <X className="w-6 h-6" />
//           </button>
//         </div>

//         <div className="p-6 space-y-6">
//           {/* Status Badge */}
//           <div className="flex items-center space-x-3">
//             <span
//               className={`px-4 py-2 text-sm font-semibold rounded-full border-2 ${getStatusColor(
//                 order.status
//               )}`}
//             >
//               {order.status}
//             </span>
//             {order.isAiGenerated && (
//               <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-semibold rounded-full">
//                 AI Generated
//               </span>
//             )}
//           </div>

//           {/* Product Information */}
//           <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
//             <div className="flex items-center space-x-2 mb-4">
//               <Package className="w-5 h-5 text-gray-600" />
//               <h3 className="text-lg font-semibold text-gray-900">Product Information</h3>
//             </div>
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <p className="text-sm text-gray-600">Product Name</p>
//                 <p className="text-base font-semibold text-gray-900">{order.productName}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-600">SKU</p>
//                 <p className="text-base font-semibold text-gray-900">{order.productSku}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-600">Quantity Ordered</p>
//                 <p className="text-base font-semibold text-gray-900">{order.quantity} units</p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-600">Total Cost</p>
//                 <p className="text-base font-semibold text-green-600">
//                   ${order.totalCost?.toFixed(2) || '0.00'}
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Vendor Information */}
//           <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
//             <div className="flex items-center space-x-2 mb-4">
//               <User className="w-5 h-5 text-gray-600" />
//               <h3 className="text-lg font-semibold text-gray-900">Vendor Information</h3>
//             </div>
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <p className="text-sm text-gray-600">Vendor Name</p>
//                 <p className="text-base font-semibold text-gray-900">{order.vendorName}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-600">Contact Email</p>
//                 <p className="text-base font-semibold text-gray-900">{order.vendorEmail}</p>
//               </div>
//             </div>
//           </div>

//           {/* Timeline */}
//           <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
//             <div className="flex items-center space-x-2 mb-4">
//               <Calendar className="w-5 h-5 text-gray-600" />
//               <h3 className="text-lg font-semibold text-gray-900">Timeline</h3>
//             </div>
//             <div className="space-y-3">
//               <div className="flex justify-between items-center">
//                 <span className="text-sm text-gray-600">Order Date</span>
//                 <span className="text-sm font-semibold text-gray-900">
//                   {formatDateTime(order.orderDate)}
//                 </span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-sm text-gray-600">Expected Delivery</span>
//                 <span className="text-sm font-semibold text-gray-900">
//                   {formatDate(order.expectedDelivery)}
//                 </span>
//               </div>
//               {order.approvedAt && (
//                 <div className="flex justify-between items-center">
//                   <span className="text-sm text-gray-600">Approved On</span>
//                   <span className="text-sm font-semibold text-gray-900">
//                     {formatDateTime(order.approvedAt)}
//                   </span>
//                 </div>
//               )}
//               {order.approvedByName && (
//                 <div className="flex justify-between items-center">
//                   <span className="text-sm text-gray-600">Approved By</span>
//                   <span className="text-sm font-semibold text-gray-900">
//                     {order.approvedByName}
//                   </span>
//                 </div>
//               )}
//               {order.actualDelivery && (
//                 <div className="flex justify-between items-center">
//                   <span className="text-sm text-gray-600">Actual Delivery</span>
//                   <span className="text-sm font-semibold text-green-600">
//                     {formatDate(order.actualDelivery)}
//                   </span>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Notes */}
//           {order.notes && (
//             <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
//               <div className="flex items-center space-x-2 mb-4">
//                 <FileText className="w-5 h-5 text-gray-600" />
//                 <h3 className="text-lg font-semibold text-gray-900">Notes</h3>
//               </div>
//               <p className="text-sm text-gray-700 whitespace-pre-wrap">{order.notes}</p>
//             </div>
//           )}
//         </div>

//         {/* Footer */}
//         <div className="p-6 border-t border-gray-200 bg-gray-50">
//           <button
//             onClick={onClose}
//             className="w-full px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition font-medium"
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default POModal;


import React from 'react';
import { X, Package, User, Calendar, FileText } from 'lucide-react';

const POModal = ({ order, onClose }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status) => {
    const colors = {
      PENDING: 'bg-yellow-900/40 text-yellow-300 border-yellow-700',
      APPROVED: 'bg-blue-900/40 text-blue-300 border-blue-700',
      DISPATCHED: 'bg-purple-900/40 text-purple-300 border-purple-700',
      DELIVERED: 'bg-green-900/40 text-green-300 border-green-700',
      CANCELLED: 'bg-red-900/40 text-red-300 border-red-700',
    };
    return colors[status] || 'bg-gray-700 text-gray-200 border-gray-600';
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-[#1A2234] border border-[#2A3248] rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">

        {/* Header */}
        <div className="p-6 border-b border-[#2A3248] flex justify-between items-center sticky top-0 bg-[#1A2234]/95 backdrop-blur">
          <div>
            <h2 className="text-2xl font-bold text-white">
              Purchase Order #{order.id}
            </h2>
            <p className="text-sm text-[#9BA8BF] mt-1">
              Created {formatDateTime(order.createdAt)}
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-[#9BA8BF] hover:text-white transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">

          {/* Status Badge */}
          <div className="flex items-center space-x-3">
            <span
              className={`px-4 py-2 text-sm font-semibold rounded-full border ${getStatusColor(
                order.status
              )}`}
            >
              {order.status}
            </span>

            {order.isAiGenerated && (
              <span className="px-3 py-1 bg-purple-900/40 text-purple-300 border border-purple-700 text-xs font-semibold rounded-full">
                AI Generated
              </span>
            )}
          </div>

          {/* Product Information */}
          <div className="bg-[#0D1322] border border-[#2A3248] rounded-lg p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Package className="w-5 h-5 text-blue-400" />
              <h3 className="text-lg font-semibold text-white">Product Information</h3>
            </div>

            <div className="grid grid-cols-2 gap-4 text-[#D2C1B6]">
              <div>
                <p className="text-sm text-[#9BA8BF]">Product Name</p>
                <p className="text-base font-semibold text-white">{order.productName}</p>
              </div>

              <div>
                <p className="text-sm text-[#9BA8BF]">SKU</p>
                <p className="text-base font-semibold text-white">{order.productSku}</p>
              </div>

              <div>
                <p className="text-sm text-[#9BA8BF]">Quantity Ordered</p>
                <p className="text-base font-semibold text-white">{order.quantity} units</p>
              </div>

              <div>
                <p className="text-sm text-[#9BA8BF]">Total Cost</p>
                <p className="text-base font-semibold text-green-400">
                  ${order.totalCost?.toFixed(2) || '0.00'}
                </p>
              </div>
            </div>
          </div>

          {/* Vendor Information */}
          <div className="bg-[#0D1322] border border-[#2A3248] rounded-lg p-6">
            <div className="flex items-center space-x-2 mb-4">
              <User className="w-5 h-5 text-blue-400" />
              <h3 className="text-lg font-semibold text-white">Vendor Information</h3>
            </div>

            <div className="grid grid-cols-2 gap-4 text-[#D2C1B6]">
              <div>
                <p className="text-sm text-[#9BA8BF]">Vendor Name</p>
                <p className="text-base font-semibold text-white">{order.vendorName}</p>
              </div>

              <div>
                <p className="text-sm text-[#9BA8BF]">Contact Email</p>
                <p className="text-base font-semibold text-white">{order.vendorEmail}</p>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-[#0D1322] border border-[#2A3248] rounded-lg p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Calendar className="w-5 h-5 text-blue-400" />
              <h3 className="text-lg font-semibold text-white">Timeline</h3>
            </div>

            <div className="space-y-3 text-[#D2C1B6]">
              <div className="flex justify-between">
                <span className="text-sm text-[#9BA8BF]">Order Date</span>
                <span className="text-sm font-semibold text-white">
                  {formatDateTime(order.orderDate)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-sm text-[#9BA8BF]">Expected Delivery</span>
                <span className="text-sm font-semibold text-white">
                  {formatDate(order.expectedDelivery)}
                </span>
              </div>

              {order.approvedAt && (
                <div className="flex justify-between">
                  <span className="text-sm text-[#9BA8BF]">Approved On</span>
                  <span className="text-sm font-semibold text-white">
                    {formatDateTime(order.approvedAt)}
                  </span>
                </div>
              )}

              {order.approvedByName && (
                <div className="flex justify-between">
                  <span className="text-sm text-[#9BA8BF]">Approved By</span>
                  <span className="text-sm font-semibold text-white">
                    {order.approvedByName}
                  </span>
                </div>
              )}

              {order.actualDelivery && (
                <div className="flex justify-between">
                  <span className="text-sm text-[#9BA8BF]">Actual Delivery</span>
                  <span className="text-sm font-semibold text-green-400">
                    {formatDate(order.actualDelivery)}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Notes */}
          {order.notes && (
            <div className="bg-[#0D1322] border border-[#2A3248] rounded-lg p-6">
              <div className="flex items-center space-x-2 mb-4">
                <FileText className="w-5 h-5 text-blue-400" />
                <h3 className="text-lg font-semibold text-white">Notes</h3>
              </div>
              <p className="text-sm text-[#D2C1B6] whitespace-pre-wrap">
                {order.notes}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-[#2A3248] bg-[#0D1322]">
          <button
            onClick={onClose}
            className="w-full px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition font-medium"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};

export default POModal;
