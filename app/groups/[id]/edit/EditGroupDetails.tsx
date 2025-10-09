import React from "react";
import { GroupWithIds, EmployeeType } from "../../../Types/Type";
type propType = {
  handleChange: () => void;
  handleCheckboxChange: () => void;
  handleSubmit: () => void;
  handleDeleteGroup: () => void;
  formData: GroupWithIds;
  group: GroupWithIds;
  employees: EmployeeType[];
  message: string;
};

export default function EditGroupDetails({
  handleChange,
  handleCheckboxChange,
  handleSubmit,
  handleDeleteGroup,
  formData,
  group,
  employees,
  message,
}: propType) {
  return (
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
          <span className="text-red-500 mb-4">{message}</span>
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
              <select
                id="supervisor"
                name="supervisor"
                onChange={handleChange}
                type="text"
                placeholder={group ? group.supervisor?.name : "---"}
                className="mt-2 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-blue-600 focus:outline-none"
              >
                <option value={formData?.supervisor?_id || ""}>
                  {group?.supervisor
                    ? `${group?.supervisor?.name} - ${group?.supervisor.phone}`
                    : ""}
                </option>

                {employees.map((employee) => (
                  <option key={employee._id} value={employee._id}>
                    {employee.name} - {employee.phone}
                  </option>
                ))}
              </select>
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
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Summary</h3>
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
  );
}
