"use client";
import Link from "next/link";
import Image from "next/image";
// Images
import heroImg from "@/public/Images/heroImg.jpg";
import HomeNav from "../app/components/HomeNav.jsx";
export default function Home() {
  return (
    <main className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background decoration */}
      <HomeNav />

      {/* Hero Section */}
      <header className="relative z-10 flex flex-col items-center mt-20 px-6">
        <div className="relative group">
          <div className="absolute -inset-4 bg-gradient-to-r from-purple-300 to-blue-300 rounded-3xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
          <div className="relative bg-white p-1 rounded-2xl shadow-2xl">
            <Image
              className="rounded-xl shadow-lg"
              src={heroImg}
              alt="hero img"
              width={400}
              height={300}
            />
          </div>
        </div>

        <h1 className="text-5xl font-bold bg-gradient-to-r from-[#B433FF] via-[#002AD1] to-[#4E007A] bg-clip-text text-transparent mt-12 text-center leading-tight">
          Transform Your Workflow
        </h1>
        <p className="text-xl text-gray-600 mt-4 text-center max-w-md">
          Streamline your team management with our intelligent shift scheduling
          platform
        </p>

        <div className="flex gap-6 mt-10">
          <Link
            className=" bg-[#8a0ad5] to-[#335CFF]  text-white py-4 px-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 font-semibold"
            href="/login"
          >
            Get Started
          </Link>
          <Link
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-4 px-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 font-semibold"
            href="/"
          >
            Learn More
          </Link>
        </div>
      </header>
      <footer className="relative z-10 mt-8 ">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex gap-8 text-sm text-gray-600">
              <Link
                href="/privacy"
                className="hover:text-purple-600 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="hover:text-purple-600 transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/contact"
                className="hover:text-purple-600 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>

          <div className="border-t border-gray-200/50 mt-6 pt-6 text-center">
            <p className="text-sm text-gray-500">
              © 2025 Shift Management. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
