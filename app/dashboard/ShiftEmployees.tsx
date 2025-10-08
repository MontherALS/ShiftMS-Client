import React from "react";
import { EmployeeType } from "../Types/Type";
export default function ShiftEmployees({
  employees,
}: {
  employees: EmployeeType[];
}) {
  return (
    <ul className="divide-y divide-gray-200">
      {employees.length > 0 || !employees ? (
        employees?.map((employee) => (
          <li
            key={employee._id}
            className="py-3 hover:bg-slate-100 rounded-md transition px-2"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 
                       1.79-4 4 1.79 4 4 4zm0 2c-2.67 
                       0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                  />
                </svg>
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {employee.name}
                  </p>
                  <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-xs text-blue-700 border border-blue-100">
                    {employee.group?.name || "N/A"}
                  </span>
                </div>

                <div className="mt-1 text-xs text-gray-600">
                  <a className="hover:underline" href={`tel:${employee.phone}`}>
                    {employee.phone}
                  </a>
                </div>
              </div>
            </div>
          </li>
        ))
      ) : (
        <p className="text-gray-500">No employees working at the moment</p>
      )}
    </ul>
  );
}
