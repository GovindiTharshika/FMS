import React from 'react';
import PatchScanningTable from './PatchScanningTable';

const ScanningPage = () => {
  return (
    <div className="p-6 bg-gray-100 flex-grow">
      {/* Bottom section: Patch Scanning & Reporting Table */}
      <PatchScanningTable />
    </div>
  );
};

export default ScanningPage; 