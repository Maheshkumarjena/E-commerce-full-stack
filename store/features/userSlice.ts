import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 1. Define the User Data Interface
interface User {
    id: string;
    name: string;
    email: string;
    token: string;
}

// 2. Define the shape of the state
interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
}

// 3. Create initial state
const initialState: AuthState = {
    user: null,
    isAuthenticated: false
};

// 4. Create the slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // Login Action
        login: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },

        // Logout Action
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        },

        // Update User Data Action (optional)
        updateUser: (state, action: PayloadAction<Partial<User>>) => {
            if (state.user) {
                state.user = { ...state.user, ...action.payload };
            }
        }
    }
});

// Export actions
export const { login, logout, updateUser } = authSlice.actions;

// Export reducer
export default authSlice.reducer;
