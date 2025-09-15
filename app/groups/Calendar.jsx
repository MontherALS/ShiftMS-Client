import React from "react";

//TODO move this file to dashboard folder

export default function Calendar({ groups }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300 rounded-lg text-sm">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="px-4 py-3 text-left">Group</th>
            <th className="px-4 py-3">Sat</th>
            <th className="px-4 py-3">Sun</th>
            <th className="px-4 py-3">Mon</th>
            <th className="px-4 py-3">Tue</th>
            <th className="px-4 py-3">Wed</th>
            <th className="px-4 py-3">Thu</th>
            <th className="px-4 py-3">Fri</th>
          </tr>
        </thead>
        <tbody>
          {groups.map((group, i) => (
            <tr key={i} className="border-t text-center">
              <td className="ml-5 px-2 py-3 text-left font-medium text-gray-800">
                {group.name} <br />
                <span className="text-[12px] text-left  text-gray-500">
                  {group?.supervisor?.name || "N/A"}
                </span>
              </td>
              {["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"].map((day) => (
                <td key={day} className=" text-gray-700 ">
                  {group.workingDays.includes(day) ? (
                    group.shiftStart && group.shiftEnd ? (
                      <div className="whitespace-pre-line py-2">
                        <span className="text-green-800">
                          {group.shiftStart}
                        </span>
                        <br />
                        -
                        <br />
                        <span className="text-red-800">{group.shiftEnd}</span>
                      </div>
                    ) : (
                      "-"
                    )
                  ) : (
                    "-"
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
