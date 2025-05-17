import React, { useEffect, useState } from 'react';
import DashboardOverview from './DashboardOverview';
import PatchCompliance from './PatchCompliance';
import RecentActivity from './RecentActivity';

const Dashboard = () => {
  const [overviewStats, setOverviewStats] = useState({
    totalServers: 0,
    pendingUpdates: 0,
    lastUpdate: 'Loading...',
  });

  useEffect(() => {
    fetch('http://localhost:3001/api/servers/count')
      .then(res => res.json())
      .then(data => {
        setOverviewStats(prev => ({
          ...prev,
          totalServers: data.totalServers,
          lastUpdate: new Date().toLocaleString(), // or fetch this from backend if needed
        }));
      })
      .catch(err => console.error('Failed to fetch total servers:', err));
  }, []);

  const patchComplianceData = {
    appliedPercentage: 70,
  };

  const recentActivitiesData = [
    { id: 1, type: 'patch_applied', text: 'Patch applied to Server1', time: '10:00 AM' },
    { id: 2, type: 'scan_triggered', text: 'Scan triggered for Group: Production', time: '9:30 AM' },
    { id: 3, type: 'patch_applied', text: 'Security update KB12345 applied to Server2', time: 'Yesterday' },
    { id: 4, type: 'scan_triggered', text: 'Scan completed for Group: Staging', time: '2 days ago' },
  ];

  return (
    <div className="p-6 bg-gray-100 flex-grow">
      <DashboardOverview stats={overviewStats} />
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-2/3">
          <PatchCompliance appliedPercentage={patchComplianceData.appliedPercentage} />
        </div>
        <div className="lg:w-1/3">
          <RecentActivity activities={recentActivitiesData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
