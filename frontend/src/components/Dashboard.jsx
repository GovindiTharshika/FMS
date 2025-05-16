import React from 'react';
import DashboardOverview from './DashboardOverview';
import PatchCompliance from './PatchCompliance';
import RecentActivity from './RecentActivity';

const Dashboard = () => {
  // Sample data could be fetched here or passed as props
  const overviewStats = {
    totalServers: 10,
    pendingUpdates: 4,
    lastUpdate: 'May 12, 2025, 10:00 AM',
  };

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