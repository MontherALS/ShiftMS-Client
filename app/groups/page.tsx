"use client";

import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import AddGroupModal from "./AddGroupModal";
import GroupsCards from "./GroupsCards";
import { GroupWithObjects } from "../Types/Type";

export default function GroupsPage() {
  const [groups, setGroups] = useState<GroupWithObjects[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchGroups = async () => {
      try {
        const res = await fetch("http://localhost:5000/groups", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) {
          console.log("Failed to fetch groups");
          return;
        }
        const data: GroupWithObjects[] = await res.json();
        setGroups(data);
      } catch (error) {
        console.log("Error fetching groups:", error);
      }
    };
    fetchGroups();
  }, [isModalOpen]);

  return (
    <>
      <AddGroupModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <div
        className={`min-h-screen bg-gray-50 transition-all duration-300 ${
          isModalOpen ? "blur-sm pointer-events-none" : ""
        }`}
      >
        <NavBar />

        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-semibold text-gray-900 mb-1">
                Groups Management
              </h1>
              <p className="text-gray-600 text-sm">
                Manage your groups and team members
              </p>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors duration-200 shadow-sm"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add New Group
            </button>
          </div>

          <GroupsCards groups={groups} />
        </div>
      </div>
    </>
  );
}
