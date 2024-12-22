import axios from "axios";
import React, { useState } from "react";
import { FaRegEnvelope } from "react-icons/fa";
import { FiKey } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import './Homepage.css';


const UserHome = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (

        <div className="homepage">
            {/* Hero Section */}
            <header className="hero">
                <div className="hero-content">
                    <h1>Welcome to Physical Culture</h1>
                    <p>Your Gateway to Quality Education</p>
                    <a
                        href="https://play.google.com/store/apps/details?id=com.physicalCultureNew.physical_culture"
                        className="download-link"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Download Our App
                    </a>
                </div>
            </header>

            {/* Features Section */}
            <section className="features">
                <h2>Why Choose Us?</h2>
                <div className="features-list">
                    <div className="feature-item">
                        <h3>Expert Tutors</h3>
                        <p>Learn from industry-leading educators and subject experts.</p>
                    </div>
                    <div className="feature-item">
                        <h3>Comprehensive Resources</h3>
                        <p>Access videos, notes, test series, and previous year papers.</p>
                    </div>
                    <div className="feature-item">
                        <h3>Flexible Learning</h3>
                        <p>Learn at your own pace anytime, anywhere.</p>
                    </div>
                </div>
            </section>

            {/* Footer Section */}
            <footer className="footer">
                <p>&copy; {new Date().getFullYear()} Physical Culture. All Rights Reserved.</p>
            </footer>
        </div>


    );
};

export default UserHome;
