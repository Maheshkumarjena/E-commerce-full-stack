"use client";
// /store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import userReducer from './features/userSlice'; // Import the reducer

// Create the store
export const store = configureStore({
    reducer: {
        user: userReducer, // Use the correct reducer from userSlice
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Custom hook to use dispatch with TypeScript
export const useAppDispatch = () => useDispatch<AppDispatch>();
