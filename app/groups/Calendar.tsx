import React from "react";
import { GroupWithObjects } from "../Types/Type";
export default function Calendar({ groups }: { groups: GroupWithObjects[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
      <table className="min-w-full bg-white text-xs sm:text-sm">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="px-2 sm:px-4 py-2 sm:py-3 text-left min-w-[120px] sm:min-w-[140px]">
              Group
            </th>
            <th className="px-1 sm:px-4 py-2 sm:py-3 min-w-[50px] sm:min-w-[60px]">
              Sat
            </th>
            <th className="px-1 sm:px-4 py-2 sm:py-3 min-w-[50px] sm:min-w-[60px]">
              Sun
            </th>
            <th className="px-1 sm:px-4 py-2 sm:py-3 min-w-[50px] sm:min-w-[60px]">
              Mon
            </th>
            <th className="px-1 sm:px-4 py-2 sm:py-3 min-w-[50px] sm:min-w-[60px]">
              Tue
            </th>
            <th className="px-1 sm:px-4 py-2 sm:py-3 min-w-[50px] sm:min-w-[60px]">
              Wed
            </th>
            <th className="px-1 sm:px-4 py-2 sm:py-3 min-w-[50px] sm:min-w-[60px]">
              Thu
            </th>
            <th className="px-1 sm:px-4 py-2 sm:py-3 min-w-[50px] sm:min-w-[60px]">
              Fri
            </th>
          </tr>
        </thead>
        <tbody>
          {groups.map((group, i) => (
            <tr
              key={i}
              className="border-t text-center hover:bg-gray-50 transition-colors"
            >
              <td className="px-2 sm:px-4 py-2 sm:py-3 text-left">
                <div className="min-w-[100px] sm:min-w-[120px]">
                  <div className="font-medium text-gray-800 text-xs sm:text-sm leading-tight">
                    {group.name}
                  </div>
                  <div className="text-[10px] sm:text-xs text-gray-500 mt-1">
                    {typeof group.supervisor !== "string"
                      ? group.supervisor?.name
                      : "N/A"}
                  </div>
                </div>
              </td>
              {["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"].map((day) => (
                <td
                  key={day}
                  className="px-1 sm:px-2 py-2 sm:py-3 text-gray-700"
                >
                  {group.workingDays.includes(day) ? (
                    group.shiftStart && group.shiftEnd ? (
                      <div className="flex flex-col items-center text-[10px] sm:text-xs leading-tight">
                        <span className="text-green-700 font-medium">
                          {group.shiftStart}
                        </span>
                        <span className="text-gray-400 text-[8px] sm:text-[10px]">
                          -
                        </span>
                        <span className="text-red-700 font-medium">
                          {group.shiftEnd}
                        </span>
                      </div>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
