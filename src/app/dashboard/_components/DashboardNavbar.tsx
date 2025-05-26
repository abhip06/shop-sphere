import React from 'react'
import DashboardSearchBar from './DashboardSearchBar';
import DashboardNavIcons from './DashboardNavIcons';

const DashboardNavbar = () => {
    let darkMode = true;
  return (
    <div className={`w-full h-20 px-12 ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"} flex justify-between items-center`}>
        <DashboardSearchBar />
        <DashboardNavIcons />
    </div>
  )
}

export default DashboardNavbar