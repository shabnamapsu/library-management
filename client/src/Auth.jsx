import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Auth() {
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

  // Signup States
  const [signupUsername, setSignupUsername] = useState("");
  const [signupPhone, setSignupPhone] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  // Login States
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Toggle between signup and login
  const [showLogin, setShowLogin] = useState(false);

  // Signup Handler
  const handleSignup = async () => {
    if (!signupUsername || !signupPhone || !signupEmail || !signupPassword) {
      alert("Please fill in all details!");
      return;
    }

    try {
      const res = await axios.post(
        "https://library-management-1-8b8f.onrender.com/api/signup",
        {
          username: signupUsername,
          phone: signupPhone,
          email: signupEmail,
          password: signupPassword,
        }
      );
      console.log("User created:", res.data);
      alert("Signup successful! Please login.");
      setShowLogin(true);
    } catch (err) {
      if (err.response && err.response.status === 409) {
        alert("User already exists! Try logging in.");
      } else {
        console.error("Signup error:", err);
        alert("Signup failed! Try again.");
      }
    }
  };

  // Login Handler
  const handleLogin = async () => {
    if (!loginUsername || !loginPassword) {
      alert("Please enter username and password!");
      return;
    }

    try {
      const res = await axios.post(
        "https://library-management-1-8b8f.onrender.com/api/login",
        {
          username: loginUsername,
          password: loginPassword,
        }
      );
      console.log("Login success:", res.data);
      alert("Login successful!");
      navigate("/mainpage"); // Redirect after login
    } catch (err) {
      if (err.response && err.response.status === 401) {
        alert("Invalid credentials! Please try again.");
      } else {
        console.error("Login error:", err);
        alert("Login failed! Try again.");
      }
    }
  };

  return (
    <div
      style={backgroundStyle}
      className="d-flex flex-column align-items-center justify-content-center"
    >
      {showLogin ? (
        // Login Form
        <div className="d-flex flex-column align-items-center rounded-4 bg-dark bg-opacity-75 w-25 m-4 p-4 text-white">
          <h2 className="mb-4">Login</h2>
          <div className="mb-3 w-100">
            <label>Username</label>
            <input
              className="form-control"
              type="text"
              value={loginUsername}
              onChange={(e) => setLoginUsername(e.target.value)}
            />
          </div>
          <div className="mb-3 w-100">
            <label>Password</label>
            <input
              className="form-control"
              type="password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
          </div>
          <div className="w-100">
            <button
              type="button"
              className="btn btn-primary mb-3 w-100"
              onClick={handleLogin}
            >
              Login
            </button>
            <button
              type="button"
              className="btn btn-secondary w-100"
              onClick={() => setShowLogin(false)}
            >
              Go to Signup
            </button>
          </div>
        </div>
      ) : (
        // Signup Form
        <div className="d-flex flex-column align-items-center rounded-4 bg-dark bg-opacity-75 w-50 m-4 p-4 text-white">
          <h2 className="mb-4">Signup</h2>
          <div className="mb-3 w-100">
            <label>Username</label>
            <input
              className="form-control"
              type="text"
              value={signupUsername}
              onChange={(e) => setSignupUsername(e.target.value)}
            />
          </div>
          <div className="mb-3 w-100">
            <label>Phone No.</label>
            <input
              className="form-control"
              type="tel"
              value={signupPhone}
              onChange={(e) => setSignupPhone(e.target.value)}
            />
          </div>
          <div className="mb-3 w-100">
            <label>Email</label>
            <input
              className="form-control"
              type="email"
              value={signupEmail}
              onChange={(e) => setSignupEmail(e.target.value)}
            />
          </div>
          <div className="mb-3 w-100">
            <label>Password</label>
            <input
              className="form-control"
              type="password"
              value={signupPassword}
              onChange={(e) => setSignupPassword(e.target.value)}
            />
          </div>
          <div className="w-100">
            <button
              type="button"
              className="btn btn-primary mb-3 w-100"
              onClick={handleSignup}
            >
              Signup
            </button>
            <button
              type="button"
              className="btn btn-secondary w-100"
              onClick={() => setShowLogin(true)}
            >
              Go to Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Auth;
