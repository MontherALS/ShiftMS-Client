"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import NavBar from "../components/NavBar";
import AddGroupModal from "../components/AddGroupModal";

export default function GroupsPage() {
  const [groups, setGroups] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const res = await fetch("http://localhost:5000/groups");
        if (!res.ok) {
          console.error("Failed to fetch groups");
          return;
        }
        const data = await res.json();
        console.log("Fetched groups:", data);
        setGroups(data);
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };
    fetchGroups();
  }, [isModalOpen]);

  return (
    <>
      {/* Modal */}
      <AddGroupModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Main Page Content */}
      <div
        className={`min-h-screen bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0] p-6 transition-all duration-300 ${
          isModalOpen
            ? " bg-gray-500 blur-lg pointer-events-none select-none"
            : ""
        }`}
      >
        <NavBar />

        <div className="max-w-6xl mx-auto space-y-10">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
            <h1 className="text-4xl font-bold text-gray-800 text-center sm:text-left">
              Group Schedule Overview
            </h1>

            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-4 sm:mt-0 bg-white border-2 border-gray-300 hover:border-blue-400 px-6 py-2 text-lg font-medium rounded-lg hover:bg-blue-50 transition-all duration-200 text-gray-700"
            >
              + Add New Group
            </button>
          </div>

          {/* Schedule Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg text-sm">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="px-4 py-3 text-left">Group</th>
                  <th className="px-4 py-3">Sat</th>
                  <th className="px-4 py-3">Sun</th>
                  <th className="px-4 py-3">Mon</th>
                  <th className="px-4 py-3">Tue</th>
                  <th className="px-4 py-3">Wed</th>
                  <th className="px-4 py-3">Thu</th>
                  <th className="px-4 py-3">Fri</th>
                </tr>
              </thead>
              <tbody>
                {groups.map((group, i) => (
                  <tr key={i} className="border-t text-center">
                    <td className="px-4 py-2 text-left font-medium text-gray-800">
                      {group.name} <br />
                      <span className="text-sm text-gray-500">
                        Admin: {group.supervisor.name || "N/A"}
                      </span>
                    </td>
                    {["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"].map(
                      (day) => (
                        <td key={day} className="px-4 py-2 text-gray-700">
                          {group.workingDays.includes(day)
                            ? group.shiftStart && group.shiftEnd
                              ? `${group.shiftStart} - ${group.shiftEnd}`
                              : "-"
                            : "-"}
                        </td>
                      )
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Group Cards */}
          <div className="grid gap-6">
            {groups.map((group, i) => (
              <div
                key={i}
                className="bg-white rounded-lg shadow-md border border-gray-200 p-6 flex justify-between items-center hover:shadow-lg transition-shadow duration-200"
              >
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    {group.name}
                  </h2>
                  <p className="text-lg text-gray-600">
                    Admin: {group.supervisor ? group.supervisor.name : "N/A"}
                  </p>
                </div>

                <Link
                  className="bg-gray-100 hover:bg-gray-200 border border-gray-300 px-6 py-2 rounded-lg font-medium text-gray-700 transition-colors duration-200"
                  href={`/groups/${group._id}`}
                >
                  Details
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
