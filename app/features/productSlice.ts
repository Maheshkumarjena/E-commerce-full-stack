import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const response = await axios.get('/api/products');
    return response.data;
});

const productsSlice = createSlice({
    name: 'products',
    initialState: { items: [], status: null },
    reducers: {},
    extraReducers: {
        [fetchProducts.pending]: (state) => {
            state.status = 'loading';
        },
        [fetchProducts.fulfilled]: (state, action) => {
            state.items = action.payload;
            state.status = 'succeeded';
        },
        [fetchProducts.rejected]: (state) => {
            state.status = 'failed';
        },
    },
});

export default productsSlice.reducer;
