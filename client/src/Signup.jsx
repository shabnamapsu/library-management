import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Login from "./Login"; // ✅ सही import

function Signup() {
  const navigate = useNavigate();

  const backgroundStyle = {
    backgroundImage:
      "url('/images/vecteezy_ai-generated-bookshelves-with-warm-lighting-filled-with_38511391.jpeg')",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    height: "100vh",
    color: "white",
  };

  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showLogin, setShowLogin] = useState(false); // ✅ toggle state

  const handleSubmit = () => {
    if (!username || !phone || !email || !password) {
      alert("Please fill in all details!");
      return;
    }

    axios
      .post("https://library-management-1-8b8f.onrender.com/api/signup", {
        username,
        phone,
        email,
        password,
      })
      .then((res) => {
        console.log("User created:", res.data);
        setShowLogin(true); // ✅ Signup के बाद Login दिखाना
      })
      .catch((err) => {
        console.error("Signup error:", err);
        alert("Signup failed");
      });
  };

  return (
    <>
      {showLogin ? ( // ✅ सही तरीका if/else का
        <div style={backgroundStyle} className="d-flex flex-column align-items-center justify-content-center">
        <h2 className="mb-4">login Form</h2>

        <div className="d-flex flex-column align-items-center rounded-4 bg-dark bg-opacity-75 w-25 m-4 p-4 text-white">
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
              login
            </button>
            <button
              type="button"
              className="btn btn-secondary w-100"
              onClick={() => navigate("/login")}
            >
            create signup 
            </button>
          </div>
        </div>
      </div>
      ) : (
        <div
          style={backgroundStyle}
          className="d-flex flex-column align-items-center justify-content-center"
        >
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
                onClick={() => setShowLogin(true)} // ✅ Login दिखाने के लिए
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Signup;
