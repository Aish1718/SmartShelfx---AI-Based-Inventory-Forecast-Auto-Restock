import React, { useEffect, useState } from "react";

const RecentActivity = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch("/api/transactions/recent")
      .then((res) => res.json())
      .then((data) => setTransactions(data))
      .catch((err) => console.error("Error loading recent transactions", err));
  }, []);

  return (
    <div className="bg-white p-5 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Recent Activity
      </h2>

      {transactions.length === 0 ? (
        <p className="text-gray-500 text-sm">No recent transactions.</p>
      ) : (
        <ul className="space-y-3">
          {transactions.map((tx) => (
            <li
              key={tx.id}
              className="border-b pb-2 flex justify-between items-center"
            >
              <div>
                <p className="font-medium">
                  {tx.productName || "Product"} —{" "}
                  <span
                    className={`font-semibold ${
                      tx.type === "IN" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {tx.type}
                  </span>
                </p>
                <p className="text-sm text-gray-600">
                  Qty: {tx.quantity} |{" "}
                  {new Date(tx.createdAt).toLocaleString()}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecentActivity;
