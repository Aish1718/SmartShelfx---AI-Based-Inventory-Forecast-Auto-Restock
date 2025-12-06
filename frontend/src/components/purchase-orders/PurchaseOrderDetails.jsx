import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { purchaseOrderService } from "../../services/purchaseOrderService";

import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const PurchaseOrderDetails = () => {
  const { id } = useParams();
  const [po, setPo] = useState(null);
  const { user } = useContext(AuthContext);
  const isVendor = user?.role === "VENDOR";



  useEffect(() => {
    purchaseOrderService.getPurchaseOrderById(id).then((res) => {
        console.log("PO DETAILS:", res.data);   // 👈 IMPORTANT
        setPo(res.data);
    });

  }, [id]);

  if (!po) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Purchase Order #{po.id}</h2>

      {/* SUMMARY */}
      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <p><strong>Vendor:</strong> {po.vendor?.name}</p>
        <p><strong>Status:</strong> {po.status}</p>
        <p><strong>Created:</strong> {po.createdAt}</p>
      </div>

      {/* ITEMS */}
      <h3 className="text-xl font-semibold mb-2">Items</h3>
      <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Product</th>
            <th className="px-4 py-2 text-left">Quantity</th>
            <th className="px-4 py-2 text-left">Price</th>
          </tr>
        </thead>
        <tbody>
            <tr>
              <td className="px-4 py-2">{po.productName}</td>
              <td className="px-4 py-2">{po.quantity}</td>
              <td className="px-4 py-2">${po.totalCost}</td>
            </tr>
        </tbody>
      </table>

      {/* STATUS HISTORY */}
      {po.statusHistory && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Status Timeline</h3>
          <ul className="list-disc ml-6">
            {po.statusHistory.map((s, index) => (
              <li key={index}>{s.status} — {s.timestamp}</li>
            ))}
          </ul>
        </div>
      )}

      {isVendor && (
        <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">Update Status</h3>

            <button className="bg-blue-600 text-white px-4 py-2 rounded mr-2">
            Mark as Dispatched
            </button>

            <button className="bg-green-600 text-white px-4 py-2 rounded">
            Mark as Delivered
            </button>
        </div>
        )}

    </div>
  );




};

export default PurchaseOrderDetails;
