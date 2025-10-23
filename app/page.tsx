"use client";
import Link from "next/link";
import HomeNav from "./components/HomeNav";

export default function Home() {
  return (
    <div className="min-h-screen bg-blue-50">
      <HomeNav />

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center px-4 py-20">
        {/* Title */}
        <h1 className="text-5xl font-bold text-blue-900 text-center mb-6">
          ShiftMS- Your Team Shift Manager
        </h1>

        {/* Subtitle */}
        <p className="text-xl text-gray-600 text-center max-w-2xl mb-12">
          Simple and easy way to manage your team shifts. Schedule, track, and
          organize all in one place.
        </p>

        {/* Buttons */}
        <div className="flex gap-4">
          <Link
            href="/login"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Get Started
          </Link>

          <Link
            href="#features"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium border-2 border-blue-600 hover:bg-blue-50 transition-colors"
          >
            Learn More
          </Link>
        </div>

        {/* Features Section */}
        <div
          id="features"
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl"
        >
          {/* Feature 1 */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl mb-4">📅</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Easy Scheduling
            </h3>
            <p className="text-gray-600">
              Create and manage shifts with just a few clicks.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl mb-4">👥</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Team Management
            </h3>
            <p className="text-gray-600">
              Keep track of your team members and their availability.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl mb-4">🖥️</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Clean UI
            </h3>
            <p className="text-gray-600">
              Intuitive and user-friendly interface for seamless navigation.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8 mt-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex justify-center gap-8 mb-4">
            <Link href="/privacy" className="text-gray-600 hover:text-blue-600">
              Privacy
            </Link>
            <Link href="/terms" className="text-gray-600 hover:text-blue-600">
              Terms
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-blue-600">
              Contact
            </Link>
          </div>
          <p className="text-gray-500">© 2025 ShiftMS . All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
