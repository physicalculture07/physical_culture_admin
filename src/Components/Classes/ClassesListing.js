import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { IoClose } from "react-icons/io5";
import Modal from "react-bootstrap/Modal";
import apiURl from "../../store/Action/api-url";

const ClassesListing = () => {
  const [showCreate, setShowCreate] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [classesData, setClassesData] = useState({
    className: "",
    courseId: "",
    classVideo: null,
    classNotes: null,


  });

  
  const [classes, setClasses] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

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
      [name]: files ? files[0] : value
    });
  };

  const handleCreate = async () => {
    try {
      const formData = new FormData();
      formData.append('className', classesData.className);
      formData.append('courseId', classesData.courseId);
      formData.append('classVideo', classesData.classVideo);
      formData.append('classNotes', classesData.classNotes);

      const response = await fetch(`${process.env.REACT_APP_API_BACKEND_URL+apiURl.create_classes}`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Course created successfully");
        setShowCreate(false);
        fetchClasses();
      } else {
        console.error("Failed to create course");
      }
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append('className', classesData.className);
      formData.append('courseId', classesData.courseId);
      formData.append('classVideo', classesData.classVideo);
      formData.append('classNotes', classesData.classNotes);
      const response = await fetch(`${process.env.REACT_APP_API_BACKEND_URL+apiURl.edit_class}/${selectedCourse}`, {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        console.log("Course updated successfully");
        setShowDetails(false);
        setEditMode(false);
        fetchClasses();
      } else {
        console.error("Failed to update course");
      }
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BACKEND_URL+apiURl.remove_class}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log("Course deleted successfully");
        fetchClasses();
      } else {
        console.error("Failed to delete course");
      }
    } catch (error) {
      console.error("Error deleting course:", error);
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
      console.error("Error fetching course details:", error);
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
            Create New Class
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
              <h6>Course</h6>
            </label>
            <select
              name="courseId"
              value={classesData.courseId}
              onChange={handleChange}
              className="form-control"
            >
              <option value="">Select Course</option>
              {courses.map(course => (
                <option key={course._id} value={course._id}>
                  {course.courseName}
                </option>
              ))}
            </select>

            <label>
              <h6>Upload Video</h6>
            </label>
            <input
              type="file"
              name="classVideo"
              accept="video/*"
              onChange={handleChange}
              className="form-control"
            />

            <label>
              <h6>Upload PDF</h6>
            </label>
            <input
              type="file"
              name="classNotes"
              accept="application/pdf"
              onChange={handleChange}
              className="form-control"
            />

            </div>
            <div className="text-center">
              <button
                className="btn btn-primary"
                onClick={handleCreate}
              >
                Save
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* Course Details Modal */}
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
                placeholder="Enter Course name"
                className="form-control"
              />
              <label>
              <h6>Course</h6>
            </label>
            <select
              name="courseId"
              value={classesData.courseId}
              onChange={handleChange}
              className="form-control"
            >
              <option value="">Select Course</option>
              {courses.map(course => (
                <option key={course._id} value={course._id}>
                  {course.courseName}
                </option>
              ))}
            </select>

            <label>
              <h6>Upload Video</h6>
            </label>
            <input
              type="file"
              name="classVideo"
              accept="video/*"
              onChange={handleChange}
              className="form-control"
            />

            <label>
              <h6>Upload PDF</h6>
            </label>
            <input
              type="file"
              name="classNotes"
              accept="application/pdf"
              onChange={handleChange}
              className="form-control"
            />

              
            </div>
            <div className="text-center">
              {editMode ? (
                <>
                  <button
                    className="btn btn-success me-2"
                    onClick={handleUpdate}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => setEditMode(false)}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  className="btn btn-primary"
                  onClick={() => setEditMode(true)}
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ClassesListing;
