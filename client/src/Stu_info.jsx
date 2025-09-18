import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function Stu_info() {
  const backgroundStyle = {
    backgroundImage: "url('/images/vecteezy_ai-generated-bookshelves-with-warm-lighting-filled-with_38511391.jpeg')",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    height: "100vh",
    color: "white",
  };

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    studentId: "",
    stuName: "",
    birthdate: "",
    gender: "",
    course: "",       // ✅ New field
    address: "",      // ✅ New field
  });

  const [studentList, setStudentList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const getValue = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getAllStudents = async () => {
    try {
      const res = await axios.get("https://library-management-1-8b8f.onrender.com/api/studentinfo");
      if (res.status === 200) {
        setStudentList(res.data);
      }
    } catch (err) {
      toast.error("Failed to fetch student list");
    }
  };

  const Deleterow = async (delid) => {
    try {
      const res = await axios.delete(`https://library-management-1-8b8f.onrender.com/api/studentinfo/${delid}`);
      if (res.status === 200) {
        toast.success("Student deleted successfully");
        getAllStudents();
      }
    } catch (err) {
      toast.error("Failed to delete student");
    }
  };

  useEffect(() => {
    getAllStudents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { studentId, stuName, birthdate, gender, course, address } = formData;

    if (!studentId.trim() || !stuName.trim() || !birthdate || !gender || !course.trim() || !address.trim()) {
      toast.error("Please fill all the details.");
      return;
    }

    try {
      if (isEditing) {
        await axios.put(`https://library-management-1-8b8f.onrender.com/api/studentinfo/${editId}`, {
          stuName,
          birthdate,
          gender,
          course,
          address,
        });
        toast.success("Student updated successfully");
        setIsEditing(false);
        setEditId(null);
      } else {
        await axios.post("https://library-management-1-8b8f.onrender.com/api/studentinfo", formData);
        toast.success("Student saved successfully");
      }

      setFormData({
        studentId: "",
        stuName: "",
        birthdate: "",
        gender: "",
        course: "",
        address: "",
      });

      getAllStudents();
      navigate("/bookdetail");

    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast.error("Student already exists with this ID.");
      } else {
        toast.error("Failed to save student info.");
      }
    }
  };

  const handleEdit = (student) => {
    setFormData({
      studentId: student.studentId,
      stuName: student.stuName,
      birthdate: student.birthdate,
      gender: student.gender,
      course: student.course || "",      // ✅
      address: student.address || "",    // ✅
    });
    setIsEditing(true);
    setEditId(student._id);
  };

  return (
    <>
      <ToastContainer />
      <div style={backgroundStyle} className="d-flex justify-content-center align-items-center flex-wrap">
        {/* Form Section */}
        <div className="bg-light text-dark rounded-4 p-4 m-4" style={{ width: "500px", backgroundColor: "rgba(255, 255, 255, 0.85)" }}>
          <h1 className="mb-4 text-center">{isEditing ? "Edit Student Details" : "Add Student Details"}</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label>Student ID:</label>
              <input className="form-control" type="text" name="studentId" value={formData.studentId} onChange={getValue} disabled={isEditing} />
            </div>

            <div className="mb-3">
              <label>Student Name:</label>
              <input className="form-control" type="text" name="stuName" value={formData.stuName} onChange={getValue} />
            </div>

            <div className="mb-3">
              <label>Date of Birth:</label>
              <input className="form-control" type="date" name="birthdate" value={formData.birthdate} onChange={getValue} />
            </div>

            <div className="mb-3">
              <label>Gender:</label><br />
              <input type="radio" name="gender" value="Male" onChange={getValue} checked={formData.gender === "Male"} /> Male
              <input className="ms-3" type="radio" name="gender" value="Female" onChange={getValue} checked={formData.gender === "Female"} /> Female
              <input className="ms-3" type="radio" name="gender" value="Other" onChange={getValue} checked={formData.gender === "Other"} /> Other
            </div>

            <div className="mb-3">
              <label>Course:</label>
              <input className="form-control" type="text" name="course" value={formData.course} onChange={getValue} />
            </div>

            <div className="mb-3">
              <label>Address:</label>
              <textarea className="form-control" name="address" rows="2" value={formData.address} onChange={getValue}></textarea>
            </div>

            <button type="submit" className="btn btn-primary w-100">
              {isEditing ? "Update Student" : "Submit"}
            </button>
          </form>
        </div>

        {/* Table Section */}
        <div className="bg-light text-dark rounded-4 p-4 m-4" style={{ width: "1000px", backgroundColor: "rgba(255, 255, 255, 0.85)" }}>
          <h4 className="mb-3">List of Students</h4>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>No.</th>
                <th>Student ID</th>
                <th>Name</th>
                <th>DOB</th>
                <th>Gender</th>
                <th>Course</th>
                <th>Address</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {studentList.length > 0 ? (
                studentList.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>{item.studentId}</td>
                    <td>{item.stuName}</td>
                    <td>{item.birthdate}</td>
                    <td>{item.gender}</td>
                    <td>{item.course}</td>
                    <td>{item.address}</td>
                    <td>
                      <button className="btn btn-warning btn-sm" onClick={() => handleEdit(item)}>Edit</button>
                    </td>
                    <td>
                      <button className="btn btn-danger btn-sm" onClick={() => Deleterow(item._id)}>Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9">No students found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Stu_info;
