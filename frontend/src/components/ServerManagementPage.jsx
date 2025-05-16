import React from 'react';
import ServerDetailsForm from './ServerDetailsForm';
import ServerList from './ServerList';

const ServerManagementPage = () => {
  return (
    <div className="p-6 bg-gray-100 flex-grow">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Server Management</h2>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-1/3">
          <ServerDetailsForm />
        </div>
        <div className="lg:w-2/3">
          <ServerList />
        </div>
      </div>
    </div>
  );
};

export default ServerManagementPage; 