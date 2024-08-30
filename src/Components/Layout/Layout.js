import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'
import Sidebar from '../Sidebar/Sidebar'
import { useSelector } from 'react-redux'

function Layout() {

  const data = useSelector((state) => state?.authUser);

  const token = data?.data?.token;

  return (
      
    <div className="mainRoot">
      {token && <Sidebar/>}
      <div className="mainContent">
        <Header/>
        <div className="px-5 py-4">
          <Outlet/>
        </div>
      </div>
    </div>

  )
}

export default Layout