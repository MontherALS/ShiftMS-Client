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
      <nav className="relative z-50 bg-white/50 backdrop-blur-xl border-b border-blue-200/50 text-gray-800 flex justify-between items-center px-8 py-5 shadow-lg">
        <div className="flex gap-4 items-center">
          <div className="p-2 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-lg transform hover:rotate-3 transition-all duration-300">
            <Link href="/" className="cursor-pointer">
              <Image
                src="/Images/logo.png"
                width={45}
                height={45}
                alt="logo"
                className="rounded-lg brightness-0 invert"
              />
            </Link>
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent tracking-wide">
            ShiftMS
          </h1>
        </div>

        <div className="hidden md:flex gap-2 items-center text-sm bg-white/70 backdrop-blur-sm rounded-2xl p-3 shadow-inner border border-blue-100">
          {navigationsTaps.map((t, i) => (
            <Link
              key={i}
              href={t.url}
              className="text-gray-900 font-medium px-4 py-2 rounded-xl hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 hover:text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              {t.name}
            </Link>
          ))}
        </div>

        <button
          onClick={handleNavClick}
          className="md:hidden p-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <Image
            className="transition-all duration-300 ease-in-out filter invert"
            src={navIsOpen ? "/Images/menuClose.png" : "/Images/menu.png"}
            width={22}
            height={22}
            alt="navigation"
          />
        </button>
      </nav>

      {navIsOpen && (
        <aside className="md:hidden fixed top-20 right-4 bg-white/90 backdrop-blur-xl shadow-2xl border border-blue-200/50 w-72 rounded-3xl p-4 flex flex-col gap-3 z-50 animate-in slide-in-from-right duration-300">
          {navigationsTaps.map((t, i) => (
            <Link
              key={i}
              href={t.url}
              className="text-gray-700 text-lg font-medium hover:text-white transition-all duration-300 py-3 px-4 rounded-2xl hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 border-l-4 border-transparent hover:border-white transform hover:scale-105 shadow-sm hover:shadow-lg"
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
