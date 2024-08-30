import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { IoClose } from "react-icons/io5";
import Modal from "react-bootstrap/Modal";
import apiURl from "../../store/Action/api-url";

const TestSeriesListing = () => {
  const [showCreate, setShowCreate] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [testSeriesData, setTestSeriesData] = useState({
    testSeriesTitle: "",
    pdfUrl: null,


  });

  const [testSeries, setTestSeries] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    fetchTestSeriesListing();
  }, []);

  const fetchTestSeriesListing = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BACKEND_URL+apiURl.all_testseries}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setTestSeries(data?.data);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };
 
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setTestSeriesData({
      ...testSeriesData,
      [name]: files ? files[0] : value
    });
  };

  const handleCreate = async () => {
    try {
      const formData = new FormData();
      formData.append('testSeriesTitle', testSeriesData.testSeriesTitle);
      formData.append('pdfUrl', testSeriesData.pdfUrl);

      const response = await fetch(`${process.env.REACT_APP_API_BACKEND_URL+apiURl.create_testseries}`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Course created successfully");
        setShowCreate(false);
        fetchTestSeriesListing();
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
      formData.append('testSeriesTitle', testSeriesData.testSeriesTitle);
      formData.append('pdfUrl', testSeriesData.pdfUrl);
      const response = await fetch(`${process.env.REACT_APP_API_BACKEND_URL+apiURl.edit_testseries}/${selectedCourse}`, {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        console.log("Test Series updated successfully");
        setShowDetails(false);
        setEditMode(false);
        fetchTestSeriesListing();
      } else {
        console.error("Failed to update Test Series");
      }
    } catch (error) {
      console.error("Error updating Test Series:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BACKEND_URL+apiURl.remove_testseries}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log("Test Series deleted successfully");
        fetchTestSeriesListing();
      } else {
        console.error("Failed to delete Test Series");
      }
    } catch (error) {
      console.error("Error deleting Test Series:", error);
    }
  };

  const handleShowDetails = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BACKEND_URL+apiURl.testseries_details}/${id}`, {
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
      setTestSeriesData(data.data || {}); // Populate testSeriesData with the details or keep it as an empty object
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
            Create New Test Series
          </button>
        </div>

        <div className="row">
          <div className="col-lg-12">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Test Series Name</th>
                  <th scope="col">Test Series Note</th>
                  
                  <th scope="col">Created At</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {testSeries.map((cl, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{cl?.testSeriesTitle}</td>
                    <td>{cl?.pdfUrl}</td>
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
            Create New Test Series
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
                <h6>Test Series Name</h6>
              </label>
              <input
                type="text"
                name="testSeriesTitle"
                value={testSeriesData.testSeriesTitle}
                onChange={handleChange}
                placeholder="Enter Test Series name"
                className="form-control"
              />

              

            

            <label>
              <h6>Upload PDF</h6>
            </label>
            <input
              type="file"
              name="pdfUrl"
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
          Test Series Details
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
                <h6>Test Series Name</h6>
              </label>
              <input
                type="text"
                name="testSeriesTitle"
                value={testSeriesData.testSeriesTitle}
                onChange={handleChange}
                placeholder="Enter Course name"
                className="form-control"
              />
              <label>
              <h6>Course</h6>
            </label>
            
            <label>
              <h6>Upload PDF</h6>
            </label>
            <input
              type="file"
              name="pdfUrl"
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

export default TestSeriesListing;
