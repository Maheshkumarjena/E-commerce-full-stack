"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";

interface FormData {
  name: string;
  description: string;
  price: string;
  stock: string;
  image: string;
}

const ProductForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    price: "",
    stock: "",
    image: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };



 const handleSubmit = async (event: React.FormEvent) => {
   event.preventDefault();


const formdata = {
  ...formData,
  price: Number(formData.price),
  stock: Number(formData.stock),
};
   try {
     console.log("Sending product data:", formdata); // Log what you're sending
     const response = await axios.post("/api/product", formdata);
     console.log("Product created:", response.data);
   } catch (error) {
     console.error("There was an error creating the product!", error);
     // Optionally, you can check error.response.data for more details
   }
 };



  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-md">
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Product Name"
        className="mb-4 p-2 border rounded-md"
      />
      <input
        type="text"
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Product Description"
        className="mb-4 p-2 border rounded-md"
      />
      <input
        type="text"
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Product Price"
        className="mb-4 p-2 border rounded-md"
      />
      <input
        type="text"
        name="stock"
        value={formData.stock}
        onChange={handleChange}
        placeholder="Product Stock"
        className="mb-4 p-2 border rounded-md"
      />
      <input
        type="text"
        name="image"
        value={formData.image}
        onChange={handleChange}
        placeholder="Product Image URL"
        className="mb-4 p-2 border rounded-md"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
        Add Product
      </button>
    </form>
  );
};

export default ProductForm;
