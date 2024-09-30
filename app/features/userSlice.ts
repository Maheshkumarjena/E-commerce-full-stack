import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the user structure based on the Mongoose model you have
interface CartItem {
    product: string; // Product ID (can be ObjectId in the backend)
    quantity: number;
}

interface UserState {
    name: string;
    email: string;
    role: "user" | "admin";
    isVerified: boolean;
    image?: string;
    cart: CartItem[];
}

interface AuthState {
    user: UserState | null;
    error: string | null;
    isLoggedIn: boolean;
}

const initialState: AuthState = {
    user: null,
    error: null,
    isLoggedIn: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        // Set user details after login or profile update
        setUser: (state, action: PayloadAction<UserState>) => {
            state.user = action.payload;
            state.isLoggedIn = true;
            state.error = null; // Clear any previous errors
        },
        // Update specific user fields (e.g., name or cart) without replacing the whole user object
        updateUser: (state, action: PayloadAction<Partial<UserState>>) => {
            if (state.user) {
                state.user = { ...state.user, ...action.payload }; // Merge updated fields
            }
        },
        // Handle user logout
        clearUser: (state) => {
            state.user = null;
            state.isLoggedIn = false;
            state.error = null;
        },
        // Set an error (e.g., for login or update issues)
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
        // Clear any error
        clearError: (state) => {
            state.error = null;
        },
    },
});

export const { setUser, updateUser, clearUser, setError, clearError } = userSlice.actions;

export default userSlice.reducer;
