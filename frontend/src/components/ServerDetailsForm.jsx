import React, { useState } from 'react';

const ServerDetailsForm = () => {
  const [hostname, setHostname] = useState('');
  const [ipAddress, setIpAddress] = useState('');
  const [osType, setOsType] = useState('Linux');
  const [authToken, setAuthToken] = useState('');
  const [action, setAction] = useState('Add Server');
const handleSubmit = async (e) => {
  e.preventDefault();

  const serverData = {
    hostname,
    ipAddress,
    osType,
  };

  try {
    const response = await fetch('http://localhost:3001/api/servers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(serverData),
    });

    const result = await response.json();
    if (response.ok) {
      alert('Server added successfully!');
      // Reset form
      setHostname('');
      setIpAddress('');
      setOsType('Linux');
      setAuthToken('');
      setAction('Add Server');
    } else {
      alert(`Error: ${result.error}`);
    }
  } catch (error) {
    console.error('Request failed:', error);
    alert('Failed to add server. Check console for details.');
  }
};



  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-gray-700 mb-6">Server Details</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="hostname" className="block text-sm font-medium text-gray-700 mb-1">Host Name</label>
          <input 
            type="text" 
            name="hostname" 
            id="hostname" 
            value={hostname}
            onChange={(e) => setHostname(e.target.value)}
            placeholder="server-name"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="ipAddress" className="block text-sm font-medium text-gray-700 mb-1">IP Address</label>
          <input 
            type="text" 
            name="ipAddress" 
            id="ipAddress" 
            value={ipAddress}
            onChange={(e) => setIpAddress(e.target.value)}
            placeholder="XXX.XXX.XXX.XXX"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="osType" className="block text-sm font-medium text-gray-700 mb-1">OS Type</label>
          <select 
            name="osType" 
            id="osType" 
            value={osType}
            onChange={(e) => setOsType(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option>Linux</option>
            <option>Windows</option>
            {/* Add other OS types as needed */}
          </select>
        </div>
        <div>
          <label htmlFor="authToken" className="block text-sm font-medium text-gray-700 mb-1">Auth Token</label>
          <input 
            type="password" // Changed to password for security, or use text if preferred
            name="authToken" 
            id="authToken" 
            value={authToken}
            onChange={(e) => setAuthToken(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="action" className="block text-sm font-medium text-gray-700 mb-1">Action</label>
          <select 
            name="action" 
            id="action" 
            value={action}
            onChange={(e) => setAction(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option>Add Server</option>
            <option>Update Server</option>
            <option>Remove Server</option>
          </select>
        </div>
        <div>
          <button 
            type="submit" 
            className="w-full bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ServerDetailsForm; 