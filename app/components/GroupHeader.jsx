import React from "react";
import Link from "next/link";
export default function ({ group, id }) {
  return (
    <div className="mb-8">
      <nav className="text-sm text-gray-500 mb-2">
        <Link href="/dashboard" className="hover:text-gray-700">
          Dashboard
        </Link>
        <span className="mx-2">/</span>
        <Link href="/groups" className="hover:text-gray-700">
          Groups
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800">{group?.name || id}</span>
      </nav>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
            {group?.name || "Group"}
          </h1>
          <p className="text-gray-500 mt-1">Group ID: {id}</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href={`/groups/${id}/edit`}
            className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-sm"
          >
            Edit Group
          </Link>

          <Link
            href="/groups"
            className="inline-flex items-center justify-center px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Back
          </Link>
        </div>
      </div>
    </div>
  );
}
