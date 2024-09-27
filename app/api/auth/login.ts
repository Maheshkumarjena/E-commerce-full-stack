// utils/api.ts
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL; // Base URL for your API

export const login = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, { email, password });
        return response.data; // Returns the user data on success
    } catch (error) {
        // Check if the error response exists and handle it accordingly
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        } else {
            throw new Error("An unexpected error occurred.");
        }
    }
};
