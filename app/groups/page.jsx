"use client";
import React, { useState } from "react";
import NavBar from "../components/NavBar";
// dummy data for groups
import { dummyEmployees } from "@/util/DUMMY_DATA";

export default function GroupsPage() {
  const [groups, setGroups] = useState(dummyEmployees);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <NavBar />

      <div className="max-w-4xl mx-auto">
        {/* Page Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Groups</h1>
        </div>

        {/* Add New Group Button */}
        <div className="text-center mb-8">
          <button className="bg-white border-2 border-gray-300 hover:border-blue-400 px-8 py-3 text-lg font-medium rounded-lg hover:bg-blue-50 transition-all duration-200 text-gray-700 cursor-pointer">
            Add New Group
          </button>
        </div>

        {/* Groups List */}
        <div className="space-y-4">
          {groups.map((group, i) => (
            <div
              key={i}
              className="bg-white rounded-lg shadow-md border border-gray-200 p-6 flex justify-between items-center hover:shadow-lg transition-shadow duration-200"
            >
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {group.name}
                </h2>
                <p className="text-lg text-gray-600">Admin: {group.admin}</p>
              </div>
              <button className="bg-gray-100 hover:bg-gray-200 border border-gray-300 px-6 py-2 rounded-lg font-medium text-gray-700 transition-colors duration-200 point">
                Edit
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
