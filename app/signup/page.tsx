"use client";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthFormData } from "../Types/Type";
import HomeNav from "../components/HomeNav";
export default function SignupPage() {
  const router = useRouter();

  const [formData, setFormData] = useState<AuthFormData>({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const data = await res.json();

        if (data.errors && data.errors.length > 0) {
          setMessage(data.errors[0].msg);
        } else {
          setMessage("Failed to sign up");
        }
        return;
      }
      router.push("/login");
    } catch (error) {
      setMessage("An error occurred. Please try again.");
      console.log("Error during signup:", error);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      <HomeNav />

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
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                type="password"
                name="confirmPassword"
                placeholder="Enter your password"
                className="w-full p-3 border text-gray-700 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white p-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-lg"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
