import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function BookIssue() {
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
    bookId: "",
    title: "",
    author: "",
    price: "",
    studentId: "",
    studentName: "",
    course: "",       // ✅ Added course field
    date: "",
  });

  const [issueList, setIssueList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const getValue = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const getAllIssuedBooks = async () => {
    try {
      const res = await axios.get("https://library-management-1-8b8f.onrender.com/api/bookissue");
      if (res.status === 200) setIssueList(res.data);
    } catch (err) {
      toast.error("Failed to fetch issued books");
    }
  };

  const Deleterow = async (id) => {
    try {
      const res = await axios.delete(`https://library-management-1-8b8f.onrender.com/api/bookissue/${id}`);
      if (res.status === 200) {
        toast.success("Issued record deleted successfully");
        getAllIssuedBooks();
      }
    } catch (err) {
      toast.error("Failed to delete record");
    }
  };

  useEffect(() => {
    getAllIssuedBooks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { bookId, title, author, price, studentId, studentName, course, date } = formData;

    if (!bookId || !title || !author || !price || !studentId || !studentName || !course || !date) {
      toast.error("Please fill all the details!");
      return;
    }

    try {
      if (isEditing) {
        await axios.put(`https://library-management-1-8b8f.onrender.com/api/bookissue/${editId}`, {
          title, author, price, studentId, studentName, course, date
        });
        toast.success("Book issue updated successfully");
        setIsEditing(false);
        setEditId(null);
      } else {
        await axios.post("https://library-management-1-8b8f.onrender.com/api/bookissue", formData);
        toast.success("Book issued successfully");
      }

      setFormData({
        bookId: "",
        title: "",
        author: "",
        price: "",
        studentId: "",
        studentName: "",
        course: "",      // ✅ Reset course
        date: "",
      });

      getAllIssuedBooks();
      navigate("/returnbook");

    } catch (err) {
      toast.error("Failed to save issued book");
    }
  };

  const handleEdit = (item) => {
    setFormData({
      bookId: item.bookId,
      title: item.title,
      author: item.author,
      price: item.price,
      studentId: item.studentId,
      studentName: item.studentName,
      course: item.course,   // ✅ Include course
      date: item.date,
    });
    setIsEditing(true);
    setEditId(item._id);
  };

  return (
    <>
      <ToastContainer />
      <div style={backgroundStyle} className="d-flex justify-content-center align-items-center flex-wrap">
        {/* Form Section */}
        <div className="bg-light text-dark rounded-4 p-4 m-4" style={{ width: "500px", backgroundColor: "rgba(255,255,255,0.85)" }}>
          <h1 className="mb-4 text-center">{isEditing ? "Edit Issued Book" : "Issue Book"}</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label>Book ID:</label>
              <input className="form-control" type="text" name="bookId" value={formData.bookId} onChange={getValue} disabled={isEditing} />
            </div>
            <div className="mb-3">
              <label>Title:</label>
              <input className="form-control" type="text" name="title" value={formData.title} onChange={getValue} />
            </div>
            <div className="mb-3">
              <label>Author:</label>
              <input className="form-control" type="text" name="author" value={formData.author} onChange={getValue} />
            </div>
            <div className="mb-3">
              <label>Price:</label>
              <input className="form-control" type="text" name="price" value={formData.price} onChange={getValue} />
            </div>
            <div className="mb-3">
              <label>Student ID:</label>
              <input className="form-control" type="text" name="studentId" value={formData.studentId} onChange={getValue} />
            </div>
            <div className="mb-3">
              <label>Student Name:</label>
              <input className="form-control" type="text" name="studentName" value={formData.studentName} onChange={getValue} />
            </div>
            <div className="mb-3">
              <label>Course:</label>
              <input className="form-control" type="text" name="course" value={formData.course} onChange={getValue} />
            </div>
            <div className="mb-3">
              <label>Date:</label>
              <input className="form-control" type="date" name="date" value={formData.date} onChange={getValue} />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              {isEditing ? "Update Issue" : "Submit"}
            </button>
          </form>
        </div>

        {/* Table Section */}
        <div className="bg-light text-dark rounded-4 p-4 m-4" style={{ width: "1000px", backgroundColor: "rgba(255, 255, 255, 0.85)" }}>
          <h4 className="mb-3">Issued Book List</h4>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>No.</th>
                <th>Book ID</th>
                <th>Title</th>
                <th>Author</th>
                <th>Price</th>
                <th>Student ID</th>
                <th>Student Name</th>
                <th>Course</th> {/* ✅ New column */}
                <th>Date</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {issueList.length > 0 ? (
                issueList.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>{item.bookId}</td>
                    <td>{item.title}</td>
                    <td>{item.author}</td>
                    <td>{item.price}</td>
                    <td>{item.studentId}</td>
                    <td>{item.studentName}</td>
                    <td>{item.course}</td> {/* ✅ Show course */}
                    <td>{item.date}</td>
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
                  <td colSpan="11">No issued books found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default BookIssue;
