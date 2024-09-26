"use client"; // <-- This tells Next.js to treat this as a client-side component

import React from "react";
import { motion } from "framer-motion";
// Define types for props
interface ProductProps {
  title: string;
  bgColor: string;
}

const Product: React.FC<ProductProps> = ({ title ,bgColor }) => {
  return (
    <motion.div
      initial={{ y: 98, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.85 }}
      className="pb-12"
    >
      <div
        className={`flex-shrink-0 m-6 relative overflow-hidden rounded-lg max-w-xs  shadow-lg ${bgColor}`}
      >
        <svg
          className="absolute bottom-0 left-0 mb-8"
          viewBox="0 0 375 283"
          fill="none"
          style={{ transform: "scale(1.5)", opacity: 0.1 }}
        >
          <rect
            x="159.52"
            y="175"
            width="152"
            height="152"
            rx="8"
            transform="rotate(-45 159.52 175)"
            fill="white"
          />
          <rect
            y="107.48"
            width="152"
            height="152"
            rx="8"
            transform="rotate(-45 0 107.48)"
            fill="white"
          />
        </svg>
        <div className="relative pt-10 px-10 flex items-center justify-center">
          <div
            className="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3"
            style={{
              background: "radial-gradient(black, transparent 60%)",
              transform: "rotate3d(0, 0, 1, 20deg) scale3d(1, 0.6, 1)",
              opacity: 0.2,
            }}
          ></div>
          <img
            className="relative w-40"
            src="https://user-images.githubusercontent.com/2805249/64069899-8bdaa180-cc97-11e9-9b19-1a9e1a254c18.png"
            alt="Peace Lily"
          />
        </div>
        <div className="relative text-background px-6 pb-6 mt-6">
          <span className="block opacity-75 -mb-1">Indoor</span>
          <div className="flex justify-between">
            <span className="block font-semibold text-foreground text-xl">{title}</span>
            <span className="block bg-accent rounded-full text-foreground text-xs font-bold px-3 py-2 leading-none flex items-center">
              $36.00
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Product;
