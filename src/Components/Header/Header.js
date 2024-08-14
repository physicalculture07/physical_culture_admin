import React from "react";
import { Link } from "react-router-dom";
import { FaBell, FaUser } from "react-icons/fa";
import { RiApps2Fill } from "react-icons/ri";

import { FaAngleDown, FaMagnifyingGlass } from "react-icons/fa6";
import { IoIosLogOut } from "react-icons/io";
import { IoGlobeOutline, IoNotificationsOutline, IoSearch } from "react-icons/io5";
import Dropdown from 'react-bootstrap/Dropdown';

import { Select } from 'antd';


import { TbLogout, TbUserStar } from "react-icons/tb";

const { Option } = Select;


const Header=()=>{
   

    return(
        <>
            <header>
                <div className="container-fluid d-none">
                    <div className="row">
                        <div className="col-xl-7">
                            <ul className="nav-ul">
                                <li> <Link to ="/">Home</Link></li>
                                <li> <Link to ="/products">Display & Video360</Link></li>
                                <li><Link to="/add">Google Demo Patner</Link></li>
                                <li><Link to= "/update">Demo Advertisement</Link></li>
                               

                            </ul>
                        </div>
                        <div className="col-xl-5">
                            <ul className="nav-ul iconLink text-end">
                                <li><Link><FaMagnifyingGlass /></Link></li>
                                <li><Link><FaBell /></Link></li>
                                <li><Link><FaUser  /></Link></li>
                               <IoIosLogOut />
                                <li><Link><RiApps2Fill /></Link></li>
                               user
                               
                            </ul>
                        </div>
                    </div>
                </div>


                <div className="row">
                    <div className="col-xl-5">
                        {/* <div className="searchBox">
                            <input className="form-control" type="text" />
                            <span className="icon"><IoSearch /></span>
                        </div> */}
                    </div>
                    <div className="col-xl-7">
                        <div className="rightMenu">
                            <ul>
                                <li>
                                  
                                </li>
                                <li>
                                    <div className="hadNotification"><IoNotificationsOutline /></div>
                                </li>
                                <li className="userClass">
                                    <Dropdown>
                                        <Dropdown.Toggle className="userBtn" id="dropdown-basic"><img className="me-2" src="/Image/user.png" />
                                       Ashish Belwal <FaAngleDown className="arrowIcon" /></Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item href="#" ><span><TbUserStar /></span> User Preferences</Dropdown.Item>
                                            <Dropdown.Item href="#" ><span><IoGlobeOutline /></span> Add Social Media</Dropdown.Item>
                                            <Dropdown.Item href="#" ><span><TbLogout /></span> Log Out</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </li>
                                        
                               

                            </ul>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header