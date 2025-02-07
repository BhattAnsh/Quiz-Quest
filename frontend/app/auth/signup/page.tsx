"use client";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }

      // Redirect or handle successful signup
      console.log("Signup successful:", data);
    } catch (err: any) {
      setError(err.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pattern">
      <div className="flex flex-col md:flex-row items-center container justify-center w-full max-w-6xl gap-8 p-4">
        {/* Left Section - Form */}
        <div className="w-full md:w-1/2 bg-glass backdrop-blur-lg rounded-2xl p-8 shadow-xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-primary mb-2">Create an Account</h1>
            <p className="text-accent">Sign up to get started</p>
          </div>

          <button 
            type="button" 
            className="w-full flex items-center continue-with-google justify-center gap-3 bg-secondary/10 hover:bg-secondary/20 transition-colors text-primary px-6 py-4 rounded-xl mb-8"
          >
            <Image src="/Google.webp" alt="Google logo" width={24} height={24} className="google"/>
            <span>Continue with Google</span>
          </button>

          <div className="text-accent or-divider">OR</div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-primary mb-2" htmlFor="name">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-secondary/5 border border-border rounded-lg focus:ring-primary"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary mb-2" htmlFor="email">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-secondary/5 border border-border rounded-lg focus:ring-primary"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-secondary/5 border border-border rounded-lg focus:ring-primary"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full transition-colors py-4 rounded-lg font-medium bg-blue-500 text-white"
            >
              Sign Up
            </button>
          </form>

          <p className="mt-6 text-center text-accent">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-blue-500 transition-colors font-medium">
              Sign in
            </Link>
          </p>
        </div>

        {/* Right Section - Illustration */}
        <div className="hidden md:block w-1/2 max-w-xl">
          <div className="relative aspect-square">
            <Image 
              src="/login.svg" 
              alt="Registration Illustration"
              fill
              className="object-contain right-image"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
