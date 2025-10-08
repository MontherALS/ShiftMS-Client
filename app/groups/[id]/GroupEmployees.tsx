import React from "react";

import { GroupType, EmployeeType } from "../../Types/Type";
export default function GroupEmployees({ group }: { group: GroupType }) {
  return (
    <section className="mt-6 bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Team Members</h2>
          <p className="text-sm text-gray-500 mt-1">
            Count:{" "}
            <span className="font-medium text-gray-900">
              {group?.employees.length || 0}
            </span>
          </p>
        </div>
      </div>

      {group.employees && group.employees.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {group.employees.map((e: EmployeeType, idx) => (
            <div
              key={e._id || idx}
              className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-center gap-4">
                <div className="relative h-12 w-12 shrink-0 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold">
                  <span>{e.name?.charAt(0)}</span>
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="truncate text-sm font-semibold text-gray-900">
                      {e.name || "—"}
                    </h3>
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-gray-600">
                    {e.phone || e.phone ? (
                      <span className="inline-flex items-center gap-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="size-4 text-gray-400"
                        >
                          <path d="M2 3.5A1.5 1.5 0 013.5 2h1.337c.6 0 1.12.42 1.235 1.01l.488 2.44a1.25 1.25 0 01-.72 1.385l-1.03.412a10.5 10.5 0 005.142 5.142l.412-1.03a1.25 1.25 0 011.385-.72l2.44.488c.59.116 1.01.635 1.01 1.235V16.5A1.5 1.5 0 0114.5 18h-1A11.5 11.5 0 012 7.5v-4z" />
                        </svg>
                        <a className="hover:underline" href={`tel:${e.phone}`}>
                          {e.phone}
                        </a>
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-gray-600 text-sm">
          No employees linked to this group yet.
        </div>
      )}
    </section>
  );
}
