"use client";
import React from "react";
import { useEffect, useState } from "react";
//components
import NavBar from "../components/NavBar";
// import CurrentGroups from "../components/CurrentGroups";
// import EmployesCards from "../components/EmployesCards";
// import NextGroup from "../components/NextGroup";
import { dummyEmployees } from "@/util/DUMMY_DATA";

export default function DashboardPage() {
  //TODO Add fetch for current groups and employees
  //TODO Add time calculation for next shift
  const [groups, setGroups] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return null;
    }
  }, []);
  useEffect(() => {
    const fetchGroups = async () => {
      const res = await fetch(`http://localhost:5000/groups`);
      if (!res.ok) {
        console.error("Cant fetch groups", res.statusText);
        return;
      }
      const data = await res.json();
      console.log(data);

      setGroups(data);
    };
    fetchGroups();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 p-6">
      {/* Navigation */}
      <NavBar />

      {/* Main Content */}
      <main className="max-w-6xl mx-auto space-y-6">
        {/* Shifts: Current and Next */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Current Shift */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md hover:shadow-xl transition">
            <h1 className="text-lg font-semibold text-gray-800">
              Current Shifts
            </h1>
            <hr className="my-4" />

            {/* Group A */}
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <h2 className="text-lg font-semibold text-gray-800">Group A</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-md bg-gradient-to-tl from-green-600 to-green-400 p-4 text-white shadow hover:scale-105 hover:shadow-lg transition">
                <div className="text-xs uppercase font-medium">Started</div>
                <div className="mt-1 text-lg font-semibold">8:00 AM</div>
              </div>
              <div className="rounded-md bg-gradient-to-tl from-orange-500 to-orange-400 p-4 text-white shadow hover:scale-105 hover:shadow-lg transition">
                <div className="text-xs uppercase font-medium">Ends</div>
                <div className="mt-1 text-lg font-semibold">2:00 PM</div>
              </div>
              <div className="rounded-md bg-gradient-to-tl from-cyan-600 to-cyan-400 p-4 text-white shadow hover:scale-105 hover:shadow-lg transition">
                <div className="text-xs uppercase font-medium">Remaining</div>
                <div className="mt-1 text-lg font-semibold">2h 30m</div>
              </div>
            </div>

            {/* Group B */}
            <div className="flex items-center mt-6 gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <h2 className="text-lg font-semibold text-gray-800">Group B</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-md bg-gradient-to-tl from-green-600 to-green-400 p-4 text-white shadow hover:scale-105 hover:shadow-lg transition">
                <div className="text-xs uppercase font-medium">Started</div>
                <div className="mt-1 text-lg font-semibold">8:00 AM</div>
              </div>
              <div className="rounded-md bg-gradient-to-tl from-orange-500 to-orange-400 p-4 text-white shadow hover:scale-105 hover:shadow-lg transition">
                <div className="text-xs uppercase font-medium">Ends</div>
                <div className="mt-1 text-lg font-semibold">2:00 PM</div>
              </div>
              <div className="rounded-md bg-gradient-to-tl from-cyan-600 to-cyan-400 p-4 text-white shadow hover:scale-105 hover:shadow-lg transition">
                <div className="text-xs uppercase font-medium">Remaining</div>
                <div className="mt-1 text-lg font-semibold">2h 30m</div>
              </div>
            </div>
          </div>

          {/* Next Shift */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md hover:shadow-xl transition">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <h2 className="text-lg font-semibold text-gray-800">
                Next Shift
              </h2>
              <span className="text-sm text-gray-500">Group C</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-md bg-gradient-to-tl from-slate-300/50 to-slate-200/50 p-4 shadow hover:scale-105 hover:shadow-lg transition">
                <div className="text-xs text-gray-700 uppercase font-medium">
                  Starts
                </div>
                <div className="mt-1 text-lg text-gray-800 font-semibold">
                  4:00 PM
                </div>
              </div>
              <div className="rounded-md bg-gradient-to-tl from-slate-300/50 to-slate-200/50 p-4 shadow hover:scale-105 hover:shadow-lg transition">
                <div className="text-xs text-gray-700 uppercase font-medium">
                  Ends
                </div>
                <div className="mt-1 text-lg text-gray-800 font-semibold">
                  10:00 PM
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Current Employees */}
        <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-md hover:shadow-lg transition">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Current Employees
            </h2>
            <span className="text-sm text-gray-500">
              Count: {dummyEmployees.length}
            </span>
          </div>
          <ul className="divide-y divide-gray-200">
            {dummyEmployees.map((employee) => (
              <li
                key={employee.id}
                className="py-3 hover:bg-slate-100 rounded-md transition px-2"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow">
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {employee.name}
                      </p>
                      <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-xs text-blue-700 border border-blue-100">
                        Group A
                      </span>
                    </div>
                    <div className="mt-1 text-xs text-gray-600">
                      <a
                        className="hover:underline"
                        href={`tel:${employee.phone}`}
                      >
                        {employee.phone}
                      </a>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
