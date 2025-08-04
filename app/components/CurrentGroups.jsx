import React from "react";

export default function CurrentGroups() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border-l-4 border-green-500">
      <div className="flex items-center justify-center mb-6">
        <div className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></div>
        <h2 className="text-3xl font-bold text-gray-800">Current: Group A</h2>
      </div>
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-sm text-gray-500 uppercase tracking-wide font-semibold">
              Shift Started
            </div>
            <div className="text-2xl font-bold text-green-600">8:00 AM</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-sm text-gray-500 uppercase tracking-wide font-semibold">
              Shift Ending
            </div>
            <div className="text-2xl font-bold text-blue-600">2:00 PM</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-sm text-gray-500 uppercase tracking-wide font-semibold">
              Time Remaining
            </div>
            <div className="text-2xl font-bold text-orange-600">2h 30m</div>
          </div>
        </div>
      </div>
    </div>
  );
}
