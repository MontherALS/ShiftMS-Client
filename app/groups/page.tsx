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
    const fetchGroups = async () => {
      try {
        const res = await fetch("http://localhost:5000/groups");
        if (!res.ok) {
          console.error("Failed to fetch groups");
          return;
        }
        const data: GroupWithObjects[] = await res.json();
        setGroups(data);
      } catch (error) {
        console.error("Error fetching groups:", error);
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
        className={`min-h-screen bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0] p-6 transition-all duration-300 ${
          isModalOpen
            ? " bg-gray-500 blur-lg pointer-events-none select-none"
            : ""
        }`}
      >
        <NavBar />

        <div className="max-w-6xl mx-auto space-y-10">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
            <h1 className="text-4xl font-bold text-gray-800 text-center sm:text-left">
              Groups Managment
            </h1>

            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-4 sm:mt-0 bg-white border-2 border-gray-300 hover:border-blue-400 px-6 py-2 text-lg font-medium rounded-lg hover:bg-blue-50 transition-all duration-200 text-gray-700"
            >
              + Add New Group
            </button>
          </div>

          <GroupsCards groups={groups} />
        </div>
      </div>
    </>
  );
}
