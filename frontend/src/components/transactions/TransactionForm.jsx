// import React, { useEffect, useState } from "react";
// import LoadingSpinner from "../common/LoadingSpinner";

// const TransactionForm = ({ onSuccess }) => {
//   const [products, setProducts] = useState([]);
//   const [form, setForm] = useState({
//     productId: "",
//     type: "IN",
//     quantity: "",
//   });

//   const [stock, setStock] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [error, setError] = useState("");
//   const [message, setMessage] = useState("");

//   // Load products list
//   useEffect(() => {
//     fetch("/api/products")
//       .then((res) => res.json())
//       .then((data) => {
//         setProducts(data);
//         setLoading(false);
//       })
//       .catch(() => {
//         setError("Error loading products");
//         setLoading(false);
//       });
//   }, []);

//   // Load stock of selected product
//   useEffect(() => {
//     if (!form.productId) return;

//     fetch(`/api/products/${form.productId}`)
//       .then((res) => res.json())
//       .then((data) => setStock(data.stock))
//       .catch(() => setStock(null));
//   }, [form.productId]);

//   const handleChange = (key, value) => {
//     setForm((prev) => ({ ...prev, [key]: value }));
//     setError("");
//     setMessage("");
//   };

//   const validate = () => {
//     if (!form.productId) {
//       setError("Please select a product");
//       return false;
//     }

//     if (!form.quantity || form.quantity <= 0) {
//       setError("Quantity must be greater than 0");
//       return false;
//     }

//     if (form.type === "OUT" && form.quantity > stock) {
//       setError("Cannot remove more than available stock");
//       return false;
//     }

//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validate()) return;

//     setSaving(true);

//     try {
//       const res = await fetch("/api/transactions", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });

//       if (res.ok) {
//         setMessage("Transaction added successfully");
//         setForm({ productId: "", type: "IN", quantity: "" });
//         setStock(null);
//         onSuccess?.();
//       } else {
//         setError("Failed to save transaction");
//       }
//     } catch (err) {
//       setError("Server error");
//     }

//     setSaving(false);
//   };

//   if (loading) return <LoadingSpinner />;

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="bg-white p-6 rounded-lg shadow-md max-w-xl"
//     >
//       <h2 className="text-lg font-semibold text-gray-900 mb-4">
//         Add Transaction
//       </h2>

//       {error && (
//         <p className="text-red-600 text-sm mb-3 border border-red-300 p-2 rounded">
//           {error}
//         </p>
//       )}

//       {message && (
//         <p className="text-green-600 text-sm mb-3 border border-green-300 p-2 rounded">
//           {message}
//         </p>
//       )}

//       {/* Product selection */}
//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-700">
//           Product
//         </label>
//         <select
//           value={form.productId}
//           onChange={(e) => handleChange("productId", e.target.value)}
//           className="w-full p-2 mt-1 border rounded"
//         >
//           <option value="">Select a product...</option>
//           {products.map((p) => (
//             <option key={p.id} value={p.id}>
//               {p.name}
//             </option>
//           ))}
//         </select>

//         {stock !== null && (
//           <p className="text-xs text-gray-600 mt-1">
//             Available stock: <strong>{stock}</strong>
//           </p>
//         )}
//       </div>

//       {/* Transaction type */}
//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-700">
//           Transaction Type
//         </label>
//         <select
//           value={form.type}
//           onChange={(e) => handleChange("type", e.target.value)}
//           className="w-full p-2 mt-1 border rounded"
//         >
//           <option value="IN">IN (Add Stock)</option>
//           <option value="OUT">OUT (Remove Stock)</option>
//         </select>
//       </div>

//       {/* Quantity */}
//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-700">
//           Quantity
//         </label>
//         <input
//           type="number"
//           value={form.quantity}
//           onChange={(e) => handleChange("quantity", parseInt(e.target.value))}
//           className="w-full p-2 mt-1 border rounded"
//         />
//       </div>

//       <button
//         type="submit"
//         disabled={saving}
//         className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
//       >
//         {saving ? "Saving..." : "Add Transaction"}
//       </button>
//     </form>
//   );
// };

// export default TransactionForm;

import React, { useEffect, useState } from "react";
import LoadingSpinner from "../common/LoadingSpinner";

const TransactionForm = ({ onSuccess }) => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    productId: "",
    type: "IN",
    quantity: "",
  });

  const [stock, setStock] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Load products list
  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Error loading products");
        setLoading(false);
      });
  }, []);

  // Load stock of selected product
  useEffect(() => {
    if (!form.productId) return;

    fetch(`/api/products/${form.productId}`)
      .then((res) => res.json())
      .then((data) => setStock(data.stock))
      .catch(() => setStock(null));
  }, [form.productId]);

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setError("");
    setMessage("");
  };

  const validate = () => {
    if (!form.productId) {
      setError("Please select a product");
      return false;
    }

    if (!form.quantity || form.quantity <= 0) {
      setError("Quantity must be greater than 0");
      return false;
    }

    if (form.type === "OUT" && form.quantity > stock) {
      setError("Cannot remove more than available stock");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setSaving(true);

    try {
      const res = await fetch("/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setMessage("Transaction added successfully");
        setForm({ productId: "", type: "IN", quantity: "" });
        setStock(null);
        onSuccess?.();
      } else {
        setError("Failed to save transaction");
      }
    } catch (err) {
      setError("Server error");
    }

    setSaving(false);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#1A2234] border border-[#2A3248] p-6 rounded-lg shadow-lg max-w-xl text-[#D2C1B6]"
    >
      <h2 className="text-xl font-bold text-white mb-4">
        Add Transaction
      </h2>

      {/* Error */}
      {error && (
        <p className="text-red-400 text-sm mb-3 bg-[#3a1f1f] border border-red-800 p-2 rounded">
          {error}
        </p>
      )}

      {/* Success */}
      {message && (
        <p className="text-green-400 text-sm mb-3 bg-[#1f3a2a] border border-green-800 p-2 rounded">
          {message}
        </p>
      )}

      {/* Product Dropdown */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Product</label>
        <select
          value={form.productId}
          onChange={(e) => handleChange("productId", e.target.value)}
          className="w-full p-2 mt-1 bg-[#0D1322] border border-[#2A3248] rounded text-[#D2C1B6] focus:ring-2 focus:ring-blue-600"
        >
          <option value="">Select a product...</option>
          {products.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>

        {stock !== null && (
          <p className="text-xs text-[#9BA8BF] mt-1">
            Available stock: <strong className="text-white">{stock}</strong>
          </p>
        )}
      </div>

      {/* Transaction Type */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Transaction Type</label>
        <select
          value={form.type}
          onChange={(e) => handleChange("type", e.target.value)}
          className="w-full p-2 mt-1 bg-[#0D1322] border border-[#2A3248] rounded text-[#D2C1B6] focus:ring-2 focus:ring-blue-600"
        >
          <option value="IN">IN (Add Stock)</option>
          <option value="OUT">OUT (Remove Stock)</option>
        </select>
      </div>

      {/* Quantity */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Quantity</label>
        <input
          type="number"
          value={form.quantity}
          onChange={(e) => handleChange("quantity", parseInt(e.target.value))}
          className="w-full p-2 mt-1 bg-[#0D1322] border border-[#2A3248] rounded text-[#D2C1B6] focus:ring-2 focus:ring-blue-600"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={saving}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition disabled:opacity-50"
      >
        {saving ? "Saving..." : "Add Transaction"}
      </button>
    </form>
  );
};

export default TransactionForm;
