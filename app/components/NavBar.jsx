"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/Images/logo.png";

export default function NavBar() {
  const linkStyle =
    "text-gray-600 font-medium px-3 py-2 rounded-md hover:bg-blue-50 transition-colors duration-200";

  return (
    <header className="bg-white shadow-sm rounded-xl py-4 px-6 max-w-6xl mx-auto mb-8 flex items-center justify-between">
      {/* Logo + Title */}
      <div className="flex items-center">
        <Image src={logo} width={70} alt="logo" />
        <h1 className="text-2xl font-bold text-gray-800 ml-2">Admin Page</h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex gap-4 items-center">
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

        {/* Profile Avatar */}
        <button
          type="button"
          aria-label="Open profile menu"
          className="cursor-pointer hover:scale-105 transition-transform duration-300 rounded-full p-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 128 128"
            className="w-9 h-9"
          >
            <defs>
              <linearGradient id="avatarGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
            <circle cx="64" cy="64" r="62" fill="url(#avatarGradient)" />
            <g fill="#fff">
              <circle cx="64" cy="52" r="22" />
              <path d="M24 104c0-16 18-28 40-28s40 12 40 28v8H24z" />
            </g>
          </svg>
        </button>
      </nav>
    </header>
  );
}
