import React from "react";
import Countdown from "react-countdown";
import { GroupWithObjects } from "../Types/Type";

export default function CurrentShift({
  current,
}: {
  current: GroupWithObjects[];
}) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md hover:shadow-xl transition">
      <h1 className="text-lg font-semibold text-gray-800">Current Shifts</h1>
      <hr className="my-4" />

      {current && current.length > 0 ? (
        current.map((g, i) => (
          <div key={i} className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <h2 className="text-lg font-semibold text-gray-800">
                {g?.name || "N/D"}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-md bg-gradient-to-tl from-green-600 to-green-400 p-4 text-white shadow hover:scale-105 hover:shadow-lg transition">
                <div className="text-xs uppercase font-medium">Started</div>
                <div className="mt-1 text-lg font-semibold">
                  {g?.shiftStart || "N/D"}
                </div>
              </div>

              <div className="rounded-md bg-gradient-to-tl from-orange-500 to-orange-400 p-4 text-white shadow hover:scale-105 hover:shadow-lg transition">
                <div className="text-xs uppercase font-medium">Ends</div>
                <div className="mt-1 text-lg font-semibold">
                  {g?.shiftEnd || "N/D"}
                </div>
              </div>

              {/* Remaining */}
              <div className="rounded-md bg-gradient-to-tl from-cyan-600 to-cyan-400 p-4 text-white shadow hover:scale-105 hover:shadow-lg transition">
                <div className="text-xs uppercase font-medium">Remaining</div>
                <div className="mt-1 text-lg font-semibold">
                  {g?._end ? (
                    <Countdown
                      date={g._end}
                      renderer={({ hours, minutes, seconds, completed }) =>
                        completed ? (
                          <span className="text-red-500">Shift Ended</span>
                        ) : (
                          <span className="text-white font-bold">
                            {hours}h {minutes}m {seconds}s
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
        <p className="text-gray-500">No current shifts </p>
      )}
    </div>
  );
}
