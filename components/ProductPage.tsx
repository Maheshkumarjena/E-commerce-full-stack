import React from "react";
import ProductCard from "./ProductCard";
import { connectToDatabase } from "@/lib/mongoDb";
import Product from "@/models/product";
const  ProductPage:  React.FC = async () => {
  
await connectToDatabase();
const products = await Product.find();
console.log('products :::::', products)

  
  return (
    <div className="p-1 flex flex-wrap items-center flex-1 justify-center bg-background">

      {products.map(product=>{
        return <ProductCard key={product._id} id={product._id} imageUrl={product.image} price={product.price-59} title={product.name} description={product.description}  />
      })}
      
      </div>
  );
};

export default ProductPage;
