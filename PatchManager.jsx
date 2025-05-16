import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import PatchDeploymentCard from './PatchDeploymentCard';
import DeploymentStatusCard from './DeploymentStatusCard';

const PatchManager = () => {
  // Sample data - in a real app, this would come from an API or state management
  const [servers, setServers] = useState([
    { id: 'server-prod-01', name: 'server-prod-01' },
    { id: 'server-dev-01', name: 'server-dev-01' },
  ]);
  const [patches, setPatches] = useState([
    { id: 'openssl-1.1.1u', name: 'openssl-1.1.1u' },
    { id: 'nginx-1.22.1', name: 'nginx-1.22.1' },
    { id: 'kernel-5.4.0', name: 'kernel-5.4.0' },
  ]);

  const [selectedServer, setSelectedServer] = useState(servers[0].id);
  const [selectedPatch, setSelectedPatch] = useState(patches[0].id);
  const [deploymentProgress, setDeploymentProgress] = useState(50);

  const [deploymentStatuses, setDeploymentStatuses] = useState([
    { id: 1, name: 'openssl-1.1.1u deployment completed', type: 'completed', time: '2 minutes ago' },
    { id: 2, name: 'nginx-1.22.1 deployment in progress', type: 'in-progress', time: '5 minutes ago' },
  ]);

  const handleServerChange = (event) => {
    setSelectedServer(event.target.value);
  };

  const handlePatchChange = (event) => {
    setSelectedPatch(event.target.value);
  };

  const handleDeploy = () => {
    console.log(`Deploying patch ${selectedPatch} to server ${selectedServer}`);
    // Simulate deployment progress
    setDeploymentProgress(0);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      if (progress <= 100) {
        setDeploymentProgress(progress);
      } else {
        clearInterval(interval);
        // Add to deployment statuses
        const newStatus = {
          id: Date.now(), // simple unique id
          name: `${selectedPatch} deployment completed`,
          type: 'completed',
          time: 'just now'
        };
        setDeploymentStatuses(prevStatuses => [newStatus, ...prevStatuses]);
      }
    }, 200);
  };

  const handleRestart = () => {
    console.log(`Restarting service on server ${selectedServer}`);
    // Add logic for restarting service
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-6">
          <h2 className="text-3xl font-semibold mb-6">Patch Deployment</h2>
          <PatchDeploymentCard 
            servers={servers}
            patches={patches}
            selectedServer={selectedServer}
            selectedPatch={selectedPatch}
            onServerChange={handleServerChange}
            onPatchChange={handlePatchChange}
            onDeploy={handleDeploy}
            onRestart={handleRestart}
            deploymentProgress={deploymentProgress}
          />
          <DeploymentStatusCard deploymentStatuses={deploymentStatuses} />
        </main>
      </div>
    </div>
  );
};

export default PatchManager; 