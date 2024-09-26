// A function to merge classes for Tailwind or ShadCN UI components
import { MongoClient, ServerApiVersion } from "mongodb"
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import mongoose from "mongoose";

// Helper function to merge Tailwind classes
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

