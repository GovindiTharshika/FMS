import React from 'react';
import { FiUploadCloud, FiRefreshCw } from 'react-icons/fi';

const PatchDeploymentCard = ({
  servers,
  patches,
  selectedServer,
  selectedPatch,
  onServerChange,
  onPatchChange,
  onDeploy,
  onRestart,
  deploymentProgress
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow mb-6">
      <div className="grid grid-cols-2 gap-6 mb-4">
        <div>
          <label htmlFor="server" className="block text-sm font-medium text-gray-700 mb-1">Select Server</label>
          <select 
            id="server" 
            name="server" 
            value={selectedServer}
            onChange={onServerChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            {servers.map(server => <option key={server.id} value={server.id}>{server.name}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="patch" className="block text-sm font-medium text-gray-700 mb-1">Select Patch</label>
          <select 
            id="patch" 
            name="patch" 
            value={selectedPatch}
            onChange={onPatchChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            {patches.map(patch => <option key={patch.id} value={patch.id}>{patch.name}</option>)}
          </select>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-gray-700">Deployment Progress</span>
          <span className="text-sm font-medium text-gray-700">{deploymentProgress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${deploymentProgress}%` }}></div>
        </div>
      </div>

      <div className="flex space-x-4">
        <button 
          onClick={onDeploy}
          className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
        >
          <FiUploadCloud className="mr-2" />
          Deploy Patch
        </button>
        <button 
          onClick={onRestart}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
        >
          <FiRefreshCw className="mr-2" />
          Restart Service
        </button>
      </div>
    </div>
  );
};

export default PatchDeploymentCard; 