import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

interface Cart {
    id: string,
    text: string,
}

interface CartState {
    cartItems: Cart[];
    currentItem: Cart | null;
    isModalOpen: boolean;
    error: string | null;
}

const initialState: CartState = {
    cartItems: [],
    currentItem: null,
    isModalOpen: false,
    error: null,
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<string>) => {
            const cart: Cart = {
                id: nanoid(),
                text: action.payload,
            };
            state.cartItems.push(cart);
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            state.cartItems = state.cartItems.filter(cartItem => cartItem.id !== action.payload);
        },
        toggleModal: (state) => {
            state.isModalOpen = !state.isModalOpen;
        },
        setCurrentItem: (state, action: PayloadAction<string>) => {
            const selectedItem = state.cartItems.find(cartItem => cartItem.id === action.payload);
            if (selectedItem) {
                state.currentItem = selectedItem;
            } else {
                state.error = "Item not found";
            }
        },
        clearCart: (state) => {
            state.cartItems = [];
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        }
    }
});


// Export actions
export const { addToCart, removeFromCart, toggleModal, setCurrentItem, clearCart, setError, clearError } = cartSlice.actions;

// Export reducer
export default cartSlice.reducer;
