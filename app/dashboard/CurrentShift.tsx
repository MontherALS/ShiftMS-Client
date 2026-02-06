import React from "react";
import Countdown from "react-countdown";
import { GroupWithObjects } from "../Types/Type";

export default function CurrentShift({ current }: { current: GroupWithObjects[] }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-6 shadow-sm hover:shadow-md transition">
      <div className="flex items-center gap-2 mb-4">
        <h1 className="text-lg sm:text-xl font-semibold text-slate-800">Active Shifts</h1>
      </div>

      <hr className="border-slate-200 mb-4" />

      {current && current.length > 0 ? (
        current.map((g, i) => (
          <div key={i} className="mb-4 p-4 bg-white rounded-xl border border-slate-200">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h2 className="text-base sm:text-lg font-semibold text-slate-700">{g?.name || "N/D"}</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-xl bg-emerald-50 p-4 border border-emerald-200">
                <div className="text-xs uppercase font-semibold text-emerald-700">Started</div>
                <div className="mt-2 text-base sm:text-lg font-bold text-slate-800">{g?.shiftStart || "N/D"}</div>
              </div>

              <div className="rounded-xl bg-amber-50 p-4 border border-amber-200">
                <div className="text-xs uppercase font-semibold text-amber-700">Ends</div>
                <div className="mt-2 text-base sm:text-lg font-bold text-slate-800">{g?.shiftEnd || "N/D"}</div>
              </div>

              <div className="rounded-xl bg-sky-50 p-4 border border-sky-200">
                <div className="text-xs uppercase font-semibold text-sky-700">Remaining</div>
                <div className="mt-2 text-sm sm:text-lg font-bold text-slate-800">
                  {g?._end ? (
                    <Countdown
                      date={g._end}
                      renderer={({ hours, minutes, seconds, completed }) =>
                        completed ? (
                          <span className="text-red-600 text-sm font-semibold">Shift Ended</span>
                        ) : (
                          <span className="font-mono">
                            <span className="hidden sm:inline">
                              {hours}h {minutes}m {seconds}s
                            </span>
                            <span className="sm:hidden">
                              {hours}:{minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}
                            </span>
                          </span>
                        )
                      }
                    />
                  ) : (
                    <span>N/D</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-8">
          <p className="text-sm sm:text-base text-slate-500">No active shifts right now</p>
        </div>
      )}
    </div>
  );
}
