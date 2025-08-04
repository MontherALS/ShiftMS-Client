import React from "react";

export default function NextGroup() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border-l-4 border-blue-500">
      <div className="flex items-center justify-center mb-6">
        <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
        <h2 className="text-3xl font-bold text-gray-800">Next: Group B</h2>
      </div>
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-sm text-gray-500 uppercase tracking-wide font-semibold">
              Starting Time
            </div>
            <div className="text-2xl font-bold text-blue-600">4:00 PM</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-sm text-gray-500 uppercase tracking-wide font-semibold">
              Ending Time
            </div>
            <div className="text-2xl font-bold text-blue-600">10:00 PM</div>
          </div>
        </div>
      </div>
    </div>
  );
}
