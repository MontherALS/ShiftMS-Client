import React from "react";

export default function GroupDetails({ group }) {
  return (
    <section className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Group Details
      </h2>
      <div className="grid sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <div className="text-sm text-gray-500">Supervisor</div>
          <div className="text-gray-900 font-medium">
            {group?.supervisor?.name || "—"}
          </div>
          <span className="text-sm text-gray-500 flex gap-1 items-center">
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-4 text-gray-400"
            >
              <path d="M2 3.5A1.5 1.5 0 013.5 2h1.337c.6 0 1.12.42 1.235 1.01l.488 2.44a1.25 1.25 0 01-.72 1.385l-1.03.412a10.5 10.5 0 005.142 5.142l.412-1.03a1.25 1.25 0 011.385-.72l2.44.488c.59.116 1.01.635 1.01 1.235V16.5A1.5 1.5 0 0114.5 18h-1A11.5 11.5 0 012 7.5v-4z" />
            </svg>
            <span className="text-gray-600">
              <a
                className="hover:underline"
                href={`tel:${group?.supervisor?.phone || ""}`}
              >
                {group?.supervisor?.phone || "N/A"}
              </a>
            </span>
          </span>
        </div>

        <div className="space-y-2">
          <div className="text-sm text-gray-500">Working Days</div>
          <div className="flex flex-wrap gap-2">
            {group?.workingDays.length ? (
              group.workingDays.map((d) => (
                <span
                  key={d}
                  className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100 text-sm font-medium"
                >
                  {d}
                </span>
              ))
            ) : (
              <span className="text-gray-600">None</span>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm text-gray-500">Shift Start</div>
          <div className="text-gray-900 font-medium">
            {group?.shiftStart || "—"}
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm text-gray-500">Shift End</div>
          <div className="text-gray-900 font-medium">
            {group?.shiftEnd || "—"}
          </div>
        </div>
      </div>
    </section>
  );
}
