"use client";
import React from "react";
import { useEffect } from "react";
//components
import NavBar from "../components/NavBar";
import CurrentGroups from "../components/CurrentGroups";
import EmployesCards from "../components/EmployesCards";
import NextGroup from "../components/NextGroup";
export default function DashboardPage() {
  //TODO Add fetch for current groups and employees
  //TODO Add time calculation for next shift

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return null;
    }
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0] p-6">
      {/* Navigation */}
      <NavBar />

      {/* Main Content */}
      <main className=" flex flex-col max-w-6xl gap-8 mx-auto">
        <CurrentGroups />

        {/* Next Shift Section */}
        <NextGroup />

        {/* Current Employees Section */}
        <EmployesCards />
      </main>
    </div>
  );
}
