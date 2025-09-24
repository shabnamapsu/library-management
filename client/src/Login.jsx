import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../api";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState(""); // backend me username/email check ho raha ho, use us hisaab se change kar sakte ho
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    if (!username || !password) {
      toast.error("Please fill all details!");
      return;
    }

    try {
      const res = await api.post("/login", { username, password });
      toast.success(res.data.message || "Login successful!");
      console.log("Login data:", res.data);
      navigate("/mainpage"); // Login ke baad mainpage
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed!");
      console.error("Login error:", err.response || err.message);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
        <h2>Login Form</h2>
        <div className="d-flex flex-column w-25">
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="form-control mb-2" />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control mb-2" />
          <button onClick={handleSubmit} className="btn btn-primary">Login</button>
          <button onClick={() => navigate("/signup")} className="btn btn-secondary mt-2">Go to Signup</button>
        </div>
      </div>
    </>
  );
}

export default Login;
