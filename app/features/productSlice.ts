import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Define a type for the slice state
interface Product {
    _id: string;
    name: string;
    // Add other product fields as needed
}

interface ProductsState {
    items: Product[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed' | null;
}

// Define the initial state using that type
const initialState: ProductsState = {
    items: [],
    status: null,
};

// Async thunk to fetch products
export const fetchProducts = createAsyncThunk<Product[]>('products/fetchProducts', async () => {
    const response = await axios.get('/api/product');
    return response.data;
});

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        // Regular reducers if needed
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
                state.items = action.payload;
                state.status = 'succeeded';
            })
            .addCase(fetchProducts.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default productsSlice.reducer;
