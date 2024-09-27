"use client";

import React, { useState, FormEvent, ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { login } from "@/store/features/userSlice"; // Assuming login action is defined here
import { AppDispatch } from "@/store/store"; // Import your store's dispatch type

interface User {
  email: string;
  name: string;
  // Add other fields if necessary
}

const SignInn: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>(); // Properly typed dispatch
  const router = useRouter();

  const handleSignIn = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        return;
      }

      // Dispatch Redux action to store user data
      dispatch(login(data.user as User)); // Casting data.user as User type

      // Redirect to the home page or another page
      router.push("/");
    } catch (error) {
      setError("An unexpected error occurred.");
    }
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <form onSubmit={handleSignIn} className="mx-auto max-w-xs">
      <input
        className="w-full px-8 py-4 rounded-lg font-medium bg-[hsl(var(--input))] border border-[hsl(var(--border))] placeholder-gray-500 text-sm focus:outline-none focus:border-[hsl(var(--foreground))] focus:bg-[hsl(var(--background))]"
        placeholder="Email"
        type="email"
        value={email}
        onChange={handleEmailChange}
        required
      />
      <input
        className="w-full px-8 py-4 rounded-lg font-medium bg-[hsl(var(--input))] border border-[hsl(var(--border))] placeholder-gray-500 text-sm focus:outline-none focus:border-[hsl(var(--foreground))] focus:bg-[hsl(var(--background))] mt-5"
        placeholder="Password"
        type="password"
        value={password}
        onChange={handlePasswordChange}
        required
      />
      <button
        className="mt-5 tracking-wide font-semibold bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] w-full py-4 rounded-lg hover:bg-[hsl(var(--ring))] transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
        type="submit"
      >
        <svg
          className="w-6 h-6 -ml-2"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
          <circle cx="8.5" cy="7" r="4" />
          <path d="M20 8v6M23 11h-6" />
        </svg>
        <span className="ml-1">Sign In</span>
      </button>
      <p className="mt-6 text-xs text-[hsl(var(--muted-foreground))] text-center">
        I agree to abide by Cartesian Kinetics
        <a
          href="#"
          className="border-b border-[hsl(var(--border))] border-dotted"
        >
          Terms of Service
        </a>
        and its
        <a
          href="#"
          className="border-b border-[hsl(var(--border))] border-dotted"
        >
          Privacy Policy
        </a>
      </p>
    </form>
  );
};

export default SignInn;
