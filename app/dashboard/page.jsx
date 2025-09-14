"use client";
import React from "react";
import { useEffect, useState } from "react";
//components
import NavBar from "../components/NavBar";
import CurrentShift from "./CurrentShift";
import NextShift from "./NextShift";
import ShiftEmployees from "./ShiftEmployees";
import Calendar from "../groups/Calendar";
//logic
import { getCurrentAndNextShift, filterShiftsByDay } from "@/lib/shifts";

export default function DashboardPage() {
  //*State's
  const [now, setNow] = useState(new Date());
  const [shifts, setShifts] = useState([]);
  const [employees, setEmployees] = useState([]);

  const todayName = new Date().toLocaleDateString("en-US", {
    weekday: "short",
  });

  const todayShifts = filterShiftsByDay(shifts, todayName);

  const { current, next } = getCurrentAndNextShift(todayShifts, now);

  useEffect(() => {
    const fetchGroups = async () => {
      const res = await fetch(`http://localhost:5000/groups`);

      if (!res.ok) return;

      const data = await res.json();
      setShifts(data);
    };
    fetchGroups();
  }, []);

  useEffect(() => {
    const fetchEmployees = async () => {
      const res = await fetch("http://localhost:5000/employees");

      if (!res) return console.error("Cant fetch employees", res.statusText);
      const data = await res.json();

      const filteredEmployees = data.filter((e) =>
        current.some((shift) => e.group?._id == shift._id)
      );
      setEmployees(filteredEmployees);
    };

    fetchEmployees();
  }, [current]);

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 p-6">
      {/* Navigation */}
      <NavBar />

      {/* Main Content */}
      <main className="max-w-6xl mx-auto space-y-6">
        <span className="text-gray-600 text-sm font-medium mb-4 block">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
        <Calendar groups={shifts} />
        {/* Shifts Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {/* Current and Next Shift */}
          <CurrentShift current={current} />
          <NextShift next={next} />
        </section>

        {/* Current Employees */}
        <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-md hover:shadow-lg transition">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Current Employees
            </h2>
            <span className="text-sm text-gray-500">
              Count: {employees.length}
            </span>
          </div>

          <ShiftEmployees employees={employees} />
        </section>
      </main>
    </div>
  );
}
