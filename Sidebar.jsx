import React from 'react';
import { FiGrid, FiServer, FiCloud, FiList, FiSettings } from 'react-icons/fi';

const Sidebar = () => {
  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: <FiGrid /> },
    { id: 'servers', name: 'Servers', icon: <FiServer /> },
    { id: 'deployment', name: 'Deployment', icon: <FiCloud />, active: true },
    { id: 'history', name: 'History', icon: <FiList /> },
    { id: 'settings', name: 'Settings', icon: <FiSettings /> },
  ];

  return (
    <div className="w-64 bg-gray-800 text-white p-5 min-h-screen">
      <h1 className="text-2xl font-semibold mb-10">PatchManager</h1>
      <nav>
        <ul>
          {menuItems.map((item) => (
            <li
              key={item.id}
              className={`mb-4 ${item.active ? 'bg-gray-700 p-2 rounded-md' : ''}`}
            >
              <a href="#" className={`flex items-center ${item.active ? 'text-white' : 'text-gray-300 hover:text-white'}`}>
                <span className="mr-2 text-xl">{item.icon}</span>
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar; 