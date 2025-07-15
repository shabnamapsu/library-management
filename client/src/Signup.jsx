import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const navigate = useNavigate();

  // ✅ Corrected image path — no "public/" here
  const backgroundStyle = {
    backgroundImage: "url('/images/vecteezy_ai-generated-bookshelves-with-warm-lighting-filled-with_38511391.jpeg')",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    height: "100vh",
    color: "white"
  };

  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    if (!username || !phone || !email || !password) {
      alert("Please fill in all details!");
      return;
    }

    axios
      .post("http://localhost:5000/signup", { username, phone, email, password })
      .then((res) => {
        console.log("User created:", res.data);
        navigate("/login");
      })
      .catch((err) => {
        console.error("Signup error:", err);
        alert("Signup failed");
      });
  };

  return (
    <>
      <div style={backgroundStyle} className="d-flex flex-column align-items-center justify-content-center">
        <h2 className="mb-4">Signup Form</h2>

        <div className="d-flex flex-column align-items-center rounded-4 bg-dark bg-opacity-75 w-50 m-4 p-4 text-white">
          <div className="mb-3 w-100">
            <label>Username</label>
            <input
              className="form-control"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-3 w-100">
            <label>Phone No.</label>
            <input
              className="form-control"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="mb-3 w-100">
            <label>Email</label>
            <input
              className="form-control"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3 w-100">
            <label>Password</label>
            <input
              className="form-control"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="w-100">
            <button
              type="button"
              className="btn btn-primary mb-3 w-100"
              onClick={handleSubmit}
            >
              Submit
            </button>
            <button
              type="button"
              className="btn btn-secondary w-100"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
