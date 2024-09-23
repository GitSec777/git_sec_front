import React, { useState, useEffect } from "react";

// Replace these with your actual GitHub OAuth credentials
const CLIENT_ID = "Ov23limgzh26fACnXFFS";
const REDIRECT_URI = "http://127.0.0.1:5000/auth/github/callback"; // or your production URL

const handleLogout = () => {
  localStorage.removeItem("lastOrgName");
  localStorage.removeItem("lastRepoName");
  localStorage.removeItem("isLoggedIn");
  // Perform logout actions
  window.location.reload(); // Reload the page to update the state
};

const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (loggedIn) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleGitHubLogin = () => {
    handleLogout();
    const authUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=read:org,user,repo&redirect_uri=${encodeURIComponent(
      REDIRECT_URI
    )}`;
    handleLoginSuccess();
    window.location.href = authUrl;
  };

  const handleLoginSuccess = () => {
    localStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);
  };

  return (
    <>
      {isLoggedIn ? (
        <a className="navbar-btn" onClick={handleLogout}>
          Logout
        </a>
      ) : (
        <a className="navbar-btn" onClick={handleGitHubLogin}>
          Login with GitHub
        </a>
      )}
    </>
  );
};

export default Login;
