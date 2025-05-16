import React from 'react';
import { FiCheckCircle, FiLoader, FiAlertCircle } from 'react-icons/fi';

const DeploymentStatusItem = ({ status }) => {
  const { name, type, time } = status;
  let IconComponent, iconColor, animate;

  if (type === 'completed') {
    IconComponent = FiCheckCircle;
    iconColor = 'text-green-500';
    animate = false;
  } else if (type === 'in-progress') {
    IconComponent = FiLoader;
    iconColor = 'text-yellow-500';
    animate = true;
  } else { // Default or error status
    IconComponent = FiAlertCircle;
    iconColor = 'text-red-500'; // Changed to red for error/alert
    animate = false;
  }

  return (
    <li className="flex justify-between items-center mb-3 pb-3 border-b border-gray-200 last:mb-0 last:pb-0 last:border-b-0">
      <div className="flex items-center">
        <IconComponent className={`${iconColor} mr-2 text-xl ${animate ? 'animate-spin' : ''}`} />
        <span>{name}</span>
      </div>
      <span className="text-sm text-gray-500">{time}</span>
    </li>
  );
};

export default DeploymentStatusItem; 