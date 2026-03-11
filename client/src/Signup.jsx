import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import api from "./api";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
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

      toast.success(res.data.message || "Signup successful");

      setFormData({
        username: "",
        phone: "",
        email: "",
        password: "",
      });

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="container mt-5">
      <ToastContainer />

      <div className="row justify-content-center">
        <div className="col-md-5">

          <div className="card shadow">
            <div className="card-body">

              <h3 className="text-center mb-4">Signup</h3>

              <form onSubmit={handleSubmit}>

                <div className="mb-3">
                  <label className="form-label">Username</label>
                  <input
                    type="text"
                    name="username"
                    className="form-control"
                    placeholder="Enter username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    className="form-control"
                    placeholder="Enter phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Signup
                </button>

                <p className="text-center mt-3">
                  Already have account?
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

        </div>
      </div>
    </div>
  );
}

export default Signup;