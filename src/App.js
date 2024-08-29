import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Sidebar from "./Components/Sidebar/Sidebar";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import UserListing from "./Components/Users/Listing";
import CoursesListing from "./Components/Courses/Listing";
import NewCoursesListing from "./Components/Courses/NewCoursesListing";
import ClassesListing from "./Components/Classes/ClassesListing";

function App() {
  // const userData = localStorage.getItem("userData");
  const navigate=useNavigate();

  const data = useSelector((state) => state?.authUser);

  const token = data?.data?.token;

  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
      />

      <Routes>
        <Route path="/" element={<Layout />}>
        {token ? (
          <>
            <Route path="/" element={<Sidebar />} />
            <Route path="/dashboard" element={<Sidebar />} />
            <Route path="/users" element={<UserListing />} />
            <Route path="/courses" element={<CoursesListing />} />
            <Route path="/abc" element={<NewCoursesListing />} />
            <Route path="/abc2" element={<ClassesListing />} />
          </>
        ) : (
          <>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Navigate to="/" />} />
          </>
        )}
      </Route>
      </Routes>
    </div>
  );
}

export default App;
