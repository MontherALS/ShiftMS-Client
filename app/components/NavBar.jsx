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
        <h1 className="text-2xl font-bold text-gray-800">ShiftGroups</h1>
      </div>
      {/* Navigation Links */}
      <nav className="flex gap-4">
        <Link href="/" className={linkStyle}>
          Dashboard
        </Link>
        <Link href="/groups" className={linkStyle}>
          Groups
        </Link>
        <Link href="/add-employee" className={linkStyle}>
          Add Employee
        </Link>
        <Link href="/help" className={linkStyle}>
          Help
        </Link>
      </nav>
    </header>
  );
}
