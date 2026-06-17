import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "./api";

function Signup() {
  const navigate = useNavigate();

  const backgroundStyle = {
    backgroundImage:
      "url('/images/vecteezy_ai-generated-bookshelves-with-warm-lighting-filled-with_38511391.jpeg')",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    height: "100vh",
  };

  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, phone, email, password } = formData;

    if (!username || !phone || !email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const res = await api.post("/signup", formData);

      toast.success(res.data.message);

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err) {
      toast.error(
        err.response?.data?.message || "Signup failed"
      );
    }
  };

  return (
    <>
      <ToastContainer />

      <div
        style={backgroundStyle}
        className="d-flex justify-content-center align-items-center w-full"
      >
        <div
          className="bg-white text-dark rounded-4 p-4 shadow"
          style={{
            width: "900px",
            backgroundColor: "rgba(255,255,255,0.85)",
          }}
        >
          <h2 className="text-center mb-4 ">Signup Form</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-3 w-[500px]">
              <label>Username</label>
              <input
                type="text"
                name="username"
                className="form-control"
                value={formData.username}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label>Phone</label>
              <input
                type="text"
                name="phone"
                className="form-control"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label>Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label>Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <button className="btn btn-success w-100">
              Signup
            </button>

            <p className="text-center mt-3">
              Already have an account?
              <span
                style={{ color: "blue", cursor: "pointer" }}
                onClick={() => navigate("/login")}
              >
                {" "}Login
              </span>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;