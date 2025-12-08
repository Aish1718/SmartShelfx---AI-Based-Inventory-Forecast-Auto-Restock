// import React, { useState } from "react";
// import axios from "../../utils/axios";

// const AddProduct = () => {
//   const [image, setImage] = useState(null);
//   const [formData, setFormData] = useState({
//     name: "",
//     sku: "",
//     category: "",
//     price: "",
//     reorderLevel: "",
//     currentStock: "",
//     vendorId: "",
//   });

//   // Handle input fields
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Upload image to backend
//   const uploadImage = async (file) => {
//     const data = new FormData();
//     data.append("file", file);

//     const res = await axios.post("/api/upload/image", data, {
//       headers: { "Content-Type": "multipart/form-data" },
//     });

//     return res.data.url; // <-- URL returned by backend
//   };

//   // Submit form
//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();

//   //   let imageUrl = null;

//   //   // Step 1: Upload image if selected
//   //   if (image) {
//   //     imageUrl = await uploadImage(image);
//   //   }

//   //   // Step 2: Prepare final product data
//   //   const productData = {
//   //     ...formData,
//   //     imageUrl: imageUrl, // VERY IMPORTANT
//   //   };

//   //   // Step 3: Send to backend
//   //   await axios.post("/api/products", productData);

//   //   alert("Product Added Successfully");
//   // };

//   const handleSubmit = async (e) => {
//   e.preventDefault();

//   console.log("Selected Image:", image);

//   let imageUrl = null;

//   // Step 1: Upload image if selected
//   if (image) {
//     console.log("Uploading image...");
//     imageUrl = await uploadImage(image);
//     console.log("Uploaded Image URL:", imageUrl);
//   }

//   // Step 2: Prepare final product data
//   const productData = {
//     ...formData,
//     imageUrl: imageUrl,
//   };

//   console.log("Final Product Data:", productData);

//   // Step 3: Send to backend
//   await axios.post("/api/products", productData);

//   alert("Product Added Successfully");
// };


//   return (
//     <form onSubmit={handleSubmit} className="space-y-4 p-4">

//       {/* IMAGE UPLOAD FIELD */}
//       <label className="block font-semibold">Product Image</label>
//       <input
//         type="file"
//         className="border p-2 rounded w-full"
//         onChange={(e) => setImage(e.target.files[0])}
//       />

//       {/* IMAGE PREVIEW */}
//       {image && (
//         <img
//           src={URL.createObjectURL(image)}
//           className="w-32 h-32 mt-2 rounded object-cover border"
//         />
//       )}

//       {/* OTHER INPUT FIELDS */}
//       <input
//         type="text"
//         name="name"
//         placeholder="Product Name"
//         onChange={handleChange}
//         className="border p-2 rounded w-full"
//       />

//       <input
//         type="text"
//         name="sku"
//         placeholder="SKU"
//         onChange={handleChange}
//         className="border p-2 rounded w-full"
//       />

//       <input
//         type="text"
//         name="category"
//         placeholder="Category"
//         onChange={handleChange}
//         className="border p-2 rounded w-full"
//       />

//       <input
//         type="number"
//         name="price"
//         placeholder="Price"
//         onChange={handleChange}
//         className="border p-2 rounded w-full"
//       />

//       <input
//         type="number"
//         name="reorderLevel"
//         placeholder="Reorder Level"
//         onChange={handleChange}
//         className="border p-2 rounded w-full"
//       />

//       <input
//         type="number"
//         name="currentStock"
//         placeholder="Current Stock"
//         onChange={handleChange}
//         className="border p-2 rounded w-full"
//       />

//       <input
//         type="number"
//         name="vendorId"
//         placeholder="Vendor ID"
//         onChange={handleChange}
//         className="border p-2 rounded w-full"
//       />

//       <button className="bg-blue-600 text-white px-4 py-2 rounded mt-4">
//         Add Product
//       </button>
//     </form>
//   );
// };

// export default AddProduct;


import React, { useState } from "react";
import axios from "../../utils/axios";

const AddProduct = () => {
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    category: "",
    price: "",
    reorderLevel: "",
    currentStock: "",
    vendorId: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const uploadImage = async (file) => {
    const data = new FormData();
    data.append("file", file);

    const res = await axios.post("/api/upload/image", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return res.data.url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = null;

    if (image) {
      imageUrl = await uploadImage(image);
    }

    const productData = { ...formData, imageUrl };

    await axios.post("/api/products", productData);

    alert("Product Added Successfully");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 p-6 bg-[#1A2234] border border-[#2A3248] rounded-xl shadow-md text-[#D2C1B6]"
    >
      <h2 className="text-2xl font-semibold mb-3 text-[#D2C1B6]">
        Add New Product
      </h2>

      {/* IMAGE UPLOAD */}
      <label className="block font-medium text-gray-300">Product Image</label>
      <input
        type="file"
        className="w-full px-3 py-2 rounded-lg bg-[#0D1322] border border-[#2A3248] text-[#D2C1B6]"
        onChange={(e) => setImage(e.target.files[0])}
      />

      {/* Preview */}
      {image && (
        <img
          src={URL.createObjectURL(image)}
          className="w-32 h-32 mt-2 rounded-lg object-cover border border-[#2A3248]"
        />
      )}

      {/*----- INPUT FIELDS (Dark Theme) -----*/}
      {[
        { name: "name", placeholder: "Product Name", type: "text" },
        { name: "sku", placeholder: "SKU", type: "text" },
        { name: "category", placeholder: "Category", type: "text" },
        { name: "price", placeholder: "Price", type: "number" },
        { name: "reorderLevel", placeholder: "Reorder Level", type: "number" },
        { name: "currentStock", placeholder: "Current Stock", type: "number" },
        { name: "vendorId", placeholder: "Vendor ID", type: "number" },
      ].map((field) => (
        <input
          key={field.name}
          type={field.type}
          name={field.name}
          placeholder={field.placeholder}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg bg-[#0D1322] border border-[#2A3248] text-[#D2C1B6] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
        />
      ))}

      {/* SUBMIT BUTTON */}
      <button
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition"
      >
        Add Product
      </button>
    </form>
  );
};

export default AddProduct;
