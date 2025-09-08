"use client";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/Images/logo.png";
export default function Home() {
  const navigationsTaps = [{
    name:"Home",
    url: "/"
  },
{
    name:"Product",
    url: "/product"
  },
{
    name:"About us",
    url: "/about-us"
  }]
  return (
    <main className="min-h-screen bg-gradient-to-bl from-blue-50 to-indigo-100 flex flex-col">
      
      <nav className=" text-black flex justify-between items-center bg-gradient-to-l from-blue-100 to-stone-300 px-2">
      <div className="flex gap-2 items-center justify-center">
        <Image src={logo} width={75} height={75} alt="logo"/>
        <h1 className="text-2xl">SMS</h1>
      </div>
      <div className="flex gap-5">  
   {navigationsTaps.map((t,i)=> 
   <Link key={i} href={t.url} className="text-gray-700 text-[1.2rem] hover:text-[1.3rem] transform duration-500 hover:text-gray-950">
   {t.name}
   </Link>
  )}
  </div>
    
    <div>
      <Link href="/login" className="text-[1.4rem] bg-white/50 text-gray-700  font-serif rounded-full hover:bg-white border  duration-500 px-4 py-2">
    Log in
    </Link>
    </div>

    </nav>
       <header className="text-gray-600"></header>
    </main>
  );
}
