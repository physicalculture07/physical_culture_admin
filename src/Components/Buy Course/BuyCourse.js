import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { IoClose } from "react-icons/io5";
import Modal from "react-bootstrap/Modal";
import apiURl from "../../store/Action/api-url";
import ProgressBar from 'react-bootstrap/ProgressBar'; // Import Bootstrap ProgressBar component
import Spinner from 'react-bootstrap/Spinner'; // Import Bootstrap Spinner component
import axios from "axios";

const BuyCourse = () => {
  const [showCreate, setShowCreate] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [classesData, setClassesData] = useState({
    userId: "",
    courseId: "",
    purchaseDate: "",
    transactionId:"",
    amount: "",
    comment: "",
    paymentStatus: "",
  });

  const [classes, setClasses] = useState([]);
  const [courses, setCourses] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  
  // New state variables for loader and progress bar
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const classTypeDataOptions = [{"name": "Demo Class","value": "Free"}, {"name": "Paid Class","value": "Paid"}]

  useEffect(() => {
    fetchClasses();
    fetchCourses();
    fetchUsers();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BACKEND_URL+apiURl.all_buys}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      
      setClasses(data?.data);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BACKEND_URL+apiURl.all_courses}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setCourses(data?.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BACKEND_URL+apiURl.adminallusers}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setUsers(data?.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };


  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setClassesData({
      ...classesData,
      [name]: files ? files[0] : value,
    });
  };

  const handleCreate = async () => {
    try {
      setIsLoading(true); // Start the loader
      console.log("progress", uploadProgress);

      const payload = {
        userId: classesData.userId,
        courseId: classesData.courseId,
        purchaseDate: classesData.purchaseDate,
        transactionId: classesData.transactionId,
        amount: classesData.amount,
        comment: classesData.comment,
        paymentStatus: classesData.paymentStatus,
      };

      const response = await axios.post(`${process.env.REACT_APP_API_BACKEND_URL+apiURl.add_course_to_user}`, payload,
        // Track the upload progress
        {
          onUploadProgress: (event) => {
            const progress = Math.round((event.loaded * 100) / event.total);
            console.log("progress", progress);
            
            setUploadProgress(progress);
          }
        }
      );

      if (response.status) {
        console.log("Class created successfully");
        setShowCreate(false);
        fetchClasses();
      } else {
        console.error("Failed to create class");
      }
    } catch (error) {
      console.error("Error creating class:", error);
    } finally {
      setIsLoading(false); // Stop the loader
      setUploadProgress(0); // Reset progress
    }
  };

  const handleUpdate = async () => {
    try {
      setIsLoading(true); // Start the loader
      // const formData = new FormData();
      // formData.append('className', classesData.className);
      // formData.append('courseId', classesData.courseId);
      // formData.append('classDescription', classesData.classDescription);
      // formData.append('classType', classesData.classType);
      // formData.append('classImage', classesData.classImage);
      // formData.append('classVideo', classesData.classVideo);
      // formData.append('classNotes', classesData.classNotes);

      const payload = {
        // userId: classesData.userId,
        // courseId: classesData.courseId,
        purchaseDate: classesData.purchaseDate,
        transactionId: classesData.transactionId,
        amount: classesData.amount,
        comment: classesData.comment,
        paymentStatus: classesData.paymentStatus,
      };

      const response = await fetch(`${process.env.REACT_APP_API_BACKEND_URL+apiURl.edit_purchase}/${selectedCourse}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
        },
        body: JSON.stringify(payload),
        // Track the upload progress
        onUploadProgress: (event) => {
          const progress = Math.round((event.loaded * 100) / event.total);
          setUploadProgress(progress);
        }
      });

      if (response.status >= 200 && response.status < 300) {
        console.log("Class updated successfully");
        setShowDetails(false);
        setEditMode(false);
        fetchClasses();
      } else {
        console.error("Failed to update class");
      }
    } catch (error) {
      console.error("Error updating class:", error);
    } finally {
      setIsLoading(false); // Stop the loader
      setUploadProgress(0); // Reset progress
    }
  };

  const handleDelete = async (id) => {
    try {
      const isConfirmed = window.confirm("Are you sure you want to delete this purchase?");
      if (isConfirmed) {
        const response = await fetch(`${process.env.REACT_APP_API_BACKEND_URL+apiURl.delete_purchase}/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        if (response.ok) {
          console.log("Class deleted successfully");
          fetchClasses();
        } else {
          console.error("Failed to delete class");
        }
      } else {
        console.log("Deletion canceled");
      }
      
    } catch (error) {
      console.error("Error deleting class:", error);
    }
  };

  const handleShowDetails = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BACKEND_URL+apiURl.getPurchasedCoursesById}/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setSelectedCourse(id);
      // setClassesData(data.data || {}); // Populate classesData with the details or keep it as an empty object
      setClassesData({
        userId: data.data?.userId?._id || "",
        courseId: data.data?.courseId?._id || "",
        purchaseDate: data.data?.purchaseDate || "",
        transactionId: data.data?.transactionId || "",
        amount: data.data?.amount || "",
        comment: data.data?.comment || "",
        paymentStatus: data.data?.paymentStatus || "",
      });
      setShowDetails(true);
      setEditMode(false); // Ensure edit mode is off by default
    } catch (error) {
      console.error("Error fetching class details:", error);
    }
  };

  return (
    <>
      <div className="container-fluid ps-3">
        <div className="d-flex justify-content-end mb-3">
          <button className="btn btn-primary" onClick={() => setShowCreate(true)}>
            Add Course To User
          </button>
        </div>

        <div className="row">
          <div className="col-lg-12">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Course Name</th>
                  <th scope="col">User Name</th>
                  <th scope="col">Mobile No.</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Purchase Date</th>
                  <th scope="col">User Id</th>
                  <th scope="col">Course Id</th>
                  <th scope="col">Created At</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {classes.map((cl, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{cl?.courseId?.courseName}</td>
                    <td>{cl?.userId?.firstName + " "+ cl?.userId?.firstName}</td>
                    <td>{cl?.userId?.mobileNo}</td>
                    <td>{cl?.amount}</td>
                    <td>{cl?.purchaseDate}</td>
                    <td>{cl?.courseId?._id}</td>
                    <td>{cl?.userId?._id}</td>
                    <td>{cl?.createdAt}</td>
                    <td>
                      <button 
                        className="btn btn-info btn-sm me-2" 
                        onClick={() => handleShowDetails(cl._id)}
                      >
                        Details
                      </button>
                      <button 
                        className="btn btn-danger btn-sm" 
                        onClick={() => handleDelete(cl._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Create New Class Modal */}
      <Modal show={showCreate} onHide={() => setShowCreate(false)}>
        <Modal.Body>
          <h3 className="text-center py-4 position-relative title">
            Add Course To User
            <span
              className="modalClose"
              onClick={() => setShowCreate(false)}
              style={{ cursor: "pointer" }}
            >
              <IoClose />
            </span>
          </h3>

          <div className="p-4">
            <div className="form-group mb-4">

            <label>
                <h6>Course Name</h6>
              </label>
              <select
                name="courseId"
                value={classesData.courseId}
                onChange={handleChange}
                className="form-control"
              >
                <option>Select Course</option>
                {courses.map((course, index) => (
                  <option key={index} value={course._id}>
                    {course.courseName}
                  </option>
                ))}
              </select>

              <label>
                <h6>User Name</h6>
              </label>
              <select
                name="userId"
                value={classesData.userId}
                onChange={handleChange}
                className="form-control"
              >
                <option>Select User</option>
                {users.map((user, index) => (
                  <option key={index} value={user._id}>
                    {user.firstName +" "+user.lastName + "("+user.mobileNo+")"}
                  </option>
                ))}
              </select>

              <label>
                <h6>transactionId</h6>
              </label>
              <input
                type="text"
                name="transactionId"
                value={classesData.transactionId}
                onChange={handleChange}
                placeholder="Enter transactionId"
                className="form-control"
              />



              <label>
                <h6>Ammount</h6>
              </label>
              <input
                type="Number"
                name="amount"
                min={0}
                value={classesData.amount}
                onChange={handleChange}
                placeholder="Enter amount"
                className="form-control"
              />

              <label>
                <h6>Comment</h6>
              </label>
              <input
                type="text"
                name="comment"
                value={classesData.comment}
                onChange={handleChange}
                placeholder="Enter comment"
                className="form-control"
              />
              

              <label>
                <h6>Payment</h6>
              </label>
              <select
                name="paymentStatus"
                value={classesData.paymentStatus}
                onChange={handleChange}
                className="form-control"
              >
                
                <option value="Pending">Pending</option>
                <option value="Failed">Failed</option>
                <option value="Completed">Completed</option>
              </select>



              

              
            </div>

            {/* Progress bar */}
            {isLoading && (
              <div className="mt-4">
                <Spinner animation="border" className="me-2" />
                Uploading...
                <ProgressBar
                  striped
                  animated
                  now={uploadProgress}
                  label={`${uploadProgress}%`}
                  className="mt-2"
                />
              </div>
            )}

            <div className="text-center mt-4">
              <button className="btn btn-primary" onClick={handleCreate}>
                Create
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* Details Modal */}
      <Modal show={showDetails} onHide={() => setShowDetails(false)}>
        <Modal.Body>
          <h3 className="text-center py-4 position-relative title">
            Purchase Details
            <span
              className="modalClose"
              onClick={() => setShowDetails(false)}
              style={{ cursor: "pointer" }}
            >
              <IoClose />
            </span>
          </h3>

          <div className="p-4">
            <div className="form-group mb-4">
            

            <label>
                <h6>Course Name</h6>
              </label>
              <select
                name="courseId"
                value={classesData.courseId}
                onChange={handleChange}
                className="form-control"
                disabled="true"
              >
                <option>Select Course</option>
                {courses.map((course, index) => (
                  <option key={index} value={course._id}>
                    {course.courseName}
                  </option>
                ))}
              </select>

              <label>
                <h6>User Name</h6>
              </label>
              <select
                name="userId"
                value={classesData.userId}
                onChange={handleChange}
                className="form-control"
                disabled={"true"}
              >
                <option>Select User</option>
                {users.map((user, index) => (
                  <option key={index} value={user._id}>
                    {user.firstName +" "+user.lastName + "("+user.mobileNo+")"}
                  </option>
                ))}
              </select>

              <label>
                <h6>transactionId</h6>
              </label>
              <input
                type="text"
                name="transactionId"
                value={classesData.transactionId}
                onChange={handleChange}
                placeholder="Enter transactionId"
                className="form-control"
                readOnly={!editMode}
              />



              <label>
                <h6>Ammount</h6>
              </label>
              <input
                type="Number"
                name="amount"
                min={0}
                value={classesData.amount}
                onChange={handleChange}
                placeholder="Enter amount"
                className="form-control"
                readOnly={!editMode}
              />

              <label>
                <h6>Comment</h6>
              </label>
              <input
                type="text"
                name="comment"
                value={classesData.comment}
                onChange={handleChange}
                placeholder="Enter comment"
                className="form-control"
                readOnly={!editMode}
              />
              

              <label>
                <h6>Payment</h6>
              </label>
              <select
                name="paymentStatus"
                value={classesData.paymentStatus}
                onChange={handleChange}
                className="form-control"
                disabled={!editMode}
              >
                
                <option value="Pending">Pending</option>
                <option value="Failed">Failed</option>
                <option value="Completed">Completed</option>
              </select>

               
            </div>

            {/* Progress bar */}
            {isLoading && (
              <div className="mt-4">
                <Spinner animation="border" className="me-2" />
                Uploading...
                <ProgressBar
                  striped
                  animated
                  now={uploadProgress}
                  label={`${uploadProgress}%`}
                  className="mt-2"
                />
              </div>
            )}

            <div className="text-center mt-4">
              <button className="btn btn-primary" onClick={() => setEditMode(true)}>
                Edit
              </button>
              {editMode && (
                <button className="btn btn-success" onClick={handleUpdate}>
                  Save
                </button>
              )}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default BuyCourse;
