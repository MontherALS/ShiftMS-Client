import React from "react";
import { EmployeeType } from "../Types/Type";

export default function ShiftEmployees({
  employees,
}: {
  employees: EmployeeType[];
}) {
  const avatarColors = [
    "from-pink-500 to-rose-500",
    "from-blue-500 to-indigo-500",
    "from-green-500 to-emerald-500",
    "from-purple-500 to-violet-500",
    "from-orange-500 to-amber-500",
    "from-teal-500 to-cyan-500",
  ];

  return (
    <ul className="divide-y divide-gray-100">
      {employees && employees.length > 0 ? (
        employees.map((employee, index) => (
          <li
            key={employee._id}
            className="py-3 sm:py-4 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 rounded-xl transition-all duration-300 px-2 sm:px-3 hover:scale-101 hover:shadow-md"
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <div
                className={`h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-gradient-to-br ${
                  avatarColors[index % avatarColors.length]
                } text-white flex items-center justify-center shadow-lg ring-2 ring-white ring-offset-1 sm:ring-offset-2`}
              >
                <svg
                  className="h-5 w-5 sm:h-6 sm:w-6"
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
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                  <p className="text-sm sm:text-base font-bold text-gray-900 truncate flex items-center gap-2">
                    {employee.name}
                  </p>
                  <span className="inline-flex items-center rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 px-2 sm:px-3 py-1 text-xs font-bold text-blue-800 border-2 border-blue-200 shadow-sm self-start sm:self-auto">
                    🏢{" "}
                    <span className="hidden xs:inline">
                      {employee.group?.name || "N/A"}
                    </span>
                    <span className="xs:hidden">
                      {(employee.group?.name || "N/A").substring(0, 10)}
                    </span>
                  </span>
                </div>

                <div className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-600 flex items-center gap-2">
                  <span>📞</span>
                  <a
                    className="hover:text-blue-600 hover:underline font-medium transition-colors"
                    href={`tel:${employee.phone}`}
                  >
                    {employee.phone}
                  </a>
                </div>
              </div>
            </div>
          </li>
        ))
      ) : (
        <div className="text-center py-6 sm:py-8">
          <p className="text-sm sm:text-base text-gray-600 font-medium">
            No employees working at the moment
          </p>
        </div>
      )}
    </ul>
  );
}
