"use client";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 flex items-center justify-center px-6">
      <div className="max-w-3xl text-center space-y-6">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800">
          Welcome to <span className="text-blue-600">ShiftGroups</span>
        </h1>

        <p className="text-lg sm:text-xl text-gray-600">
          A smart platform for managing employee shifts and group schedules with
          ease and clarity. Save time, stay organized, and keep everything in
          one place.
        </p>

        <Link
          href="/login"
          className="inline-block mt-4 bg-blue-600 text-white text-lg font-medium px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
        >
          Get Started
        </Link>
      </div>
    </main>
  );
}
