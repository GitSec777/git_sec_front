import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Login = ({ onLoginSuccess }) => {
  const { checkAuthStatus } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCheck = async () => {
      try {
        const result = await checkAuthStatus();
        if (result.success) {
          localStorage.setItem("userName", result.user);
          localStorage.setItem("isLoggedIn", "true");
          onLoginSuccess(result.user);
        } else if (result.error && result.error !== "Not authenticated") {
          // Only redirect for errors other than "not authenticated" (which is normal for logged out users)
          navigate(`/error?code=auth_check_failed&message=${encodeURIComponent(result.error)}`);
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
        // Redirect to error page with the error details
        navigate(`/error?code=auth_exception&message=${encodeURIComponent(error.message || "Unknown error during authentication")}`);
      }
    };

    if (localStorage.getItem("isLoggedIn")) {
      handleAuthCheck();
    }
  }, [checkAuthStatus, onLoginSuccess, navigate]);

  const handleGitHubLogin = (e) => {
    e.preventDefault();
    window.location.href = "http://localhost:5050/auth/github/login";
  };

  return (
    <a href="#" className="navbar-btn" onClick={handleGitHubLogin}>
      Login with GitHub
    </a>
  );
};

export default Login;