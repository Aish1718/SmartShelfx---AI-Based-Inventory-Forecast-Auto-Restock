// import React from 'react';
// import { Edit2, Trash2, AlertTriangle } from 'lucide-react';

// const ProductTable = ({ products, onEdit, onDelete, loading }) => {
//   if (loading) {
//     return (
//       <div className="bg-white rounded-lg shadow-sm p-8 text-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
//         <p className="text-gray-600 mt-4">Loading products...</p>
//       </div>
//     );
//   }

//   if (products.length === 0) {
//     return (
//       <div className="bg-white rounded-lg shadow-sm p-8 text-center">
//         <p className="text-gray-600">No products found</p>
//       </div>
//     );
//   }

//   const getStockStatus = (product) => {
//     if (product.currentStock === 0) {
//       return { text: 'Out of Stock', color: 'text-red-600 bg-red-50' };
//     } else if (product.currentStock < product.reorderLevel) {
//       return { text: 'Low Stock', color: 'text-orange-600 bg-orange-50' };
//     }
//     return { text: 'In Stock', color: 'text-green-600 bg-green-50' };
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-sm overflow-hidden">
//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Image
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 SKU
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Product Name
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Category
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Current Stock
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Reorder Level
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Price
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Status
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {products.map((product) => {
//               const status = getStockStatus(product);
//               // Get image URL - if relative, prefix with backend URL
//               const getImageUrl = (imageUrl) => {
//                 if (!imageUrl) return "http://localhost:8080/no-image.png";
//                 if (imageUrl.startsWith('http')) return imageUrl;
//                 return `http://localhost:8080${imageUrl}`;
//               };

//               return (
//                 <tr key={product.id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <img
//                       src={getImageUrl(product.imageUrl)}
//                       alt={product.name}
//                       className="w-16 h-16 object-cover rounded-lg border"
//                       onError={(e) => {
//                         e.target.src = "http://localhost:8080/no-image.png";
//                       }}
//                     />
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                     {product.sku}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="flex items-center">
//                       {product.currentStock < product.reorderLevel && (
//                         <AlertTriangle className="w-4 h-4 text-orange-500 mr-2" />
//                       )}
//                       <span className="text-sm text-gray-900">{product.name}</span>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
//                     {product.category}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
//                     {product.currentStock}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
//                     {product.reorderLevel}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                     ${product.price?.toFixed(2)}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${status.color}`}>
//                       {status.text}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                     <div className="flex space-x-2">
//                       <button
//                         onClick={() => onEdit(product)}
//                         className="text-indigo-600 hover:text-indigo-900"
//                       >
//                         <Edit2 className="w-5 h-5" />
//                       </button>
//                       <button
//                         onClick={() => onDelete(product.id)}
//                         className="text-red-600 hover:text-red-900"
//                       >
//                         <Trash2 className="w-5 h-5" />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ProductTable;




import React from 'react';
import { Edit2, Trash2, AlertTriangle } from 'lucide-react';

const ProductTable = ({ products, onEdit, onDelete, loading }) => {
  if (loading) {
    return (
      <div className="bg-[#1A2234] border border-[#2A3248] rounded-lg p-8 text-center text-[#D2C1B6]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto"></div>
        <p className="text-gray-400 mt-4">Loading products...</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="bg-[#1A2234] border border-[#2A3248] rounded-lg p-8 text-center text-[#D2C1B6]">
        <p className="text-gray-400">No products found</p>
      </div>
    );
  }

  const getStockStatus = (product) => {
    if (product.currentStock === 0) {
      return { text: 'Out of Stock', color: 'text-red-400 bg-red-900/30 border border-red-700' };
    } else if (product.currentStock < product.reorderLevel) {
      return { text: 'Low Stock', color: 'text-orange-400 bg-orange-900/30 border border-orange-700' };
    }
    return { text: 'In Stock', color: 'text-green-400 bg-green-900/30 border border-green-700' };
  };

  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return "http://localhost:8080/no-image.png";
    if (imageUrl.startsWith('http')) return imageUrl;
    return `http://localhost:8080${imageUrl}`;
  };

  return (
    <div className="bg-[#1A2234] border border-[#2A3248] rounded-lg overflow-hidden text-[#D2C1B6]">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-[#2A3248]">

          {/* Table Header */}
          <thead className="bg-[#0D1322]">
            <tr>
              {['Image', 'SKU', 'Product Name', 'Category', 'Current Stock', 'Reorder Level', 'Price', 'Status', 'Actions']
                .map((header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-[#2A3248]">
            {products.map((product) => {
              const status = getStockStatus(product);

              return (
                <tr key={product.id} className="hover:bg-[#0D1322] transition">

                  <td className="px-6 py-4">
                    <img
                      src={getImageUrl(product.imageUrl)}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-lg border border-[#2A3248]"
                      onError={(e) => {
                        e.target.src = 'http://localhost:8080/no-image.png';
                      }}
                    />
                  </td>

                  <td className="px-6 py-4 text-sm font-medium">{product.sku}</td>

                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {product.currentStock < product.reorderLevel && (
                        <AlertTriangle className="w-4 h-4 text-orange-400 mr-2" />
                      )}
                      <span className="text-sm">{product.name}</span>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-400">
                    {product.category}
                  </td>

                  <td className="px-6 py-4 text-sm font-semibold">
                    {product.currentStock}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-300">
                    {product.reorderLevel}
                  </td>

                  <td className="px-6 py-4 text-sm font-semibold">
                    ${product.price?.toFixed(2)}
                  </td>

                  {/* Stock Status */}
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${status.color}`}
                    >
                      {status.text}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 text-sm font-medium">
                    <div className="flex space-x-3">
                      <button
                        onClick={() => onEdit(product)}
                        className="text-indigo-400 hover:text-indigo-300 transition"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>

                      <button
                        onClick={() => onDelete(product.id)}
                        className="text-red-400 hover:text-red-300 transition"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>

                </tr>
              );
            })}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default ProductTable;
