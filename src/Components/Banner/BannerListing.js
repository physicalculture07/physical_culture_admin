import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { IoClose } from "react-icons/io5";
import Modal from "react-bootstrap/Modal";
import apiURl from "../../store/Action/api-url";

const BannerListing = () => {
  const [showCreate, setShowCreate] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [bannerData, setBannerData] = useState({
    bannerTitle: "",
    bannerUrl: null,
  });

  
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BACKEND_URL+apiURl.all_banners}`, {
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
    setBannerData({
      ...bannerData,
      [name]: files ? files[0] : value,
    });
  };

  const handleCreate = async () => {
    try {
      const formData = new FormData();
      formData.append('bannerTitle', bannerData.bannerTitle);
      formData.append('bannerUrl', bannerData.bannerUrl);

      const response = await fetch(`${process.env.REACT_APP_API_BACKEND_URL+apiURl.create_banners}`, {
        method: "POST",
        // headers: {
        //   "Content-Type": "application/json",
        // },
        body: formData,
      });

      if (response.ok) {
        console.log("Course created successfully");
        setShowCreate(false);
        fetchBanners();
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
      formData.append('bannerTitle', bannerData.bannerTitle);
      formData.append('bannerUrl', bannerData.bannerUrl);

      const response = await fetch(`${process.env.REACT_APP_API_BACKEND_URL+apiURl.edit_banners}/${selectedCourse._id}`, {
        method: "PUT",
        // headers: {
        //   "Content-Type": "application/json",
        // },
        body: formData,
      });

      if (response.ok) {
        console.log("Course updated successfully");
        setShowDetails(false);
        setEditMode(false);
        fetchBanners();
      } else {
        console.error("Failed to update course");
      }
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BACKEND_URL+apiURl.remove_banners}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log("Course deleted successfully");
        fetchBanners();
      } else {
        console.error("Failed to delete course");
      }
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  const handleShowDetails = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BACKEND_URL+apiURl.banner_details}/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setSelectedCourse(data.data);
      setBannerData(data.data || {}); // Populate bannerData with the details or keep it as an empty object
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
            Create Banner
          </button>
        </div>

        <div className="row">
          <div className="col-lg-12">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Banner Title</th>
                  <th scope="col">Banner Image</th>
                  
                  <th scope="col">Created At</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{course?.bannerTitle}</td>
                    <td>{course?.bannerUrl}</td>
                    <td>{course?.createdAt}</td>
                    <td>
                      <button 
                        className="btn btn-info btn-sm me-2" 
                        onClick={() => handleShowDetails(course._id)}
                      >
                        Details
                      </button>
                      <button 
                        className="btn btn-danger btn-sm" 
                        onClick={() => handleDelete(course._id)}
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

      {/* Create New Course Modal */}
      <Modal show={showCreate} onHide={() => setShowCreate(false)}>
        <Modal.Body>
          <h3 className="text-center py-4 position-relative title">
            Create New Banner
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
                <h6>Banner Title</h6>
              </label>
              <input
                type="text"
                name="bannerTitle"
                value={bannerData.bannerTitle}
                onChange={handleChange}
                placeholder="Enter Banner title"
                className="form-control"
              />

              <label>
                <h6>Banner Image</h6>
              </label>
              <input
                type="file"
                name="bannerUrl"
                onChange={handleChange}
                placeholder="Upload Banner Image"
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
            Banner Details
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
                <h6>Banner Title</h6>
              </label>
              <input
                type="text"
                name="bannerTitle"
                value={bannerData.bannerTitle}
                onChange={handleChange}
                placeholder="Enter Banner title"
                className="form-control"
              />

              <label>
                <h6>Banner Image</h6>
              </label>
              <input
                type="file"
                name="bannerUrl"
                onChange={handleChange}
                placeholder="Upload Banner Image"
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

export default BannerListing;
