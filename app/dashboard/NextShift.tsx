import React from "react";
import { GroupWithObjects } from "../Types/Type";

export default function NextShift({ next }: { next: GroupWithObjects[] }) {
  return (
    <div className="rounded-2xl border-2 border-indigo-100 bg-gradient-to-br from-purple-50 via-white to-pink-50 p-4 sm:p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-101">
      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
        <h1 className="text-lg sm:text-xl font-bold text-black bg-clip-text">
          Upcoming Shifts
        </h1>
      </div>
      <hr className="border-indigo-200 my-3 sm:my-4" />

      {next && next.length > 0 ? (
        next.map((g, i) => (
          <div
            key={i}
            className="mb-4 sm:mb-6 p-3 sm:p-4 bg-white/70 rounded-xl border border-indigo-100 backdrop-blur-sm"
          >
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <h2 className="text-base sm:text-lg font-bold text-gray-800 flex items-center gap-2">
                {g?.name || "N/D"}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="rounded-xl bg-gradient-to-br from-violet-400 via-purple-500 to-indigo-500 p-3 sm:p-4 text-white shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-violet-300/50">
                <div className="text-xs uppercase font-bold opacity-90 flex items-center gap-1">
                  Starts
                </div>
                <div className="mt-1 sm:mt-2 text-base sm:text-lg font-black tracking-tight">
                  {g?.shiftStart || "N/D"}
                </div>
              </div>

              <div className="rounded-xl bg-gradient-to-br from-rose-400 via-pink-500 to-purple-500 p-3 sm:p-4 text-white shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-rose-300/50">
                <div className="text-xs uppercase font-bold opacity-90 flex items-center gap-1">
                  Ends
                </div>
                <div className="mt-1 sm:mt-2 text-base sm:text-lg font-black tracking-tight">
                  {g?.shiftEnd || "N/D"}
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-6 sm:py-8">
          <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">📅</div>
          <p className="text-sm sm:text-base text-gray-600 font-medium">
            No upcoming shifts scheduled
          </p>
        </div>
      )}
    </div>
  );
}
