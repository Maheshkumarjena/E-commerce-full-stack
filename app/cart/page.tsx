"use client"
// components/ShoppingCart.tsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart,updateQuantity } from "../features/cartSlice";
import { RootState } from "../store";

interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
}

const ShoppingCart: React.FC = () => {
  const dispatch = useDispatch();


  // Select cart items from Redux store
  const cartItems: CartItem[] = useSelector(
    (state: RootState) => state.cart.items
  );

  // Calculate total items and total price
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Handler to remove item from cart
  const handleRemoveItem = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
    console.log(`Change quantity for item ${id} to ${quantity}`);
  };

  return (
    <div className="container mx-auto mt-10">
      <div className="sm:flex shadow-md my-10">
        {/* Cart Items Section */}
        <div className="w-full sm:w-3/4 bg-[hsl(var(--card))] px-10 py-10">
          {/* Header */}
          <div className="flex justify-between border-b border-[hsl(var(--border))] pb-8">
            <h1 className="font-semibold text-lg sm:text-2xl">Shopping Cart</h1>
            <h2 className="font-semibold text-lg sm:text-2xl">
              {totalItems} Items
            </h2>
          </div>

          {/* Cart Items */}
          {cartItems.length === 0 ? (
            <p className="text-[hsl(var(--foreground))] mt-5">
              Your cart is empty.
            </p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="md:flex items-center py-8 md:py-10 lg:py-8 border-t border-[hsl(var(--border))]"
              >
                {/* Item Details */}
                <div className="md:w-4/12 2xl:w-1/4 w-full">
                  {/* Placeholder Image */}
                  <img
                    src={`https://via.placeholder.com/150?text=${encodeURIComponent(
                      item.title
                    )}`}
                    alt={item.title}
                    className="w-full h-full object-center object-cover"
                  />
                </div>
                <div className="md:pl-3 md:w-8/12 2xl:w-3/4 flex flex-col justify-center">
                  <p className="text-xs sm:text-sm leading-3 text-[hsl(var(--card-foreground))] pt-4">
                    {item.title}
                  </p>
                  <div className="flex items-center justify-between w-full">
                    <p className="text-base sm:text-lg font-black leading-none text-[hsl(var(--card-foreground))]">
                      {item.title}
                    </p>
                    <select
                      aria-label="Select quantity"
                      className="py-2 px-1 border border-[hsl(var(--border))] mr-6 focus:outline-none"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(item.id, Number(e.target.value))
                      }
                    >
                      {[...Array(10)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <p className="text-xs sm:text-sm leading-3 text-[hsl(var(--muted-foreground))] pt-2">
                    Price: ${item.price.toFixed(2)}
                  </p>
                  <div className="flex items-center justify-between pt-5">
                    <div className="flex items-center">
                      <p className="text-xs sm:text-sm leading-3 underline text-[hsl(var(--card-foreground))] cursor-pointer">
                        Add to favorites
                      </p>
                      <p
                        className="text-xs sm:text-sm leading-3 underline text-red-500 pl-5 cursor-pointer"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        Remove
                      </p>
                    </div>
                    <p className="text-base sm:text-lg font-black leading-none text-[hsl(var(--card-foreground))]">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}

          {/* Continue Shopping Link */}
          <a
            href="#"
            className="flex font-semibold text-[hsl(var(--primary))] text-sm sm:text-base mt-10 hover:text-[hsl(var(--ring))]"
          >
            <svg
              className="fill-current mr-2 text-[hsl(var(--primary))] w-4 h-4"
              viewBox="0 0 448 512"
            >
              <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
            </svg>
            Continue Shopping
          </a>
        </div>

        {/* Order Summary Section */}
        <div
          id="summary"
          className="w-full sm:w-1/4 md:w-1/2 px-8 py-10 bg-[hsl(var(--card))]"
        >
          <h1 className="font-semibold text-lg sm:text-2xl border-b border-[hsl(var(--border))] pb-8">
            Order Summary
          </h1>
          <div className="flex justify-between mt-10 mb-5">
            <span className="font-semibold text-sm sm:text-base uppercase">
              Items {totalItems}
            </span>
            <span className="font-semibold text-sm sm:text-base">
              ${totalPrice.toFixed(2)}
            </span>
          </div>
          <div>
            <label className="font-medium inline-block mb-3 text-sm sm:text-base uppercase">
              Shipping
            </label>
            <select className="block p-2 text-[hsl(var(--card-foreground))] w-full text-sm sm:text-base border border-[hsl(var(--border))]">
              <option>Standard shipping - $10.00</option>
              <option>Express shipping - $20.00</option>
            </select>
          </div>
          <div className="py-10">
            <label
              htmlFor="promo"
              className="font-semibold inline-block mb-3 text-sm sm:text-base uppercase"
            >
              Promo Code
            </label>
            <input
              type="text"
              id="promo"
              placeholder="Enter your code"
              className="p-2 text-sm sm:text-base w-full border border-[hsl(var(--border))] rounded"
            />
          </div>
          <button className="bg-[hsl(var(--destructive))] hover:bg-[hsl(var(--destructive-foreground))] px-5 py-2 text-sm sm:text-base text-white uppercase rounded">
            Apply
          </button>
          <div className="border-t border-[hsl(var(--border))] mt-8">
            <div className="flex font-semibold justify-between py-6 text-sm sm:text-base uppercase">
              <span>Total cost</span>
              <span>${(totalPrice + 10).toFixed(2)}</span>{" "}
              {/* Assuming $10 shipping */}
            </div>
            <button className="bg-[hsl(var(--primary))] hover:bg-[hsl(var(--ring))] font-semibold py-3 text-sm sm:text-base text-white uppercase w-full rounded">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
