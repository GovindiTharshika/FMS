import React from 'react';

const StatCard = ({ title, value, icon, iconBgColor }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
      <div className={`p-3 rounded-full mr-4 ${iconBgColor || 'bg-gray-200'}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-semibold text-gray-800">{value}</p>
      </div>
    </div>
  );
};

export default StatCard; 