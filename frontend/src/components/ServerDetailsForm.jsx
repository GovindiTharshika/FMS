import React, { useState } from 'react';

const osVersions = {
  'ubuntu': [
    'Ubuntu 24.04 LTS (Noble Numbat)',
    'Ubuntu 23.10 (Mantic Minotaur)',
    'Ubuntu 22.04 LTS (Jammy Jellyfish)',
    'Ubuntu 20.04 LTS (Focal Fossa)',
    'Ubuntu 18.04 LTS (Bionic Beaver)',
  ],
  'rocky linux': [
    'Rocky Linux 9.5 (Blue Onyx)',
    'Rocky Linux 9.4',
    'Rocky Linux 9.3',
    'Rocky Linux 8.10 (Green Obsidian)',
    'Rocky Linux 8.9',
  ],
  'suse linux': [
    'SLES 15 SP1',
    'SLES 15 GA',
    'SLES 12 SP4',
    'SLES 12 SP3',
    'SLES 12 SP2',
    'SuSE Linux 6.0',
    'SuSE Linux 7.0',
    'SuSE Linux 8.0',
    'SuSE Linux 9.0',
    'SuSE Linux 10.1',
  ],
  'amazone luinux 1': [
    'Amazon Linux AMI 2011.02 (Beta)',
    'Amazon Linux AMI 2011.09',
    'Amazon Linux AMI 2012.03',
    'Amazon Linux AMI 2012.09',
    'Amazon Linux AMI 2013.03',
  ],
  'amazone luinux 2': [
    'Amazon Linux 2 2.0.20220218.1',
    'Amazon Linux 2 2.0.20220207.1',
    'Amazon Linux 2 2.0.20220121.0',
    'Amazon Linux 2 2.0.20211223.0',
    'Amazon Linux 2 2.0.20211201.0',
  ],
  'fedora': [
    'Fedora 40',
    'Fedora 39',
    'Fedora 38',
    'Fedora 37',
    'Fedora 36',
  ],
  'arch linux': [],
};

const ServerDetailsForm = () => {
  const [hostname, setHostname] = useState('');
  const [ipAddress, setIpAddress] = useState('');
  const [osType, setOsType] = useState('ubuntu');
  const [authToken, setAuthToken] = useState('');
  const [version, setVersion] = useState('Ubuntu 24.04 LTS (Noble Numbat)');

  const handleOsTypeChange = (e) => {
    const selectedOs = e.target.value;
    setOsType(selectedOs);
    const versions = osVersions[selectedOs] || [];
    setVersion(versions.length > 0 ? versions[0] : '');
  };

  const validateIpAddress = (ip) => {
    // Simple regex for IPv4 and IPv6
    const ipv4 = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    const ipv6 = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
    return (ipv4.test(ip) || ipv6.test(ip));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (ipAddress.includes('@')) {
      alert('IP address cannot be an email address.');
      return;
    }
    if (!validateIpAddress(ipAddress)) {
      alert('Please enter a valid IPv4 or IPv6 address.');
      return;
    }

    const serverData = {
      hostname,
      ipAddress,
      osType,
      version,
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
        setOsType('ubuntu');
        setAuthToken('');
        setVersion(osVersions['ubuntu'][0]);
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
            
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="osType" className="block text-sm font-medium text-gray-700 mb-1">OS Type</label>
          <select 
            name="osType" 
            id="osType" 
            value={osType}
            onChange={handleOsTypeChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="ubuntu">ubuntu</option>
            <option value="rocky linux">rocky linux</option>
            <option value="suse linux">suse linux</option>
            <option value="amazone luinux 1">amazone luinux 1</option>
            <option value="amazone luinux 2">amazone luinux 2</option>
            <option value="fedora">fedora</option>
            <option value="arch linux">arch linux</option>
          </select>
        </div>
        <div>
          <label htmlFor="version" className="block text-sm font-medium text-gray-700 mb-1">Version</label>
          <select 
            name="version" 
            id="version" 
            value={version}
            onChange={(e) => setVersion(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            disabled={osVersions[osType].length === 0}
          >
            {osVersions[osType].length === 0 ? (
              <option value="">No versions available</option>
            ) : (
              osVersions[osType].map((ver) => (
                <option key={ver} value={ver}>{ver}</option>
              ))
            )}
          </select>
        </div>
        <div>
          <label htmlFor="authToken" className="block text-sm font-medium text-gray-700 mb-1">Auth Token</label>
          <input 
            type="password"
            name="authToken" 
            id="authToken" 
            value={authToken}
            onChange={(e) => setAuthToken(e.target.value)}
            
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
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