import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { IoClose } from "react-icons/io5";
import Modal from "react-bootstrap/Modal";
import apiURl from "../../store/Action/api-url";

const ChaptersListing = () => {
  const [showCreate, setShowCreate] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [previousPaperData, setPreviousPaperData] = useState({
    chapterName: "",
    description: "",
    courseId: "",
    chapterImage: null,


  });

  const [previousPaper, setPreviousPaper] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchChaptersListing();
    fetchCourses();
  }, []);

  const fetchChaptersListing = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BACKEND_URL+apiURl.all_chapters}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setPreviousPaper(data?.data);
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
    setPreviousPaperData({
      ...previousPaperData,
      [name]: files ? files[0] : value
    });
  };

  const handleCreate = async () => {
    try {
      const formData = new FormData();
      formData.append('chapterName', previousPaperData.chapterName);
      formData.append('description', previousPaperData.description);
      formData.append('courseId', previousPaperData.courseId);
      formData.append('chapterImage', previousPaperData.chapterImage);

      const response = await fetch(`${process.env.REACT_APP_API_BACKEND_URL+apiURl.create_chapters}`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Chapter created successfully");
        setShowCreate(false);
        fetchChaptersListing();
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
      formData.append('chapterName', previousPaperData.chapterName);
      formData.append('description', previousPaperData.description);
      formData.append('courseId', previousPaperData.courseId);
      formData.append('chapterImage', previousPaperData.chapterImage);
      
      const response = await fetch(`${process.env.REACT_APP_API_BACKEND_URL+apiURl.edit_chapters}/${selectedCourse}`, {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        console.log("Chapter updated successfully");
        setShowDetails(false);
        setEditMode(false);
        fetchChaptersListing();
      } else {
        console.error("Failed to update Pdf Notes");
      }
    } catch (error) {
      console.error("Error updating Pdf Notes:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BACKEND_URL+apiURl.remove_chapter}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log("Pdf Notes deleted successfully");
        fetchChaptersListing();
      } else {
        console.error("Failed to delete Pdf Notes");
      }
    } catch (error) {
      console.error("Error deleting Pdf Notes:", error);
    }
  };

  const handleShowDetails = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BACKEND_URL+apiURl.all_chapters}/${id}`, {
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
      setPreviousPaperData(data.data || {}); // Populate previousPaperData with the details or keep it as an empty object
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
            Create New Chapter
          </button>
        </div>

        <div className="row">
          <div className="col-lg-12">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Chapter Name</th>
                  <th scope="col">description</th>
                  <th scope="col">Course Id</th>
                  <th scope="col">Chapter Image</th>
                  <th scope="col">Created At</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {previousPaper.map((cl, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{cl?.chapterName}</td>
                    <td>{cl?.description}</td>
                    <td>{cl?.courseId}</td>
                    <td>{cl?.chapterImage}</td>
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
            Create New Chapter
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
                <h6>Chapter Name</h6>
              </label>
              <input
                type="text"
                name="chapterName"
                value={previousPaperData.chapterName}
                onChange={handleChange}
                placeholder="Enter Chapter name"
                className="form-control"
              />
              <label>
                <h6>description</h6>
              </label>
              <input
                type="text"
                name="description"
                value={previousPaperData.description}
                onChange={handleChange}
                placeholder="Enter description"
                className="form-control"
              />

              

            
            <label>
              <h6>Upload Chapter Image</h6>
            </label>
            <input
              type="file"
              name="chapterImage"
              onChange={handleChange}
              className="form-control"
            />
            
            <label>
              <h6>Course</h6>
            </label>
            <select
              name="courseId"
              value={previousPaperData.courseId}
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
          Chapter Details
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
                <h6>Chapter Name</h6>
              </label>
              <input
                type="text"
                name="chapterName"
                value={previousPaperData.chapterName}
                onChange={handleChange}
                placeholder="Enter chapter name"
                className="form-control"
              />

              <label>
                <h6>description</h6>
              </label>
              <input
                type="text"
                name="description"
                value={previousPaperData.description}
                onChange={handleChange}
                placeholder="Enter description"
                className="form-control"
              />
            
            <label>
              <h6>Upload Chapter Image</h6>
            </label>
            <input
              type="file"
              name="chapterImage"
              onChange={handleChange}
              className="form-control"
            />

            <label>
              <h6>Course</h6>
            </label>
            <select
              name="courseId"
              value={previousPaperData.courseId}
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

export default ChaptersListing;
