import React, { useState, useEffect } from 'react';
import { X, ShoppingCart } from 'lucide-react';
import { purchaseOrderService } from '../../services/purchaseOrderService';
import { productService } from '../../services/productService';
import api from '../../services/api';

const PurchaseOrderForm = ({ onClose, onSubmit, prefilledProduct = null }) => {
  const [formData, setFormData] = useState({
    productId: prefilledProduct?.productId || '',
    vendorId: prefilledProduct?.vendorId || '',
    quantity: prefilledProduct?.recommendedQuantity || '',
    expectedDelivery: '',
    notes: prefilledProduct?.reason || '',
  });
  const [products, setProducts] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProducts();
    fetchVendors();

    // Set default delivery date (7 days from now)
    const defaultDate = new Date();
    defaultDate.setDate(defaultDate.getDate() + 7);
    setFormData(prev => ({
      ...prev,
      expectedDelivery: defaultDate.toISOString().split('T')[0]
    }));
  }, []);

  useEffect(() => {
    if (formData.productId) {
      const product = products.find(p => p.id === parseInt(formData.productId));
      setSelectedProduct(product);

      // Auto-select vendor if product has one
      if (product?.vendor?.id && !formData.vendorId) {
        setFormData(prev => ({
          ...prev,
          vendorId: product.vendor.id
        }));
      }
    }
  }, [formData.productId, products]);

  const fetchProducts = async () => {
    try {
      const response = await productService.getAllProducts();
      setProducts(response.data);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  const fetchVendors = async () => {
    try {
      const response = await api.get('/users/vendors');
      setVendors(response.data);
    } catch (err) {
      console.error('Error fetching vendors:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const orderData = {
        productId: parseInt(formData.productId),
        vendorId: parseInt(formData.vendorId),
        quantity: parseInt(formData.quantity),
        expectedDelivery: formData.expectedDelivery,
        notes: formData.notes,
        isAiGenerated: false,
      };

      await purchaseOrderService.createPurchaseOrder(orderData);
      onSubmit();
    } catch (err) {
      setError(err.response?.data?.error || 'Error creating purchase order');
    } finally {
      setLoading(false);
    }
  };

  const calculateTotalCost = () => {
    if (selectedProduct && formData.quantity) {
      return (selectedProduct.price * parseInt(formData.quantity)).toFixed(2);
    }
    return '0.00';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
            <ShoppingCart className="w-6 h-6 text-indigo-600" />
            <span>Create Purchase Order</span>
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
              {error}
            </div>
          )}

          {/* Product Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product *
            </label>
            <select
              name="productId"
              value={formData.productId}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            >
              <option value="">Select a product</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name} (SKU: {product.sku}) - Stock: {product.currentStock}
                </option>
              ))}
            </select>
          </div>

          {/* Product Info Card */}
          {selectedProduct && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-blue-700 font-medium">Current Stock</p>
                  <p className="text-blue-900 text-lg font-bold">
                    {selectedProduct.currentStock}
                  </p>
                </div>
                <div>
                  <p className="text-blue-700 font-medium">Reorder Level</p>
                  <p className="text-blue-900 text-lg font-bold">
                    {selectedProduct.reorderLevel}
                  </p>
                </div>
                <div>
                  <p className="text-blue-700 font-medium">Unit Price</p>
                  <p className="text-blue-900 text-lg font-bold">
                    ${selectedProduct.price?.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-blue-700 font-medium">Category</p>
                  <p className="text-blue-900 text-lg font-bold">
                    {selectedProduct.category}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Vendor Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Vendor *
            </label>
            <select
              name="vendorId"
              value={formData.vendorId}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            >
              <option value="">Select a vendor</option>
              {vendors.map((vendor) => (
                <option key={vendor.id} value={vendor.id}>
                  {vendor.name} ({vendor.email})
                </option>
              ))}
            </select>
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quantity *
            </label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              min="1"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter quantity to order"
              required
            />
            {selectedProduct && formData.quantity && (
              <p className="text-sm text-gray-600 mt-1">
                New stock after delivery: {selectedProduct.currentStock + parseInt(formData.quantity)}
              </p>
            )}
          </div>

          {/* Expected Delivery Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expected Delivery Date *
            </label>
            <input
              type="date"
              name="expectedDelivery"
              value={formData.expectedDelivery}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder="Add any additional notes..."
            />
          </div>

          {/* Total Cost Preview */}
          {selectedProduct && formData.quantity && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="text-green-700 font-medium">Estimated Total Cost:</span>
                <span className="text-green-900 text-2xl font-bold">
                  ${calculateTotalCost()}
                </span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating Order...' : 'Create Purchase Order'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PurchaseOrderForm;