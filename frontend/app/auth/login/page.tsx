"use client";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Redirect or handle successful login
      console.log("Login successful:", data);
    } catch (err) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pattern">
      <div className="flex flex-col md:flex-row items-center container justify-center w-full max-w-6xl gap-8 p-4">
        {/* Left Section - Form */}
        <div className="w-full md:w-1/2 bg-glass backdrop-blur-lg rounded-2xl p-8 shadow-xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-primary mb-2">Welcome Back</h1>
            <p className="text-accent">Please sign in to continue</p>
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
              Sign In
            </button>
          </form>

          <p className="mt-6 text-center text-accent">
            Don't have an account?{" "}
            <Link href="/auth/signup" className="text-blue-500 transition-colors font-medium">
              Create account
            </Link>
          </p>
        </div>

        {/* Right Section - Illustration */}
        <div className="hidden md:block w-1/2 max-w-xl">
          <div className="relative aspect-square">
            <Image 
              src="/login.svg" 
              alt="Authentication Illustration"
              fill
              className="object-contain right-image"
            />
          </div>
        </div>
      </div>
    </div>
  );
}