import React from "react";
import { FaHome, FaUserAlt, FaCog, FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
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
        <Link to="/">
          <div className="sidebar-item">
            <FaHome className="icon" />
            <span>Home</span>
          </div>
        </Link>
        <Link to="/users">
          <div className="sidebar-item">
            <FaUserAlt className="icon" />
            <span>Users</span>
          </div>
        </Link>

        <Link to="/banners">
          <div className="sidebar-item">
            <FaUserAlt className="icon" />
            <span>Banners</span>
          </div>
        </Link>

        <Link to="/courses">
          <div className="sidebar-item">
            <FaUserAlt className="icon" />
            <span>Courses</span>
          </div>
        </Link>

        <Link to="/classes">
          <div className="sidebar-item">
            <FaUserAlt className="icon" />
            <span>Classes</span>
          </div>
        </Link>

        <Link to="/notes">
          <div className="sidebar-item">
            <FaUserAlt className="icon" />
            <span>Notes</span>
          </div>
        </Link>

        <Link to="/previouspaper">
          <div className="sidebar-item">
            <FaUserAlt className="icon" />
            <span>Previous Paper</span>
          </div>
        </Link>

        <Link to="/syllabus">
          <div className="sidebar-item">
            <FaUserAlt className="icon" />
            <span>Syllabus</span>
          </div>
        </Link>

        <Link to="/testseries">
          <div className="sidebar-item">
            <FaUserAlt className="icon" />
            <span>Test Series</span>
          </div>
        </Link>

        <Link to="/buycourse">
          <div className="sidebar-item">
            <FaUserAlt className="icon" />
            <span>Buy Course</span>
          </div>
        </Link>

        
        <div className="sidebar-item" onClick={handleLogout}>
          <FaSignOutAlt className="icon" />
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
