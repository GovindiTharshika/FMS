import React from 'react';

const PatchCompliance = ({ appliedPercentage = 70 }) => {
  const pendingPercentage = 100 - appliedPercentage;
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const appliedStrokeDashoffset = circumference - (appliedPercentage / 100) * circumference;
  // To make the pending part appear as the remainder, we start it from where applied ends.
  // However, for a simple two-color donut, we can draw two arcs.
  // The second arc (pending) will be lighter and drawn underneath or as a full circle with the applied part overlayed.

  // For simplicity, we draw a full light gray circle and then the darker applied part over it.

  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex-1">
      <h3 className="text-xl font-semibold text-gray-700 mb-4">Patch Compliance</h3>
      <div className="flex flex-col items-center">
        <svg width="200" height="200" viewBox="0 0 200 200" className="mb-4">
          {/* Background circle for pending part */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="transparent"
            stroke="#e5e7eb" // light gray for pending (bg-gray-200)
            strokeWidth="25"
          />
          {/* Foreground circle for applied part */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="transparent"
            stroke="#374151" // dark gray for applied (bg-gray-700)
            strokeWidth="25"
            strokeDasharray={circumference}
            strokeDashoffset={appliedStrokeDashoffset}
            transform="rotate(-90 100 100)" // Start the arc from the top
          />
        </svg>
        <div className="flex justify-center space-x-4">
          <div className="flex items-center">
            <span className="w-4 h-4 bg-gray-700 rounded-sm mr-2"></span>
            <span className="text-sm text-gray-600">Applied ({appliedPercentage}%)</span>
          </div>
          <div className="flex items-center">
            <span className="w-4 h-4 bg-gray-200 rounded-sm mr-2"></span>
            <span className="text-sm text-gray-600">Pending ({pendingPercentage}%)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatchCompliance; 