import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import UpdatesPage from './components/UpdatesPage'; // Renamed from PatchManager
import ServerManagementPage from './components/ServerManagementPage'; // Import the new page
import ScanningPage from './components/ScanningPage'; // Import the new ScanningPage
import AIInsights from './components/AIInsights';
import './index.css'; // Ensure Tailwind styles are imported

function App() {
  const [activePage, setActivePage] = useState('dashboard'); // For sidebar highlight
  const [currentPage, setCurrentPage] = useState('dashboard'); // For displayed content

  const handleNavigate = (pageId) => {
    setCurrentPage(pageId); // Always update displayed content
    if (pageId !== 'scanning') {
      setActivePage(pageId); // Only update sidebar highlight if not scanning
    }
  };

  let CurrentPage;
  switch (currentPage) {
    case 'dashboard':
      CurrentPage = Dashboard;
      break;
    case 'updates': // This corresponds to the old "Deployment" page
      CurrentPage = UpdatesPage;
      break;
    case 'deployment': // Added case for Deployment
      CurrentPage = UpdatesPage; // It will render the same page as Updates
      break;
    case 'servers': // Added case for Servers
      CurrentPage = ServerManagementPage;
      break;
    case 'scanning': // Added case for Scanning
      CurrentPage = ScanningPage;
      break;
    case 'ai-insights': // Added case for AI Insights
      CurrentPage = AIInsights;
      break;
    // Add cases for 'history', 'settings' when those pages are built
    default:
      CurrentPage = Dashboard; // Fallback to dashboard
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activePage={activePage} onNavigate={handleNavigate} />
      <div className="flex-1 flex flex-col overflow-y-auto">
        <Header />
        <CurrentPage /> 
      </div>
    </div>
  );
}

export default App; 