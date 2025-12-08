// import React, { useState, useEffect } from 'react';
// import { X } from 'lucide-react';
// import { productService } from '../../services/productService';
// import api from '../../services/api';

// const ProductForm = ({ product, onClose, onSubmit }) => {
//   const [formData, setFormData] = useState({
//     name: '',
//     sku: '',
//     category: '',
//     currentStock: 0,
//     reorderLevel: 10,
//     price: 0,
//     description: '',
//     vendorId: '',
//   });
//   const [vendors, setVendors] = useState([]);
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [submitError, setSubmitError] = useState('');

//   useEffect(() => {
//     fetchVendors();
//     if (product) {
//       setFormData({
//         name: product.name || '',
//         sku: product.sku || '',
//         category: product.category || '',
//         currentStock: product.currentStock || 0,
//         reorderLevel: product.reorderLevel || 10,
//         price: product.price || 0,
//         description: product.description || '',
//         vendorId: product.vendor?.id || '',
//       });
//     }
//   }, [product]);

//   const fetchVendors = async () => {
//     try {
//       const response = await api.get('/users/vendors');
//       setVendors(response.data);
//     } catch (error) {
//       console.error('Error fetching vendors:', error);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//     // Clear error for this field
//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: '' }));
//     }
//   };

//   const validate = () => {
//     const newErrors = {};

//     if (!formData.name.trim()) newErrors.name = 'Product name is required';
//     if (!formData.sku.trim()) newErrors.sku = 'SKU is required';
//     if (!formData.category.trim()) newErrors.category = 'Category is required';
//     if (formData.currentStock < 0) newErrors.currentStock = 'Stock cannot be negative';
//     if (formData.reorderLevel <= 0) newErrors.reorderLevel = 'Reorder level must be positive';
//     if (formData.price <= 0) newErrors.price = 'Price must be positive';

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSubmitError('');

//     if (!validate()) return;

//     setLoading(true);
//     try {
//       const dataToSubmit = {
//         ...formData,
//         currentStock: parseInt(formData.currentStock),
//         reorderLevel: parseInt(formData.reorderLevel),
//         price: parseFloat(formData.price),
//         vendorId: formData.vendorId ? parseInt(formData.vendorId) : null,
//       };

//       if (product) {
//         await productService.updateProduct(product.id, dataToSubmit);
//       } else {
//         await productService.createProduct(dataToSubmit);
//       }

//       onSubmit();
//     } catch (error) {
//       setSubmitError(error.response?.data?.error || 'Error saving product');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//         <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white">
//           <h2 className="text-2xl font-bold text-gray-900">
//             {product ? 'Edit Product' : 'Add New Product'}
//           </h2>
//           <button
//             onClick={onClose}
//             className="text-gray-400 hover:text-gray-600"
//           >
//             <X className="w-6 h-6" />
//           </button>
//         </div>

//         <form onSubmit={handleSubmit} className="p-6 space-y-4">
//           {submitError && (
//             <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
//               {submitError}
//             </div>
//           )}

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Product Name *
//               </label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 ${
//                   errors.name ? 'border-red-500' : 'border-gray-300'
//                 }`}
//                 placeholder="e.g., Laptop Dell XPS 13"
//               />
//               {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 SKU *
//               </label>
//               <input
//                 type="text"
//                 name="sku"
//                 value={formData.sku}
//                 onChange={handleChange}
//                 disabled={!!product}
//                 className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 ${
//                   errors.sku ? 'border-red-500' : 'border-gray-300'
//                 } ${product ? 'bg-gray-100' : ''}`}
//                 placeholder="e.g., ELEC001"
//               />
//               {errors.sku && <p className="text-red-500 text-xs mt-1">{errors.sku}</p>}
//               {product && <p className="text-xs text-gray-500 mt-1">SKU cannot be changed</p>}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Category *
//               </label>
//               <select
//                 name="category"
//                 value={formData.category}
//                 onChange={handleChange}
//                 className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 ${
//                   errors.category ? 'border-red-500' : 'border-gray-300'
//                 }`}
//               >
//                 <option value="">Select Category</option>
//                 <option value="Electronics">Electronics</option>
//                 <option value="Clothing">Clothing</option>
//                 <option value="Food">Food</option>
//                 <option value="Books">Books</option>
//                 <option value="Furniture">Furniture</option>
//                 <option value="Toys">Toys</option>
//                 <option value="Other">Other</option>
//               </select>
//               {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Vendor
//               </label>
//               <select
//                 name="vendorId"
//                 value={formData.vendorId}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
//               >
//                 <option value="">No Vendor</option>
//                 {vendors.map(vendor => (
//                   <option key={vendor.id} value={vendor.id}>
//                     {vendor.name} ({vendor.email})
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Current Stock *
//               </label>
//               <input
//                 type="number"
//                 name="currentStock"
//                 value={formData.currentStock}
//                 onChange={handleChange}
//                 min="0"
//                 className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 ${
//                   errors.currentStock ? 'border-red-500' : 'border-gray-300'
//                 }`}
//               />
//               {errors.currentStock && <p className="text-red-500 text-xs mt-1">{errors.currentStock}</p>}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Reorder Level *
//               </label>
//               <input
//                 type="number"
//                 name="reorderLevel"
//                 value={formData.reorderLevel}
//                 onChange={handleChange}
//                 min="1"
//                 className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 ${
//                   errors.reorderLevel ? 'border-red-500' : 'border-gray-300'
//                 }`}
//               />
//               {errors.reorderLevel && <p className="text-red-500 text-xs mt-1">{errors.reorderLevel}</p>}
//             </div>

//             <div className="md:col-span-2">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Price ($) *
//               </label>
//               <input
//                 type="number"
//                 name="price"
//                 value={formData.price}
//                 onChange={handleChange}
//                 step="0.01"
//                 min="0.01"
//                 className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 ${
//                   errors.price ? 'border-red-500' : 'border-gray-300'
//                 }`}
//                 placeholder="0.00"
//               />
//               {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
//             </div>

//             <div className="md:col-span-2">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Description
//               </label>
//               <textarea
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//                 rows="3"
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
//                 placeholder="Optional product description..."
//               />
//             </div>
//           </div>

//           <div className="flex justify-end space-x-3 pt-4 border-t">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={loading}
//               className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
//             >
//               {loading ? 'Saving...' : product ? 'Update Product' : 'Create Product'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ProductForm;



// import React, { useState, useEffect } from 'react';
// import { X } from 'lucide-react';
// import { productService } from '../../services/productService';
// import api from '../../services/api';

// const ProductForm = ({ product, onClose, onSubmit }) => {
//   const [formData, setFormData] = useState({
//     name: '',
//     sku: '',
//     category: '',
//     currentStock: 0,
//     reorderLevel: 10,
//     price: 0,
//     description: '',
//     vendorId: '',
//     imageUrl: null,      // existing image url (if editing)
//   });

//   const [imageFile, setImageFile] = useState(null); // selected file
//   const [imagePreview, setImagePreview] = useState(null); // preview src
//   const [vendors, setVendors] = useState([]);
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [submitError, setSubmitError] = useState('');

//   // ADD THIS DEBUG CODE
//   // useEffect(() => {
//   //   const token = localStorage.getItem('token');
//   //   const user = JSON.parse(localStorage.getItem('user'));
//   //   console.log('=== PRODUCT FORM DEBUG ===');
//   //   console.log('Token exists:', !!token);
//   //   if (token) {
//   //     console.log('Token preview:', token.substring(0, 30) + '...');
//   //   }
//   //   console.log('User object:', user);
//   //   console.log('User role:', user?.role);
//   //   console.log('========================');
//   // }, []);


//   useEffect(() => {
//     fetchVendors();
//     if (product) {
//       setFormData({
//         name: product.name || '',
//         sku: product.sku || '',
//         category: product.category || '',
//         currentStock: product.currentStock || 0,
//         reorderLevel: product.reorderLevel || 10,
//         price: product.price || 0,
//         description: product.description || '',
//         vendorId: product.vendor?.id || '',
//         imageUrl: product.imageUrl || null,
//       });

//       // set preview if editing and product has imageUrl
//       if (product.imageUrl) {
//         // If it's a relative URL, prefix with backend URL
//         const imageUrl = product.imageUrl.startsWith('http')
//           ? product.imageUrl
//           : `http://localhost:8080${product.imageUrl}`;
//         setImagePreview(imageUrl);
//       }
//     }
//   }, [product]);

//   const fetchVendors = async () => {
//     try {
//       const response = await api.get('/users/vendors');
//       setVendors(response.data);
//     } catch (error) {
//       console.error('Error fetching vendors:', error);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//     if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
//   };

//   // when user picks a file
//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setImageFile(file);
//     if (file) {
//       setImagePreview(URL.createObjectURL(file));
//     } else {
//       setImagePreview(formData.imageUrl || null);
//     }
//   };

//   const validate = () => {
//     const newErrors = {};
//     if (!formData.name.trim()) newErrors.name = 'Product name is required';
//     if (!formData.sku.trim()) newErrors.sku = 'SKU is required';
//     if (!formData.category.trim()) newErrors.category = 'Category is required';
//     if (formData.currentStock < 0) newErrors.currentStock = 'Stock cannot be negative';
//     if (formData.reorderLevel <= 0) newErrors.reorderLevel = 'Reorder level must be positive';
//     if (formData.price <= 0) newErrors.price = 'Price must be positive';
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // upload image to backend and return URL (or null)
//   const uploadImage = async (file) => {
//     const data = new FormData();
//     data.append('file', file);

//     const res = await api.post('/upload/image', data, {
//       headers: { 'Content-Type': 'multipart/form-data' },
//     });

//     // backend returns { url: "/uploads/<filename>" } per your controller
//     return res.data?.url || null;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSubmitError('');

//     if (!validate()) return;

//     setLoading(true);
//     try {
//       let finalImageUrl = formData.imageUrl || null;

//       // if user selected a new file, upload it
//       if (imageFile) {
//         finalImageUrl = await uploadImage(imageFile);
//       }

//       const dataToSubmit = {
//         name: formData.name,
//         sku: formData.sku,
//         category: formData.category,
//         currentStock: parseInt(formData.currentStock, 10),
//         reorderLevel: parseInt(formData.reorderLevel, 10),
//         price: parseFloat(formData.price),
//         description: formData.description,
//         vendorId: formData.vendorId ? parseInt(formData.vendorId, 10) : null,
//         imageUrl: finalImageUrl,
//       };

//       if (product) {
//         await productService.updateProduct(product.id, dataToSubmit);
//       } else {
//         await productService.createProduct(dataToSubmit);
//       }

//       // reset preview URL object to avoid memory leak
//       if (imagePreview && imageFile) {
//         URL.revokeObjectURL(imagePreview);
//       }

//       // Reset form state
//       setFormData({
//         name: '',
//         sku: '',
//         category: '',
//         currentStock: 0,
//         reorderLevel: 10,
//         price: 0,
//         description: '',
//         vendorId: '',
//         imageUrl: null,
//       });
//       setImageFile(null);
//       setImagePreview(null);
//       setErrors({});

//       onSubmit();
//     } catch (error) {
//       console.error('Product save error:', error);
//       // Handle different error types
//       if (error.response?.data?.message) {
//         // Validation errors from backend
//         const messages = Array.isArray(error.response.data.message)
//           ? error.response.data.message.join(', ')
//           : error.response.data.message;
//         setSubmitError(messages);
//       } else if (error.response?.data?.error) {
//         setSubmitError(error.response.data.error);
//       } else if (error.message) {
//         setSubmitError(error.message);
//       } else {
//         setSubmitError('Failed to save product. Please check your connection and try again.');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//         <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white">
//           <h2 className="text-2xl font-bold text-gray-900">
//             {product ? 'Edit Product' : 'Add New Product'}
//           </h2>
//           <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
//             <X className="w-6 h-6" />
//           </button>
//         </div>

//         <form onSubmit={handleSubmit} className="p-6 space-y-4">
//           {submitError && (
//             <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
//               {submitError}
//             </div>
//           )}

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {/* Product name */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Product Name *</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 ${
//                   errors.name ? 'border-red-500' : 'border-gray-300'
//                 }`}
//                 placeholder="e.g., Laptop Dell XPS 13"
//               />
//               {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
//             </div>

//             {/* SKU */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">SKU *</label>
//               <input
//                 type="text"
//                 name="sku"
//                 value={formData.sku}
//                 onChange={handleChange}
//                 disabled={!!product}
//                 className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 ${
//                   errors.sku ? 'border-red-500' : 'border-gray-300'
//                 } ${product ? 'bg-gray-100' : ''}`}
//                 placeholder="e.g., ELEC001"
//               />
//               {errors.sku && <p className="text-red-500 text-xs mt-1">{errors.sku}</p>}
//               {product && <p className="text-xs text-gray-500 mt-1">SKU cannot be changed</p>}
//             </div>

//             {/* Category */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
//               <select
//                 name="category"
//                 value={formData.category}
//                 onChange={handleChange}
//                 className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 ${
//                   errors.category ? 'border-red-500' : 'border-gray-300'
//                 }`}
//               >
//                 <option value="">Select Category</option>
//                 <option value="Electronics">Electronics</option>
//                 <option value="Clothing">Clothing</option>
//                 <option value="Food">Food</option>
//                 <option value="Books">Books</option>
//                 <option value="Furniture">Furniture</option>
//                 <option value="Toys">Toys</option>
//                 <option value="Other">Other</option>
//               </select>
//               {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
//             </div>

//             {/* Vendor */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Vendor</label>
//               <select
//                 name="vendorId"
//                 value={formData.vendorId}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
//               >
//                 <option value="">No Vendor</option>
//                 {vendors.map(vendor => (
//                   <option key={vendor.id} value={vendor.id}>
//                     {vendor.name} ({vendor.email})
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Current stock */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Current Stock *</label>
//               <input
//                 type="number"
//                 name="currentStock"
//                 value={formData.currentStock}
//                 onChange={handleChange}
//                 min="0"
//                 className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 ${
//                   errors.currentStock ? 'border-red-500' : 'border-gray-300'
//                 }`}
//               />
//               {errors.currentStock && <p className="text-red-500 text-xs mt-1">{errors.currentStock}</p>}
//             </div>

//             {/* Reorder level */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Reorder Level *</label>
//               <input
//                 type="number"
//                 name="reorderLevel"
//                 value={formData.reorderLevel}
//                 onChange={handleChange}
//                 min="1"
//                 className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 ${
//                   errors.reorderLevel ? 'border-red-500' : 'border-gray-300'
//                 }`}
//               />
//               {errors.reorderLevel && <p className="text-red-500 text-xs mt-1">{errors.reorderLevel}</p>}
//             </div>

//             {/* Price */}
//             <div className="md:col-span-2">
//               <label className="block text-sm font-medium text-gray-700 mb-2">Price ($) *</label>
//               <input
//                 type="number"
//                 name="price"
//                 value={formData.price}
//                 onChange={handleChange}
//                 step="0.01"
//                 min="0.01"
//                 className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 ${
//                   errors.price ? 'border-red-500' : 'border-gray-300'
//                 }`}
//                 placeholder="0.00"
//               />
//               {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
//             </div>

//             {/* Description */}
//             <div className="md:col-span-2">
//               <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
//               <textarea
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//                 rows="3"
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
//                 placeholder="Optional product description..."
//               />
//             </div>

//             {/* IMAGE upload field */}
//             <div className="md:col-span-2">
//               <label className="block text-sm font-medium text-gray-700 mb-2">Product Image</label>
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleFileChange}
//                 className="w-full"
//               />
//               {imagePreview && (
//                 <div className="mt-2">
//                   <img
//                     src={imagePreview}
//                     alt="preview"
//                     className="w-32 h-32 rounded object-cover border"
//                     onError={(e) => {
//                       // Fallback if image fails to load
//                       e.target.style.display = 'none';
//                     }}
//                   />
//                 </div>
//               )}
//             </div>

//           </div>

//           <div className="flex justify-end space-x-3 pt-4 border-t">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={loading}
//               className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
//             >
//               {loading ? 'Saving...' : product ? 'Update Product' : 'Create Product'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ProductForm;




import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { productService } from "../../services/productService";
import api from "../../services/api";

const ProductForm = ({ product, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    category: "",
    currentStock: 0,
    reorderLevel: 10,
    price: 0,
    description: "",
    vendorId: "",
    imageUrl: null,
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [vendors, setVendors] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    fetchVendors();
    if (product) {
      setFormData({
        name: product.name || "",
        sku: product.sku || "",
        category: product.category || "",
        currentStock: product.currentStock || 0,
        reorderLevel: product.reorderLevel || 10,
        price: product.price || 0,
        description: product.description || "",
        vendorId: product.vendor?.id || "",
        imageUrl: product.imageUrl || null,
      });

      if (product.imageUrl) {
        const imageUrl = product.imageUrl.startsWith("http")
          ? product.imageUrl
          : `http://localhost:8080${product.imageUrl}`;
        setImagePreview(imageUrl);
      }
    }
  }, [product]);

  const fetchVendors = async () => {
    try {
      const res = await api.get("/users/vendors");
      setVendors(res.data);
    } catch (err) {
      console.error("Error fetching vendors:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setImagePreview(file ? URL.createObjectURL(file) : formData.imageUrl);
  };

  const validate = () => {
    const err = {};
    if (!formData.name.trim()) err.name = "Product name is required";
    if (!formData.sku.trim()) err.sku = "SKU is required";
    if (!formData.category.trim()) err.category = "Category is required";
    if (formData.currentStock < 0) err.currentStock = "Stock cannot be negative";
    if (formData.reorderLevel <= 0) err.reorderLevel = "Reorder level must be positive";
    if (formData.price <= 0) err.price = "Price must be positive";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const uploadImage = async (file) => {
    const data = new FormData();
    data.append("file", file);

    const res = await api.post("/upload/image", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return res.data?.url || null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    if (!validate()) return;

    setLoading(true);
    try {
      let finalImageUrl = formData.imageUrl;

      if (imageFile) {
        finalImageUrl = await uploadImage(imageFile);
      }

      const payload = {
        name: formData.name,
        sku: formData.sku,
        category: formData.category,
        currentStock: Number(formData.currentStock),
        reorderLevel: Number(formData.reorderLevel),
        price: Number(formData.price),
        description: formData.description,
        vendorId: formData.vendorId ? Number(formData.vendorId) : null,
        imageUrl: finalImageUrl,
      };

      if (product) {
        await productService.updateProduct(product.id, payload);
      } else {
        await productService.createProduct(payload);
      }

      if (imagePreview && imageFile) URL.revokeObjectURL(imagePreview);

      onSubmit();
    } catch (err) {
      console.error("Product save error:", err);

      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Failed to save product.";

      setSubmitError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#0D1322] border border-[#1A2234] rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl">

        {/* Header */}
        <div className="p-6 border-b border-[#1A2234] flex justify-between items-center sticky top-0 bg-[#0D1322] z-10">
          <h2 className="text-2xl font-bold text-[#D2C1B6]">
            {product ? "Edit Product" : "Add New Product"}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-red-500 transition">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-[#D2C1B6]">
          {submitError && (
            <div className="p-3 bg-red-900/30 border border-red-700 rounded-lg text-red-300 text-sm">
              {submitError}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Product Name */}
            <div>
              <label className="block text-sm text-gray-300 mb-1">Product Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg bg-[#1A2234] text-[#D2C1B6] border ${
                  errors.name ? "border-red-500" : "border-[#2A3248]"
                } focus:ring-2 focus:ring-indigo-500`}
              />
              {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
            </div>

            {/* SKU */}
            <div>
              <label className="block text-sm text-gray-300 mb-1">SKU *</label>
              <input
                type="text"
                name="sku"
                value={formData.sku}
                onChange={handleChange}
                disabled={!!product}
                className={`w-full px-4 py-2 rounded-lg bg-[#1A2234] text-[#D2C1B6] border ${
                  errors.sku ? "border-red-500" : "border-[#2A3248]"
                } ${product ? "opacity-60 cursor-not-allowed" : ""}`}
              />
              {errors.sku && <p className="text-red-400 text-xs mt-1">{errors.sku}</p>}
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm text-gray-300 mb-1">Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg bg-[#1A2234] text-[#D2C1B6] border ${
                  errors.category ? "border-red-500" : "border-[#2A3248]"
                }`}
              >
                <option value="">Select Category</option>
                <option>Electronics</option>
                <option>Clothing</option>
                <option>Food</option>
                <option>Books</option>
                <option>Furniture</option>
                <option>Toys</option>
                <option>Other</option>
              </select>
              {errors.category && <p className="text-red-400 text-xs mt-1">{errors.category}</p>}
            </div>

            {/* Vendor */}
            <div>
              <label className="block text-sm text-gray-300 mb-1">Vendor</label>
              <select
                name="vendorId"
                value={formData.vendorId}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-[#1A2234] text-[#D2C1B6] border border-[#2A3248] rounded-lg"
              >
                <option value="">No Vendor</option>
                {vendors.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.name} ({v.email})
                  </option>
                ))}
              </select>
            </div>

            {/* Current Stock */}
            <div>
              <label className="block text-sm text-gray-300 mb-1">Current Stock *</label>
              <input
                type="number"
                name="currentStock"
                value={formData.currentStock}
                onChange={handleChange}
                className={`w-full px-4 py-2 bg-[#1A2234] text-[#D2C1B6] rounded-lg border ${
                  errors.currentStock ? "border-red-500" : "border-[#2A3248]"
                }`}
              />
              {errors.currentStock && (
                <p className="text-red-400 text-xs mt-1">{errors.currentStock}</p>
              )}
            </div>

            {/* Reorder Level */}
            <div>
              <label className="block text-sm text-gray-300 mb-1">Reorder Level *</label>
              <input
                type="number"
                name="reorderLevel"
                value={formData.reorderLevel}
                onChange={handleChange}
                className={`w-full px-4 py-2 bg-[#1A2234] text-[#D2C1B6] rounded-lg border ${
                  errors.reorderLevel ? "border-red-500" : "border-[#2A3248]"
                }`}
              />
              {errors.reorderLevel && (
                <p className="text-red-400 text-xs mt-1">{errors.reorderLevel}</p>
              )}
            </div>

            {/* Price */}
            <div className="md:col-span-2">
              <label className="block text-sm text-gray-300 mb-1">Price *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className={`w-full px-4 py-2 bg-[#1A2234] text-[#D2C1B6] rounded-lg border ${
                  errors.price ? "border-red-500" : "border-[#2A3248]"
                }`}
              />
              {errors.price && <p className="text-red-400 text-xs mt-1">{errors.price}</p>}
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm text-gray-300 mb-1">Description</label>
              <textarea
                name="description"
                rows="3"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-[#1A2234] text-[#D2C1B6] rounded-lg border border-[#2A3248]"
              />
            </div>

            {/* Image Upload */}
            <div className="md:col-span-2">
              <label className="block text-sm text-gray-300 mb-1">Product Image</label>
              <input type="file" accept="image/*" onChange={handleFileChange} className="w-full" />

              {imagePreview && (
                <img
                  src={imagePreview}
                  className="mt-3 w-32 h-32 object-cover rounded border border-[#2A3248]"
                />
              )}
            </div>
          </div>

          {/* Submit & Cancel */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-[#1A2234]">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-[#2A3248] text-gray-300 rounded-lg hover:bg-[#1A2234] transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition disabled:opacity-50"
            >
              {loading ? "Saving..." : product ? "Update Product" : "Create Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
