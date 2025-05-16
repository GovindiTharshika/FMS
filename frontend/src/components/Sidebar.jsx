import React from 'react';
import { FiGrid, FiServer, FiUploadCloud, FiList, FiSettings, FiSearch } from 'react-icons/fi';

// activePage: string (e.g., 'dashboard', 'updates')
// onNavigate: function to call when a menu item is clicked, passing the item's id
const Sidebar = ({ activePage, onNavigate }) => {
  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: <FiGrid /> },
    { id: 'servers', name: 'Servers', icon: <FiServer /> },
    { id: 'deployment', name: 'Deployment', icon: <FiServer /> },
    { id: 'updates', name: 'Updates', icon: <FiUploadCloud /> },
    { id: 'scanning', name: 'Scanning', icon: <FiSearch /> },
    { id: 'history', name: 'History', icon: <FiList /> },
    { id: 'settings', name: 'Settings', icon: <FiSettings /> },
    
  ];

  return (
    <div className="w-64 bg-gray-800 text-white p-5 min-h-screen flex flex-col">
      <h1 className="text-2xl font-semibold mb-10">PatchManager</h1>
      <nav className="flex-grow">
        <ul>
          {menuItems.map((item) => (
            <li
              key={item.id}
              className={`mb-4 p-2 rounded-md cursor-pointer ${activePage === item.id ? 'bg-gray-700' : 'hover:bg-gray-700/50'}`}
              onClick={() => onNavigate(item.id)}
            >
              <div className={`flex items-center ${activePage === item.id ? 'text-white' : 'text-gray-300'}`}>
                <span className="mr-3 text-xl">{item.icon}</span> 
                {item.name}
              </div>
            </li>
          ))}
        </ul>
      </nav>
      {/* Footer or additional links can go here if needed */}
    </div>
  );
};

export default Sidebar; 