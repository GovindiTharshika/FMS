import React from 'react';
import StatCard from './StatCard';
import { FiServer, FiAlertTriangle, FiCalendar } from 'react-icons/fi'; // Updated FiAlertTriangle for Pending Updates

const DashboardOverview = ({ stats }) => {
  // Default stats if none are provided
  const defaultStats = {
    totalServers: 10,
    pendingUpdates: 4,
    lastUpdate: 'May 12, 2025, 10:00 AM',
  };

  const currentStats = stats || defaultStats;

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold text-gray-700 mb-4 p-4 bg-gray-800 text-white rounded-t-lg">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 bg-white rounded-b-lg shadow-md">
        <StatCard 
          title="Total Servers" 
          value={currentStats.totalServers} 
          icon={<FiServer className="text-blue-500" size={24}/>} 
          iconBgColor="bg-blue-100"
        />
        <StatCard 
          title="Pending Updates" 
          value={currentStats.pendingUpdates} 
          icon={<FiAlertTriangle className="text-orange-500" size={24}/>} // Changed icon to FiAlertTriangle
          iconBgColor="bg-orange-100"
        />
        <StatCard 
          title="Last Update" 
          value={currentStats.lastUpdate} 
          icon={<FiCalendar className="text-green-500" size={24}/>} 
          iconBgColor="bg-green-100"
        />
      </div>
    </div>
  );
};

export default DashboardOverview; 