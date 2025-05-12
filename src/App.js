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
import PdfNotesListing from "./Components/PdfNotes/PdfNotesListing";
import PreviousPaperListing from "./Components/PreviousPaper/PreviousPaperListing";
import SyllabusListing from "./Components/Syllabus/SyllabusListing";
import TestSeriesListing from "./Components/TestSeries/TestSeriesListing";
import TestSeriesListingNew from "./Components/TestSeriesNew/TestSeriesListingNew";
import BannerListing from "./Components/Banner/BannerListing";
import PrivacyPolicy from "./Components/Home/PrivacyPolicy";
import UserHome from "./Components/Home/UserHome";
import BuyCourse from "./Components/Buy Course/BuyCourse";
import ChaptersListing from "./Components/Chapters/ChaptersListing";
import TermsAndCondition from "./Components/Home/TermsAndCondition";
import TestForm from "./Components/TestSeriesNew/Tests/TestForm";

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
            {/* <Route path="/courses" element={<CoursesListing />} /> */}
            <Route path="/courses" element={<NewCoursesListing />} />
            <Route path="/chapters" element={<ChaptersListing />} />
            <Route path="/classes" element={<ClassesListing />} />
            <Route path="/buycourse" element={<BuyCourse />} />
            <Route path="/notes" element={<PdfNotesListing />} />
            <Route path="/previouspaper" element={<PreviousPaperListing />} />
            <Route path="/syllabus" element={<SyllabusListing />} />
            <Route path="/testseries" element={<TestSeriesListing />} />
            <Route path="/testseriesnew" element={<TestSeriesListingNew />} />

            <Route path="/testform" element={<TestForm />} />

            <Route path="/banners" element={<BannerListing />} />
          </>
        ) : (
          <>
          <Route path="/" element={<UserHome />} />
          <Route path="/adlogin" element={<Home />} />
          <Route path="/dashboard" element={<Navigate to="/" />} />
          </>
        )}
        
        
        </Route>
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndCondition />} />
      </Routes>
    </div>
  );
}

export default App;
