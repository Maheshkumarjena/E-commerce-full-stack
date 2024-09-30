import React from "react";
import Product from "./Product";
const ProductPage: React.FC = () => {
  console.log(
    
  )
  return (
    <div className="p-1 flex flex-wrap items-center flex-1 justify-center bg-background">

      <Product id='1' price={30} title="flowers" bgColor="bg-yellow-400" />
      <Product id='3' price={30} title="flowersss" bgColor="bg-purple-400" />
      <Product id='2' price={30} title="flowersssss" bgColor="bg-pink-400" />
      <Product id='3' price={30} title="flowerssssssssss for office and also for lovers and family" bgColor="bg-rose-400" />
    </div>
  );
};

export default ProductPage;
