import React from "react";

export default function GroupSummary({ group }) {
  return (
    <aside className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Summary</h3>
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
  );
}
