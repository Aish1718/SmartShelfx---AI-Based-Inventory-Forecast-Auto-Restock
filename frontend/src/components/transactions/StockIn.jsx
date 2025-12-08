// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { ArrowDownCircle, Package, Search } from 'lucide-react';
// import { transactionService } from '../../services/transactionService';
// import { productService } from '../../services/productService';

// const StockIn = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     productId: '',
//     quantity: '',
//     notes: '',
//     referenceNumber: '',
//   });
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   useEffect(() => {
//     if (searchTerm) {
//       const filtered = products.filter(
//         (p) =>
//           p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           p.sku.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//       setFilteredProducts(filtered);
//     } else {
//       setFilteredProducts(products);
//     }
//   }, [searchTerm, products]);

//   const fetchProducts = async () => {
//     try {
//       const response = await productService.getAllProducts();
//       setProducts(response.data);
//       setFilteredProducts(response.data);
//     } catch (err) {
//       setError('Error fetching products');
//     }
//   };

//   const handleProductSelect = (product) => {
//     setSelectedProduct(product);
//     setFormData({ ...formData, productId: product.id });
//     setSearchTerm('');
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');
//     setLoading(true);

//     try {
//       const transactionData = {
//         productId: formData.productId,
//         quantity: parseInt(formData.quantity),
//         type: 'IN',
//         notes: formData.notes,
//         referenceNumber: formData.referenceNumber,
//       };

//       const response = await transactionService.createTransaction(transactionData);
//       setSuccess(response.data.message);

//       // Reset form
//       setFormData({
//         productId: '',
//         quantity: '',
//         notes: '',
//         referenceNumber: '',
//       });
//       setSelectedProduct(null);

//       // Redirect to transaction history after 2 seconds
//       setTimeout(() => {
//         navigate('/transactions');
//       }, 2000);
//     } catch (err) {
//       setError(err.response?.data?.error || 'Error processing stock-in transaction');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <div className="mb-6">
//         <div className="flex items-center space-x-3 mb-2">
//           <div className="bg-green-100 p-3 rounded-lg">
//             <ArrowDownCircle className="w-8 h-8 text-green-600" />
//           </div>
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900">Stock In</h1>
//             <p className="text-gray-600">Record incoming shipments and deliveries</p>
//           </div>
//         </div>
//       </div>

//       {error && (
//         <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
//           {error}
//         </div>
//       )}

//       {success && (
//         <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-600">
//           {success}
//         </div>
//       )}

//       <div className="bg-white rounded-lg shadow-sm p-6">
//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Product Selection */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Select Product *
//             </label>
//             {selectedProduct ? (
//               <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
//                 <div className="flex items-center space-x-3">
//                   <Package className="w-8 h-8 text-green-600" />
//                   <div>
//                     <p className="font-semibold text-gray-900">{selectedProduct.name}</p>
//                     <p className="text-sm text-gray-600">SKU: {selectedProduct.sku}</p>
//                     <p className="text-sm text-gray-600">
//                       Current Stock: <span className="font-semibold">{selectedProduct.currentStock}</span>
//                     </p>
//                   </div>
//                 </div>
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setSelectedProduct(null);
//                     setFormData({ ...formData, productId: '' });
//                   }}
//                   className="text-red-600 hover:text-red-700 text-sm font-medium"
//                 >
//                   Change
//                 </button>
//               </div>
//             ) : (
//               <div>
//                 <div className="relative">
//                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                   <input
//                     type="text"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     placeholder="Search by product name or SKU..."
//                     className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
//                   />
//                 </div>
//                 {searchTerm && filteredProducts.length > 0 && (
//                   <div className="mt-2 max-h-60 overflow-y-auto border border-gray-200 rounded-lg">
//                     {filteredProducts.map((product) => (
//                       <div
//                         key={product.id}
//                         onClick={() => handleProductSelect(product)}
//                         className="p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
//                       >
//                         <p className="font-medium text-gray-900">{product.name}</p>
//                         <p className="text-sm text-gray-600">
//                           SKU: {product.sku} | Stock: {product.currentStock}
//                         </p>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>

//           {/* Quantity */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Quantity *
//             </label>
//             <input
//               type="number"
//               name="quantity"
//               value={formData.quantity}
//               onChange={handleChange}
//               min="1"
//               required
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
//               placeholder="Enter quantity to add"
//             />
//           </div>

//           {/* Reference Number */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Reference Number
//             </label>
//             <input
//               type="text"
//               name="referenceNumber"
//               value={formData.referenceNumber}
//               onChange={handleChange}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
//               placeholder="PO Number, Invoice Number, etc."
//             />
//           </div>

//           {/* Notes */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Notes
//             </label>
//             <textarea
//               name="notes"
//               value={formData.notes}
//               onChange={handleChange}
//               rows="3"
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
//               placeholder="Additional notes about this transaction..."
//             />
//           </div>

//           {/* New Stock Preview */}
//           {selectedProduct && formData.quantity && (
//             <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
//               <p className="text-sm text-blue-800">
//                 <span className="font-semibold">Stock Update Preview:</span>
//                 <br />
//                 Current Stock: {selectedProduct.currentStock} → New Stock:{' '}
//                 {selectedProduct.currentStock + parseInt(formData.quantity)}
//               </p>
//             </div>
//           )}

//           {/* Action Buttons */}
//           <div className="flex space-x-3 pt-4 border-t">
//             <button
//               type="button"
//               onClick={() => navigate('/transactions')}
//               className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition font-medium"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={loading || !selectedProduct || !formData.quantity}
//               className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {loading ? 'Processing...' : 'Record Stock In'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default StockIn;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowDownCircle, Package, Search } from 'lucide-react';
import { transactionService } from '../../services/transactionService';
import { productService } from '../../services/productService';

const StockIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    productId: '',
    quantity: '',
    notes: '',
    referenceNumber: '',
  });

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      setFilteredProducts(
        products.filter(
          (p) =>
            p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.sku.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredProducts(products);
    }
  }, [searchTerm, products]);

  const fetchProducts = async () => {
    try {
      const response = await productService.getAllProducts();
      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (err) {
      setError('Error fetching products');
    }
  };

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setFormData({ ...formData, productId: product.id });
    setSearchTerm('');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const transactionData = {
        productId: formData.productId,
        quantity: parseInt(formData.quantity),
        type: 'IN',
        notes: formData.notes,
        referenceNumber: formData.referenceNumber,
      };

      const response = await transactionService.createTransaction(transactionData);
      setSuccess(response.data.message);

      setFormData({
        productId: '',
        quantity: '',
        notes: '',
        referenceNumber: '',
      });
      setSelectedProduct(null);

      setTimeout(() => navigate('/transactions'), 2000);
    } catch (err) {
      setError(err.response?.data?.error || 'Error processing stock-in transaction');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto text-[#D2C1B6]">

      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-[#0D1322] p-3 rounded-lg border border-[#2A3248]">
          <ArrowDownCircle className="w-8 h-8 text-green-400" />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-white">Stock In</h1>
          <p className="text-[#9BA8BF]">Record incoming shipments and deliveries</p>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 p-4 bg-[#3a1f1f] border border-red-700 rounded-lg text-red-400">
          {error}
        </div>
      )}

      {/* Success */}
      {success && (
        <div className="mb-4 p-4 bg-[#1f3a2a] border border-green-700 rounded-lg text-green-400">
          {success}
        </div>
      )}

      {/* Container */}
      <div className="bg-[#1A2234] border border-[#2A3248] rounded-lg p-6 shadow-lg">

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* PRODUCT SELECT */}
          <div>
            <label className="block text-sm font-medium mb-2">Select Product *</label>

            {selectedProduct ? (
              <div className="flex items-center justify-between p-4 bg-[#102618] border border-green-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Package className="w-8 h-8 text-green-400" />

                  <div>
                    <p className="font-semibold text-white">{selectedProduct.name}</p>
                    <p className="text-sm text-[#9BA8BF]">SKU: {selectedProduct.sku}</p>
                    <p className="text-sm text-[#9BA8BF]">
                      Current Stock: <span className="font-semibold">{selectedProduct.currentStock}</span>
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedProduct(null);
                    setFormData({ ...formData, productId: '' });
                  }}
                  className="text-red-400 hover:text-red-300 text-sm font-medium"
                >
                  Change
                </button>
              </div>
            ) : (
              <div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by product name or SKU..."
                    className="w-full pl-10 pr-4 py-3 bg-[#0D1322] border border-[#2A3248] rounded-lg text-[#D2C1B6] focus:ring-2 focus:ring-green-500"
                  />
                </div>

                {searchTerm && filteredProducts.length > 0 && (
                  <div className="mt-2 max-h-60 overflow-y-auto border border-[#2A3248] rounded-lg bg-[#0D1322]">
                    {filteredProducts.map((product) => (
                      <div
                        key={product.id}
                        onClick={() => handleProductSelect(product)}
                        className="p-3 hover:bg-[#1A2234] cursor-pointer border-b border-[#2A3248]"
                      >
                        <p className="font-medium text-white">{product.name}</p>
                        <p className="text-sm text-[#9BA8BF]">
                          SKU: {product.sku} | Stock: {product.currentStock}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-medium mb-2">Quantity *</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              min="1"
              required
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#0D1322] border border-[#2A3248] rounded-lg text-[#D2C1B6] focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Reference Number */}
          <div>
            <label className="block text-sm font-medium mb-2">Reference Number</label>
            <input
              type="text"
              name="referenceNumber"
              value={formData.referenceNumber}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#0D1322] border border-[#2A3248] rounded-lg text-[#D2C1B6] focus:ring-2 focus:ring-green-500"
              placeholder="PO Number, Invoice Number, etc."
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium mb-2">Notes</label>
            <textarea
              name="notes"
              rows="3"
              value={formData.notes}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#0D1322] border border-[#2A3248] rounded-lg text-[#D2C1B6] focus:ring-2 focus:ring-green-500"
              placeholder="Additional notes..."
            />
          </div>

          {/* Stock Preview */}
          {selectedProduct && formData.quantity && (
            <div className="p-4 bg-[#0F1C30] border border-blue-700 rounded-lg">
              <p className="text-sm text-blue-300">
                <strong>Stock Update Preview:</strong><br />
                Current: {selectedProduct.currentStock} → New Stock:{" "}
                {selectedProduct.currentStock + parseInt(formData.quantity)}
              </p>
            </div>
          )}

          {/* Buttons */}
          <div className="flex space-x-3 pt-4 border-t border-[#2A3248]">
            <button
              type="button"
              onClick={() => navigate('/transactions')}
              className="flex-1 py-3 border border-[#2A3248] rounded-lg text-[#D2C1B6] hover:bg-[#262F45]"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading || !selectedProduct || !formData.quantity}
              className="flex-1 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? "Processing..." : "Record Stock In"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default StockIn;
