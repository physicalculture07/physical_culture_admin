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
    className: "",
    courseId: "",
    classDescription: "",
    classType:"Paid",
    classImage: null,
    classVideo: null,
    classNotes: null,
  });

  const [classes, setClasses] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  
  // New state variables for loader and progress bar
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const classTypeDataOptions = [{"name": "Demo Class","value": "Free"}, {"name": "Paid Class","value": "Paid"}]

  useEffect(() => {
    fetchClasses();
    fetchCourses();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BACKEND_URL+apiURl.all_classes}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
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
      const formData = new FormData();
      formData.append('className', classesData.className);
      formData.append('courseId', classesData.courseId);
      formData.append('classDescription', classesData.classDescription);
      formData.append('classType', classesData.classType);
      formData.append('classImage', classesData.classImage);
      formData.append('classVideo', classesData.classVideo);
      formData.append('classNotes', classesData.classNotes);

      const response = await axios.post(`${process.env.REACT_APP_API_BACKEND_URL+apiURl.create_classes}`, formData,
        // Track the upload progress
        {onUploadProgress: (event) => {
          const progress = Math.round((event.loaded * 100) / event.total);
          console.log("progress", progress);
          
          setUploadProgress(progress);
        }
      });

      if (response.ok) {
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
      const formData = new FormData();
      formData.append('className', classesData.className);
      formData.append('courseId', classesData.courseId);
      formData.append('classDescription', classesData.classDescription);
      formData.append('classType', classesData.classType);
      formData.append('classImage', classesData.classImage);
      formData.append('classVideo', classesData.classVideo);
      formData.append('classNotes', classesData.classNotes);

      const response = await fetch(`${process.env.REACT_APP_API_BACKEND_URL+apiURl.edit_class}/${selectedCourse}`, {
        method: "PUT",
        body: formData,
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
      const isConfirmed = window.confirm("Are you sure you want to delete this class?");
      if (isConfirmed) {
        const response = await fetch(`${process.env.REACT_APP_API_BACKEND_URL+apiURl.remove_class}/${id}`, {
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
      const response = await fetch(`${process.env.REACT_APP_API_BACKEND_URL+apiURl.classes_details}/${id}`, {
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
      setClassesData(data.data || {}); // Populate classesData with the details or keep it as an empty object
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
            Create New Class
          </button>
        </div>

        <div className="row">
          <div className="col-lg-12">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Class Name</th>
                  <th scope="col">Course Id</th>
                  <th scope="col">Class Description</th>
                  <th scope="col">Class Type</th>
                  <th scope="col">Class Image</th>
                  <th scope="col">Class Video</th>
                  <th scope="col">Class Note</th>
                  <th scope="col">Created At</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {classes.map((cl, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{cl?.className}</td>
                    <td>{cl?.courseId}</td>
                    <td>{cl?.classDescription}</td>
                    <td>{cl?.classType}</td>
                    <td>{cl?.classImage}</td>
                    <td>{cl?.classVideo}</td>
                    <td>{cl?.classNotes}</td>
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
                <h6>Class Name</h6>
              </label>
              <input
                type="text"
                name="className"
                value={classesData.className}
                onChange={handleChange}
                placeholder="Enter Course name"
                className="form-control"
              />

              <label>
                <h6>Class Description</h6>
              </label>
              <input
                type="text"
                name="classDescription"
                value={classesData.classDescription}
                onChange={handleChange}
                placeholder="Enter Course name"
                className="form-control"
              />
              

              <label>
                <h6>Class Type</h6>
              </label>
              <select
                name="classType"
                value={classesData.classType}
                onChange={handleChange}
                className="form-control"
              >
                {classTypeDataOptions.map((classTypeData, index) => (
                  <option key={index} value={classTypeData.value}>
                    {classTypeData.name}
                  </option>
                ))}
              </select>



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
            Class Details
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
                <h6>Class Name</h6>
              </label>
              <input
                type="text"
                name="className"
                value={classesData.className}
                onChange={handleChange}
                placeholder="Enter Class name"
                className="form-control"
                readOnly={!editMode}
              />

              <label>
                <h6>Class Description</h6>
              </label>
              <input
                type="text"
                name="classDescription"
                value={classesData.classDescription}
                onChange={handleChange}
                placeholder="Enter Class name"
                className="form-control"
                readOnly={!editMode}
              />

              <label>
                <h6>Class Type</h6>
              </label>
              <select
                name="classType"
                value={classesData.classType}
                onChange={handleChange}
                className="form-control"
              >
                {classTypeDataOptions.map((classTypeData, index) => (
                  <option key={index} value={classTypeData.value}>
                    {classTypeData.name}
                  </option>
                ))}
              </select>

              <label>
                <h6>Course</h6>
              </label>
              <select
                name="courseId"
                value={classesData.courseId}
                onChange={handleChange}
                className="form-control"
                disabled={!editMode}
              >
                <option>Select Course</option>
                {courses.map((course, index) => (
                  <option key={index} value={course._id}>
                    {course.courseName}
                  </option>
                ))}
              </select>

              <label>
                <h6>Class Image</h6>
              </label>
              <input
                type="file"
                name="classImage"
                onChange={handleChange}
                placeholder="Upload Class Image"
                className="form-control"
              />

              <label>
                <h6>Class Video</h6>
              </label>
              <input
                type="file"
                name="classVideo"
                onChange={handleChange}
                placeholder="Upload Class Video"
                className="form-control"
                disabled={!editMode}
              />

              <label>
                <h6>Class Notes</h6>
              </label>
              <input
                type="file"
                name="classNotes"
                onChange={handleChange}
                placeholder="Upload Class Notes"
                className="form-control"
                disabled={!editMode}
              />
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
