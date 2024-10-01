import { useState } from "react";

const ProductForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    image: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/products", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    });
    // Handle success or errors
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-md">
      {/* Input fields */}
      <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
        Add Product
      </button>
    </form>
  );
};

export default ProductForm;
