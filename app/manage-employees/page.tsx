"use client";

import React from "react";
import Link from "next/link";
import NavBar from "../components/NavBar";

export default function ManageEmployeesPage() {
  return (
    <div className="min-h-screen">
      <NavBar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 text-center mb-10">
          Manage Employees
        </h1>

        <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2">
          <Link
            href="/manage-employees/add"
            className="group relative overflow-hidden rounded-2xl hover:bg-blue-500 duration-1000 p-1 shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            <div className="h-full w-full rounded-2xl bg-white p-8 transition-colors duration-300 group-hover:bg-white/90">
              <div className="flex items-center justify-between mb-6">
                <div className="text-2xl font-bold text-gray-900">
                  Add Employees
                </div>
                <span className="text-4xl">➕</span>
              </div>
              <p className="text-gray-600 text-sm leading-6">
                Go to the Add Employee page to create a new employee and assign
                them to a group.
              </p>
              <div className="mt-6 inline-flex items-center text-blue-700 font-semibold">
                Get started
                <span className="ml-2 transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
            </div>
          </Link>

          <Link
            href="/manage-employees/delete"
            className="group relative overflow-hidden rounded-2xl p-1 hover:bg-red-500 duration-1000 shadow-lg focus:outline-none focus:ring-4 focus:ring-rose-300"
          >
            <div className="h-full w-full rounded-2xl bg-white p-8 transition-colors duration-300 group-hover:bg-white/90">
              <div className="flex items-center justify-between mb-6">
                <div className="text-2xl font-bold text-gray-900">
                  Delete Employees
                </div>
                <span className="text-4xl">🗑️</span>
              </div>
              <p className="text-gray-600 text-sm leading-6">
                Open the Delete Employees page to select and remove employees
                safely.
              </p>
              <div className="mt-6 inline-flex items-center text-rose-700 font-semibold">
                Continue
                <span className="ml-2 transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}
