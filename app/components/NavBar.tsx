"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/Images/logo.png";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const linkStyle =
    "text-gray-600 font-medium px-3 sm:px-4 py-2 rounded-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-sm text-sm";

  return (
    <header className="bg-white/80 backdrop-blur-sm shadow-lg border border-gray-100 rounded-xl sm:rounded-2xl py-4 sm:py-6 px-4 sm:px-6 max-w-5xl mx-auto mb-6 sm:mb-8">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="p-1.5 sm:p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg sm:rounded-xl shadow-md">
            <Image
              src={logo}
              width={28}
              height={28}
              alt="logo"
              className="brightness-0 invert sm:w-[35px] sm:h-[35px]"
            />
          </div>
          <span className="font-bold text-lg sm:text-xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            ShiftMS
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-1 items-center text-sm bg-gray-50/50 rounded-xl p-2">
          <Link href="/dashboard" className={linkStyle}>
            Dashboard
          </Link>
          <Link href="/groups" className={linkStyle}>
            Groups
          </Link>
          <Link href="/manage-employees" className={linkStyle}>
            Employees
          </Link>
          <Link href="/help" className={linkStyle}>
            Help
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <nav className="md:hidden mt-4 pt-4 border-t border-gray-200 space-y-2">
          <Link
            href="/dashboard"
            className="block px-3 py-2 text-gray-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            href="/groups"
            className="block px-3 py-2 text-gray-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Groups
          </Link>
          <Link
            href="/manage-employees"
            className="block px-3 py-2 text-gray-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Employees
          </Link>
          <Link
            href="/help"
            className="block px-3 py-2 text-gray-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Help
          </Link>
        </nav>
      )}
    </header>
  );
}
