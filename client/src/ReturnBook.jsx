import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../api"; // ✅ api.js ka use

function ReturnBook() {
  const navigate = useNavigate();

  const backgroundStyle = {
    backgroundImage: "url('/images/vecteezy_ai-generated-bookshelves-with-warm-lighting-filled-with_38511391.jpeg')",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    height: "100vh",
    color: "white",
  };

  const [formData, setFormData] = useState({
    bookId: "",
    title: "",
    author: "",
    price: "",
    studentId: "",
    studentName: "",
    course: "",
    address: "",
    date: "",
  });

  const [returnList, setReturnList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const getValue = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const getAllReturnedBooks = async () => {
    try {
      const res = await api.get("/bookreturn");
      // ✅ ensure array before set
      setReturnList(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      toast.error("Failed to fetch returned books");
      console.error(err);
    }
  };

  const Deleterow = async (id) => {
    try {
      await api.delete(`/bookreturn/${id}`);
      toast.success("Return record deleted");
      getAllReturnedBooks();
    } catch (err) {
      toast.error("Delete failed");
      console.error(err);
    }
  };

  useEffect(() => {
    getAllReturnedBooks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { bookId, title, author, price, studentId, studentName, course, address, date } = formData;

    if (!bookId || !title || !author || !price || !studentId || !studentName || !course || !address || !date) {
      toast.error("Please fill all details");
      return;
    }

    try {
      if (isEditing) {
        await api.put(`/bookreturn/${editId}`, formData);
        toast.success("Updated successfully");
        setIsEditing(false);
        setEditId(null);
      } else {
        await api.post("/bookreturn", formData);
        toast.success("Returned successfully");
        navigate("/allinfodatabase");
      }

      setFormData({
        bookId: "",
        title: "",
        author: "",
        price: "",
        studentId: "",
        studentName: "",
        course: "",
        address: "",
        date: "",
      });

      getAllReturnedBooks();
    } catch (err) {
      toast.error("Submission failed");
      console.error(err);
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
      course: item.course || "",
      address: item.address || "",
      date: item.date ? item.date.split("T")[0] : "",
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
          <h1 className="mb-4 text-center">{isEditing ? "Edit Return Info" : "Return Book"}</h1>
          <form onSubmit={handleSubmit}>
            {Object.keys(formData).map(key => (
              <div className="mb-3" key={key}>
                <label>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
                <input
                  className="form-control"
                  type={key === "price" ? "number" : key === "date" ? "date" : "text"}
                  name={key}
                  value={formData[key]}
                  onChange={getValue}
                  disabled={isEditing && key === "bookId"}
                />
              </div>
            ))}
            <button type="submit" className="btn btn-success w-100">{isEditing ? "Update Return" : "Submit"}</button>
          </form>
        </div>

        {/* Table Section */}
        <div className="bg-light text-dark rounded-4 p-4 m-4" style={{ width: "1000px", backgroundColor: "rgba(255,255,255,0.85)" }}>
          <h4 className="mb-3">Returned Books</h4>
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
                <th>Course</th>
                <th>Address</th>
                <th>Date</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {returnList.length > 0 ? returnList.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.bookId}</td>
                  <td>{item.title}</td>
                  <td>{item.author}</td>
                  <td>{item.price}</td>
                  <td>{item.studentId}</td>
                  <td>{item.studentName}</td>
                  <td>{item.course}</td>
                  <td>{item.address}</td>
                  <td>{new Date(item.date).toLocaleDateString()}</td>
                  <td><button className="btn btn-warning btn-sm" onClick={() => handleEdit(item)}>Edit</button></td>
                  <td><button className="btn btn-danger btn-sm" onClick={() => Deleterow(item._id)}>Delete</button></td>
                </tr>
              )) : <tr><td colSpan="12">No records found</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default ReturnBook;
