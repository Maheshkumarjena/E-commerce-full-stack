import React from "react";
import Product from "./Product";
const ProductPage: React.FC = () => {
  return (
    <div className="p-1 flex flex-wrap items-center flex-1 justify-center bg-background">
      <Product title="flowers" bgColor="bg-yellow-400" />
      <Product title="flowersss" bgColor="bg-purple-400" />
      <Product title="flowersssss" bgColor="bg-pink-400" />
      <Product title="flowerssssssssss for office and also for lovers and family" bgColor="bg-rose-400" />
    </div>
  );
};

export default ProductPage;
