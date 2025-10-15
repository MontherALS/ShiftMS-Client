import React from "react";
import Link from "next/link";
import { GroupWithObjects } from "../Types/Type";
export default function GroupsCards({
  groups,
}: {
  groups: GroupWithObjects[];
}) {
  return (
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
              Supervisor:{" "}
              {typeof group.supervisor !== "string"
                ? group.supervisor?.name
                : "N/A"}
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
  );
}
