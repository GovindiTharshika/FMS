import React from 'react';
import { FiCheckCircle, FiSearch } from 'react-icons/fi';

const ActivityItem = ({ activity }) => {
  const { text, time, type } = activity;
  let IconComponent;
  let iconColor;

  switch (type) {
    case 'patch_applied':
      IconComponent = FiCheckCircle;
      iconColor = 'text-green-500';
      break;
    case 'scan_triggered':
      IconComponent = FiSearch;
      iconColor = 'text-blue-500';
      break;
    default:
      IconComponent = FiCheckCircle; // Default icon
      iconColor = 'text-gray-500';
  }

  return (
    <li className="flex items-start p-3 hover:bg-gray-50 rounded-md">
      <IconComponent className={`mr-3 mt-1 ${iconColor}`} size={20} />
      <div className="flex-1">
        <p className="text-sm text-gray-700">{text}</p>
        <p className="text-xs text-gray-500">{time}</p>
      </div>
    </li>
  );
};

export default ActivityItem; 