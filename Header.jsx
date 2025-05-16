import React from 'react';
import { FiBell, FiUser } from 'react-icons/fi';

const Header = () => {
  return (
    <header className="bg-white shadow p-4 flex justify-end items-center">
      <div className="flex items-center">
        <FiBell className="mr-4 text-xl text-gray-600 hover:text-gray-800 cursor-pointer" />
        <FiUser className="text-xl text-gray-600 hover:text-gray-800 cursor-pointer" />
      </div>
    </header>
  );
};

export default Header; 