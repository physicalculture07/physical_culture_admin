import axios from "axios";
import React, { useState } from "react";
import { FaRegEnvelope } from "react-icons/fa";
import { FiKey } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SetUserData } from "../../store/reducer/authUser";
import apiURl from "../../store/Action/api-url";


const Home = () => {
    const [mobileNo, setMobileNo] = useState("");
    const [password, setPassword] = useState("");
    const [userData, setUserData] = useState("");
    const navigate=useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            mobileNo: mobileNo,
            password: password,
        };
        try {
            const respons = await axios.post(
                `${process.env.REACT_APP_API_BACKEND_URL+apiURl.login}`,
                payload
            );

            if (respons?.data?.status === "true") {
                localStorage.setItem("userData", JSON.stringify(respons?.data))
                setUserData(respons?.data);
                dispatch(SetUserData(respons?.data));
                // toast.success(respons?.data?.message);
                navigate('/dashboard'); 
            }else {
                alert(respons?.data?.message)
            }
        } catch (error) {
            alert(error?.response?.data?.message);
        }
        //  navigate('/dashboard'); 

    };

    return (
        <div className="d-flex flex-column min-vh-100">
 
        <div className="login-container">
                 

            <div className="login-form">
                <h3 className="text-center my-4 position-relative title "style={{ fontSize:"30px"}}>
                    Log In
                </h3>
                <div className="px-md-3 px-lg-4 px-xl-5 mt-4">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3 inputWithIcon">
                            <span className="icon">
                                <FaRegEnvelope />
                            </span>
                            <input
                                placeholder="Your mobile"
                                type="text"
                                className="form-control"
                                id="mobile"
                                value={mobileNo}
                                onChange={(e) => setMobileNo(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group mb-4 inputWithIcon">
                            <span className="icon">
                                <FiKey />
                            </span>
                            <input
                                placeholder="Password"
                                type="password"
                                className="form-control"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btnLogin btn-primary text-center mt-4">
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>

        </div>
    );
};

export default Home;
