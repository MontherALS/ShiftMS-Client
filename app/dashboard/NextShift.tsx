import React from "react";
import { GroupWithObjects } from "../Types/Type";

export default function NextShift({ next }: { next: GroupWithObjects[] }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-6 shadow-sm hover:shadow-md transition">
      <div className="flex items-center gap-2 mb-4">
        <h1 className="text-lg sm:text-xl font-semibold text-slate-800">Upcoming Shifts</h1>
      </div>

      <hr className="border-slate-200 mb-4" />

      {next && next.length > 0 ? (
        next.map((g, i) => (
          <div key={i} className="mb-4 p-4 bg-white rounded-xl border border-slate-200">
            <h2 className="text-base sm:text-lg font-semibold text-slate-700 mb-4">{g?.name || "N/D"}</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl bg-slate-100 p-4 border border-slate-200">
                <div className="text-xs uppercase font-semibold text-slate-500">Starts</div>
                <div className="mt-2 text-base sm:text-lg font-bold text-slate-800">{g?.shiftStart || "N/D"}</div>
              </div>

              <div className="rounded-xl bg-slate-100 p-4 border border-slate-200">
                <div className="text-xs uppercase font-semibold text-slate-500">Ends</div>
                <div className="mt-2 text-base sm:text-lg font-bold text-slate-800">{g?.shiftEnd || "N/D"}</div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-8">
          <div className="text-5xl mb-4">📅</div>
          <p className="text-sm sm:text-base text-slate-500">No upcoming shifts scheduled</p>
        </div>
      )}
    </div>
  );
}
