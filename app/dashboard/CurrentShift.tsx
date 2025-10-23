import React from "react";
import Countdown from "react-countdown";
import { GroupWithObjects } from "../Types/Type";

export default function CurrentShift({
  current,
}: {
  current: GroupWithObjects[];
}) {
  return (
    <div className="rounded-2xl border-2 border-purple-100 bg-gradient-to-br from-purple-50 via-white to-pink-50 p-4 sm:p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-101">
      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
        <h1 className="text-lg sm:text-xl font-bold text-black bg-clip-text">
          Active Shifts
        </h1>
      </div>
      <hr className="border-purple-200 my-3 sm:my-4" />

      {current && current.length > 0 ? (
        current.map((g, i) => (
          <div
            key={i}
            className="mb-4 sm:mb-6 p-3 sm:p-4 bg-white/70 rounded-xl border border-purple-100 backdrop-blur-sm"
          >
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div className="relative">
                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-gradient-to-r from-emerald-400 to-green-500 animate-pulse block" />
                <span className="absolute inset-0 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-400 animate-ping" />
              </div>
              <h2 className="text-base sm:text-lg font-bold text-gray-800 flex items-center gap-2">
                {g?.name || "N/D"}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              <div className="rounded-xl bg-gradient-to-br from-emerald-500 via-green-500 to-teal-500 p-3 sm:p-4 text-white shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-emerald-300/50">
                <div className="text-xs uppercase font-bold opacity-90 flex items-center gap-1">
                  Started
                </div>
                <div className="mt-1 sm:mt-2 text-base sm:text-lg font-black tracking-tight">
                  {g?.shiftStart || "N/D"}
                </div>
              </div>

              <div className="rounded-xl bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 p-3 sm:p-4 text-white shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-amber-300/50">
                <div className="text-xs uppercase font-bold opacity-90 flex items-center gap-1">
                  Ends
                </div>
                <div className="mt-1 sm:mt-2 text-base sm:text-lg font-black tracking-tight">
                  {g?.shiftEnd || "N/D"}
                </div>
              </div>

              <div className="rounded-xl bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-500 p-3 sm:p-4 text-white shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-cyan-300/50">
                <div className="text-xs uppercase font-bold opacity-90 flex items-center gap-1">
                  Remaining
                </div>
                <div className="mt-1 sm:mt-2 text-sm sm:text-lg font-black tracking-tight">
                  {g?._end ? (
                    <Countdown
                      date={g._end}
                      renderer={({ hours, minutes, seconds, completed }) =>
                        completed ? (
                          <span className="text-red-300 animate-pulse text-xs sm:text-base">
                            🔚 Shift Ended
                          </span>
                        ) : (
                          <span className="text-white font-black animate-pulse">
                            <span className="hidden sm:inline">
                              {hours}h {minutes}m {seconds}s
                            </span>
                            <span className="sm:hidden">
                              {hours}:{minutes.toString().padStart(2, "0")}:
                              {seconds.toString().padStart(2, "0")}
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
        <div className="text-center py-6 sm:py-8">
          <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">😴</div>
          <p className="text-sm sm:text-base text-gray-600 font-medium">
            No active shifts right now
          </p>
        </div>
      )}
    </div>
  );
}
