import React from 'react';
import ActivityItem from './ActivityItem';

const RecentActivity = ({ activities }) => {
  // Default activities if none are provided
  const defaultActivities = [
    { id: 1, type: 'patch_applied', text: 'Patch applied to Server1', time: '10:00 AM' },
    { id: 2, type: 'scan_triggered', text: 'Scan triggered for Group: Production', time: '9:30 AM' },
    // Add more sample activities if needed
  ];

  const currentActivities = activities || defaultActivities;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex-1">
      <h3 className="text-xl font-semibold text-gray-700 mb-4">Recent Activity</h3>
      {currentActivities.length > 0 ? (
        <ul className="space-y-2">
          {currentActivities.map(activity => (
            <ActivityItem key={activity.id} activity={activity} />
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500">No recent activity.</p>
      )}
    </div>
  );
};

export default RecentActivity; 