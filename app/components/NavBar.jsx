"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../Images/logo.png";
export default function NavBar() {
  const linkStyle =
    "text-gray-600 font-semibold px-3 py-2 rounded-md hover:bg-blue-50 transition";
  return (
    <header className="bg-white shadow-sm rounded-xl py-4 px-6 max-w-6xl mx-auto mb-8 flex items-center justify-between">
      <div className="flex justify-center items-center">
        <Image src={logo} width={85} alt="logo" />
        <h1 className="text-2xl font-bold text-gray-800">
          Shift Management System
        </h1>
      </div>
      {/* Navigation Links */}
      <nav className="flex gap-4">
        <Link href="/dashboard" className={linkStyle}>
          Dashboard
        </Link>
        <Link href="/groups" className={linkStyle}>
          Groups
        </Link>
        <Link href="/manage-employees" className={linkStyle}>
          Manage Employees
        </Link>
        <Link href="/help" className={linkStyle}>
          Help
        </Link>
        <button
          className="px-4 py-2 text-white text-sm bg-orange-600 font-semibold rounded-full shadow-sm hover:bg-orange-700 transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-1"
          onClick={() => {
            const alert = window.confirm(
              "Are you sure you want to logout? You will be redirected to the login page."
            );
            if (alert) {
              localStorage.removeItem("token");
              window.location.href = "/";
            } else return null;
          }}
        >
          logout
        </button>
      </nav>
    </header>
  );
}
