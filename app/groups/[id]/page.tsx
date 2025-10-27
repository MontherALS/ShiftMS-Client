"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { authFetch } from "../../../lib/authFetch";

import { GroupWithObjects } from "../../Types/Type";
//Components
import GroupEmployees from "./GroupEmployees";
import GroupHeader from "../../components/GroupHeader";
import GroupDetails from "./GroupDetails";
import GroupSummary from "./GroupSummary";

export default function EditGroupPage() {
  const params = useParams();
  const { id } = params;
  const [group, setGroup] = useState<GroupWithObjects>({} as GroupWithObjects);

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const res = await authFetch(`http://localhost:5000/groups/${id}`);

        if (!res) return console.log("Failed to fetch group");

        const data: GroupWithObjects = await res.json();

        setGroup(data);
      } catch (e: any) {
        console.log(e.message);
      }
    };
    fetchGroup();
  }, [id]);

  if (!group) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center bg-gray-50">
        <div
          className="h-10 w-10 rounded-full border-2 border-gray-300 border-t-blue-600 animate-spin"
          aria-label="Loading"
        />
      </div>
    );
  }

  return (
    <main dir="ltr" className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <GroupHeader group={group} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <GroupDetails group={group} />

          <GroupSummary group={group} />
        </div>

        <GroupEmployees group={group} />
      </div>
    </main>
  );
}
