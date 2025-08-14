"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function EditGroupPage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [group, setGroup] = useState(null);

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const res = await fetch(`http://localhost:5000/groups/${id}`);
        if (!res.ok) throw new Error("Failed to fetch group");
        const data = await res.json();
        setGroup(data);
        console.log("Fetched group:", data);
      } catch (e) {
        console.error(e);
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
        {/* Header */}
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

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Details */}
          <section className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Group Details
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="text-sm text-gray-500">Supervisor</div>
                <div className="text-gray-900 font-medium">
                  {group?.supervisor.name || "—"}
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
                      href={`tel:${group?.supervisor.phone}`}
                    >
                      {group?.supervisor.phone || "—"}
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

          {/* Summary */}
          <aside className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Summary
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Shift</span>
                <span className="font-medium text-gray-900">
                  {group?.shiftStart && group?.shiftEnd
                    ? `${group.shiftStart} - ${group.shiftEnd}`
                    : "—"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Working Days Count</span>
                <span className="font-medium text-gray-900">
                  {group.workingDays.length}
                </span>
              </div>
            </div>
          </aside>
        </div>

        {/* Team members */}
        <section className="mt-6 bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Team Members
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Count:{" "}
                <span className="font-medium text-gray-900">
                  {group?.employees.length || 0}
                </span>
              </p>
            </div>
            <Link
              href="/add-employee"
              className="inline-flex items-center gap-2 text-blue-700 hover:text-blue-800 text-sm"
            >
              Add Employee
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="size-4"
              >
                <path d="M10.75 4a.75.75 0 00-1.5 0v5.25H4a.75.75 0 000 1.5h5.25V16a.75.75 0 001.5 0v-5.25H16a.75.75 0 000-1.5h-5.25V4z" />
              </svg>
            </Link>
          </div>

          {group.employees && group.employees.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {group.employees.map((e, idx) => (
                <div
                  key={e._id || e.id || idx}
                  className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative h-12 w-12 shrink-0 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold">
                      {e.avatar ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={e.avatar}
                          alt={e.name}
                          className="h-full w-full rounded-full object-cover"
                        />
                      ) : (
                        <span>{group.employees.name}</span>
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="truncate text-sm font-semibold text-gray-900">
                          {e.name || "—"}
                        </h3>
                      </div>
                      <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-gray-600">
                        <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-blue-700 border border-blue-100">
                          {e.position || "Employee"}
                        </span>
                        {e.phoneNumber || e.phone ? (
                          <span className="inline-flex items-center gap-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              className="size-4 text-gray-400"
                            >
                              <path d="M2 3.5A1.5 1.5 0 013.5 2h1.337c.6 0 1.12.42 1.235 1.01l.488 2.44a1.25 1.25 0 01-.72 1.385l-1.03.412a10.5 10.5 0 005.142 5.142l.412-1.03a1.25 1.25 0 011.385-.72l2.44.488c.59.116 1.01.635 1.01 1.235V16.5A1.5 1.5 0 0114.5 18h-1A11.5 11.5 0 012 7.5v-4z" />
                            </svg>
                            <a
                              className="hover:underline"
                              href={`tel:${e.phone}`}
                            >
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
      </div>
    </main>
  );
}
