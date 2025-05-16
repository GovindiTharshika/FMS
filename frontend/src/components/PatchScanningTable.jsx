import React, { useState } from 'react';
import { FiSearch, FiDownload } from 'react-icons/fi';

const PatchScanningTable = () => {
  // Sample data - in a real app, this would come from an API
  const [scanResults, setScanResults] = useState([
    {
      id: '1',
      packageName: 'openssl',
      currentVersion: '1.1.1t',
      updatedVersion: '1.1.1u',
      cveId: 'CVE-2023-0466',
      cvssScore: '9.8',
      description: 'Remote code execution vulnerability in OpenSSL',
    },
    {
      id: '2',
      packageName: 'nginx',
      currentVersion: '1.22.0',
      updatedVersion: '1.22.1',
      cveId: 'CVE-2023-1234',
      cvssScore: '7.5',
      description: 'HTTP request smuggling vulnerability',
    },
    {
      id: '3',
      packageName: 'apache2',
      currentVersion: '2.4.54',
      updatedVersion: '2.4.55',
      cveId: 'CVE-2023-5678',
      cvssScore: '5.2',
      description: 'DoS vulnerability in mod_proxy',
    },
  ]);

  const [selectedServer, setSelectedServer] = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');

  // Placeholder for server options - would typically come from state/API
  const serverOptions = [
    { value: 'all', label: 'All Servers' },
    { value: 'server-prod-01', label: 'server-prod-01' },
    { value: 'server-prod-02', label: 'server-prod-02' },
  ];

  const handleScanNow = () => {
    console.log(`Scanning server: ${selectedServer} with severity: ${severityFilter}`);
    // Add actual scan logic here
  };

  const handleExportCsv = () => {
    console.log('Exporting CSV...');
    // Add CSV export logic here
  };

  const getScoreColor = (score) => {
    const s = parseFloat(score);
    if (s >= 9.0) return 'bg-red-500 text-white';
    if (s >= 7.0) return 'bg-orange-500 text-white';
    if (s >= 4.0) return 'bg-yellow-500 text-black';
    return 'bg-green-500 text-white';
  };

  // Filtering logic (placeholder - can be expanded)
  const filteredResults = scanResults; // No actual filtering applied yet

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <h3 className="text-xl font-semibold text-gray-700 mb-4">Patch Scanning & Reporting</h3>
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
        <div className="flex gap-4">
          <select 
            value={selectedServer} 
            onChange={(e) => setSelectedServer(e.target.value)}
            className="border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          >
            {serverOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>
          <select 
            value={severityFilter} 
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="all">All Severity</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={handleScanNow}
            className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-md inline-flex items-center text-sm"
          >
            <FiSearch className="mr-2" />
            Scan Now
          </button>
          <button 
            onClick={handleExportCsv}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-md inline-flex items-center text-sm"
          >
            <FiDownload className="mr-2" />
            Export CSV
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Package Name</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Version</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Updated Version</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CVE ID</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CVSS Score</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredResults.map((result) => (
              <tr key={result.id} className="hover:bg-gray-50">
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{result.packageName}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{result.currentVersion}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{result.updatedVersion}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{result.cveId}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 py-1 rounded-md text-xs font-semibold ${getScoreColor(result.cvssScore)}`}>
                    {result.cvssScore}
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-normal text-sm text-gray-500 min-w-[200px]">{result.description}</td>
              </tr>
            ))}
            {filteredResults.length === 0 && (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">No scan results found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatchScanningTable; 