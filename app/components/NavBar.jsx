"use client";
import React from "react";
import Link from "next/link";
export default function NavBar() {
  return (
    <nav className="mb-12">
      <div className="flex justify-center space-x-8 bg-white rounded-lg shadow-md py-4 px-8 max-w-2xl mx-auto">
        <Link
          href="/"
          className="text-blue-600 hover:text-blue-800 font-semibold px-4 py-2 rounded-md hover:bg-blue-50 transition-all"
        >
          Dashboard
        </Link>
        <Link
          href="/groups"
          className="text-gray-600 hover:text-blue-600 font-semibold px-4 py-2 rounded-md hover:bg-blue-50 transition-all"
        >
          Groups
        </Link>
        <Link
          href="/add-employee"
          className="text-gray-600 hover:text-blue-600 font-semibold px-4 py-2 rounded-md hover:bg-blue-50 transition-all"
        >
          Add Employee
        </Link>
        <Link
          href="/help"
          className="text-gray-600 hover:text-blue-600 font-semibold px-4 py-2 rounded-md hover:bg-blue-50 transition-all"
        >
          Help
        </Link>
      </div>
    </nav>
  );
}
