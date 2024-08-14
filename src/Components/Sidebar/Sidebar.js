import React from 'react'
import { FaHome, FaUserAlt, FaCog, FaSignOutAlt } from 'react-icons/fa';

function Sidebar() {
  return (
    <div className='leftMenu'>
<div className="sidebar">
      <div className="sidebar-item">
        <FaHome className="icon" />
        <span>Home</span>
      </div>
      <div className="sidebar-item">
        <FaUserAlt className="icon" />
        <span>Profile</span>
      </div>
      <div className="sidebar-item">
        <FaCog className="icon" />
        <span>Settings</span>
      </div>
      <div className="sidebar-item">
        <FaSignOutAlt className="icon" />
        <span>Logout</span>
      </div>
    </div>
    </div>
  )
}

export default Sidebar