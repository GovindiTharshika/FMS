import React, { useState } from 'react';

const ServerList = () => {
  // Sample server data - in a real app, this would come from an API
  const [servers, setServers] = useState([
    { id: '1', hostname: 'server-prod-01', ipAddress: '192.168.1.100', os: 'Linux', status: 'online', lastPatchDate: 'May 14, 2025' },
    { id: '2', hostname: 'server-prod-02', ipAddress: '192.168.1.101', os: 'Windows', status: 'offline', lastPatchDate: 'May 13, 2025' },
    { id: '3', hostname: 'server-test-01', ipAddress: '192.168.1.102', os: 'Linux', status: 'online', lastPatchDate: 'May 14, 2025' },
    // Add more servers as needed
  ]);

  const [filter, setFilter] = useState('All Servers');

  const filteredServers = servers.filter(server => {
    if (filter === 'All Servers') return true;
    // Add more sophisticated filtering logic if needed based on status, OS, etc.
    return server.os === filter; // Simple filter by OS for now if not "All Servers"
  });

  const StatusIndicator = ({ status }) => (
    <span className={`inline-block w-3 h-3 rounded-full ${status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`}></span>
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-700">Server List</h3>
        <select 
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option>All Servers</option>
          <option>Linux</option>
          <option>Windows</option>
          {/* Add other filter options as needed */}
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hostname</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP Address</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">OS</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Patch Date</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredServers.map((server) => (
              <tr key={server.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{server.hostname}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{server.ipAddress}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{server.os}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <StatusIndicator status={server.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{server.lastPatchDate}</td>
              </tr>
            ))}
            {filteredServers.length === 0 && (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">No servers found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ServerList; 