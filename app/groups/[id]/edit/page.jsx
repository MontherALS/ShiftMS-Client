"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
export default function EditGroupPage() {
  const { id } = useParams();
  const router = useRouter();
  const [group, setGroup] = useState(null);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const fetchGroupData = async () => {
      const res = await fetch(`http://localhost:5000/groups/${id}`);

      if (!res.ok) {
        throw new Error("Failed to fetch group data");
      }
      const data = await res.json();
      console.log("Fetched group data:", data);
      setGroup(data);
      setFormData({
        name: data?.name || "",
        supervisor: data?.supervisor || "",
        shiftStart: data?.shiftStart || "",
        shiftEnd: data?.shiftEnd || "",
        workingDays: Array.isArray(data?.workingDays) ? data.workingDays : [],
      });
    };

    fetchGroupData();
  }, [id]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...(prev || {}),
      [name]: value,
    }));
  }
  function handleCheckboxChange(e) {
    const { checked, value } = e.target;

    const currentDays = Array.isArray(formData?.workingDays)
      ? formData.workingDays
      : [];
    const updatedDays = checked
      ? [...currentDays, value]
      : currentDays.filter((day) => day !== value);

    setFormData((prev) => ({
      ...(prev || {}),
      workingDays: updatedDays,
    }));
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/groups/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        console.error("Failed to update group");
        return;
      }
      router.push("/groups");
    } catch (error) {
      console.error("Error updating group:", error);
    }
  }
  // Delete group
  const handleDeleteGroup = async () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this group?"
    );
    if (!confirm) return;
    const res = await fetch(`http://localhost:5000/groups/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      const data = await res.json();
      console.log("Group deleted", data.msg);
      router.push("/groups");
    } else {
      console.error("Failed to delete group");
    }
  };
  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <nav className="text-sm text-gray-500 mb-2">
            <a href="/dashboard" className="hover:text-gray-700">
              Dashboard
            </a>
            <span className="mx-2">/</span>
            <a href="/groups" className="hover:text-gray-700">
              Groups
            </a>
            <span className="mx-2">/</span>
            <span className="text-gray-800">Edit Group</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
                Edit Group
              </h1>
              <p className="text-gray-500 mt-1">
                Update basic details, working days, and members.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="/groups"
                className="inline-flex items-center justify-center px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Back
              </a>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form: Group Details */}
          <section className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Group Details
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Group Name */}
              <div>
                <label
                  htmlFor="groupName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Group Name
                </label>
                <input
                  id="groupName"
                  name="name"
                  value={formData ? formData.name : ""}
                  onChange={handleChange}
                  type="text"
                  placeholder={group ? group.name : "Loading..."}
                  className="mt-2 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-blue-600 focus:outline-none"
                />
              </div>

              {/* Supervisor */}
              <div>
                <label
                  htmlFor="supervisor"
                  className="block text-sm font-medium text-gray-700"
                >
                  Supervisor
                </label>
                <input
                  id="supervisor"
                  name="supervisor"
                  value={formData ? formData.supervisor : ""}
                  onChange={handleChange}
                  type="text"
                  placeholder={group ? group.supervisor : "---"}
                  className="mt-2 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-blue-600 focus:outline-none"
                />
              </div>

              {/* Shift Times */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="shiftStart"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Shift Start
                  </label>
                  <input
                    id="shiftStart"
                    name="shiftStart"
                    onChange={handleChange}
                    value={formData ? formData.shiftStart : ""}
                    type="time"
                    className="mt-2 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-blue-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label
                    htmlFor="shiftEnd"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Shift End
                  </label>
                  <input
                    id="shiftEnd"
                    name="shiftEnd"
                    value={formData ? formData.shiftEnd : ""}
                    onChange={handleChange}
                    type="time"
                    className="mt-2 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-blue-600 focus:outline-none"
                  />
                </div>
              </div>

              {/* Working Days */}
              <div>
                <div className="block text-sm font-medium text-gray-700 mb-2">
                  Working Days
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: "Sat", label: "Sat" },
                    { id: "Sun", label: "Sun" },
                    { id: "Mon", label: "Mon" },
                    { id: "Tue", label: "Tue" },
                    { id: "Wed", label: "Wed" },
                    { id: "Thu", label: "Thu" },
                    { id: "Fri", label: "Fri" },
                  ].map((d) => (
                    <label
                      key={d.id}
                      className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700"
                    >
                      <input
                        type="checkbox"
                        name="workingDays"
                        onChange={handleCheckboxChange}
                        checked={
                          formData ? formData.workingDays.includes(d.id) : false
                        }
                        value={d.id}
                        className="h-4 w-4 rounded border-gray-300 text-blue-600"
                      />
                      <span>{d.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-white shadow-sm hover:bg-blue-700"
                >
                  Save Changes
                </button>
                <a
                  href="/groups"
                  className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </a>
              </div>
            </form>
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
                  {formData && formData.shiftStart && formData.shiftEnd
                    ? `${formData.shiftStart} - ${formData.shiftEnd}`
                    : "Loading..."}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Working Days Count</span>
                <span className="font-medium text-gray-900">
                  {formData ? formData.workingDays.length : 0}
                </span>
              </div>
            </div>
            <hr className="my-4" />
            <button
              type="button"
              onClick={handleDeleteGroup}
              className="w-full inline-flex items-center justify-center rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-red-700 hover:bg-red-100"
            >
              Delete Group
            </button>
          </aside>
        </div>
      </div>
    </main>
  );
}
