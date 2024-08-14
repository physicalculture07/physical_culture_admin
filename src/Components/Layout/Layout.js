import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'
import Sidebar from '../Sidebar/Sidebar'

function Layout() {
  return (
    // <div>




    //     <Header/>
    //     <Outlet/>
    //     <Footer/>

    // </div>


<div className="mainRoot">
  {/* <Sidebar/> */}
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