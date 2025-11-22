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

  // Handle input fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Upload image to backend
  const uploadImage = async (file) => {
    const data = new FormData();
    data.append("file", file);

    const res = await axios.post("/api/upload/image", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return res.data.url; // <-- URL returned by backend
  };

  // Submit form
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   let imageUrl = null;

  //   // Step 1: Upload image if selected
  //   if (image) {
  //     imageUrl = await uploadImage(image);
  //   }

  //   // Step 2: Prepare final product data
  //   const productData = {
  //     ...formData,
  //     imageUrl: imageUrl, // VERY IMPORTANT
  //   };

  //   // Step 3: Send to backend
  //   await axios.post("/api/products", productData);

  //   alert("Product Added Successfully");
  // };

  const handleSubmit = async (e) => {
  e.preventDefault();

  console.log("Selected Image:", image);

  let imageUrl = null;

  // Step 1: Upload image if selected
  if (image) {
    console.log("Uploading image...");
    imageUrl = await uploadImage(image);
    console.log("Uploaded Image URL:", imageUrl);
  }

  // Step 2: Prepare final product data
  const productData = {
    ...formData,
    imageUrl: imageUrl,
  };

  console.log("Final Product Data:", productData);

  // Step 3: Send to backend
  await axios.post("/api/products", productData);

  alert("Product Added Successfully");
};


  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">

      {/* IMAGE UPLOAD FIELD */}
      <label className="block font-semibold">Product Image</label>
      <input
        type="file"
        className="border p-2 rounded w-full"
        onChange={(e) => setImage(e.target.files[0])}
      />

      {/* IMAGE PREVIEW */}
      {image && (
        <img
          src={URL.createObjectURL(image)}
          className="w-32 h-32 mt-2 rounded object-cover border"
        />
      )}

      {/* OTHER INPUT FIELDS */}
      <input
        type="text"
        name="name"
        placeholder="Product Name"
        onChange={handleChange}
        className="border p-2 rounded w-full"
      />

      <input
        type="text"
        name="sku"
        placeholder="SKU"
        onChange={handleChange}
        className="border p-2 rounded w-full"
      />

      <input
        type="text"
        name="category"
        placeholder="Category"
        onChange={handleChange}
        className="border p-2 rounded w-full"
      />

      <input
        type="number"
        name="price"
        placeholder="Price"
        onChange={handleChange}
        className="border p-2 rounded w-full"
      />

      <input
        type="number"
        name="reorderLevel"
        placeholder="Reorder Level"
        onChange={handleChange}
        className="border p-2 rounded w-full"
      />

      <input
        type="number"
        name="currentStock"
        placeholder="Current Stock"
        onChange={handleChange}
        className="border p-2 rounded w-full"
      />

      <input
        type="number"
        name="vendorId"
        placeholder="Vendor ID"
        onChange={handleChange}
        className="border p-2 rounded w-full"
      />

      <button className="bg-blue-600 text-white px-4 py-2 rounded mt-4">
        Add Product
      </button>
    </form>
  );
};

export default AddProduct;
