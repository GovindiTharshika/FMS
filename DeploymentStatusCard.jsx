import React from 'react';
import DeploymentStatusItem from './DeploymentStatusItem';

const DeploymentStatusCard = ({ deploymentStatuses }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-4">Deployment Status</h3>
      <ul>
        {deploymentStatuses.map(status => (
          <DeploymentStatusItem key={status.id} status={status} />
        ))}
      </ul>
    </div>
  );
};

export default DeploymentStatusCard; 