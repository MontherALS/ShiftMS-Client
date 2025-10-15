import React from "react";
import {
  GroupWithObjects,
  GroupWithIds,
  EmployeeType,
} from "../../../Types/Type";

type PropType = {
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleDeleteGroup: () => void;
  formData: GroupWithIds;
  group: GroupWithObjects | null;
  employees: EmployeeType[];
  message: string;
};
export default function AddMembers({
  group,
  employees,
  formData,
  handleCheckboxChange,
}: PropType) {
  return (
    <section className="max-w-6xl mx-auto px-4">
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm w-full">
          <div className="px-6 py-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Add Members</h3>
          </div>
          <div className="border-t border-gray-100 max-h-80 overflow-y-auto divide-y divide-gray-100">
            {employees.length > 0 ? (
              employees.map((employee, idx) => (
                <label
                  key={employee._id}
                  className="flex items-center justify-between gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      name="employees"
                      value={employee._id}
                      checked={
                        formData && employee._id
                          ? formData.employees.includes(employee._id)
                          : false
                      }
                      onChange={handleCheckboxChange}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600"
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-600">
                        {employee.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        {employee.email} · {employee.phone}
                      </span>
                    </div>
                  </div>

                  <span className="text-xs px-2 py-1 rounded-full border bg-gray-50 text-gray-600 border-gray-200">
                    Add
                  </span>
                </label>
              ))
            ) : (
              <div className="px-6 py-4 text-sm text-gray-500">
                No employees available
              </div>
            )}
          </div>
        </div>
        <aside className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Current Employees
          </h3>

          {!group && (
            <div className="text-sm text-gray-500">Loading employees...</div>
          )}

          {group &&
            (!Array.isArray(group.employees) ||
              group.employees.length === 0) && (
              <div className="text-sm text-gray-500">
                No employees in this group.
              </div>
            )}
          {Array.isArray(group?.employees) &&
            group.employees.length > 0 &&
            group.employees.map((e) => (
              <div
                key={e._id}
                className="text-sm text-gray-900 flex items-center my-2 justify-between"
              >
                <span>
                  {" "}
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500 inline-block mr-2" />
                  {e.name} - {e.phone}
                </span>
              </div>
            ))}
        </aside>
      </div>
    </section>
  );
}
