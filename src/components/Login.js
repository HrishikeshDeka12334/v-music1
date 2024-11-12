import React, { useState, useContext } from "react";
import { MusicContext } from "../Context"; // Import the context
import { Link, useNavigate } from "react-router-dom"; // useNavigate for programmatic navigation
import "./Login.css"; // Assuming you'll add the CSS in this file

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsAuthenticated } = useContext(MusicContext); // Access setIsAuthenticated from context
  const navigate = useNavigate(); // hook for navigation after login

  const handleLogin = (event) => {
    event.preventDefault(); // Prevent page reload

    // Your login logic here (e.g., check if email and password are correct)
    const isLoginSuccessful = email === "user@example.com" && password === "password"; // Example validation

    if (isLoginSuccessful) {
      // Update authentication state from context
      setIsAuthenticated(true);
      // Redirect to the home page
      navigate("/"); // Navigate to home after successful login
    } else {
      // Show error message or handle failed login
      alert("Invalid credentials");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <button type="submit" className="login-btn">Login</button>
        </form>

        <p className="signup-link">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
