// import React, { useState } from 'react';
// import { X, CheckCircle } from 'lucide-react';
// import { purchaseOrderService } from '../../services/purchaseOrderService';


// const POStatusModal = ({ order, onClose, onUpdate }) => {

//   const [status, setStatus] = useState(order.status);
//   const [actualDelivery, setActualDelivery] = useState('');
//   const [notes, setNotes] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     try {
//       const updateData = {
//         status,
//         notes: notes || null,
//         actualDelivery: status === 'DELIVERED' && actualDelivery ? actualDelivery : null,
//       };

//       await purchaseOrderService.updateOrderStatus(order.id, updateData);
//       onUpdate();
//     } catch (err) {
//       setError(err.response?.data?.error || 'Error updating status');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-lg max-w-md w-full">
//         <div className="p-6 border-b border-gray-200 flex justify-between items-center">
//           <h2 className="text-xl font-bold text-gray-900">Update Order Status</h2>
//           <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
//             <X className="w-6 h-6" />
//           </button>
//         </div>

//         <form onSubmit={handleSubmit} className="p-6 space-y-4">
//           {error && (
//             <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
//               {error}
//             </div>
//           )}

//           <div className="bg-gray-50 rounded-lg p-4">
//             <p className="text-sm text-gray-600">Order #{order.id}</p>
//             <p className="text-lg font-semibold text-gray-900">{order.productName}</p>
//             <p className="text-sm text-gray-600 mt-1">Quantity: {order.quantity}</p>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               New Status *
//             </label>
//             <select
//               value={status}
//               onChange={(e) => setStatus(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
//               required
//             >
//               <option value="PENDING">Pending</option>
//               <option value="APPROVED">Approved</option>
//               <option value="DISPATCHED">Dispatched</option>
//               <option value="DELIVERED">Delivered</option>
//               <option value="CANCELLED">Cancelled</option>
//             </select>
//           </div>

//           {status === 'DELIVERED' && (
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Actual Delivery Date
//               </label>
//               <input
//                 type="date"
//                 value={actualDelivery}
//                 onChange={(e) => setActualDelivery(e.target.value)}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
//               />
//             </div>
//           )}

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Notes
//             </label>
//             <textarea
//               value={notes}
//               onChange={(e) => setNotes(e.target.value)}
//               rows="3"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
//               placeholder="Add notes about this status change..."
//             />
//           </div>

//           <div className="flex space-x-3 pt-4">
//             <button
//               type="button"
//               onClick={onClose}
//               className="flex-1 px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={loading}
//               className="flex-1 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition disabled:opacity-50 flex items-center justify-center space-x-2"
//             >
//               {loading ? (
//                 <span>Updating...</span>
//               ) : (
//                 <>
//                   <CheckCircle className="w-5 h-5" />
//                   <span>Update Status</span>
//                 </>
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default POStatusModal;







// import React, { useState, useContext } from 'react';
// import { X, CheckCircle } from 'lucide-react';
// import { purchaseOrderService } from '../../services/purchaseOrderService';
// import { AuthContext } from '../../context/AuthContext';

// const POStatusModal = ({ order, onClose, onUpdate }) => {
//   const { user } = useContext(AuthContext);

//   const [status, setStatus] = useState(order.status);
//   const [actualDelivery, setActualDelivery] = useState('');
//   const [notes, setNotes] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   // ============================
//   // ROLE-BASED DROPDOWN OPTIONS
//   // ============================
//   let statusOptions = [];

//   if (user.role === "VENDOR") {
//     statusOptions = [
//       "APPROVED",
//       "REJECTED",
//       "DISPATCHED",
//       "DELIVERED"
//     ];
//   } else if (user.role === "MANAGER") {
//     statusOptions = [
//       "RECEIVED",
//       "CANCELLED"
//     ];
//   } else if (user.role === "ADMIN") {
//     statusOptions = [
//       "PENDING",
//       "APPROVED",
//       "DISPATCHED",
//       "DELIVERED",
//       "RECEIVED",
//       "CANCELLED"
//     ];
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     try {
//       const updateData = {
//         status,
//         notes: notes || null,
//         actualDelivery:
//           status === 'DELIVERED' && actualDelivery ? actualDelivery : null,
//       };

//       await purchaseOrderService.updateOrderStatus(order.id, updateData);
//       onUpdate();
//     } catch (err) {
//       setError(err.response?.data?.error || 'Error updating status');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-lg max-w-md w-full">
//         <div className="p-6 border-b border-gray-200 flex justify-between items-center">
//           <h2 className="text-xl font-bold text-gray-900">Update Order Status</h2>
//           <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
//             <X className="w-6 h-6" />
//           </button>
//         </div>

//         <form onSubmit={handleSubmit} className="p-6 space-y-4">

//           {error && (
//             <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
//               {error}
//             </div>
//           )}

//           <div className="bg-gray-50 rounded-lg p-4">
//             <p className="text-sm text-gray-600">Order #{order.id}</p>
//             <p className="text-lg font-semibold text-gray-900">{order.productName}</p>
//             <p className="text-sm text-gray-600 mt-1">Quantity: {order.quantity}</p>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               New Status *
//             </label>

//             <select
//               value={status}
//               onChange={(e) => setStatus(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
//               required
//             >
//               {statusOptions.map((opt) => (
//                 <option key={opt} value={opt}>
//                   {opt.replace("_", " ")}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {status === 'DELIVERED' && (
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Actual Delivery Date
//               </label>
//               <input
//                 type="date"
//                 value={actualDelivery}
//                 onChange={(e) => setActualDelivery(e.target.value)}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
//               />
//             </div>
//           )}

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Notes
//             </label>
//             <textarea
//               value={notes}
//               onChange={(e) => setNotes(e.target.value)}
//               rows="3"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
//               placeholder="Add notes about this status change..."
//             />
//           </div>

//           <div className="flex space-x-3 pt-4">
//             <button
//               type="button"
//               onClick={onClose}
//               className="flex-1 px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={loading}
//               className="flex-1 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition disabled:opacity-50 flex items-center justify-center space-x-2"
//             >
//               {loading ? (
//                 <span>Updating...</span>
//               ) : (
//                 <>
//                   <CheckCircle className="w-5 h-5" />
//                   <span>Update Status</span>
//                 </>
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default POStatusModal;







import React, { useState, useContext } from 'react';
import { X, CheckCircle } from 'lucide-react';
import { purchaseOrderService } from '../../services/purchaseOrderService';
import { AuthContext } from '../../context/AuthContext';

const POStatusModal = ({ order, onClose, onUpdate }) => {
  const { user } = useContext(AuthContext);

  const isAdmin = user.role === "ADMIN" || user.role === "ROLE_ADMIN";
  const isManager = user.role === "MANAGER" || user.role === "ROLE_MANAGER";
  const isVendor = user.role === "VENDOR" || user.role === "ROLE_VENDOR";

  const [status, setStatus] = useState(order.status);
  const [actualDelivery, setActualDelivery] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // =====================================
  // ✔ ROLE-BASED STATUS OPTIONS
  // =====================================
  let statusOptions = [];

  if (isVendor) {
    statusOptions = ["APPROVED", "DISPATCHED", "DELIVERED"];
  }
  else if (isManager) {
    statusOptions = ["RECEIVED", "CANCELLED"];
  }
  else if (isAdmin) {
    statusOptions = [
      "PENDING",
      "APPROVED",
      "DISPATCHED",
      "DELIVERED",
      "RECEIVED",
      "CANCELLED"
    ];
  }

  // =====================================
  // ✔ SUBMIT STATUS UPDATE
  // =====================================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const updateData = {
        status,
        notes: notes || null,
        actualDelivery:
          status === "DELIVERED" && actualDelivery ? actualDelivery : null,
      };

      await purchaseOrderService.updateOrderStatus(order.id, updateData);
      onUpdate();
    } catch (err) {
      setError(err.response?.data?.error || "Error updating status");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">Update Order Status</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600">Order #{order.id}</p>
            <p className="text-lg font-semibold text-gray-900">{order.productName}</p>
            <p className="text-sm text-gray-600 mt-1">Quantity: {order.quantity}</p>
          </div>

          {/* STATUS DROPDOWN */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Status *
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            >
              {statusOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* DELIVERY DATE FOR DELIVERED */}
          {status === "DELIVERED" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Actual Delivery Date
              </label>
              <input
                type="date"
                value={actualDelivery}
                onChange={(e) => setActualDelivery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="Add notes..."
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-2 border border-gray-300 rounded-lg text-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-2 bg-indigo-600 text-white rounded-lg flex items-center justify-center"
            >
              {loading ? (
                "Updating..."
              ) : (
                <>
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Update Status
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default POStatusModal;
