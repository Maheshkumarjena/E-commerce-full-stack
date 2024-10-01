// store.ts
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cartSlice"; // Import your cart slice
import productReducer from "./features/productSlice"; // Import your product slice
// Create the Redux store
export const store = configureStore({
    reducer: {
        cart: cartReducer, 
        products: productReducer,// Add the cart reducer here
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
