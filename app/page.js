"use client";
import Link from "next/link";
import Image from "next/image";
import logo from "@/app/Images/logo.png";
export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-bl from-blue-50 to-indigo-100 flex items-center justify-center px-6">
      <div className="max-w-3xl flex flex-col items-center text-center space-y-6">
        <Image src={logo} width={175} alt="logo" />
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800">
          <span className="text-indigo-800 font-serif">
            Shift Management System
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-gray-600 font-sans">
          A smart platform for managing employee shifts and group schedules with
          ease and clarity. Save time, stay organized, and keep everything in
          one place.
        </p>

        <Link
          href="/login"
          className="inline-block mt-4 bg-orange-400 text-white text-lg font-medium px-6 py-3 rounded-lg shadow hover:bg-orange-600 duration-500 transition"
        >
          <span className="text-white">Get Started </span>
        </Link>
      </div>
    </main>
  );
}
