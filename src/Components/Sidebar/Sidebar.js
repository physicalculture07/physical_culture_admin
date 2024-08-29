import React from "react";
import { FaHome, FaUserAlt, FaCog, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { SetUserData } from "../../store/reducer/authUser";
import { useDispatch } from "react-redux";

function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    dispatch(SetUserData({}));
    navigate("/");
  };

  return (
    <div className="leftMenu">
      <div className="sidebar">
        <div className="sidebar-item">
          <FaHome className="icon" />
          <span>Home</span>
        </div>
        <div className="sidebar-item">
          <FaUserAlt className="icon" />
          <span>Users</span>
        </div>
        <div className="sidebar-item">
          <FaCog className="icon" />
          <span>Settings</span>
        </div>
        <div className="sidebar-item" onClick={handleLogout}>
          <FaSignOutAlt className="icon" />
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
