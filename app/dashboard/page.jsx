"use client";
import React from "react";
import { useEffect, useState } from "react";
//components
import NavBar from "../components/NavBar";
import Countdown from "react-countdown";

function filterShiftsByDay(shifts, today) {
  const filteredShifts = shifts.filter((s) => s.workingDays.includes(today));
  return filteredShifts;
}
function normalizeShift(shift) {
  const start = toToday(shift.shiftStart);
  const end = toToday(shift.shiftEnd);

  if (end < start) end.setDate(end.getDate() + 1); //overnight
  return { ...shift, _start: start, _end: end };
}

function toToday(hhmm) {
  const [hours, minutes] = hhmm.split(":").map(Number);
  const today = new Date();
  today.setHours(hours, minutes, 0, 0);
  return today;
}

function getCurrentAndNextShift(shifts, now) {
  const sortedShifts = (Array.isArray(shifts) ? shifts : [])
    .map((s) => normalizeShift(s))
    .sort((a, b) => a._start - b._start); //N

  const currentShifts = sortedShifts.filter(
    (e) => now >= e._start && now < e._end
  );

  let nextShifts;
  console.log(currentShifts);
  if (currentShifts.length > 0) {
    nextShifts = sortedShifts.filter(
      (s) => s._start >= now && !currentShifts.includes(s)
    ); //N
  } else {
    nextShifts = sortedShifts.filter((s) => s._start > now);
  }

  return { current: currentShifts, next: nextShifts };
}

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

      const filteredEmployees = data.filter(
        (e) => current.some((shift) => e.group?._id == shift._id) //N
      ); //return only the employees that TRUE
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
        <span className="text-gray-600 text-lg font-medium">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {/* Current Shift */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md hover:shadow-xl transition">
            <h1 className="text-lg font-semibold text-gray-800">
              Current Shifts
            </h1>
            <hr className="my-4" />

            {current && current.length > 0 ? (
              current.map((shift, i) => (
                <div key={i} className="mb-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <h2 className="text-lg font-semibold text-gray-800">
                      {shift?.name || "N/D"}
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="rounded-md bg-gradient-to-tl from-green-600 to-green-400 p-4 text-white shadow hover:scale-105 hover:shadow-lg transition">
                      <div className="text-xs uppercase font-medium">
                        Started
                      </div>
                      <div className="mt-1 text-lg font-semibold">
                        {shift?.shiftStart || "N/D"}
                      </div>
                    </div>

                    <div className="rounded-md bg-gradient-to-tl from-orange-500 to-orange-400 p-4 text-white shadow hover:scale-105 hover:shadow-lg transition">
                      <div className="text-xs uppercase font-medium">Ends</div>
                      <div className="mt-1 text-lg font-semibold">
                        {shift?.shiftEnd || "N/D"}
                      </div>
                    </div>

                    {/* Remaining */}
                    <div className="rounded-md bg-gradient-to-tl from-cyan-600 to-cyan-400 p-4 text-white shadow hover:scale-105 hover:shadow-lg transition">
                      <div className="text-xs uppercase font-medium">
                        Remaining
                      </div>
                      <div className="mt-1 text-lg font-semibold">
                        {shift?._end ? (
                          <Countdown
                            date={shift._end}
                            renderer={({
                              hours,
                              minutes,
                              seconds,
                              completed,
                            }) =>
                              completed ? (
                                <span className="text-red-500">
                                  Shift Ended
                                </span>
                              ) : (
                                <span className="text-white font-bold">
                                  {hours}h {minutes}m {seconds}s
                                </span>
                              )
                            }
                          />
                        ) : (
                          <span>N/D</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No current shifts </p>
            )}
          </div>

          {/* Next Shift */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md hover:shadow-xl transition">
            <h1 className="text-lg font-semibold text-gray-800">Next Shifts</h1>
            <hr className="my-4" />

            {next && next.length > 0 ? (
              next.map((shift, i) => (
                <div key={i} className="mb-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                    <h2 className="text-lg font-semibold text-gray-800">
                      {shift?.name || "N/D"}
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="rounded-md bg-gradient-to-tl from-slate-300/50 to-slate-200/50 p-4 shadow hover:scale-105 hover:shadow-lg transition">
                      <div className="text-xs text-gray-700 uppercase font-medium">
                        Starts
                      </div>
                      <div className="mt-1 text-lg text-gray-800 font-semibold">
                        {shift?.shiftStart || "N/D"}
                      </div>
                    </div>

                    <div className="rounded-md bg-gradient-to-tl from-slate-300/50 to-slate-200/50 p-4 shadow hover:scale-105 hover:shadow-lg transition">
                      <div className="text-xs text-gray-700 uppercase font-medium">
                        Ends
                      </div>
                      <div className="mt-1 text-lg text-gray-800 font-semibold">
                        {shift?.shiftEnd || "N/D"}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No upcoming shifts</p>
            )}
          </div>
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

          <ul className="divide-y divide-gray-200">
            {employees.length > 0 || !employees ? (
              employees?.map((employee) => (
                <li
                  key={employee._id}
                  className="py-3 hover:bg-slate-100 rounded-md transition px-2"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow">
                      <svg
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path
                          d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 
                       1.79-4 4 1.79 4 4 4zm0 2c-2.67 
                       0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                        />
                      </svg>
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {employee.name}
                        </p>
                        <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-xs text-blue-700 border border-blue-100">
                          {employee.group?.name || "N/A"}
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
              ))
            ) : (
              <p className="text-gray-500">
                No employees working at the moment
              </p>
            )}
          </ul>
        </section>
      </main>
    </div>
  );
}
