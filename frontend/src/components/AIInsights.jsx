import React from 'react';

const anomalyData = [
  {
    timestamp: 'May 14, 2025, 1:00 PM',
    server: 'Server1',
    type: 'Performance Drop',
    status: 'In Progress',
  },
  {
    timestamp: 'May 13, 2025, 3:00 PM',
    server: 'Server2',
    type: 'Security Issue',
    status: 'Resolved',
  },
];

const statusBadge = (status) => {
  if (status === 'In Progress') {
    return <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-semibold">{status}</span>;
  }
  if (status === 'Resolved') {
    return <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold">{status}</span>;
  }
  return <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs">{status}</span>;
};

const AIInsights = () => {
  return (
    <div className="p-2 sm:p-4 md:p-6 bg-gray-100 flex-grow">
      <h2 className="text-2xl font-semibold mb-4 sm:mb-6">AI Insights & Anomaly Detection</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow flex flex-col items-start">
          <span className="text-gray-500 text-sm mb-2">Next Patch Forecast</span>
          <span className="text-2xl font-bold">May 20, 2025</span>
        </div>
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow flex flex-col items-start">
          <span className="text-gray-500 text-sm mb-2">Critical Updates Predicted</span>
          <span className="text-2xl font-bold">2</span>
        </div>
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow flex flex-col items-start">
          <span className="text-gray-500 text-sm mb-2">Trend Analysis</span>
          <span className="text-2xl font-bold">Stable</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Anomaly Detection</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Server</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {anomalyData.map((row, idx) => (
                  <tr key={idx}>
                    <td className="px-4 py-2 whitespace-nowrap text-gray-700">{row.timestamp}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-gray-700">{row.server}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-gray-700">{row.type}</td>
                    <td className="px-4 py-2 whitespace-nowrap">{statusBadge(row.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow flex flex-col items-start">
          <h3 className="text-lg font-semibold mb-4">Trend Analysis</h3>
          <div className="flex-1 w-full h-48 flex items-center justify-center bg-gray-100 rounded">
            <span className="text-gray-400">Anomaly Trend Chart</span>
          </div>
        </div>
      </div>
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow mt-4 sm:mt-6">
        <h3 className="text-lg font-semibold mb-4">System Performance Impact</h3>
        <div className="w-full h-32 flex items-center justify-center bg-gray-100 rounded">
          <span className="text-gray-400">Performance Impact Timeline</span>
        </div>
      </div>
    </div>
  );
};

export default AIInsights; 