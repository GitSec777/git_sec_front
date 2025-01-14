import React, { useEffect } from "react";
import axios from "axios";

const Login = ({ onLoginSuccess }) => {
  useEffect(() => {
    // Check if we're returning from GitHub auth
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:5050/auth/check-status",
          {
            withCredentials: true,
          }
        );
        if (response.data.isAuthenticated) {
          localStorage.setItem("userName", response.data.name);
          localStorage.setItem("isLoggedIn", "true");
          onLoginSuccess(response.data.name);
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
      }
    };

    if (localStorage.getItem("isLoggedIn")) {
      checkAuthStatus();
    }
  }, [onLoginSuccess]);

  const handleGitHubLogin = (e) => {
    e.preventDefault();
    window.location.href = "http://127.0.0.1:5050/auth/github/login";
  };

  return (
    <a href="#" className="navbar-btn" onClick={handleGitHubLogin}>
      Login with GitHub
    </a>
  );
};

export default Login;
