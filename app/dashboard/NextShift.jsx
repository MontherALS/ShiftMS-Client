import React from "react";

export default function NextShift({ next }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md hover:shadow-xl transition">
      <h1 className="text-lg font-semibold text-gray-800">Next Shifts</h1>
      <hr className="my-4" />

      {next && next.length > 0 ? (
        next.map((shift, i) => (
          <div key={i} className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <h2 className="text-lg font-semibold text-gray-800">
                {shift?.name || "N/D"}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-md bg-gradient-to-tl from-slate-300/50 to-slate-200/50 p-4 shadow hover:scale-105 hover:shadow-lg transition">
                <div className="text-xs text-gray-700 uppercase font-medium">
                  Starts
                </div>
                <div className="mt-1 text-lg text-gray-800 font-semibold">
                  {shift?.shiftStart || "N/D"}
                </div>
              </div>

              <div className="rounded-md bg-gradient-to-tl from-slate-300/50 to-slate-200/50 p-4 shadow hover:scale-105 hover:shadow-lg transition">
                <div className="text-xs text-gray-700 uppercase font-medium">
                  Ends
                </div>
                <div className="mt-1 text-lg text-gray-800 font-semibold">
                  {shift?.shiftEnd || "N/D"}
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No upcoming shifts</p>
      )}
    </div>
  );
}
