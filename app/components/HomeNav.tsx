"use client";
import React from "react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function HomeNav() {
  const [navIsOpen, setNavIsOpen] = useState<boolean>(false);

  const navigationsTaps = [
    { name: "Home", url: "/" },
    { name: "Product", url: "/product" },
    { name: "About us", url: "/about-us" },
  ];

  const handleNavClick = () => setNavIsOpen((prev) => !prev);

  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100/20 via-transparent to-blue-100/20 pointer-events-none"></div>
      <div className="absolute top-20 right-10 w-72 h-72 bg-purple-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"></div>

      <nav className="relative z-50 bg-white/10 backdrop-blur-md border-b border-gray-200/50 text-gray-800 flex justify-between items-center px-6 py-4 shadow-lg">
        <div className="flex gap-3 items-center">
          <div className="p-1  rounded-xl">
            <Link href="/" className="cursor-pointer">
              <Image
                src="/Images/logo.png"
                width={50}
                height={50}
                alt="logo"
                className="rounded-lg"
              />
            </Link>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 bg-clip-text  tracking-wide">
            Shift Management
          </h1>
        </div>

        <button
          onClick={handleNavClick}
          className="p-1 rounded bg-gradient-to-r bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <Image
            className="transition-all duration-300 ease-in-out filter invert"
            src={navIsOpen ? "/Images/menuClose.png" : "/Images/menu.png"}
            width={20}
            height={20}
            alt="navigation"
          />
        </button>
      </nav>

      {navIsOpen && (
        <aside className="bg-white/60 backdrop-blur-md shadow-2xl border border-gray-200/50 w-64 rounded-2xl p-8 flex flex-col gap-4 z-100 translate-x-45 translate-y-22  absolute animate-in slide-in-from-right duration-300">
          {navigationsTaps.map((t, i) => (
            <Link
              key={i}
              href={t.url}
              className="text-gray-700 text-lg font-medium hover:text-purple-600 transition-all duration-200 py-3 px-4 rounded-xl hover:bg-purple-50 border-l-4 border-transparent hover:border-purple-500"
              onClick={handleNavClick}
            >
              {t.name}
            </Link>
          ))}
        </aside>
      )}
    </>
  );
}
