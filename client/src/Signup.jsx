import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "./api.jsx"; // ✅ axios instance

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    email: "",
    password: ""
  });

  const [showLogin, setShowLogin] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const { username, phone, email, password } = formData;

    if (!username || !phone || !email || !password) {
      toast.error("Please fill all details!");
      return;
    }

    try {
      const res = await api.post("/signup", { username, phone, email, password });
      toast.success(res.data.message || "User created successfully!");
      setShowLogin(true); // ✅ Show login toggle after signup
    } catch (err) {
      if (err.response && err.response.status === 409) {
        toast.error(err.response.data.message || "User/email/phone already exists!");
      } else {
        toast.error("Signup failed!");
      }
    }
  };

  return (
    <>
      <ToastContainer />
      {showLogin ? (
        <div>
          <h2>Login Form</h2>
          <button onClick={() => navigate("/login")}>Go to Login</button>
        </div>
      ) : (
        <div>
          <h2>Signup Form</h2>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <button onClick={handleSubmit}>Signup</button>
        </div>
      )}
    </>
  );
}

export default Signup;
