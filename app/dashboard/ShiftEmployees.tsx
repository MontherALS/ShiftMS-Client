import React from "react";
import { EmployeeType } from "../Types/Type";

export default function ShiftEmployees({ employees }: { employees: EmployeeType[] }) {
  return (
    <ul className="divide-y divide-slate-200">
      {employees && employees.length > 0 ? (
        employees.map((employee) => (
          <li key={employee._id} className="py-4 px-3 rounded-xl transition hover:bg-slate-50">
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div className="h-11 w-11 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center ring-2 ring-white">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 
                  1.79-4 4 1.79 4 4 4zm0 2c-2.67 
                  0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                  />
                </svg>
              </div>

              {/* Info */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm sm:text-base font-semibold text-slate-800 truncate">{employee.name}</p>

                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 border border-slate-200">
                    {employee.group?.name || "N/A"}
                  </span>
                </div>

                <div className="mt-1 text-xs sm:text-sm text-slate-500 flex items-center gap-2">
                  <span>📞</span>
                  <a href={`tel:${employee.phone}`} className="hover:text-slate-700 hover:underline font-medium">
                    {employee.phone}
                  </a>
                </div>
              </div>
            </div>
          </li>
        ))
      ) : (
        <div className="text-center py-8">
          <p className="text-sm sm:text-base text-slate-500">No employees working at the moment</p>
        </div>
      )}
    </ul>
  );
}
