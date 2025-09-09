import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function Addbook() {
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
  });

  const [bookList, setBookList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const getValue = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getAllBooks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/bookdetail");
      if (res.status === 200) {
        setBookList(res.data);
      }
    } catch (err) {
      toast.error("Failed to fetch book list");
    }
  };

  const Deleterow = async (delid) => {
    try {
      const res = await axios.delete(`http://localhost:5000/bookdetail/${delid}`);
      if (res.status === 200) {
        toast.success("Book deleted successfully");
        getAllBooks();
      }
    } catch (err) {
      toast.error("Failed to delete book");
    }
  };

  useEffect(() => {
    getAllBooks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { bookId, title, author, price } = formData;

    if (!bookId.trim() || !title.trim() || !author.trim() || !price.trim()) {
      toast.error("Please fill all the details.");
      return;
    }

    try {
      if (isEditing) {
        await axios.put(`http://localhost:5000/bookdetail/${editId}`, {
          title,
          author,
          price,
        });
        toast.success("Book updated successfully");
        setIsEditing(false);
        setEditId(null);
      } else {
        await axios.post("http://localhost:5000/bookdetail", formData);
        toast.success("Book saved successfully");
      }

      setFormData({ bookId: "", title: "", author: "", price: "" });
      getAllBooks();
      navigate("/bookissue");

    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast.error("Book already exists with this ID.");
      } else {
        toast.error("Failed to save book info.");
      }
    }
  };

  const handleEdit = (book) => {
    setFormData({
      bookId: book.bookId,
      title: book.title,
      author: book.author,
      price: book.price,
    });
    setIsEditing(true);
    setEditId(book._id);
  };

  return (
    <>
      <ToastContainer />
      <div style={backgroundStyle} className="d-flex justify-content-center align-items-center flex-wrap">
        {/* Form Section */}
        <div className="bg-light text-dark rounded-4 p-4 m-4" style={{ width: "500px", backgroundColor: "rgba(255, 255, 255, 0.85)" }}>
          <h1 className="mb-4 text-center">{isEditing ? "Edit Book Details" : "Add Book Details"}</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label>Book ID:</label>
              <input
                className="form-control"
                type="text"
                name="bookId"
                value={formData.bookId}
                onChange={getValue}
                disabled={isEditing}
              />
            </div>
            <div className="mb-3">
              <label>Title:</label>
              <input
                className="form-control"
                type="text"
                name="title"
                value={formData.title}
                onChange={getValue}
              />
            </div>
            <div className="mb-3">
              <label>Author:</label>
              <input
                className="form-control"
                type="text"
                name="author"
                value={formData.author}
                onChange={getValue}
              />
            </div>
            <div className="mb-3">
              <label>Price:</label>
              <input
                className="form-control"
                type="text"
                name="price"
                value={formData.price}
                onChange={getValue}
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">
              {isEditing ? "Update Book" : "Submit"}
            </button>
          </form>
        </div>

        {/* Table Section */}
        <div className="bg-light text-dark rounded-4 p-4 m-4" style={{ width: "1000px", backgroundColor: "rgba(255, 255, 255, 0.85)" }}>
          <h4 className="mb-3">List of Books</h4>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>No.</th>
                <th>Book ID</th>
                <th>Title</th>
                <th>Author</th>
                <th>Price</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {bookList.length > 0 ? (
                bookList.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>{item.bookId}</td>
                    <td>{item.title}</td>
                    <td>{item.author}</td>
                    <td>{item.price}</td>
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
                  <td colSpan="7">No books found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Addbook;
