"use client";
import { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import Header from "./components/Header";
import CurrentGroups from "./components/CurrentGroups";
import EmployesCards from "./components/EmployesCards";
import NextGroup from "./components/NextGroup";

export default function Home() {
  // Dummy data for the dashboard

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      {/* Header with Company Branding */}
      <Header />

      {/* Navigation */}
      <NavBar />

      {/* Main Content */}
      <section className="max-w-6xl mx-auto">
        <CurrentGroups />

        {/* Next Shift Section */}
        <NextGroup />

        {/* Current Employees Section */}
        <EmployesCards />
      </section>
    </div>
  );
}
