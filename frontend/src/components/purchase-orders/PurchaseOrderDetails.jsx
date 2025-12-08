// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { purchaseOrderService } from "../../services/purchaseOrderService";

// import { useContext } from "react";
// import { AuthContext } from "../../context/AuthContext";

// const PurchaseOrderDetails = () => {
//   const { id } = useParams();
//   const [po, setPo] = useState(null);
//   const { user } = useContext(AuthContext);
//   const isVendor = user?.role === "VENDOR";



//   useEffect(() => {
//     purchaseOrderService.getPurchaseOrderById(id).then((res) => {
//         console.log("PO DETAILS:", res.data);   // 👈 IMPORTANT
//         setPo(res.data);
//     });

//   }, [id]);

//   if (!po) return <div className="p-6">Loading...</div>;

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Purchase Order #{po.id}</h2>

//       {/* SUMMARY */}
//       <div className="bg-white shadow rounded-lg p-4 mb-6">
//         <p><strong>Vendor:</strong> {po.vendor?.name}</p>
//         <p><strong>Status:</strong> {po.status}</p>
//         <p><strong>Created:</strong> {po.createdAt}</p>
//       </div>

//       {/* ITEMS */}
//       <h3 className="text-xl font-semibold mb-2">Items</h3>
//       <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="px-4 py-2 text-left">Product</th>
//             <th className="px-4 py-2 text-left">Quantity</th>
//             <th className="px-4 py-2 text-left">Price</th>
//           </tr>
//         </thead>
//         <tbody>
//             <tr>
//               <td className="px-4 py-2">{po.productName}</td>
//               <td className="px-4 py-2">{po.quantity}</td>
//               <td className="px-4 py-2">${po.totalCost}</td>
//             </tr>
//         </tbody>
//       </table>

//       {/* STATUS HISTORY */}
//       {po.statusHistory && (
//         <div className="mt-6">
//           <h3 className="text-xl font-semibold mb-2">Status Timeline</h3>
//           <ul className="list-disc ml-6">
//             {po.statusHistory.map((s, index) => (
//               <li key={index}>{s.status} — {s.timestamp}</li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {isVendor && (
//         <div className="mt-6">
//             <h3 className="text-xl font-semibold mb-2">Update Status</h3>

//             <button className="bg-blue-600 text-white px-4 py-2 rounded mr-2">
//             Mark as Dispatched
//             </button>

//             <button className="bg-green-600 text-white px-4 py-2 rounded">
//             Mark as Delivered
//             </button>
//         </div>
//         )}

//     </div>
//   );




// };

// export default PurchaseOrderDetails;


import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { purchaseOrderService } from "../../services/purchaseOrderService";
import { AuthContext } from "../../context/AuthContext";

const PurchaseOrderDetails = () => {
  const { id } = useParams();
  const [po, setPo] = useState(null);
  const { user } = useContext(AuthContext);

  const isVendor = user?.role === "VENDOR" || user?.role === "ROLE_VENDOR";

  useEffect(() => {
    purchaseOrderService.getPurchaseOrderById(id).then((res) => {
      setPo(res.data);
    });
  }, [id]);

  if (!po)
    return (
      <div className="p-6 text-center text-[#D2C1B6] bg-[#0D1322] h-screen">
        Loading...
      </div>
    );

  return (
    <div className="p-6 bg-[#0D1322] min-h-screen text-[#D2C1B6]">
      {/* HEADER */}
      <h2 className="text-3xl font-bold mb-6 text-white">
        Purchase Order #{po.id}
      </h2>

      {/* SUMMARY CARD */}
      <div className="bg-[#1A2234] border border-[#2A3248] rounded-lg p-6 mb-6 shadow-lg">
        <p className="text-sm text-blue-300">
          <strong className="text-[#D2C1B6]">Vendor:</strong> {po.vendor?.name}
        </p>
        <p className="text-sm text-blue-300 mt-1">
          <strong className="text-[#D2C1B6]">Status:</strong> {po.status}
        </p>
        <p className="text-sm text-blue-300 mt-1">
          <strong className="text-[#D2C1B6]">Created:</strong> {po.createdAt}
        </p>
      </div>

      {/* ITEMS TABLE */}
      <h3 className="text-2xl font-semibold mb-3 text-white">Items</h3>

      <div className="overflow-hidden rounded-lg shadow-md border border-[#2A3248]">
        <table className="min-w-full bg-[#1A2234] text-[#D2C1B6]">
          <thead className="bg-[#0D1322] border-b border-[#2A3248]">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold">
                Product
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold">
                Quantity
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold">
                Price
              </th>
            </tr>
          </thead>

          <tbody>
            <tr className="hover:bg-[#273047] transition">
              <td className="px-4 py-3">{po.productName}</td>
              <td className="px-4 py-3">{po.quantity}</td>
              <td className="px-4 py-3 text-green-300">${po.totalCost}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* STATUS HISTORY */}
      {po.statusHistory && (
        <div className="mt-8">
          <h3 className="text-2xl font-semibold mb-3 text-white">
            Status Timeline
          </h3>

          <ul className="space-y-2 border-l-2 border-blue-600 pl-4">
            {po.statusHistory.map((s, index) => (
              <li
                key={index}
                className="text-sm text-blue-300 flex flex-col bg-[#1A2234] border border-[#2A3248] rounded-lg p-3"
              >
                <span className="font-semibold text-white">{s.status}</span>
                <span className="text-xs text-[#9BA8BF] mt-1">
                  {s.timestamp}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* VENDOR CONTROLS */}
      {isVendor && (
        <div className="mt-10">
          <h3 className="text-2xl font-semibold mb-3 text-white">
            Update Status
          </h3>

          <div className="flex space-x-4">
            <button className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-2 rounded-lg shadow-md transition">
              Mark as Dispatched
            </button>

            <button className="bg-green-700 hover:bg-green-800 text-white px-5 py-2 rounded-lg shadow-md transition">
              Mark as Delivered
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PurchaseOrderDetails;
