import React from 'react';
import DashboardOverview from './DashboardOverview'; // Reusing this component
import ComplianceStatusPlaceholder from './ComplianceStatusPlaceholder';
import RecentActivity from './RecentActivity'; // Reusing this component
import PatchScanningTable from './PatchScanningTable';

const ScanningPage = () => {
  // Sample data for reused components (can be fetched or passed via props)
  const overviewStats = {
    totalServers: 10, // Example data
    pendingUpdates: 4,
    lastUpdate: 'May 12, 2025, 10:00 AM',
  };

  const recentActivitiesData = [
    { id: 1, type: 'patch_applied', text: 'Patch applied to Server1', time: '10:00 AM' },
    { id: 2, type: 'scan_triggered', text: 'Scan triggered for Group: Production', time: '9:30 AM' },
  ];

  return (
    <div className="p-6 bg-gray-100 flex-grow">
      {/* Top row: Overview Stats - same as Dashboard */}
      <DashboardOverview stats={overviewStats} />

      {/* Middle row: Compliance Status and Recent Activity */}
      <div className="flex flex-col lg:flex-row gap-6 my-6">
        <div className="lg:w-1/2 h-[300px]"> {/* Added fixed height for consistent layout */}
          <ComplianceStatusPlaceholder />
        </div>
        <div className="lg:w-1/2 h-[300px]"> {/* Added fixed height */}
          <RecentActivity activities={recentActivitiesData} />
        </div>
      </div>

      {/* Bottom section: Patch Scanning & Reporting Table */}
      <PatchScanningTable />
    </div>
  );
};

export default ScanningPage; 