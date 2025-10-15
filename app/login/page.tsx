"use client";
import React from "react";
import { useState } from "react";
import Link from "next/link";
import HomeNav from "../components/HomeNav";
import { LoginFormData } from "../Types/Type.js";

export default function LoginPage() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData: { message: string } = await res.json();
        setMessage(errorData.message);
        return;
      }

      const data: { token: string } = await res.json();

      if (!data.token) {
        setMessage("Login failed. Please try again.");
        return;
      }
      localStorage.setItem("token", data.token);
      window.location.href = "/dashboard";
    } catch (error) {
      setMessage("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      {/* Navigation */}
      <HomeNav />

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md border border-gray-100">
          <div className="text-center mb-8">
            {message && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <span className="text-red-600 text-sm">{message}</span>
              </div>
            )}
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600">Login to access the service</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <input
                id="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full p-3 border text-gray-700 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                id="password"
                value={formData.password}
                onChange={handleChange}
                type="password"
                name="password"
                placeholder="Enter your password"
                className="w-full p-3 border text-gray-700 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                required
                disabled={isLoading}
              />
            </div>

            <div className="text-center">
              <Link
                href="/reset-password"
                className="text-sm text-blue-600 hover:text-blue-700 hover:underline transition-colors"
              >
                Forgot your password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white p-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-lg"
            >
              {isLoading ? "Logging in..." : "Log In"}
            </button>

            <div className="text-center pt-4 border-t border-gray-200">
              <span className="text-gray-600 text-sm">
                Don't have an account?{" "}
              </span>
              <Link
                href="/signup"
                className="text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors"
              >
                Sign up here
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
