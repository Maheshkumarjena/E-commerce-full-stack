"use client"


import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/productSlice";
import ProductForm from "@/components/productForm";

const ProductsPage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <>
      <h1 className="text-2xl mb-4">Manage Products</h1>
      <ProductForm />
      <div className="mt-6">
        {products.map((product) => (
          <div key={product._id} className="p-4 border">
            <h2>{product.name}</h2>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductsPage;
