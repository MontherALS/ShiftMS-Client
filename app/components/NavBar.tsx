"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/Images/logo.png";

export default function NavBar() {
  const linkStyle =
    "text-gray-600 font-medium px-2  rounded-md hover:bg-blue-50 transition-colors duration-200";

  return (
    <header className="bg-white shadow-sm rounded-xl py-5 px-2 max-w-4xl mx-auto mb-8 flex items-center justify-between ">
      <Image src={logo} width={45} alt="logo" />

      <nav className="flex gap-2 items-center text-[13px] ">
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
      <Image src={logo} width={20} alt="logo" />
    </header>
  );
}
